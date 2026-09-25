import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { asioClass, BUFFER_SIZES, roundTripMs, SAMPLE_RATES } from "@/lib/steel/asio";
import { measuredLatencyMs, panic, playNote, pushParams, toggleKernel } from "@/lib/steel/engine";
import { t } from "@/lib/i18n";
import { enableMidi, KEY_LABEL, selectMidiIn } from "@/lib/steel/midi";
import { useSteel } from "@/lib/steel/store";
import { versionGte } from "@/lib/steel/updates";
import { cn } from "@/lib/utils";

const WHITE = [0, 2, 4, 5, 7, 9, 11];
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const LOW = 48;
const HIGH = 72;

export function SteelConsole() {
  const s = useSteel();
  const rtl = roundTripMs(s.buffer, s.sampleRate);
  const measured = s.armed ? measuredLatencyMs() : null;
  const transOn = Boolean(s.addons.transient) && versionGte(s.kernel, "3.5.0");

  useEffect(() => {
    if (s.armed) pushParams();
  }, [
    s.armed,
    s.inGain,
    s.outGain,
    s.master,
    s.hpHz,
    s.eqLo,
    s.eqMid,
    s.eqHi,
    s.satAmt,
    s.thresh,
    s.transAmt,
    s.addons,
  ]);

  async function arm() {
    try {
      await toggleKernel();
      if (!useSteel.getState().armed) return;
      toast.success(t(useSteel.getState().lang, "armOk"));
      try {
        await enableMidi();
      } catch {
        /* MIDI optional */
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t(useSteel.getState().lang, "armFail"));
    }
  }

  const peakDb = s.peak > 0 ? (20 * Math.log10(s.peak)).toFixed(1) : "-∞";
  const clip = s.peak > 0.95;
  const klass = asioClass(rtl);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <section className="min-w-0">
        <p className="font-mono text-2xs tracking-[0.2em] text-steel uppercase">{t(s.lang, "consoleKicker")}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl">{t(s.lang, "consoleTitle")}</h1>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{t(s.lang, "consoleLead")}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button type="button" variant={s.armed ? "stamp" : "live"} onClick={() => void arm()}>
            {s.armed ? t(s.lang, "disarm") : t(s.lang, "armKernel")}
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={!s.armed}
            onClick={() => panic()}
          >
            {t(s.lang, "panic")}
          </Button>
          <p className="font-mono text-2xs text-muted">
            {s.armed
              ? s.inputLive
                ? t(s.lang, "runningLive")
                : t(s.lang, "runningKeys")
              : t(s.lang, "armHint")}
          </p>
        </div>
        {s.error ? <p className="mt-3 text-sm text-clip">{s.error}</p> : null}

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Buffer" value={`${s.buffer}`} unit="samples" />
          <Stat label="Rate" value={`${s.sampleRate / 1000}`} unit="kHz" />
          <Stat label="ASIO RTL" value={rtl.toFixed(1)} unit="ms" />
          <Stat
            label="Measured"
            value={measured != null ? measured.toFixed(1) : "—"}
            unit="ms"
          />
        </div>
        <p className="mt-2 font-mono text-2xs text-faint">
          Class {klass} · extra buffers 2 (ASIO4ALL model)
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="font-mono text-2xs tracking-wider text-muted uppercase">Buffer</span>
            <select
              className="mt-1 h-11 w-full rounded-[var(--radius-md)] border border-rule bg-raised px-3 text-sm"
              value={s.buffer}
              onChange={(e) => s.patch({ buffer: Number(e.target.value) })}
            >
              {BUFFER_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-mono text-2xs tracking-wider text-muted uppercase">Sample rate</span>
            <select
              className="mt-1 h-11 w-full rounded-[var(--radius-md)] border border-rule bg-raised px-3 text-sm"
              value={s.sampleRate}
              onChange={(e) => s.patch({ sampleRate: Number(e.target.value) })}
            >
              {SAMPLE_RATES.map((n) => (
                <option key={n} value={n}>
                  {n / 1000} kHz
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-2 text-xs text-muted">
          Re-arm after changing rate. Buffer size here is the host ASIO figure; the worklet quantum stays 128.
        </p>

        <div className="mt-8">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">MIDI poly · C3–C5 · A–K is C4–C5</p>
          <Piano />
          <p className="mt-2 font-mono text-2xs text-muted">
            Last {s.lastNote} · {s.lastCc}
          </p>
        </div>
      </section>

      <aside className="rounded-[var(--radius-lg)] border border-rule bg-raised/60 p-5">
        <p className="font-mono text-2xs tracking-wider text-muted uppercase">Meters</p>
        <div className="mt-4 flex items-end gap-4">
          <Meter label="Peak" value={s.peak} clip={clip} />
          <Meter label="RMS" value={Math.min(1, s.rms * 2.2)} clip={false} />
          <div className="pb-1">
            <p className={cn("font-mono text-3xl tabular-nums", clip ? "text-clip" : "text-ink")}>
              {peakDb}
            </p>
            <p className="font-mono text-2xs text-muted">dBFS</p>
            <p className="mt-3 font-mono text-2xs text-muted">
              Voices {s.voices} · load {s.cpu.toFixed(0)}%
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Slider label="Input" value={s.inGain} min={0} max={2} onChange={(v) => s.patch({ inGain: v })} />
          <Slider label="Master" value={s.master} min={0} max={1.2} onChange={(v) => s.patch({ master: v })} />
          <Slider label="HP Hz" value={s.hpHz} min={20} max={400} onChange={(v) => s.patch({ hpHz: v })} />
          <Slider label="Lo" value={s.eqLo} min={0.2} max={2} onChange={(v) => s.patch({ eqLo: v })} />
          <Slider label="Mid" value={s.eqMid} min={0.2} max={2} onChange={(v) => s.patch({ eqMid: v })} />
          <Slider label="Hi" value={s.eqHi} min={0.2} max={2} onChange={(v) => s.patch({ eqHi: v })} />
          <Slider label="Sat" value={s.satAmt} min={0} max={1} onChange={(v) => s.patch({ satAmt: v })} />
          <Slider label="Thresh" value={s.thresh} min={0.05} max={0.9} onChange={(v) => s.patch({ thresh: v })} />
          {transOn ? (
            <Slider label="Transient" value={s.transAmt} min={0} max={1} onChange={(v) => s.patch({ transAmt: v })} />
          ) : null}
        </div>

        <div className="mt-6">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">MIDI in</p>
          <select
            className="mt-1 h-11 w-full rounded-[var(--radius-md)] border border-rule bg-paper px-3 text-sm"
            value={s.midiIn ?? ""}
            onChange={(e) => selectMidiIn(e.target.value || null)}
          >
            <option value="">Computer keyboard (A–K)</option>
            {s.midiPorts
              .filter((p) => p.type === "in")
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
          <Button type="button" variant="secondary" size="sm" className="mt-2" onClick={() => void enableMidi()}>
            Scan MIDI
          </Button>
        </div>
      </aside>
    </div>
  );
}

function Piano() {
  const [held, setHeld] = useState<Set<number>>(() => new Set());
  const pointerHeld = useRef(new Set<number>());
  const whites: number[] = [];
  const blacks: number[] = [];
  for (let n = LOW; n <= HIGH; n++) {
    if (WHITE.includes(n % 12)) whites.push(n);
    else blacks.push(n);
  }

  function down(note: number) {
    setHeld((prev) => new Set(prev).add(note));
    const pc = note % 12;
    useSteel.getState().patch({ lastNote: `${NOTES[pc]}${Math.floor(note / 12) - 1}` });
    void playNote(true, note, 0.85);
  }
  function up(note: number) {
    setHeld((prev) => {
      const next = new Set(prev);
      next.delete(note);
      return next;
    });
    void playNote(false, note);
  }
  function tap(note: number) {
    if (pointerHeld.current.has(note)) return;
    down(note);
    window.setTimeout(() => up(note), 280);
  }

  function blackLeft(note: number) {
    const pc = note % 12;
    const octave = Math.floor((note - LOW) / 12);
    const inOct: Record<number, number> = { 1: 0.72, 3: 1.72, 6: 3.72, 8: 4.72, 10: 5.72 };
    return ((octave * 7 + (inOct[pc] ?? 0)) / whites.length) * 100;
  }

  return (
    <div className="mt-3 overflow-x-auto overscroll-x-contain">
      <div className="relative h-36 w-[32rem] max-w-none sm:w-[36rem]">
        <div className="absolute inset-0 flex overflow-hidden rounded-[var(--radius-md)] border border-rule">
          {whites.map((note) => {
            const pc = note % 12;
            const on = held.has(note);
            return (
              <button
                key={note}
                type="button"
                aria-label={`${NOTES[pc]}${Math.floor(note / 12) - 1}`}
                className={cn(
                  "relative h-full flex-1 border-r border-rule last:border-r-0",
                  on ? "bg-live text-paper" : "bg-ink text-paper",
                )}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  pointerHeld.current.add(note);
                  down(note);
                }}
                onPointerUp={() => {
                  pointerHeld.current.delete(note);
                  up(note);
                }}
                onPointerCancel={() => {
                  pointerHeld.current.delete(note);
                  up(note);
                }}
                onClick={() => tap(note)}
              >
                <span className="absolute bottom-2 left-0 right-0 text-center font-mono text-2xs text-paper/70">
                  {KEY_LABEL[note] ?? (pc === 0 ? `C${Math.floor(note / 12) - 1}` : "")}
                </span>
              </button>
            );
          })}
        </div>
        {blacks.map((note) => {
          const pc = note % 12;
          const on = held.has(note);
          const w = (0.58 / whites.length) * 100;
          return (
            <button
              key={note}
              type="button"
              aria-label={`${NOTES[pc]}${Math.floor(note / 12) - 1}`}
              style={{ left: `calc(${blackLeft(note)}% + 0.15%)`, width: `${w}%` }}
              className={cn(
                "absolute top-0 z-10 h-[58%] rounded-b-[var(--radius-sm)] border border-rule",
                on ? "bg-live" : "bg-paper",
              )}
              onPointerDown={(e) => {
                e.preventDefault();
                e.currentTarget.setPointerCapture(e.pointerId);
                pointerHeld.current.add(note);
                down(note);
              }}
              onPointerUp={() => {
                pointerHeld.current.delete(note);
                up(note);
              }}
              onPointerCancel={() => {
                pointerHeld.current.delete(note);
                up(note);
              }}
              onClick={() => tap(note)}
            >
              <span className="sr-only">{KEY_LABEL[note]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-rule bg-raised/40 px-3 py-3">
      <p className="font-mono text-2xs tracking-wider text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-2xl tabular-nums leading-none">{value}</p>
      <p className="mt-1 font-mono text-2xs text-faint">{unit}</p>
    </div>
  );
}

function Meter({ label, value, clip }: { label: string; value: number; clip: boolean }) {
  const h = Math.min(1, Math.max(0, value));
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-40 w-8 overflow-hidden rounded-[var(--radius-sm)] border border-rule bg-paper">
        <div
          className={cn("absolute inset-x-0 bottom-0", clip ? "bg-clip" : "bg-live")}
          style={{ height: `${h * 100}%` }}
        />
      </div>
      <p className="font-mono text-2xs tracking-wider text-muted uppercase">{label}</p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex justify-between font-mono text-2xs text-muted">
        <span className="tracking-wider uppercase">{label}</span>
        <span className="tabular-nums text-ink">{value.toFixed(2)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={(max - min) / 200}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-live"
      />
    </label>
  );
}
