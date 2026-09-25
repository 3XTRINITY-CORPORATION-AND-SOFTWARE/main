import { parse } from "yaml";
import type {
  AuditReport,
  Finding,
  Grade,
  ParsedJob,
  ParsedStep,
  ParsedWorkflow,
  Severity,
} from "./types";
import { SEVERITY_WEIGHT } from "./types";

const INJECTION_RE =
  /\$\{\{\s*(github\.(event\.|head_ref|ref\b|actor\b)|inputs\.|matrix\.)/i;
const TOKEN_RE =
  /secrets\.GITHUB_TOKEN|github\.token|GH_TOKEN|GITHUB_TOKEN/i;
const APP_TOKEN_RE = /create-github-app-token|APP_PRIVATE_KEY|APP_CLIENT_ID/i;
const ACTION_USE_RE = /^([^@]+)@(.+)$/;
const SHA_RE = /^[0-9a-f]{40}$/i;

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function runsOn(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(String).join(", ");
  return undefined;
}


function triggerNames(on: unknown): string[] {
  if (!on) return [];
  if (typeof on === "string") return [on];
  if (Array.isArray(on)) return on.map(String);
  const rec = asRecord(on);
  if (!rec) return [];
  return Object.keys(rec);
}

function permissionMap(value: unknown): Record<string, string> | null {
  if (typeof value === "string") return { "*": value };
  const rec = asRecord(value);
  if (!rec) return null;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(rec)) {
    out[k] = String(v);
  }
  return out;
}

function parseSteps(raw: unknown): ParsedStep[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    const rec = asRecord(item) ?? {};
    return {
      name: asString(rec.name),
      uses: asString(rec.uses),
      run: asString(rec.run),
      with: asRecord(rec.with) ?? undefined,
      env: asRecord(rec.env) ?? undefined,
      id: asString(rec.id),
    };
  });
}

export function parseWorkflow(yamlText: string): ParsedWorkflow {
  try {
    const doc = parse(yamlText) as unknown;
    const rec = asRecord(doc);
    if (!rec) {
      return { on: undefined, jobs: [], parseError: "Workflow is not a mapping." };
    }
    const jobsRec = asRecord(rec.jobs) ?? {};
    const jobs: ParsedJob[] = Object.entries(jobsRec).map(([id, job]) => {
      const j = asRecord(job) ?? {};
      return {
        id,
        name: asString(j.name),
        runsOn: runsOn(j["runs-on"]),
        permissions: j.permissions,
        steps: parseSteps(j.steps),
        if: asString(j.if),
      };
    });
    return {
      name: asString(rec.name),
      on: rec.on,
      permissions: rec.permissions,
      jobs,
    };
  } catch (err) {
    return {
      on: undefined,
      jobs: [],
      parseError: err instanceof Error ? err.message : "YAML parse failed.",
    };
  }
}

function finding(
  id: string,
  severity: Severity,
  title: string,
  detail: string,
  remediation: string,
  rule: string,
  location?: string,
): Finding {
  return { id, severity, title, detail, remediation, rule, location };
}

function flattenUses(jobs: ParsedJob[]): { job: string; step: ParsedStep; index: number }[] {
  const out: { job: string; step: ParsedStep; index: number }[] = [];
  for (const job of jobs) {
    job.steps.forEach((step, index) => out.push({ job: job.id, step, index }));
  }
  return out;
}

export function auditWorkflow(yamlText: string): AuditReport {
  const parsed = parseWorkflow(yamlText);
  const findings: Finding[] = [];
  const triggers = triggerNames(parsed.on);
  const allSteps = flattenUses(parsed.jobs);
  const usesToken = TOKEN_RE.test(yamlText);
  const usesApp = APP_TOKEN_RE.test(yamlText);
  const topPerms = permissionMap(parsed.permissions);
  const anyJobPerms = parsed.jobs.some((j) => j.permissions != null);
  const hasPermissions = Boolean(topPerms) || anyJobPerms;

  if (parsed.parseError) {
    findings.push(
      finding(
        "parse",
        "high",
        "YAML did not parse",
        parsed.parseError,
        "Fix the workflow syntax, then re-run the audit. Tabs, unquoted colons, and `on:` boolean coercion are common traps.",
        "yaml-parse",
      ),
    );
  }

  if (!parsed.parseError && parsed.jobs.length === 0) {
    findings.push(
      finding(
        "no-jobs",
        "high",
        "No jobs found",
        "A workflow without jobs cannot run, so it cannot be privilege-reviewed.",
        "Add at least one job with steps.",
        "structure",
      ),
    );
  }

  if (!hasPermissions && parsed.jobs.length > 0) {
    findings.push(
      finding(
        "no-permissions",
        "high",
        "No permissions block",
        "Without an explicit permissions key, GITHUB_TOKEN inherits the repository default (permissive or restricted). That default is not visible in the YAML, so reviewers cannot attest least privilege.",
        "Set workflow-level `permissions:` to the minimum, then raise per job. Start with `contents: read` and add write scopes only where a step needs them.",
        "permissions-missing",
      ),
    );
  } else if (topPerms && (topPerms["*"] === "write-all" || Object.values(topPerms).includes("write-all"))) {
    findings.push(
      finding(
        "write-all",
        "critical",
        "permissions: write-all",
        "write-all grants every GITHUB_TOKEN scope, including contents, actions, packages, and id-token.",
        "Replace write-all with an explicit map of the two or three scopes this workflow actually uses.",
        "permissions-write-all",
      ),
    );
  }

  if (topPerms && topPerms["*"] === "read-all") {
    findings.push(
      finding(
        "read-all",
        "medium",
        "permissions: read-all",
        "read-all is safer than write-all but still broader than a typical lint or test job needs.",
        "Prefer `contents: read` (and `pull-requests: read` if required) instead of a blanket read-all.",
        "permissions-read-all",
      ),
    );
  }

  const writeScopes = new Set<string>();
  const collectWrites = (perms: Record<string, string> | null, loc: string) => {
    if (!perms) return;
    for (const [scope, level] of Object.entries(perms)) {
      if (level === "write" || level === "write-all") {
        writeScopes.add(scope);
        if (scope === "contents" && level === "write") {
          const needsContentsWrite =
            /deploy|release|tag|commit|push|pages/i.test(yamlText) ||
            /peaceiris\/actions-gh-pages|stefanzweifel\/git-auto-commit|softprops\/action-gh-release/i.test(
              yamlText,
            );
          if (!needsContentsWrite) {
            findings.push(
              finding(
                `contents-write-${loc}`,
                "medium",
                "contents: write may be unnecessary",
                `Job or workflow '${loc}' grants contents: write. Most issue, comment, and check workflows only need contents: read.`,
                "Drop contents: write unless a step commits, tags, or publishes to the repo. The Open Issue example only needs contents: read + issues: write.",
                "permissions-contents-write",
                loc,
              ),
            );
          }
        }
      }
    }
  };
  collectWrites(topPerms, "workflow");
  for (const job of parsed.jobs) collectWrites(permissionMap(job.permissions), job.id);

  if (triggers.includes("pull_request_target")) {
    const checksOutPr = allSteps.some((s) => {
      const ref = s.step.with ? String(s.step.with.ref ?? "") : "";
      return Boolean(s.step.uses?.startsWith("actions/checkout")) && /pull_request\.head|github\.event\.pull_request/i.test(ref);
    });
    findings.push(
      finding(
        "pr-target",
        checksOutPr ? "critical" : "high",
        "pull_request_target runs in the base repo context",
        checksOutPr
          ? "This workflow both uses pull_request_target (so GITHUB_TOKEN can write to the base repo) and checks out the pull request head. A fork PR can execute untrusted code with a write token."
          : "pull_request_target grants a write-capable token from the base repository. Any later checkout of PR code, or interpolation of PR titles into run:, is a privilege escalation.",
        "Use `pull_request` for CI. If you must label or comment from the base repo, do it in a separate job that does not check out PR code and does not interpolate untrusted fields into run:.",
        "pull-request-target",
        "on.pull_request_target",
      ),
    );
  }

  allSteps.forEach(({ job, step, index }) => {
    const loc = `${job} / step ${index + 1}${step.name ? ` (${step.name})` : ""}`;
    if (step.run && INJECTION_RE.test(step.run)) {
      findings.push(
        finding(
          `inject-${job}-${index}`,
          "critical",
          "Possible script injection in run:",
          `The script interpolates a GitHub context value directly into bash. Attackers who control a PR title, branch name, or issue body can inject ` +
            "`" +
            "; evil; #" +
            "`" +
            " into the shell.",
          "Pass untrusted values through `env:` and read `$TITLE` (quoted) inside the script. Never splice `${{ github.event.* }}` into run:.",
          "script-injection",
          loc,
        ),
      );
    }

    if (step.uses) {
      const match = ACTION_USE_RE.exec(step.uses.trim());
      if (match) {
        const ref = match[2];
        const isSha = SHA_RE.test(ref.split("#")[0].trim());
        if (!isSha && (ref === "main" || ref === "master" || ref.startsWith("v") || ref.includes("."))) {
          const severity: Severity = ref === "main" || ref === "master" ? "high" : "medium";
          findings.push(
            finding(
              `pin-${job}-${index}`,
              severity,
              `Action is not pinned to a SHA`,
              `${step.uses} follows a moving tag or branch. A compromised publisher can change what your workflow executes without a diff in this file.`,
              "Pin to a 40-character commit SHA and leave the version in a trailing comment, e.g. `actions/checkout@11bd7190… # v4.2.2`.",
              "unpinned-action",
              loc,
            ),
          );
        }
      }
    }

    if (step.run && /curl /.test(step.run) && !/--fail\b/.test(step.run)) {
      findings.push(
        finding(
          `curl-fail-${job}-${index}`,
          "low",
          "curl without --fail",
          "A 4xx/5xx from the GitHub API would still exit 0, so a failed issue create looks like success.",
          "Add `--fail` (or `-f`) to curl, as in GitHub's REST example.",
          "curl-fail",
          loc,
        ),
      );
    }
  });

  if (usesToken && /secrets\.GITHUB_TOKEN/.test(yamlText) && !/github\.token/.test(yamlText)) {
    findings.push(
      finding(
        "secrets-github-token",
        "info",
        "Using secrets.GITHUB_TOKEN",
        "The automatic token is also available as github.token. Both work. Prefer github.token so it is obvious this is not a stored PAT.",
        "Set `GH_TOKEN: ${{ github.token }}` (or the authorization header) instead of secrets.GITHUB_TOKEN.",
        "token-alias",
      ),
    );
  }

  if (triggers.includes("push") && writeScopes.has("issues")) {
    findings.push(
      finding(
        "issue-on-push",
        "medium",
        "Opens issues on every push",
        "A push trigger plus issues: write will file a new issue for each commit, including force-pushes and bot commits. The GitHub docs example does this to demonstrate the REST call — it is rarely what you want in production.",
        "Gate on workflow_dispatch, a label, a path filter, or `if: github.event.head_commit.committer.username != 'github-actions[bot]'`.",
        "noisy-trigger",
        "on.push",
      ),
    );
  }

  if (usesApp) {
    const appStep = allSteps.find((s) => s.step.uses?.includes("create-github-app-token"));
    if (appStep && /@v\d/.test(appStep.step.uses ?? "")) {
      findings.push(
        finding(
          "app-token-pin",
          "medium",
          "GitHub App token action is tag-pinned",
          `${appStep.step.uses} mints an installation token from a private key. Treat this like production auth — pin the SHA.`,
          "Pin `actions/create-github-app-token` to a commit SHA. Keep APP_PRIVATE_KEY in Actions secrets; never echo it. JWTs must expire within 10 minutes.",
          "app-token",
          `${appStep.job} / ${appStep.step.name ?? "generate-token"}`,
        ),
      );
    }
    if (!/permissions:/.test(yamlText)) {
      findings.push(
        finding(
          "app-token-no-perms",
          "info",
          "App token bypasses GITHUB_TOKEN permissions",
          "An installation token has the GitHub App's permissions, not the workflow permissions: map. Tight YAML permissions will not shrink what the app can do.",
          "Review the App's installation permissions in GitHub settings. Mint the token only in jobs that need it, and never pass it to untrusted checkout.",
          "app-token-scope",
        ),
      );
    }
  }

  if (/Authorization: token /.test(yamlText) && /JWT|YOUR_JWT/.test(yamlText)) {
    findings.push(
      finding(
        "jwt-bearer",
        "info",
        "JWTs must use Bearer",
        "GitHub accepts `Authorization: token` for installation tokens and PATs, but a GitHub App JWT must be `Authorization: Bearer`.",
        "Use Bearer for JWTs. Keep iat 60 seconds in the past for clock drift and exp no more than 10 minutes ahead. Sign with RS256.",
        "jwt-header",
      ),
    );
  }

  const persist = allSteps.find((s) => {
    if (!s.step.uses?.startsWith("actions/checkout")) return false;
    const persistCreds = s.step.with?.["persist-credentials"];
    return persistCreds !== false && persistCreds !== "false";
  });
  if (persist && triggers.includes("pull_request_target")) {
    findings.push(
      finding(
        "persist-creds",
        "high",
        "checkout persist-credentials on untrusted PR",
        "The default checkout persists GITHUB_TOKEN into local git config. Combined with PR code, later steps can push as the token.",
        "Set `persist-credentials: false` on checkout, or do not check out PR head in this job.",
        "persist-credentials",
        persist.job,
      ),
    );
  }

  if (!parsed.parseError && parsed.jobs.length > 0 && findings.every((f) => f.severity === "info" || f.severity === "pass")) {
    findings.push(
      finding(
        "lean",
        "pass",
        "Lean already. Ship.",
        "No over-privilege or injection findings on this pass. Keep the permissions map explicit when you add jobs.",
        "Re-run Attest whenever the workflow or the App's permissions change.",
        "clean",
      ),
    );
  }

  if (hasPermissions && !findings.some((f) => f.rule === "permissions-missing" || f.rule === "permissions-write-all")) {
    findings.push(
      finding(
        "explicit-permissions",
        "pass",
        "Explicit permissions map",
        "This workflow declares GITHUB_TOKEN scopes in YAML, which is what reviewers (and Attest) can actually attest.",
        "Keep raising or dropping scopes per job instead of widening the workflow default.",
        "permissions-present",
      ),
    );
  }

  const penalty = findings.reduce((sum, f) => sum + SEVERITY_WEIGHT[f.severity], 0);
  const score = Math.max(0, Math.min(100, 100 - penalty));
  const grade: Grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 40 ? "D" : "F";

  const criticals = findings.filter((f) => f.severity === "critical").length;
  const highs = findings.filter((f) => f.severity === "high").length;
  const summary =
    criticals > 0
      ? `${criticals} critical finding${criticals === 1 ? "" : "s"}. Do not ship this token as-is.`
      : highs > 0
        ? `${highs} high-severity finding${highs === 1 ? "" : "s"} on GITHUB_TOKEN or untrusted code.`
        : score >= 90
          ? "Least privilege holds. Permissions are explicit and the run: scripts look clean."
          : "No critical issues, but the token still has room to shrink.";

  const ordered = [...findings].sort((a, b) => SEVERITY_WEIGHT[b.severity] - SEVERITY_WEIGHT[a.severity]);

  return {
    name: parsed.name || "untitled workflow",
    score,
    grade,
    summary,
    findings: ordered,
    stats: {
      jobs: parsed.jobs.length,
      steps: allSteps.length,
      triggers: triggers.length ? triggers : ["(none)"],
      hasPermissions,
      usesGithubToken: usesToken,
      usesAppToken: usesApp,
    },
    yaml: yamlText,
    auditedAt: new Date().toISOString(),
  };
}
