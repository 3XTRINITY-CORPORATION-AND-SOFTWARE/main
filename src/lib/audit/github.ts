import { createServerFn } from "@tanstack/react-start";

export type GithubWorkflowFile = {
  name: string;
  path: string;
  htmlUrl: string;
};

export type GithubScan = {
  owner: string;
  repo: string;
  htmlUrl: string;
  files: GithubWorkflowFile[];
};

const NAME = /^[A-Za-z0-9_.-]+$/;

export function parseRepoSpec(raw: string): { owner: string; repo: string } | null {
  const trimmed = raw.trim().replace(/^https?:\/\/(www\.)?github\.com\//i, "").replace(/\.git$/i, "");
  const parts = trimmed.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  const owner = parts[0];
  const repo = parts[1];
  if (!NAME.test(owner) || !NAME.test(repo)) return null;
  return { owner, repo };
}

function isWorkflowPath(path: string) {
  return /^\.github\/workflows\/[A-Za-z0-9_.-]+\.(ya?ml)$/.test(path);
}

async function gh(url: string): Promise<Response> {
  return fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "STEEL-Attest",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export const scanGithubRepo = createServerFn({ method: "POST" })
  .validator((input: { spec: string }) => {
    const parsed = parseRepoSpec(String(input?.spec ?? ""));
    if (!parsed) throw new Error("repo");
    return parsed;
  })
  .handler(async ({ data }): Promise<GithubScan> => {
    const res = await gh(
      `https://api.github.com/repos/${data.owner}/${data.repo}/contents/.github/workflows`,
    );
    if (res.status === 404) throw new Error("not-found");
    if (res.status === 403) throw new Error("rate");
    if (!res.ok) throw new Error("github");
    const json = (await res.json()) as Array<{
      name?: string;
      path?: string;
      type?: string;
      html_url?: string;
    }>;
    if (!Array.isArray(json)) throw new Error("not-found");
    const files = json
      .filter((f) => f.type === "file" && typeof f.path === "string" && isWorkflowPath(f.path))
      .map(
        (f): GithubWorkflowFile => ({
          name: String(f.name ?? f.path),
          path: String(f.path),
          htmlUrl: String(f.html_url ?? ""),
        }),
      )
      .slice(0, 40);
    return {
      owner: data.owner,
      repo: data.repo,
      htmlUrl: `https://github.com/${data.owner}/${data.repo}`,
      files,
    };
  });

export const fetchGithubWorkflow = createServerFn({ method: "POST" })
  .validator((input: { owner: string; repo: string; path: string }) => {
    const owner = String(input?.owner ?? "");
    const repo = String(input?.repo ?? "");
    const path = String(input?.path ?? "");
    if (!NAME.test(owner) || !NAME.test(repo) || !isWorkflowPath(path)) throw new Error("path");
    return { owner, repo, path };
  })
  .handler(async ({ data }) => {
    const res = await gh(
      `https://api.github.com/repos/${data.owner}/${data.repo}/contents/${data.path}`,
    );
    if (res.status === 404) throw new Error("not-found");
    if (res.status === 403) throw new Error("rate");
    if (!res.ok) throw new Error("github");
    const json = (await res.json()) as { content?: string; encoding?: string; html_url?: string; name?: string };
    const b64 = String(json.content ?? "").replace(/\n/g, "");
    if (!b64) throw new Error("empty");
    const yaml = Buffer.from(b64, "base64").toString("utf8").slice(0, 80_000);
    return {
      name: String(json.name ?? data.path),
      path: data.path,
      htmlUrl: String(json.html_url ?? ""),
      yaml,
    };
  });
