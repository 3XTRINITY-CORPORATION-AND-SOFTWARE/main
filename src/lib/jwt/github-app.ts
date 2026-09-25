import { SignJWT, importPKCS8, generateKeyPair, exportPKCS8 } from "jose";

export const JWT_CLAIMS = [
  {
    claim: "iat",
    name: { et: "Väljastatud", en: "Issued at" },
    detail: {
      et: "Unix-aeg, millal JWT loodi. GitHub soovitab 60 sekundit minevikku kella triivi jaoks. Hoia host NTP-ga sünkroonis.",
      en: "Unix time the JWT was created. GitHub recommends 60 seconds in the past to absorb clock drift. Keep the host NTP-synced.",
    },
  },
  {
    claim: "exp",
    name: { et: "Aegub", en: "Expires" },
    detail: {
      et: "Unix-aeg, pärast mida JWT ei saa installation-tokenit. Kuni 10 minutit pärast iat.",
      en: "Unix time after which the JWT cannot mint an installation token. Must be no more than 10 minutes after iat.",
    },
  },
  {
    claim: "iss",
    name: { et: "Väljastaja", en: "Issuer" },
    detail: {
      et: "GitHub App client ID (eelistatud) või numbriline app ID. Selle järgi valitakse allkirja kontrolliv avalik võti.",
      en: "The GitHub App client ID (preferred) or numeric app ID. Used to pick the public key that verifies the signature.",
    },
  },
  {
    claim: "alg",
    name: { et: "Algoritm", en: "Algorithm" },
    detail: {
      et: "Peab olema RS256. HMAC algoritmid lükatakse tagasi.",
      en: "Must be RS256. HMAC algorithms are rejected.",
    },
  },
] as const;

export const SNIPPETS = {
  ruby: `require "openssl"
require "jwt"

private_pem = File.read("YOUR_PATH_TO_PEM")
private_key = OpenSSL::PKey::RSA.new(private_pem)

payload = {
  iat: Time.now.to_i - 60,
  exp: Time.now.to_i + (10 * 60),
  iss: "YOUR_CLIENT_ID"
}

jwt = JWT.encode(payload, private_key, "RS256")
puts jwt`,
  python: `#!/usr/bin/env python3
import sys, time, jwt

pem = sys.argv[1]
client_id = sys.argv[2]
signing_key = open(pem, "rb").read()

payload = {
    "iat": int(time.time()) - 60,
    "exp": int(time.time()) + 600,
    "iss": client_id,
}
print("JWT:", jwt.encode(payload, signing_key, algorithm="RS256"))`,
  bash: `#!/usr/bin/env bash
client_id=$1
pem=$(cat "$2")
now=$(date +%s)
iat=$((now - 60))
exp=$((now + 600))
b64enc() { openssl base64 | tr -d '=' | tr '/+' '_-' | tr -d '\\n'; }
header=$(printf '%s' '{"typ":"JWT","alg":"RS256"}' | b64enc)
payload=$(printf '%s' "{\\"iat\\":$iat,\\"exp\\":$exp,\\"iss\\":\\"$client_id\\"}" | b64enc)
header_payload="$header.$payload"
signature=$(openssl dgst -sha256 -sign <(printf '%s' "$pem") <(printf '%s' "$header_payload") | b64enc)
printf 'JWT: %s\\n' "$header_payload.$signature"`,
  powershell: `$client_id = "YOUR_CLIENT_ID"
$private_key_path = "YOUR_PATH_TO_PEM"
$header = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((ConvertTo-Json @{alg="RS256";typ="JWT"}))).TrimEnd("=").Replace("+","-").Replace("/","_")
$payload = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((ConvertTo-Json @{
  iat = [DateTimeOffset]::UtcNow.AddSeconds(-60).ToUnixTimeSeconds()
  exp = [DateTimeOffset]::UtcNow.AddMinutes(10).ToUnixTimeSeconds()
  iss = $client_id
}))).TrimEnd("=").Replace("+","-").Replace("/","_")
$rsa = [Security.Cryptography.RSA]::Create()
$rsa.ImportFromPem((Get-Content $private_key_path -Raw))
$signature = [Convert]::ToBase64String($rsa.SignData([Text.Encoding]::UTF8.GetBytes("$header.$payload"), "SHA256", [Security.Cryptography.RSASignaturePadding]::Pkcs1)).TrimEnd("=").Replace("+","-").Replace("/","_")
Write-Host "$header.$payload.$signature"`,
  curl: `curl --request GET \\
  --url "https://api.github.com/app" \\
  --header "Accept: application/vnd.github+json" \\
  --header "Authorization: Bearer YOUR_JWT" \\
  --header "X-GitHub-Api-Version: 2026-03-10"`,
  action: ` - name: Generate a token
  id: generate-token
  uses: actions/create-github-app-token@v3
  with:
    client-id: \${{ vars.APP_CLIENT_ID }}
    private-key: \${{ secrets.APP_PRIVATE_KEY }}

- name: Use the token
  env:
    GH_TOKEN: \${{ steps.generate-token.outputs.token }}
  run: gh api octocat`,
};

export async function mintDemoKey(): Promise<string> {
  const { privateKey } = await generateKeyPair("RS256", {
    modulusLength: 2048,
    extractable: true,
  });
  return exportPKCS8(privateKey);
}

export async function mintGithubAppJwt(opts: {
  clientId: string;
  pkcs8: string;
}): Promise<{ jwt: string; iat: number; exp: number }> {
  const key = await importPKCS8(opts.pkcs8, "RS256");
  const now = Math.floor(Date.now() / 1000);
  const iat = now - 60;
  const exp = now + 600;
  const jwt = await new SignJWT({})
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setIssuer(opts.clientId)
    .sign(key);
  return { jwt, iat, exp };
}

export function splitJwt(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const decode = (part: string) => {
    const padded = part.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((part.length + 3) % 4);
    try {
      return JSON.parse(atob(padded)) as unknown;
    } catch {
      return part;
    }
  };
  return { header: decode(parts[0]), payload: decode(parts[1]), signature: parts[2] };
}
