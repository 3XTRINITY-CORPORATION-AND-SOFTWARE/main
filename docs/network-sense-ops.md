# ༨ཻག3XTRNTYམСORPORATIONཤུར་

## Official security software engineering services©

Product codename: `VPN⁸-SS.Х7™`

This document is the reviewed integration contract for the read-only network-sense layer.
It is not executable code, does not grant permissions, and does not claim that a connector
or native adapter is already implemented.

## Verified branch targets

| System | Repository / project | Branch |
|---|---|---|
| GitHub | [antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-](https://github.com/antonioportfelli-boop/STEEL-3XTRINITY-CORPORATION-OFFICIAL-APP-) | `feat/network-sense-android10-win8` |
| GitLab | [goliath-os1/steel-3xtrinity-corporation-official-music-software](https://gitlab.com/goliath-os1/steel-3xtrinity-corporation-official-music-software) | `feat/network-sense-android10-win8` |

The branch exists in both repositories. Native implementation, CI results, and production
service bridges remain pending until they are committed and verified.

## Safety boundary

The network-sense layer is defensive and read-only:

- observe local connectivity and interface state;
- return a typed local snapshot;
- never capture raw packets;
- never scan remote hosts or nearby networks;
- never change Wi-Fi, routes, DNS, firewall, or VPN state;
- never execute a received command remotely;
- never collect credentials, message content, contact data, or precise location;
- bind any companion bridge to an explicitly authorized local interface only;
- stop and report on permission, authentication, build, or integrity failures.

A browser/PWA cannot directly call Android or Windows hardware APIs. The intended shape is
a separately reviewed native companion/helper that exposes only the typed snapshot to the
local STEEL surface.

## Platform adapter contract

### Android 10 and newer

Target Android API 29 or newer for the requested “2020-era” baseline. Device manufacture
year is not a reliable capability test.

The adapter may use:

- `ConnectivityManager.registerDefaultNetworkCallback`;
- `NetworkCapabilities` for transport and validation state;
- `LinkProperties` for local link information;
- optional Wi-Fi scan results only when the user grants the required permissions and the
  device policy allows it.

The adapter must handle callback registration, capability changes, link-property changes,
network loss, permission denial, and scan throttling. Location-sensitive identifiers must
be redacted by default.

References:

- https://developer.android.com/reference/android/net/ConnectivityManager.NetworkCallback
- https://developer.android.com/develop/connectivity/wifi/wifi-scan

### Windows 8 and newer

The helper may use:

- WLAN API: `WlanOpenHandle` and `WlanEnumInterfaces`;
- IP Helper API: `GetAdaptersAddresses`;
- Network List Manager: `INetworkListManager`.

The helper must report only local interface/connectivity state and must close all native
handles. It must not configure adapters or initiate discovery.

References:

- https://learn.microsoft.com/en-us/windows/win32/api/wlanapi/nf-wlanapi-wlanenuminterfaces
- https://learn.microsoft.com/en-us/windows/win32/api/iphlpapi/nf-iphlpapi-getadaptersaddresses
- https://learn.microsoft.com/en-us/windows/win32/api/netlistmgr/nn-netlistmgr-inetworklistmanager

## Typed snapshot

The public boundary is `steel.network-sense/v1`:

```json
{
  "schema": "steel.network-sense/v1",
  "captured_at": "RFC3339 timestamp",
  "platform": "android|windows",
  "online": true,
  "interfaces": [
    {
      "id": "stable-local-id",
      "kind": "wifi|ethernet|cellular|vpn|other",
      "state": "up|down|unknown",
      "validated": true,
      "addresses": ["redacted-local-address"]
    }
  ],
  "permissions": {
    "network_state": "granted|denied|unknown",
    "location_sensitive_scan": "not-requested|granted|denied|unavailable"
  },
  "redactions": ["ssid", "bssid", "precise_location"]
}
```

The schema is a contract only until adapter code, tests, and a reviewable local bridge are
present in the branch.

## @ routing contract

These are routing labels for cooperating agents, not proof of a live integration:

| Label | Allowed responsibility |
|---|---|
| `@GitHub` | inspect branch, commit diff, PR checks |
| `@GitLab (Beta)` | inspect branch, commit diff, MR/CI checks |
| `@OpenAI Platform` | review contract and tool-boundary assumptions |
| `@Visualize` | render the adapter/bridge topology |
| `@Sites` | update the product surface only after explicit approval |
| `@Presentations` | prepare a review deck from verified evidence |
| `@Template Creator` | turn an approved review format into a reusable template |
| `@PDF` | export a verified report |
| `@Documents` | maintain the source-of-truth document |
| `@Google Drive` | archive approved evidence |
| `@Slack` | send a reviewed progress report to an explicitly selected channel |
| `@Linear` | track implementation and blockers |
| `@Trello` | **BLOCKED: connector returned USER_NOT_LOGGED_IN** |
| `app_block` | **UNAVAILABLE in the current tool session; do not simulate it** |

The parser must preserve unknown `@` labels as inert metadata. It must not treat a label as
an authorization token, a secret, a shell command, or a request to bypass review.

Initial semantic slots:

- `@Phone` => `android.network_state`
- `@Device Assistance` => `windows.network_state`

Other labels, including Google Calendar, Gmail, Messages, Verify AI, and Google Tasks,
remain unbound until a real adapter and permission model are reviewed.

## Proposed local command surface

These commands are design references until implemented and tested:

```text
steel agent status
steel agent inspect --repo github --branch feat/network-sense-android10-win8
steel agent inspect --repo gitlab --branch feat/network-sense-android10-win8
steel network-sense capabilities
steel network-sense snapshot --redact
steel verify --offline
steel report --evidence-only
steel pause
```

A command runner must reject unknown write-capable or remote-execution flags by default.
Every report must include the repository, branch, commit SHA, file paths, test result, and
timestamp that produced it.

## 24/7 operating rule

“24/7” means an hourly evidence watch at most, not an unattended code-writing daemon.
The watch may report new commits, PR/MR changes, CI results, and blockers. It must remain
paused when a connector is disconnected, a build fails, a permission boundary changes, or
the evidence is insufficient. It must never auto-merge, auto-push, request secrets, or
mark a feature complete without verified files and tests.

## Acceptance criteria for the next implementation patch

1. Android adapter targets API 29+ and has permission-denial and callback lifecycle tests.
2. Windows helper targets Windows 8+ and has adapter enumeration and cleanup tests.
3. Both adapters emit the same `steel.network-sense/v1` shape.
4. The browser surface receives only local typed snapshots.
5. No raw packet capture, remote scan, remote execution, or credential storage exists.
6. GitHub and GitLab branches contain the same contract and reviewable implementation diff.
7. Build, typecheck, lint, and security checks pass, with their exact output recorded.
8. A draft review/merge request is opened only after the preceding evidence exists.
