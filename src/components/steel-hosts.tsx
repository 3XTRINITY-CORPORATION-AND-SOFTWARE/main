import { t } from "@/lib/i18n";
import { OS_MATRIX } from "@/lib/steel/asio";
import { HOSTS } from "@/lib/steel/hosts";
import { useSteel } from "@/lib/steel/store";
import { cn } from "@/lib/utils";

export function SteelHosts() {
  const host = useSteel((s) => s.host);
  const os = useSteel((s) => s.os);
  const lang = useSteel((s) => s.lang);
  const patch = useSteel((s) => s.patch);
  const profile = HOSTS.find((h) => h.id === host) ?? HOSTS[0];
  const osRow = OS_MATRIX.find((o) => o.id === os) ?? OS_MATRIX[1];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="min-w-0">
        <p className="font-mono text-2xs tracking-[0.2em] text-steel uppercase">{t(lang, "placeHost")}</p>
        <h2 className="mt-2 text-3xl">{t(lang, "hostTitle")}</h2>
        <p className="mt-3 max-w-prose text-sm text-muted">{t(lang, "hostMirror")}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {HOSTS.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => patch({ host: h.id })}
              className={cn(
                "min-h-11 rounded-[var(--radius-sm)] border px-3 py-2 text-sm",
                host === h.id ? "border-ink bg-ink text-paper" : "border-rule text-muted hover:text-ink",
              )}
            >
              {h.name}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">{profile.since}</p>
        <p className="mt-1 text-sm text-muted">{profile.clock}</p>
        <ol className="mt-6 space-y-3">
          {profile.steps.map((step, i) => (
            <li key={step} className="border-t border-rule pt-3">
              <p className="font-mono text-2xs text-steel">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 text-sm">{step}</p>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <p className="font-mono text-2xs tracking-[0.2em] text-muted uppercase">Operating system</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {OS_MATRIX.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => patch({ os: row.id })}
              className={cn(
                "min-h-11 rounded-[var(--radius-sm)] border px-3 py-2 text-sm",
                os === row.id ? "border-ink bg-ink text-paper" : "border-rule text-muted hover:text-ink",
              )}
            >
              {row.label}
            </button>
          ))}
        </div>
        <div className="mt-5 rounded-[var(--radius-md)] border border-rule bg-raised/50 p-4">
          <p className="font-mono text-2xs tracking-wider text-live uppercase">{osRow.driver}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{osRow.note}</p>
        </div>
        <p className="mt-6 font-mono text-2xs tracking-wider text-muted uppercase">CC map</p>
        <table className="mt-2 w-full text-sm">
          <tbody>
            {profile.map.map((row) => (
              <tr key={row.cc} className="border-b border-rule/80">
                <td className="py-2 font-mono text-steel">CC {row.cc}</td>
                <td className="py-2 text-muted">{row.dest}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="mt-6 space-y-2 text-sm text-muted">
          {profile.midi.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
