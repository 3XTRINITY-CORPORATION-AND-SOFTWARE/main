# Codebase audit: proposed maintenance tasks

The repository currently contains a flattened copy of an App Builder workspace:
application, script, server, and test files are stored at the repository root,
while several imports and npm commands still address the original nested
directories. The tasks below are intentionally small enough to land and verify
independently.

## 1. Typo: normalize the project name

**Problem:** The README heading and repository name end in an extra hyphen
(`STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-`). This reads like a typographical
artifact and makes copied project names inconsistent with the product name
shown by the application (`STEEL`).

**Proposed task:** Change the README heading to
`STEEL 3XTRINITY Corporation — Official App`, and add a one-paragraph product
description beneath it. Keep the repository slug unchanged unless redirects
for the old slug are available.

**Acceptance criteria:**

- The README has a human-readable title without the trailing hyphen.
- The first paragraph identifies the app and its purpose.
- Any badges or links added later use the canonical repository slug.

## 2. Code bug: restore the expected workspace directory layout

**Problem:** Runtime configuration imports `./scripts/*.mjs`, route modules
import from `@/components` and `@/lib`, and npm scripts execute files below
`scripts/` and `src/`. Those directories do not exist in the checked-out tree;
their files are at the repository root instead. As a result, the test command
reports that it cannot find its TypeScript test paths, and Vite cannot resolve
its configuration imports.

**Proposed task:** Move the flattened files back to the paths implied by their
imports and configuration (`src/components`, `src/lib`, `src/routes`,
`scripts`, `server`, `public`, and `migrations`) without changing generated or
vendored file contents. Regenerate the route tree after the move and remove
obsolete root-level build artifacts.

**Acceptance criteria:**

- `npm run typecheck`, `npm test`, and `npm run build` all complete
  successfully from a clean checkout.
- Vite resolves both `scripts/grok-pwa-plugin.mjs` and
  `scripts/app-env-plugin.mjs` without aliases or root-level duplicate files.
- The application source has one canonical copy; generated build output is not
  treated as source.

## 3. Comment/documentation mismatch: document the real repository layout

**Problem:** The README contains only a title, while source comments and
`AGENTS.md` describe a conventional nested workspace. A new contributor cannot
tell whether the flattened layout is intentional, which files are generated,
or which commands are expected to work.

**Proposed task:** After restoring the layout, expand the README with
prerequisites, setup, development, test, type-check, and build instructions.
Add a short directory map and explicitly mark generated files such as the
TanStack route tree. Update the Vite migration comment so it names the actual
`migrations/` directory scanned by the bootstrap check rather than referring to
an implementation detail in another module.

**Acceptance criteria:**

- Every documented command exists in `package.json` and succeeds on a clean
  checkout.
- The directory map matches the committed tree.
- Generated files and the supported editing workflow are clearly identified.

## 4. Test improvement: make the test command fail when no tests are discovered

**Problem:** The first test stage uses the quoted glob
`'scripts/**/*.test.mjs'`. In the current flattened tree Node discovers zero
tests but exits successfully, so an entire missing test suite can look green;
the command fails only later when explicit TypeScript paths are absent.

**Proposed task:** Replace the fragile glob with an explicit test manifest (or
a small discovery script) that verifies every expected test file exists before
invoking `node --test`. Add a regression test for the discovery helper that
covers both a complete suite and a missing test directory.

**Acceptance criteria:**

- The test command runs all committed `*.test.mjs` and supported TypeScript
  test files.
- It exits non-zero with a clear diagnostic when the expected test directory
  is missing or discovery returns zero files.
- CI reports the discovered test-file count, making accidental suite loss
  visible in logs.

