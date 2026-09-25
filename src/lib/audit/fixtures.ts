import type { AuditReport } from "./types";

/** Fixture audit for export smoke (export-draft, aligned to zip AuditReport). */
export const FIXTURE_REPORT: AuditReport = {
  name: "ci.yml",
  grade: "C",
  score: 62,
  auditedAt: "2026-09-17T00:00:00.000Z",
  summary: "Fixture audit for export smoke.",
  yaml: "name: ci\non: [push]\njobs: {}\n",
  stats: {
    jobs: 2,
    steps: 8,
    triggers: ["push", "pull_request"],
    hasPermissions: true,
    usesGithubToken: true,
    usesAppToken: false,
  },
  findings: [
    {
      id: "f1",
      title: "Overly broad permissions",
      severity: "high",
      location: "jobs.build.permissions",
      rule: "permissions-least-privilege",
      detail: "workflow uses permissions: write-all",
      remediation: "Scope to contents: read",
    },
    {
      id: "f2",
      title: "Pinned action OK",
      severity: "pass",
      rule: "actions-pin",
      detail: "actions/checkout pinned by SHA",
      remediation: "Keep pin on upgrade",
    },
  ],
};
