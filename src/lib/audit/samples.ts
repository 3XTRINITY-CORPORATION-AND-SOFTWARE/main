export interface SampleWorkflow {
  id: string;
  title: string;
  blurb: string;
  yaml: string;
}

export const SAMPLE_WORKFLOWS: SampleWorkflow[] = [
  {
    id: "open-issue",
    title: "Open issue (workflow_dispatch)",
    blurb: "GitHub CLI + GITHUB_TOKEN. Least privilege is close — pin it.",
    yaml: `name: Open new issue
on: workflow_dispatch

jobs:
  open-issue:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: write
    steps:
      - run: |
          gh issue --repo \${{ github.repository }} \\
            create --title "Issue title" --body "Issue body"
        env:
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`,
  },
  {
    id: "issue-on-push",
    title: "Create issue on every push",
    blurb: "REST call with Bearer token. Noisy trigger, unpinned defaults.",
    yaml: `name: Create issue on commit

on: [ push ]

jobs:
  create_issue:
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - name: Create issue using REST API
        run: |
          curl --request POST \\
          --url https://api.github.com/repos/\${{ github.repository }}/issues \\
          --header 'authorization: Bearer \${{ secrets.GITHUB_TOKEN }}' \\
          --header 'content-type: application/json' \\
          --data '{
            "title": "Automated issue for commit: \${{ github.sha }}",
            "body": "This issue was automatically created by the GitHub Action workflow **\${{ github.workflow }}**. \\n\\n The commit hash was: _\${{ github.sha }}_."
            }' \\
          --fail
`,
  },
  {
    id: "app-token",
    title: "GitHub App installation token",
    blurb: "create-github-app-token. Prefer SHA pins and short-lived JWTs.",
    yaml: `on:
  workflow_dispatch:
jobs:
  demo_app_authentication:
    runs-on: ubuntu-latest
    steps:
      - name: Generate a token
        id: generate-token
        uses: actions/create-github-app-token@v3
        with:
          client-id: \${{ vars.APP_CLIENT_ID }}
          private-key: \${{ secrets.APP_PRIVATE_KEY }}

      - name: Use the token
        env:
          GH_TOKEN: \${{ steps.generate-token.outputs.token }}
        run: |
          gh api octocat
`,
  },
  {
    id: "pr-target",
    title: "Dangerous pull_request_target",
    blurb: "Untrusted checkout + script injection. Expect a failing grade.",
    yaml: `name: PR comments
on: pull_request_target

jobs:
  greet:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: \${{ github.event.pull_request.head.sha }}
      - name: Comment
        run: |
          echo "Title: \${{ github.event.pull_request.title }}"
          npm test
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`,
  },
  {
    id: "hardened",
    title: "Hardened least privilege",
    blurb: "Pinned action, explicit read-only token, no interpolation in run.",
    yaml: `name: Lint
on:
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  lint:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
      - uses: actions/setup-node@39370e3970a6d050c480ffad4ff0ed4d3fdee5af # v4.1.0
        with:
          node-version: "22"
          cache: npm
      - name: Install and lint
        run: |
          npm ci
          npm run lint
`,
  },
];
