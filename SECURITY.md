# Security Policy

Thank you for helping keep **STEEL / STEEL Attest** and related App Builder
workspaces safe. This document describes how to report vulnerabilities
privately, what is in scope, and what to expect from maintainers.

## Supported versions

| Version / channel | Supported |
| --- | --- |
| Latest `main` (production deploy) | Yes |
| Tagged releases (once published) | Yes (N-1 minor while supported) |
| Preview / sandbox builds | Best-effort; reports still welcome |
| Forks / unmodified third-party copies | Report to the fork owner |

Maintainers will fill exact version tags when the first release ships.

## Reporting a vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Prefer **GitHub Private Vulnerability Reporting** (Security advisory) on this
repository:

[Report a vulnerability](https://github.com/antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-/security/advisories/new)

If advisories are unavailable, contact the repository Owners / STEEL team
through a private channel they designate and reference this policy.

### What to include

* Affected component (steel-audit UI, jwt-lab, permissions builder, GitHub scan
  server functions, auth/session, export, Desk, Studio, Hosts, CI, other)
* Description of the impact (for example unauthorized data access, privilege
  escalation within the app, secret exposure in client bundles)
* Affected commit SHA or deploy URL if known
* Minimal **defensive** reproduction notes (high-level steps a maintainer can
  follow to confirm). Do **not** include weaponized payloads or instructions
  intended for abuse.
* Whether you plan to disclose publicly and any preferred timeline

### What not to send

* Production private keys, session cookies, or live customer data. Use redacted
  examples only.
* Reports that only describe theoretical issues with no realistic impact on
  this project.

## Response SLAs (targets)

| Stage | Target |
| --- | --- |
| Acknowledge receipt | Within **3 business days** |
| Initial triage / severity | Within **7 business days** |
| Fix or mitigation plan for Critical/High | Within **30 days** of confirmation (best effort) |
| Public advisory / credit | Coordinated with reporter after fix or mitigation |

These are goals, not contractual guarantees. Complex issues (supply chain,
upstream Better Auth / GitHub) may take longer; we will communicate status.

## Scope

**In scope (examples):**

* Authentication / session handling (`better-auth`, gate identity, bearer
  preview path)
* Authorization gaps on server functions (for example missing session checks on
  data or GitHub proxy endpoints)
* Exposure of secrets in client bundles, screenshots shipped in-repo, or export
  artifacts
* Cross-tenant / sibling-site request issues against documented isolation
  controls
* XSS / HTML injection in findings, YAML display, or export that can run in a
  victim’s browser session for this app
* SSRF or open-proxy behavior beyond the intentionally allowlisted public
  GitHub API paths used by GitHub scan
* Privilege escalation across STEEL surfaces (Desk, Studio, Hosts, Audit, auth)

**Out of scope (examples):**

* Social engineering of maintainers or users
* Denial of service against GitHub.com or third-party rate limits without an
  app-side amplification bug
* Vulnerabilities in upstream dependencies with no practical exploit path in
  our usage (please link the upstream advisory; we will track upgrades)
* Issues that require physical access, compromised developer workstations, or
  already-stolen production PEMs
* Feature requests without a security impact
* Attack techniques against **customers’** GitHub Actions workflows discovered
  via Attest findings — those belong in the customer’s own disclosure process;
  Attest teaching least privilege is expected

## Safe harbor

We consider security research conducted in good faith under this policy to be
authorized. We will not pursue legal action against researchers who:

* Make a good-faith effort to avoid privacy violations, destruction of data,
  and interruption of service
* Do not exploit a vulnerability beyond what is necessary to demonstrate impact
* Report findings privately through the channels above before public disclosure
* Do not access data that is not theirs, or promptly report accidental access
  and delete copies

If you are unsure whether research is authorized, open a private advisory (or
contact maintainers privately) first.

## Security features of this project (informational)

STEEL Attest helps teams review GitHub Actions least privilege (explicit
`permissions`, pin actions to SHAs, avoid unsafe `pull_request_target`
patterns, prefer short-lived GitHub App JWTs signed with **RS256**). The JWT
lab and permission builder are **educational**; never paste production App
private keys into a browser lab. GitHub scan is designed for **public**
workflow files only unless a future authenticated mode is documented.

## Preferential disclosure credit

With your permission, we will credit reporters in the advisory. Anonymous
reports are accepted.

## Prefer hardening PRs

Non-sensitive hardening (dependency bumps, clearer auth checks, docs, CI
least-privilege) can go through normal pull requests. When in doubt, report
privately first. Maintainers track Attest-related hardening in
`docs/hardening/` when that tree is present in the working pack.

## Contact

* Security: GitHub Private Vulnerability Reporting (link above)
* Maintainers: repository Owners / STEEL team
