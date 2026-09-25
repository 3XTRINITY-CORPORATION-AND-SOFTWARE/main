import { t } from "@/lib/studio/copy";
import { pushAll } from "@/lib/studio/engine";
import { formatVelocity, karestik } from "@/lib/studio/karestik";
import { pathBiasFrom, signedKarestik } from "@/lib/studio/pyramid";
import { useStudio } from "@/lib/studio/store";
import type { Translate } from "@/lib/studio/types";
import { cn } from "@/lib/utils";
import { DualMeter } from "./meter";
import { Fader } from "./fader";

const TRANSLATES: Translate[] = ["phone", "jbl", "festival"];

export function StudioMatrix() {
  const lang = useStudio((s) => s.lang);
  const sampleRate = useStudio((s) => s.sampleRate);
  const bufferSize = useStudio((s) => s.bufferSize);
  const voices = useStudio((s) => s.voices);
  const velocity = useStudio((s) => s.velocity);
  const signal = useStudio((s) => s.signal);
  const need = useStudio((s) => s.need);
  const latency = useStudio((s) => s.latency);
  const peak = useStudio((s) => s.peak);
  const mid = useStudio((s) => s.mid);
  const side = useStudio((s) => s.side);
  const width = useStudio((s) => s.width);
  const ceiling = useStudio((s) => s.ceiling);
  const translate = useStudio((s) => s.translate);
  const playing = useStudio((s) => s.playing);
  const patch = useStudio((s) => s.patch);
  const path = useStudio((s) => s.path);
  const local = karestik(sampleRate, bufferSize, Math.max(1, voices));
  const v = velocity || local.velocity;
  const py = signedKarestik(sampleRate, bufferSize, Math.max(1, voices), pathBiasFrom(path));

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">STEEL · {t(lang, "karestik")}</p>
        <h1 className="font-display text-3xl text-ink">V = S / T</h1>
        <p className="font-mono text-2xs tracking-wider text-steel uppercase">
          {path === "kernel" ? t(lang, "pathKernel") : path === "web" ? t(lang, "pathWeb") : t(lang, "pathHybrid")}
          {" · "}
          {bufferSize}
        </p>
        <p className="max-w-2xl text-pretty text-muted">
          {lang === "et"
            ? "Töötluskiirus on signaal jagatud ajaga. Peegeldus hoiab kahte puhvrit. Gravitatsiooni pole: kui V+ ja V− tühistuvad, võrrand kehtib, ta lihtsalt ei osuta."
            : "Processing velocity is signal over time. Mirror holds two buffers. No gravity: when V+ and V− cancel, the equation still holds — it just stops pointing."}
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label={t(lang, "velocity")} value={formatVelocity(v)} />
        <Stat label={t(lang, "signal")} value={formatVelocity(signal || local.signal)} />
        <Stat label={t(lang, "need")} value={`${((need || local.need) * 1000).toFixed(2)} ms`} />
        <Stat label={t(lang, "latency")} value={`${latency.toFixed(2)} ms`} />
      </div>

      <section className="rounded-[var(--radius-lg)] bg-raised p-4 ring-1 ring-rule">
        <p className="mb-3 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "pyramid")}</p>
        <div className="mb-2 flex justify-between font-mono text-2xs tracking-wider text-muted uppercase">
          <span>{t(lang, "minusV")}</span>
          <span>{t(lang, "nullTier")}</span>
          <span>{t(lang, "plusV")}</span>
        </div>
        <ul className="flex flex-col gap-2">
          {py.steps.map((step, i) => {
            const mag = Math.max(1, Math.abs(py.V));
            return (
              <li
                key={i}
                className={cn(
                  "flex min-h-8 items-center gap-2 rounded-[var(--radius-sm)] px-1",
                  i === py.nullAt ? "ring-1 ring-live" : "",
                )}
              >
                <div className="flex h-2 min-w-0 flex-1 justify-end overflow-hidden rounded-[var(--radius-xs)] bg-paper">
                  <span
                    className="block h-full bg-steel"
                    style={{ width: `${Math.min(100, (Math.abs(step.minus) / mag) * 100)}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-center font-mono text-2xs tabular-nums text-muted">
                  {i + 1}
                </span>
                <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-[var(--radius-xs)] bg-paper">
                  <span
                    className="block h-full bg-live"
                    style={{ width: `${Math.min(100, (step.plus / mag) * 100)}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 font-mono text-2xs tabular-nums text-muted">
          {t(lang, "plusV")} {formatVelocity(py.steps[0]?.plus ?? 0)} · {t(lang, "minusV")}{" "}
          {formatVelocity(py.steps[0]?.minus ?? 0)} · {t(lang, "nullTier")} {py.nullAt + 1}
        </p>
        <p className="mt-2 grid grid-cols-3 gap-2 font-mono text-2xs tracking-wider text-muted uppercase">
          <span>{t(lang, "pyramid")}</span>
          <span className="text-center">{t(lang, "banks")}</span>
          <span className="text-right">{t(lang, "film")}</span>
        </p>
      </section>

      <div className="rounded-[var(--radius-lg)] bg-raised p-4 ring-1 ring-rule">
        <p className="mb-3 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "mirror")}</p>
        <div className="grid grid-cols-2 gap-3">
          <BufferFace label="A" active={playing} peak={peak} />
          <BufferFace label="B" active={!playing} peak={mid} />
        </div>
        <p className="mt-3 text-sm text-muted">
          {lang === "et"
            ? "Nest / peegeldus: AI ja mõõdikud loevad peegelpuhvrit, kernel kirjutab teise. CPU ei oota joonistust."
            : "Nest / mirror: meters read the reflected buffer while the kernel writes the other. Draw never blocks the quantum."}
        </p>
      </div>

      <DualMeter peak={peak} mid={mid} side={side} />

      <div>
        <p className="mb-2 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "translate")}</p>
        <div className="flex flex-wrap gap-2">
          {TRANSLATES.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                patch({ translate: id });
                pushAll();
              }}
              className={cn(
                "min-h-11 rounded-[var(--radius-sm)] px-3 text-sm ring-1 ring-rule",
                translate === id ? "bg-ink text-paper" : "text-muted",
              )}
            >
              {t(lang, id)}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">
          {lang === "et"
            ? "Telefon = mono ja kitsas riba. JBL = veidi bassi. Festival = täisriba, kick keskel."
            : "Phone = mono, narrow band. JBL = slight bass. Festival = full band, kick centered."}
        </p>
      </div>

      <Fader
        label={t(lang, "width")}
        value={width}
        onChange={(v) => {
          patch({ width: v });
          pushAll();
        }}
      />
      <Fader
        label={t(lang, "ceiling")}
        value={ceiling}
        min={0.4}
        max={1}
        onChange={(v) => {
          patch({ ceiling: v });
          pushAll();
        }}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] bg-raised p-3 ring-1 ring-rule">
      <p className="font-mono text-2xs tracking-wider text-muted uppercase">{label}</p>
      <p className="mt-1 font-mono text-lg tabular-nums text-ink">{value}</p>
    </div>
  );
}

function BufferFace({ label, active, peak }: { label: string; active: boolean; peak: number }) {
  return (
    <div className={cn("rounded-[var(--radius-md)] p-3 ring-1 ring-rule", active ? "bg-paper" : "bg-raised")}>
      <p className="font-mono text-2xs tracking-wider text-muted uppercase">
        Buffer {label}
        {active ? " · write" : " · read"}
      </p>
      <div className="mt-2 h-16 overflow-hidden rounded-[var(--radius-xs)] bg-paper">
        <div className="h-full bg-steel/40" style={{ width: `${Math.min(100, peak * 140)}%` }} />
      </div>
    </div>
  );
}
