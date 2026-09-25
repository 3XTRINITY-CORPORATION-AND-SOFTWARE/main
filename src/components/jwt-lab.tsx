import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { JWT_CLAIMS, SNIPPETS, mintDemoKey, mintGithubAppJwt, splitJwt } from "@/lib/jwt/github-app";
import { useSteel } from "@/lib/steel/store";

export function JwtLab() {
  const uiLang = useSteel((s) => s.lang);
  const [clientId, setClientId] = useState("Iv1.attest-demo");
  const [pem, setPem] = useState("");
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [snip, setSnip] = useState<keyof typeof SNIPPETS>("python");
  const decoded = token ? splitJwt(token) : null;

  async function generateKey() {
    setBusy(true);
    try {
      const next = await mintDemoKey();
      setPem(next);
      toast.success(t(uiLang, "jwtMinted"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t(uiLang, "jwtKeyFail"));
    } finally {
      setBusy(false);
    }
  }

  async function sign() {
    if (!pem.trim()) {
      toast.error(t(uiLang, "jwtNeedKey"));
      return;
    }
    setBusy(true);
    try {
      const out = await mintGithubAppJwt({ clientId: clientId.trim() || "Iv1.attest-demo", pkcs8: pem });
      setToken(out.jwt);
      toast.success(t(uiLang, "jwtSigned"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t(uiLang, "jwtSignFail"));
    } finally {
      setBusy(false);
    }
  }

  async function copyToken() {
    if (!token) return;
    await navigator.clipboard.writeText(token);
    toast.success(t(uiLang, "jwtCopied"));
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="min-w-0">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">{t(uiLang, "jwtKicker")}</p>
        <h2 className="mt-1 text-2xl sm:text-3xl">{t(uiLang, "jwtTitle")}</h2>
        <p className="mt-3 max-w-prose text-muted">{t(uiLang, "jwtLead")}</p>
        <dl className="mt-6 divide-y divide-rule border-y border-rule">
          {JWT_CLAIMS.map((row) => (
            <div key={row.claim} className="grid grid-cols-[4.5rem_1fr] gap-4 py-3 sm:grid-cols-[6rem_1fr]">
              <dt className="font-mono text-sm text-stamp">{row.claim}</dt>
              <dd>
                <p className="font-medium">{row.name[uiLang === "ru" ? "en" : uiLang]}</p>
                <p className="mt-1 text-sm text-muted">{row.detail[uiLang === "ru" ? "en" : uiLang]}</p>
              </dd>
            </div>
          ))}
        </dl>
        <div className="nav-scroll mt-6 flex flex-nowrap gap-2 overflow-x-auto">
          {(Object.keys(SNIPPETS) as Array<keyof typeof SNIPPETS>).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSnip(key)}
              className={
                "min-h-11 shrink-0 rounded-[var(--radius-sm)] border px-3 py-1.5 font-mono text-2xs uppercase tracking-wide " +
                (snip === key ? "border-ink bg-ink text-paper" : "border-rule text-muted hover:text-ink")
              }
            >
              {key}
            </button>
          ))}
        </div>
        <pre className="mt-3 overflow-x-auto rounded-[var(--radius-lg)] border border-rule bg-raised/70 p-4 font-mono text-xs leading-relaxed">
          {SNIPPETS[snip]}
        </pre>
      </section>
      <section className="min-w-0">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">{t(uiLang, "jwtSignIn")}</p>
        <label className="mt-4 block">
          <span className="font-mono text-2xs tracking-wider text-muted uppercase">{t(uiLang, "jwtIss")}</span>
          <input
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="mt-1 h-11 w-full rounded-[var(--radius-md)] border border-rule bg-paper px-3 font-mono text-sm outline-none focus:border-ink/40 focus:ring-2 focus:ring-ink/15"
          />
        </label>
        <label className="mt-3 block">
          <span className="font-mono text-2xs tracking-wider text-muted uppercase">{t(uiLang, "jwtPem")}</span>
          <textarea
            value={pem}
            onChange={(e) => setPem(e.target.value)}
            spellCheck={false}
            placeholder="-----BEGIN PRIVATE KEY-----"
            className="mt-1 h-36 w-full resize-y rounded-[var(--radius-md)] border border-rule bg-raised/60 p-3 font-mono text-2xs outline-none focus:border-ink/40 focus:ring-2 focus:ring-ink/15"
          />
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" disabled={busy} onClick={() => void generateKey()}>
            {t(uiLang, "jwtMint")}
          </Button>
          <Button type="button" disabled={busy} onClick={() => void sign()}>
            {t(uiLang, "jwtSign")}
          </Button>
          <Button type="button" variant="ghost" disabled={!token} onClick={() => void copyToken()}>
            {t(uiLang, "jwtCopy")}
          </Button>
        </div>
        {token ? (
          <div className="mt-5">
            <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(uiLang, "jwtCompact")}</p>
            <p className="mt-2 break-all font-mono text-2xs leading-relaxed text-ink">{token}</p>
            {decoded ? (
              <pre className="mt-4 overflow-x-auto rounded-[var(--radius-md)] border border-rule bg-paper p-3 font-mono text-2xs">
                {JSON.stringify({ header: decoded.header, payload: decoded.payload }, null, 2)}
              </pre>
            ) : null}
            <p className="mt-3 text-sm text-muted">{t(uiLang, "jwtBearerNote")}</p>
          </div>
        ) : (
          <p className="mt-5 text-sm text-muted">{t(uiLang, "jwtDemoNote")}</p>
        )}
      </section>
    </div>
  );
}
