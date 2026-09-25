import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportMenu } from "@/components/export-menu";
import { FindingsPanel } from "@/components/findings-panel";
import { ScoreMark } from "@/components/score-mark";
import { fetchGithubWorkflow, scanGithubRepo, type GithubScan } from "@/lib/audit/github";
import { auditWorkflow } from "@/lib/audit/engine";
import { SAMPLE_WORKFLOWS } from "@/lib/audit/samples";
import { useAudit } from "@/lib/audit/store";
import { t } from "@/lib/i18n";
import { createSteelRow } from "@/lib/steel/rows";
import { useSteel } from "@/lib/steel/store";
import { toast } from "sonner";

const PRESETS = ["actions/cache", "actions/checkout", "actions/starter-workflows"];

export function AuditWorkspace() {
  const yaml = useAudit((s) => s.yaml);
  const sampleId = useAudit((s) => s.sampleId);
  const report = useAudit((s) => s.report);
  const setYaml = useAudit((s) => s.setYaml);
  const run = useAudit((s) => s.run);
  const loadSample = useAudit((s) => s.loadSample);
  const lang = useSteel((s) => s.lang);
  const et = lang === "et";
  const [spec, setSpec] = useState("actions/cache");
  const [scan, setScan] = useState<GithubScan | null>(null);
  const [activePath, setActivePath] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [grades, setGrades] = useState<Record<string, string>>({});

  async function saveReport() {
    try {
      await createSteelRow({
        data: {
          kind: "audit",
          title: `audit ${report.grade} ${report.score}`,
          payloadJson: JSON.stringify({
            grade: report.grade,
            score: report.score,
            name: report.name.slice(0, 80),
            findingCount: report.findings.length,
            rules: report.findings.map((f) => f.rule).slice(0, 24),
          }),
        },
      });
      toast.success(t(lang, "rowSaved"));
    } catch {
      toast.error(t(lang, "rowFail"));
    }
  }

  function ghError(err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("not-found")) return t(lang, "ghMiss");
    if (msg.includes("rate")) return t(lang, "ghRate");
    if (msg.includes("repo")) return t(lang, "ghMiss");
    return t(lang, "ghFail");
  }

  async function onScan(nextSpec = spec) {
    setBusy(true);
    try {
      const result = await scanGithubRepo({ data: { spec: nextSpec } });
      setScan(result);
      setSpec(`${result.owner}/${result.repo}`);
      setGrades({});
      if (result.files.length === 0) {
        toast.message(t(lang, "ghEmpty"));
        return;
      }
      const pick =
        result.files.find((f) => f.path.includes("pr-opened")) ??
        result.files.find((f) => f.path.endsWith(".yml") || f.path.endsWith(".yaml")) ??
        result.files[0];
      await loadRemote(result.owner, result.repo, pick.path);
      void gradeListed(result);
    } catch (err) {
      setScan(null);
      toast.error(ghError(err));
    } finally {
      setBusy(false);
    }
  }

  async function gradeListed(result: GithubScan) {
    const slice = result.files.slice(0, 8);
    const rows = await Promise.all(
      slice.map(async (f) => {
        try {
          const file = await fetchGithubWorkflow({
            data: { owner: result.owner, repo: result.repo, path: f.path },
          });
          return [f.path, auditWorkflow(file.yaml).grade] as const;
        } catch {
          return [f.path, "–"] as const;
        }
      }),
    );
    setGrades(Object.fromEntries(rows));
  }

  async function loadRemote(owner: string, repo: string, path: string) {
    setBusy(true);
    try {
      const file = await fetchGithubWorkflow({ data: { owner, repo, path } });
      setYaml(file.yaml);
      setActivePath(path);
      useAudit.getState().run();
      toast.success(file.name);
    } catch (err) {
      toast.error(ghError(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
      <section className="min-w-0">
        <div className="mb-4 rounded-[var(--radius-md)] border border-rule bg-raised/50 p-4">
          <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">{t(lang, "ghScan")}</p>
          <form
            className="mt-3 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              void onScan();
            }}
          >
            <label className="sr-only" htmlFor="gh-spec">
              {t(lang, "ghSpec")}
            </label>
            <input
              id="gh-spec"
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              placeholder={t(lang, "ghSpec")}
              autoComplete="off"
              className="min-h-11 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-rule bg-paper px-3 font-mono text-sm text-ink"
            />
            <Button type="submit" variant="live" disabled={busy}>
              {busy ? t(lang, "ghBusy") : t(lang, "ghScan")}
            </Button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setSpec(p);
                  void onScan(p);
                }}
                className="min-h-11 rounded-[var(--radius-sm)] border border-rule px-3 font-mono text-2xs text-muted hover:text-ink"
              >
                {p}
              </button>
            ))}
          </div>
          {scan ? (
            <div className="mt-4">
              <p className="font-mono text-2xs tracking-wider text-muted uppercase">
                {t(lang, "ghFiles")} · {scan.owner}/{scan.repo}
              </p>
              {scan.files.length === 0 ? (
                <p className="mt-2 text-sm text-faint">{t(lang, "ghEmpty")}</p>
              ) : (
                <ul className="mt-2 max-h-48 overflow-y-auto divide-y divide-rule">
                  {scan.files.map((f) => (
                    <li key={f.path}>
                      <button
                        type="button"
                        onClick={() => void loadRemote(scan.owner, scan.repo, f.path)}
                        className={
                          "flex min-h-11 w-full items-center justify-between gap-2 px-1 text-left text-sm " +
                          (activePath === f.path ? "text-ink" : "text-muted hover:text-ink")
                        }
                      >
                        <span className="truncate font-mono text-2xs">{f.name}</span>
                        <span className="shrink-0 font-mono text-2xs tabular-nums text-faint">
                          {grades[f.path] ?? (activePath === f.path ? (et ? "avatud" : "open") : "")}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
        </div>

        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">
              {et ? "Töövoo YAML" : "Workflow YAML"}
            </p>
            <h2 className="mt-1 text-2xl">{et ? "Kleebi, siis attest" : "Paste, then attest"}</h2>
          </div>
          <Button type="button" onClick={run} size="sm">
            <Play className="size-3.5" strokeWidth={2} />
            {et ? "Auditeeri" : "Run audit"}
          </Button>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          {SAMPLE_WORKFLOWS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActivePath(null);
                loadSample(s.id);
              }}
              className={
                "shrink-0 rounded-[var(--radius-md)] border px-3 py-2 text-left transition-colors duration-[var(--motion-quick)] " +
                (sampleId === s.id && !activePath
                  ? "border-ink bg-ink text-paper"
                  : "border-rule bg-transparent text-ink hover:bg-ink/[0.04]")
              }
            >
              <span className="block text-sm font-medium">{s.title}</span>
              <span className={"mt-0.5 block max-w-52 text-2xs leading-snug " + (sampleId === s.id && !activePath ? "text-paper/70" : "text-muted")}>
                {s.blurb}
              </span>
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor="workflow-yaml">
          GitHub Actions workflow YAML
        </label>
        <textarea
          id="workflow-yaml"
          value={yaml}
          onChange={(e) => {
            setActivePath(null);
            setYaml(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              run();
            }
          }}
          spellCheck={false}
          className="min-h-72 w-full resize-y rounded-[var(--radius-md)] border border-rule bg-raised p-4 font-mono text-[0.8rem] leading-relaxed text-ink"
        />
        <p className="mt-2 text-xs text-muted">
          {et ? "Ctrl/⌘ + Enter käivitab. YAML ei lahku sellest brauserist — GitHubi skann loeb ainult avalikke faile." : "Ctrl/⌘ + Enter runs the audit. Pasted YAML stays here. GitHub scan reads public files only."}
        </p>
      </section>

      <section className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-6">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">Verdict</p>
            <h2 className="mt-1 text-2xl sm:text-3xl">{report.name}</h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{report.summary}</p>
            <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-2xs tracking-wide text-faint uppercase">
              <div>
                <dt className="inline">Jobs </dt>
                <dd className="inline text-ink tabular-nums">{report.stats.jobs}</dd>
              </div>
              <div>
                <dt className="inline">Steps </dt>
                <dd className="inline text-ink tabular-nums">{report.stats.steps}</dd>
              </div>
              <div>
                <dt className="inline">On </dt>
                <dd className="inline text-ink">{report.stats.triggers.join(", ")}</dd>
              </div>
            </dl>
          </div>
          <ScoreMark grade={report.grade} score={report.score} />
        </div>
        <div className="mt-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">
              {report.findings.length} findings · export
            </p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => void saveReport()}>
                {t(lang, "saveRow")}
              </Button>
              <ExportMenu report={report} />
            </div>
          </div>
          <FindingsPanel findings={report.findings} />
        </div>
      </section>
    </div>
  );
}
