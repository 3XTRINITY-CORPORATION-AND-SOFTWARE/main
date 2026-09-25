import type { AccessLevel, PermissionScope } from "./types";
import { PERMISSION_SCOPES } from "./types";

export interface ScopeInfo {
  id: PermissionScope;
  label: string;
  read: string;
  write: string;
}

export const SCOPE_CATALOG: ScopeInfo[] = [
  {
    id: "actions",
    label: "actions",
    read: "List and download workflow artifacts and logs.",
    write: "Cancel workflows, delete artifacts.",
  },
  {
    id: "attestations",
    label: "attestations",
    read: "Read artifact attestations.",
    write: "Create artifact attestations.",
  },
  {
    id: "checks",
    label: "checks",
    read: "Read check runs and suites.",
    write: "Create or update checks.",
  },
  {
    id: "contents",
    label: "contents",
    read: "Checkout the repo, read blobs and commits.",
    write: "Push commits, create tags and releases.",
  },
  {
    id: "deployments",
    label: "deployments",
    read: "Read deployment statuses.",
    write: "Create deployments.",
  },
  {
    id: "discussions",
    label: "discussions",
    read: "Read discussions.",
    write: "Create or edit discussions.",
  },
  {
    id: "id-token",
    label: "id-token",
    read: "Not used — id-token is write-only.",
    write: "Mint an OIDC token for cloud federated login.",
  },
  {
    id: "issues",
    label: "issues",
    read: "Read issues and comments.",
    write: "Open, close, and comment on issues.",
  },
  {
    id: "models",
    label: "models",
    read: "Call GitHub Models.",
    write: "Not applicable.",
  },
  {
    id: "packages",
    label: "packages",
    read: "Download packages.",
    write: "Publish packages.",
  },
  {
    id: "pages",
    label: "pages",
    read: "Read Pages status.",
    write: "Request a Pages build.",
  },
  {
    id: "pull-requests",
    label: "pull-requests",
    read: "Read PRs and reviews.",
    write: "Comment, review, merge, request reviewers.",
  },
  {
    id: "repository-projects",
    label: "repository-projects",
    read: "Read classic projects.",
    write: "Create and edit classic projects.",
  },
  {
    id: "security-events",
    label: "security-events",
    read: "Read code scanning and Dependabot alerts.",
    write: "Upload SARIF, dismiss alerts.",
  },
  {
    id: "statuses",
    label: "statuses",
    read: "Read commit statuses.",
    write: "Set commit statuses.",
  },
];

export type PermissionMap = Partial<Record<PermissionScope, AccessLevel>>;

export function permissionsToYaml(
  name: string,
  trigger: string,
  jobId: string,
  map: PermissionMap,
): string {
  const entries = Object.entries(map).filter(([, level]) => level && level !== "none");
  const workflowLines =
    entries.map(([scope, level]) => `  ${scope}: ${level}`).join("\n") || "  contents: read";
  const jobLines =
    entries.map(([scope, level]) => `      ${scope}: ${level}`).join("\n") ||
    "      contents: read";
  return `name: ${name}
on: ${trigger}

permissions:
${workflowLines}

jobs:
  ${jobId}:
    runs-on: ubuntu-latest
    permissions:
${jobLines}
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
`;
}

export { PERMISSION_SCOPES };
