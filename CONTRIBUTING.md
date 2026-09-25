# Contributing to STEEL

Thanks for helping improve **STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-**.
This guide covers how to propose changes, open issues, and get reviews.

By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

* Report bugs and regressions
* Suggest features or UX improvements
* Improve docs, templates, and community health files
* Submit pull requests for fixes and small, reviewable features
* Help triage issues with clear reproduction notes
* Hardening work on STEEL Attest (audit UI, jwt-lab, permissions, GitHub scan)
  following the defensive checklists in `docs/hardening/` when present

## Before you start

1. Search [existing issues](https://github.com/antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-/issues) and pull requests to avoid duplicates.
2. For security vulnerabilities, **do not** open a public issue. Follow [SECURITY.md](SECURITY.md) (private advisory; defensive reproduction notes only).
3. Prefer small, focused changes over large catch-all PRs.

## Development setup

Exact local setup depends on the part of STEEL you are touching (Desk, Studio,
Hosts, Audit / Attest, etc.). As a baseline:

1. Fork the repository and clone your fork.
2. Use a current LTS Node.js toolchain matching the project’s documented engines when present.
3. Install dependencies with the package manager already used in the repo (prefer the lockfile that already exists).
4. Run the project’s existing test / lint / typecheck scripts before opening a PR.

If a README or `AGENTS.md` section documents a surface-specific workflow, follow that for the area you are changing.

## Branch and commit practice

* Create a branch from `main` with a short, descriptive name (for example `fix/desk-clip-meter` or `docs/community-health`).
* Keep commits focused; prefer clear messages that explain **why**.
* Do not commit secrets, `.env` files, credentials, PEMs, or private keys.
* Never paste production App private keys into jwt-lab demos or screenshots.

## Pull requests

1. Open a PR against `main` using the [pull request template](.github/pull_request_template.md).
2. Fill in summary, test plan, and risk notes.
3. Link related issues with `Fixes #123` or `Refs #123` when applicable.
4. Ensure CI checks that you can run locally are green, or note what you could not run and why.
5. Keep the diff reviewable. Large refactors should be split or clearly justified.

Maintainers may request changes, ask for tests, or close stale PRs that cannot be completed.

## Issue reports

Use the issue templates under `.github/ISSUE_TEMPLATE/`:

* **Bug report** — for broken behavior with reproduction steps
* **Feature request** — for product or DX proposals

Include environment details (OS, browser or runtime, STEEL surface) and the smallest steps that reproduce the problem.

## Code review expectations

* Be respectful and specific; cite files and behavior, not people.
* Prefer actionable feedback (“this path skips auth when X”) over vague disapproval.
* Authors should respond to review comments or explain why a suggestion does not apply.

## License

Contributions are accepted under the repository’s [MIT License](LICENSE).
