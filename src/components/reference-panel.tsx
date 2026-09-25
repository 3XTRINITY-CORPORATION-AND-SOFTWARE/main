const TOKEN_KINDS = [
  {
    name: "GITHUB_TOKEN",
    life: "Job duration",
    how: "Automatic. ${{ github.token }} or secrets.GITHUB_TOKEN.",
    scope: "The workflow and job permissions: map. Defaults follow the repo setting if you omit the map.",
    use: "Issues, checks, checkout, comments — anything the job itself should do.",
  },
  {
    name: "GitHub App JWT",
    life: "≤ 10 minutes",
    how: "RS256-signed JWT, iss = client ID. Authorization: Bearer only.",
    scope: "Authenticates as the App, not as a repo. Used to mint installation tokens.",
    use: "When GITHUB_TOKEN cannot reach another repo, org APIs, or checks across repositories.",
  },
  {
    name: "Installation token",
    life: "1 hour",
    how: "POST /app/installations/{id}/access_tokens with the JWT, or actions/create-github-app-token.",
    scope: "The App's installation permissions — not the YAML permissions: map.",
    use: "Cross-repo automation, bots, and anything the automatic token is forbidden to touch.",
  },
  {
    name: "PAT",
    life: "Until you revoke it",
    how: "Stored as a repo/org secret.",
    scope: "Whatever the user granted. Survives the job. Often over-privileged.",
    use: "Last resort. Prefer GITHUB_TOKEN, then an App.",
  },
];

const RULES = [
  {
    title: "Declare permissions, always",
    body: "A missing permissions key is not least privilege — it is an invisible default. Write the map even when it is contents: read.",
  },
  {
    title: "Never interpolate untrusted context into run:",
    body: "PR titles, branch names, issue bodies, and review comments are attacker-controlled. Pass them through env: and quote the shell variable.",
  },
  {
    title: "pull_request_target is a write token in the base repo",
    body: "Do not check out the PR head in that job. Do not run npm test on fork code with that token.",
  },
  {
    title: "Pin Actions to a SHA",
    body: "Tags move. A compromised publisher can change what your workflow executes. Leave the version in a comment.",
  },
  {
    title: "JWTs are Bearer, installation tokens are not GH_TOKEN until exchanged",
    body: "iat 60 seconds in the past, exp ≤ 10 minutes, alg RS256, iss = client ID. Keep APP_PRIVATE_KEY in Actions secrets.",
  },
];

export function ReferencePanel() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <section>
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">Token kinds</p>
        <h2 className="mt-1 text-2xl sm:text-3xl">Pick the weakest credential that works</h2>
        <div className="mt-6 divide-y divide-rule border-y border-rule">
          {TOKEN_KINDS.map((row) => (
            <article key={row.name} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <h3 className="text-lg">{row.name}</h3>
              <dl className="grid gap-2 text-sm">
                <div>
                  <dt className="font-mono text-2xs tracking-wider text-muted uppercase">Lifetime</dt>
                  <dd>{row.life}</dd>
                </div>
                <div>
                  <dt className="font-mono text-2xs tracking-wider text-muted uppercase">How</dt>
                  <dd>{row.how}</dd>
                </div>
                <div>
                  <dt className="font-mono text-2xs tracking-wider text-muted uppercase">Scope</dt>
                  <dd>{row.scope}</dd>
                </div>
                <div>
                  <dt className="font-mono text-2xs tracking-wider text-muted uppercase">Use when</dt>
                  <dd>{row.use}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
      <section>
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">Standing rules</p>
        <h2 className="mt-1 text-2xl">What Attest looks for</h2>
        <ol className="mt-6 space-y-5">
          {RULES.map((rule, i) => (
            <li key={rule.title} className="border-t border-rule pt-4">
              <p className="font-mono text-2xs text-stamp">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-xl">{rule.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{rule.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted">
          Static analysis, not a substitute for GitHub's own code scanning. Re-run whenever the workflow or
          the App's installation permissions change.
        </p>
      </section>
    </div>
  );
}
