export type Severity = "critical" | "high" | "medium" | "low" | "info" | "pass";

export type Grade = "A" | "B" | "C" | "D" | "F";

export interface Finding {
  id: string;
  severity: Severity;
  title: string;
  detail: string;
  remediation: string;
  location?: string;
  rule: string;
}

export interface AuditReport {
  name: string;
  score: number;
  grade: Grade;
  summary: string;
  findings: Finding[];
  stats: {
    jobs: number;
    steps: number;
    triggers: string[];
    hasPermissions: boolean;
    usesGithubToken: boolean;
    usesAppToken: boolean;
  };
  yaml: string;
  auditedAt: string;
}

export interface ParsedStep {
  name?: string;
  uses?: string;
  run?: string;
  with?: Record<string, unknown>;
  env?: Record<string, unknown>;
  id?: string;
}

export interface ParsedJob {
  id: string;
  name?: string;
  runsOn?: string;
  permissions?: unknown;
  steps: ParsedStep[];
  if?: string;
}

export interface ParsedWorkflow {
  name?: string;
  on: unknown;
  permissions?: unknown;
  jobs: ParsedJob[];
  parseError?: string;
}

export const SEVERITY_WEIGHT: Record<Severity, number> = {
  critical: 28,
  high: 16,
  medium: 8,
  low: 3,
  info: 0,
  pass: 0,
};

export const PERMISSION_SCOPES = [
  "actions",
  "attestations",
  "checks",
  "contents",
  "deployments",
  "discussions",
  "id-token",
  "issues",
  "models",
  "packages",
  "pages",
  "pull-requests",
  "repository-projects",
  "security-events",
  "statuses",
] as const;

export type PermissionScope = (typeof PERMISSION_SCOPES)[number];

export type AccessLevel = "none" | "read" | "write";
