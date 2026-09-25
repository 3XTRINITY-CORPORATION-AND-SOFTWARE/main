---
name: fix
description: "Use when debugging a bug, fixing a regression, addressing failing tests, tracing the root cause of a runtime or build issue, or stabilizing code after an issue report. Covers investigation, minimal patching, test-first validation, and verification before completion."
user-invocable: false
---

# Fix workflow

Use this skill to turn a symptom into a verified, minimal fix.

## When to use

- A bug, crash, or failing test needs diagnosis
- A regression or bad behavior needs root-cause analysis
- An issue report or error needs a targeted fix
- Code needs a minimal, validated correction before finishing

## Core workflow

### 1. Define the symptom precisely

- State the observed failure in one sentence.
- Capture the exact trigger: input, route, command, environment, or reproduction steps.
- Identify whether the issue is runtime, build-time, type-checking, browser UI, or logic-level.
- If the bug cannot be reproduced, ask for the smallest failing example before patching.

### 2. Reproduce and localize

- Run the smallest relevant command or test that demonstrates the problem.
- Prefer the narrowest failing scope over broad suites.
- Trace the data flow to the actual fault site instead of guessing.
- Check recent changes, assumptions, and environment differences that could explain the behavior.

### 3. Determine the root cause

- Explain the actual cause in plain language, not just the symptom.
- Confirm the logical mismatch: wrong branch, stale state, bad assumption, missing guard, incorrect API contract, or broken dependency.
- If there are multiple plausible causes, test one hypothesis at a time.

### 4. Write a failing check first

- Add or adjust a test that captures the bug and fails before the fix.
- Prefer a real behavior test over a mocked-only assertion.
- Keep the test specific to the bug and avoid broad rewrites.
- If no automated test is practical, create the smallest reproducible script or scenario that proves the issue.

### 5. Implement the smallest valid fix

- Change only the code necessary to address the root cause.
- Avoid unrelated cleanups or speculative refactors in the same patch.
- Keep the fix consistent with the existing design and error-handling patterns.
- Do not add test-only methods or production-only hooks solely for validation.

### 6. Verify before claiming completion

- Re-run the targeted failing test or reproduction to confirm the fix.
- Run the smallest relevant validation set that checks the change area.
- Check for regressions in related behavior and confirm the result matches the real requirement.
- If verification fails, do not claim success; continue with the root cause and adjust the fix.

### 7. Summarize the outcome

- Report the root cause and fix in a concise, factual way.
- Mention which checks passed and whether any follow-up risk remains.
- Include the exact evidence used for validation when relevant.

## Decision points

- If the issue is not reproducible: ask for exact reproduction details or a failing example.
- If the cause is external or environmental: document the evidence, add the correct handling, and avoid pretending the app is fixed.
- If there are multiple bugs: fix one root cause at a time and verify each before moving on.
- If the user wants a quick patch but the cause is unclear: investigate before making a speculative change.

## Quality bar

A fix is complete only when all of the following are true:

- The symptom is reproduced or clearly isolated.
- The root cause is identified and explained.
- A failing check exists before the fix.
- The patch is minimal and directly tied to the root cause.
- The relevant verification passes with fresh evidence.
- No unrelated issues are introduced.

## Example prompts

- "Fix the checkout crash after submitting a coupon."
- "Debug why the build fails only in CI."
- "Find the root cause of the login regression and patch it."
- "Investigate the failing unit test and make the smallest valid fix."
- "Trace this runtime bug to the underlying state issue and verify the result."
