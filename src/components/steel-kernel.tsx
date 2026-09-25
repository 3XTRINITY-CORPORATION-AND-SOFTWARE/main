import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SteelAtlas } from "@/components/steel-atlas";
import { Button } from "@/components/ui/button";
import { ASIO4ALL_VERSION } from "@/lib/steel/asio";
import { useSteel } from "@/lib/steel/store";
import type { KernelManifest } from "@/lib/steel/types";
import { applyKernel, checkChannel, versionGte } from "@/lib/steel/updates";
import { ATLAS_COUNT } from "@/lib/studio/atlas";
import { EXPANSIONS, PLACES } from "@/lib/studio/places";
import { useRack } from "@/lib/studio/store";
import { t } from "@/lib/i18n";

export function SteelKernel() {
  const kernel = useSteel((s) => s.kernel);
  const latest = useSteel((s) => s.latest);
  const updating = useSteel((s) => s.updating);
  const addons = useSteel((s) => s.addons);
  const armed = useSteel((s) => s.armed);
  const lang = useSteel((s) => s.lang);
  const pins = useRack((s) => s.pins);
  const [man, setMan] = useState<KernelManifest | null>(null);

  useEffect(() => {
    void checkChannel()
      .then(setMan)
      .catch((err: unknown) => toast.error(err instanceof Error ? err.message : "Channel down"));
  }, []);

  const behind = latest != null && !versionGte(kernel, latest);
  const pinned = pins.os.length + pins.web.length + pins.host.length;

  async function apply() {
    if (!latest) return;
    await applyKernel(latest);
    toast.success(`Kernel ${latest} on this host`);
    const next = await checkChannel();
    setMan(next);
  }

  return (
    <div className="grid min-w-0 gap-10 lg:grid-cols-2">
      <section className="min-w-0">
        <p className="font-mono text-2xs tracking-[0.2em] text-steel uppercase">{t(lang, "osKicker")}</p>
        <h2 className="mt-2 text-3xl">Kernel {kernel}</h2>
        <p className="mt-3 text-sm text-muted">{t(lang, "studioNote")}</p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {PLACES.map((p) => (
            <div key={p.id} className="min-w-0 rounded-[var(--radius-md)] border border-rule px-3 py-3">
              <p className="font-mono text-2xs tracking-wider text-muted uppercase">{p.id}</p>
              <p className="mt-1 text-sm">{lang === "et" ? p.et : lang === "ru" ? p.ru : p.en}</p>
              <p className="mt-2 font-display text-xl tabular-nums leading-none">
                {pins[p.id].length}
                <span className="font-mono text-2xs text-faint"> / {ATLAS_COUNT}</span>
              </p>
            </div>
          ))}
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-[var(--radius-md)] border border-rule px-3 py-3">
            <dt className="font-mono text-2xs tracking-wider text-muted uppercase">{armed ? "Armed" : "Idle"}</dt>
            <dd className="mt-1 font-display text-2xl">{kernel}</dd>
          </div>
          <div className="rounded-[var(--radius-md)] border border-rule px-3 py-3">
            <dt className="font-mono text-2xs tracking-wider text-muted uppercase">250 × 3</dt>
            <dd className="mt-1 font-display text-2xl">{pinned}</dd>
          </div>
        </dl>
        {man?.hosts ? (
          <p className="mt-4 font-mono text-2xs text-muted">
            FL {man.hosts.fl} · Live {man.hosts.ableton} · Win {man.hosts.windows} · Linux {man.hosts.linux}
          </p>
        ) : null}
        <p className="mt-2 font-mono text-2xs text-faint">ASIO4ALL {man?.asio4all ?? ASIO4ALL_VERSION}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={() => void checkChannel().then(setMan)}>
            Check channel
          </Button>
          <Button type="button" variant="live" disabled={!behind || updating} onClick={() => void apply()}>
            {updating ? "Reforming…" : behind ? `Apply ${latest}` : "Up to date"}
          </Button>
        </div>
        {man ? <p className="mt-4 text-sm text-muted">{man.notes}</p> : null}

        <p className="mt-8 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "expandTitle")}</p>
        <p className="mt-2 max-w-prose text-sm text-muted">{t(lang, "expandLead")}</p>
        <ul className="mt-3 divide-y divide-rule border-y border-rule">
          {EXPANSIONS.map((e) => (
            <li key={e.extra} className="grid min-w-0 grid-cols-[6.5rem_minmax(0,1fr)] gap-2 py-2 font-mono text-2xs">
              <span className="truncate uppercase">{e.extra}</span>
              <span className="min-w-0 truncate text-faint">
                OS {e.os} · WEB {e.web} · HOST {e.host}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "addonTitle")}</p>
        <ul className="mt-3 divide-y divide-rule border-y border-rule">
          {(man?.addons ?? []).map((addon) => {
            const allowed = versionGte(kernel, addon.minKernel);
            const on = Boolean(addons[addon.id]);
            return (
              <li key={addon.id} className="flex items-baseline justify-between gap-3 py-3">
                <div>
                  <p className="font-medium">{addon.name}</p>
                  <p className="font-mono text-2xs text-muted">
                    {addon.version} · min kernel {addon.minKernel}
                  </p>
                </div>
                <p className="font-mono text-2xs tracking-wider uppercase text-muted">
                  {!allowed ? "locked" : on ? "live" : "off"}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="min-w-0">
        <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "atlasTitle")}</p>
        <p className="mt-2 max-w-prose text-sm text-muted">{t(lang, "atlasLead")}</p>
        <div className="mt-5">
          <SteelAtlas />
        </div>
      </section>
    </div>
  );
}
