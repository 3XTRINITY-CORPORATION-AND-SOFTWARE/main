import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SteelAtlas } from "@/components/steel-atlas";
import { Button } from "@/components/ui/button";
import { EQ_HZ, labelHz } from "@/lib/desk/eq";
import { setEqGains } from "@/lib/desk/engine";
import { useDesk } from "@/lib/desk/store";
import { t } from "@/lib/i18n";
import { enableMidi, selectMidiIn } from "@/lib/steel/midi";
import { useSteel } from "@/lib/steel/store";
import { cn } from "@/lib/utils";
import { BUS_OBJECTS, busGazette } from "@/lib/studio/bus";
import { lookupHost } from "@/lib/studio/geo";
import { EXPANSIONS } from "@/lib/studio/places";
import { fireNightPacket } from "@/lib/studio/rack";
import { lockRhyme } from "@/lib/studio/rhyme";
import { useRack } from "@/lib/studio/store";
import { exportBankBook } from "@/lib/studio/xlsx-banks";

const SKILLS = [
  { id: "theory-mirror", door: "10 extras · no 11th" },
  { id: "rhyme-lock", door: "seed verbatim" },
  { id: "equalizer", door: "10-band · keep rate" },
  { id: "ip-api-lookup", door: "geoBusy only" },
  { id: "command-block", door: "impulse → chain → motor" },
  { id: "addable-bus", door: "wave 27 objects" },
  { id: "xlsx", door: "banks + places book" },
  { id: "skill-creator", door: "this rack" },
];

export function SteelStudio() {
  const lang = useSteel((s) => s.lang);
  const midiIn = useSteel((s) => s.midiIn);
  const midiPorts = useSteel((s) => s.midiPorts);
  const rack = useRack();
  const desk = useDesk();
  const [eqOpen, setEqOpen] = useState(true);
  const gazette = useMemo(() => busGazette(), []);

  async function onImpulse() {
    rack.set({ busy: true, note: null });
    try {
      const log = await fireNightPacket();
      const motor = log.find((s) => s.op === "MOTOR");
      toast.success(motor?.note ?? t(lang, "chainFire"));
    } catch {
      toast.error(t(lang, "needSlots"));
      rack.set({ busy: false });
    }
  }

  async function onRhyme() {
    const seed = (rack.seed || desk.lyrics || desk.palve).trim();
    if (!seed) {
      toast.error(t(lang, "rhymeEmpty"));
      return;
    }
    rack.set({ busy: true });
    const res = await lockRhyme({
      data: { seed, bpm: desk.bpm, lang: lang === "ru" ? "ru" : lang === "et" ? "et" : "en", want: "fix" },
    });
    rack.set({ busy: false, seed, rhymeOut: res.ok ? res.text : seed });
    if (res.ok) desk.set({ lyrics: res.text.slice(0, 2000) });
    toast.success(res.ok ? t(lang, "rhymeOk") : t(lang, "rhymeVerbatim"));
  }

  async function onGeo() {
    rack.set({ geoBusy: true });
    const res = await lookupHost({ data: { query: rack.geoQuery || undefined } });
    rack.set({
      geoBusy: false,
      geoLine: res.ok ? `${res.line} · ${res.isp}` : res.error,
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <section className="min-w-0">
        <p className="font-mono text-2xs tracking-[0.2em] text-steel uppercase">{t(lang, "studioKicker")}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl">{t(lang, "studioTitle")}</h1>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{t(lang, "studioLead")}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="live"
            data-qa="impulse"
            aria-label="Impulse"
            onClick={() => void onImpulse()}
            disabled={rack.busy}
          >
            {rack.busy ? t(lang, "aiBusy") : t(lang, "impulse")}
          </Button>
          <Button type="button" variant="secondary" onClick={() => void exportBankBook()}>
            {t(lang, "xlsxGo")}
          </Button>
        </div>
        <p className="mt-2 font-mono text-2xs text-faint">{t(lang, "chainHint")}</p>

        <div className="mt-4 max-w-md">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">MIDI in</p>
          <select
            className="mt-1 h-11 w-full rounded-[var(--radius-md)] border border-rule bg-paper px-3 text-sm"
            value={midiIn ?? ""}
            onChange={(e) => selectMidiIn(e.target.value || null)}
            data-qa="studio-midi-in"
          >
            <option value="">Computer keyboard (A–K)</option>
            {midiPorts
              .filter((p) => p.type === "in")
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2"
            data-qa="studio-midi-scan"
            onClick={() => void enableMidi()}
          >
            Scan MIDI
          </Button>
        </div>

        <div className="mt-6">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "rhymeTitle")}</p>
          <textarea
            value={rack.seed}
            onChange={(e) => rack.set({ seed: e.target.value })}
            placeholder={t(lang, "rhymePh")}
            rows={4}
            className="mt-2 w-full rounded-[var(--radius-md)] border border-rule bg-raised p-3 text-sm"
          />
          <div className="mt-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => void onRhyme()} disabled={rack.busy}>
              {t(lang, "rhymeGo")}
            </Button>
          </div>
          {rack.rhymeOut ? (
            <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap rounded-[var(--radius-md)] border border-rule bg-paper p-3 font-mono text-2xs leading-relaxed text-muted">
              {rack.rhymeOut}
            </pre>
          ) : null}
        </div>

        <div className="mt-6">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "eqTitle")}</p>
          <button type="button" className="mt-1 font-mono text-2xs text-faint" onClick={() => setEqOpen((v) => !v)}>
            {eqOpen ? t(lang, "less") : t(lang, "more")}
          </button>
          {eqOpen ? (
            <div className="nav-scroll mt-3 flex gap-2 overflow-x-auto pb-2">
              {EQ_HZ.map((hz, i) => (
                <label key={hz} className="flex w-11 shrink-0 flex-col items-center gap-2">
                  <span className="font-mono text-2xs tabular-nums text-muted">{(desk.eq[i] ?? 0).toFixed(0)}</span>
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    step={0.5}
                    value={desk.eq[i] ?? 0}
                    onChange={(e) => {
                      const next = desk.eq.slice();
                      next[i] = Number(e.target.value);
                      desk.set({ eq: next });
                      setEqGains(next);
                    }}
                    className="h-28 w-11 cursor-pointer appearance-none bg-transparent"
                    style={{ writingMode: "vertical-lr", direction: "rtl" }}
                    aria-label={`${labelHz(hz)} Hz`}
                  />
                  <span className="font-mono text-2xs text-faint">{labelHz(hz)}</span>
                </label>
              ))}
            </div>
          ) : null}
          <p className="mt-2 font-mono text-2xs text-faint">{t(lang, "eqNote")}</p>
        </div>

        <div className="mt-6">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "geoTitle")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <input
              value={rack.geoQuery}
              onChange={(e) => rack.set({ geoQuery: e.target.value })}
              placeholder="ipv4 / domain"
              className="min-h-11 min-w-0 flex-1 rounded-[var(--radius-md)] border border-rule bg-raised px-3 text-sm"
            />
            <Button type="button" variant="secondary" onClick={() => void onGeo()} disabled={rack.geoBusy}>
              {rack.geoBusy ? t(lang, "aiBusy") : t(lang, "geoGo")}
            </Button>
          </div>
          {rack.geoLine ? <p className="mt-2 font-mono text-2xs text-muted">{rack.geoLine}</p> : null}
          <p className="mt-1 font-mono text-2xs text-faint">{t(lang, "geoNote")}</p>
        </div>
      </section>

      <aside className="min-w-0 rounded-[var(--radius-lg)] border border-rule bg-raised/60 p-5">
        <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "skillRack")}</p>
        <ul className="mt-3 divide-y divide-rule">
          {SKILLS.map((s) => (
            <li key={s.id} className="flex items-baseline justify-between gap-3 py-2">
              <p className="font-mono text-2xs tracking-wider uppercase">{s.id}</p>
              <p className="text-2xs text-faint">{s.door}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "extrasTitle")}</p>
        <ul className="mt-2 space-y-1">
          {(rack.extras.length ? rack.extras : EXPANSIONS.map((e) => ({ id: e.extra, on: true, intensity: 6, action: e.web, why: e.os }))).map((e) => (
            <li key={e.id} className="grid min-w-0 grid-cols-[7rem_minmax(0,1fr)] gap-2 font-mono text-2xs">
              <span className={cn("uppercase", "on" in e && e.on === false ? "text-faint" : "text-ink")}>{e.id}</span>
              <span className="truncate text-faint">{e.why ?? e.action}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-mono text-2xs text-faint">extras {gazette.extrasCount} · extra11 false · clone false</p>

        <p className="mt-6 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "chainFire")}</p>
        {rack.chainLog.length === 0 ? (
          <p className="mt-2 text-sm text-faint">{t(lang, "chainEmpty")}</p>
        ) : (
          <ol className="mt-2 space-y-1">
            {rack.chainLog.map((s) => (
              <li key={s.i} className="font-mono text-2xs text-muted">
                {s.i} {s.op} · {s.fired ? "fire" : "skip"} · fwd {s.forwarded ? "yes" : "no"} · {s.note}
              </li>
            ))}
          </ol>
        )}

        <p className="mt-6 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "busTitle")}</p>
        <ul className="mt-2 max-h-48 space-y-1 overflow-auto">
          {BUS_OBJECTS.map((o) => (
            <li key={o.id} className="font-mono text-2xs text-muted">
              {o.id} · {o.door}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-faint">{t(lang, "studioNote")}</p>
        <div className="mt-6 border-t border-rule pt-5">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "atlasTitle")}</p>
          <div className="mt-3">
            <SteelAtlas compact />
          </div>
        </div>
      </aside>
    </div>
  );
}
