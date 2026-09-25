import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/github-CYYRysDN.js
var NAME = /^[A-Za-z0-9_.-]+$/;
function parseRepoSpec(raw) {
	const parts = raw.trim().replace(/^https?:\/\/(www\.)?github\.com\//i, "").replace(/\.git$/i, "").split("/").filter(Boolean);
	if (parts.length < 2) return null;
	const owner = parts[0];
	const repo = parts[1];
	if (!NAME.test(owner) || !NAME.test(repo)) return null;
	return {
		owner,
		repo
	};
}
function isWorkflowPath(path) {
	return /^\.github\/workflows\/[A-Za-z0-9_.-]+\.(ya?ml)$/.test(path);
}
async function gh(url) {
	return fetch(url, { headers: {
		Accept: "application/vnd.github+json",
		"User-Agent": "STEEL-Attest",
		"X-GitHub-Api-Version": "2022-11-28"
	} });
}
var scanGithubRepo_createServerFn_handler = createServerRpc({
	id: "082801aca6fbe6a118b65506c472e207df501c662e24e54ff63623116b01efed",
	name: "scanGithubRepo",
	filename: "src/lib/audit/github.ts"
}, (opts) => scanGithubRepo.__executeServer(opts));
var scanGithubRepo = createServerFn({ method: "POST" }).validator((input) => {
	const parsed = parseRepoSpec(String(input?.spec ?? ""));
	if (!parsed) throw new Error("repo");
	return parsed;
}).handler(scanGithubRepo_createServerFn_handler, async ({ data }) => {
	const res = await gh(`https://api.github.com/repos/${data.owner}/${data.repo}/contents/.github/workflows`);
	if (res.status === 404) throw new Error("not-found");
	if (res.status === 403) throw new Error("rate");
	if (!res.ok) throw new Error("github");
	const json = await res.json();
	if (!Array.isArray(json)) throw new Error("not-found");
	const files = json.filter((f) => f.type === "file" && typeof f.path === "string" && isWorkflowPath(f.path)).map((f) => ({
		name: String(f.name ?? f.path),
		path: String(f.path),
		htmlUrl: String(f.html_url ?? "")
	})).slice(0, 40);
	return {
		owner: data.owner,
		repo: data.repo,
		htmlUrl: `https://github.com/${data.owner}/${data.repo}`,
		files
	};
});
var fetchGithubWorkflow_createServerFn_handler = createServerRpc({
	id: "1a2e004726a3f77617da1daeefc2d368bd47a30778785a09346320bfb9d51f4e",
	name: "fetchGithubWorkflow",
	filename: "src/lib/audit/github.ts"
}, (opts) => fetchGithubWorkflow.__executeServer(opts));
var fetchGithubWorkflow = createServerFn({ method: "POST" }).validator((input) => {
	const owner = String(input?.owner ?? "");
	const repo = String(input?.repo ?? "");
	const path = String(input?.path ?? "");
	if (!NAME.test(owner) || !NAME.test(repo) || !isWorkflowPath(path)) throw new Error("path");
	return {
		owner,
		repo,
		path
	};
}).handler(fetchGithubWorkflow_createServerFn_handler, async ({ data }) => {
	const res = await gh(`https://api.github.com/repos/${data.owner}/${data.repo}/contents/${data.path}`);
	if (res.status === 404) throw new Error("not-found");
	if (res.status === 403) throw new Error("rate");
	if (!res.ok) throw new Error("github");
	const json = await res.json();
	const b64 = String(json.content ?? "").replace(/\n/g, "");
	if (!b64) throw new Error("empty");
	const yaml = Buffer.from(b64, "base64").toString("utf8").slice(0, 8e4);
	return {
		name: String(json.name ?? data.path),
		path: data.path,
		htmlUrl: String(json.html_url ?? ""),
		yaml
	};
});
//#endregion
export { fetchGithubWorkflow_createServerFn_handler, scanGithubRepo_createServerFn_handler };
