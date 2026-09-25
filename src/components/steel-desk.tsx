import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  applyFix,
  applyGenre,
  bounceWav,
  cutSelected,
  decodeSlot,
  deleteSelected,
  keepBest,
  loadDemoBeat,
  loadDemoVocal,
  makeAdlibs,
  makeBacks,
  pitchLabel,
  playMix,
  pushParams,
  setBeatBuffer,
  setFemale,
  setFx,
  setVocalBuffer,
  sharpMix,
  snapToGrid,
  startLiveMic,
  stopLiveMic,
  stopMix,
  tapDeskAudio,
  toggleVoiceRec,
} from "@/lib/desk/engine";
import { DELAYS, GENRES, REVERBS } from "@/lib/desk/fx";
import { suggestMix } from "@/lib/desk/mix-ai";
import { NOTE_NAMES, useDesk } from "@/lib/desk/store";
import { timelineSpan } from "@/lib/desk/clips";
import { DESK_DEFAULT, probeDesk, wordClip, wordCount } from "@/lib/desk/adapt";
import { renderDeskVideo } from "@/lib/desk/video";
import { t, type Lang } from "@/lib/i18n";
import { createSteelRow, listSteelRows, type SteelRow } from "@/lib/steel/rows";
import { useSteel } from "@/lib/steel/store";
import { cn } from "@/lib/utils";
import { SteelOled } from "@/components/steel-oled";

function fxLabel(lang: Lang, x: { et: string; en: string; ru: string }) {
  if (lang === "et") return x.et;
  if (lang === "ru") return x.ru;
  return x.en;
}

export function SteelDesk() {
  const lang = useSteel((s) => s.lang);
  const d = useDesk();
  const beatRef = useRef<HTMLInputElement>(null);
  const vocalRef = useRef<HTMLInputElement>(null);
  const recRef = useRef<HTMLInputElement>(null);
  const mediaRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<SteelRow[]>([]);
  const [rowBusy, setRowBusy] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [adapt, setAdapt] = useState(DESK_DEFAULT);

  useEffect(() => {
    const apply = () => setAdapt(probeDesk());
    apply();
    const mq = window.matchMedia("(max-width: 700px)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    void listSteelRows({ data: { kind: "mix" } })
      .then(setRows)
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    return () => {
      stopMix();
      stopLiveMic();
    };
  }, []);

  useEffect(() => {
    pushParams();
  }, [d.amount, d.speed, d.tonic, d.mode, d.drive, d.ceiling, d.beatGain, d.vocalGain, d.glue, d.delay, d.reverb, d.delayMix, d.reverbMix, d.applyMix, d.female, d.bpm, d.kare, d.width, d.eq]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      e.preventDefault();
      void onPlay();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function onBeat(file: File) {
    try {
      const buf = await decodeSlot(file);
      await setBeatBuffer(buf, file.name);
      toast.success(file.name);
    } catch {
      toast.error(t(lang, "decodeFail"));
    }
  }

  async function onVocal(file: File) {
    try {
      const buf = await decodeSlot(file);
      await setVocalBuffer(buf, file.name);
      toast.success(file.name);
    } catch {
      toast.error(t(lang, "decodeFail"));
    }
  }

  async function onPlay() {
    try {
      if (useDesk.getState().playing) stopMix();
      else await playMix();
    } catch {
      toast.error(t(useSteel.getState().lang, "needSlots"));
    }
  }

  async function onMic() {
    try {
      if (d.liveMic) stopLiveMic();
      else await startLiveMic();
    } catch {
      toast.error(t(lang, "micBlocked"));
    }
  }

  async function onRec() {
    try {
      const state = await toggleVoiceRec();
      toast.success(state === "start" ? t(lang, "recStart") : t(lang, "recDone"));
    } catch {
      recRef.current?.click();
    }
  }

  async function onAi() {
    sharpMix();
    d.set({ aiBusy: true });
    try {
      const res = await suggestMix({
        data: {
          peak: d.peak,
          rms: d.rms,
          lufs: d.lufs,
          pitch: d.pitch,
          hasBeat: Boolean(d.beatName),
          hasVocal: Boolean(d.vocalName) || d.liveMic,
          lang,
          genre: d.genre,
          clips: d.regions.length,
          bpm: d.bpm,
          kare: d.kare,
          palve: d.palve,
        },
      });
      if (res.ok) d.set({ aiNote: res.text, aiBusy: false });
      else d.set({ aiNote: t(lang, "heuristicApplied"), aiBusy: false });
    } catch {
      d.set({ aiNote: t(lang, "heuristicApplied"), aiBusy: false });
    }
    toast.success(t(lang, "heuristicApplied"));
  }

  async function onBounce() {
    try {
      const blob = await bounceWav();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "steel-mix.wav";
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      toast.error(t(lang, "needSlots"));
    }
  }

  function parsePayload(row: SteelRow): Record<string, number> {
    try {
      const raw = JSON.parse(row.payloadJson) as Record<string, unknown>;
      const out: Record<string, number> = {};
      for (const [k, v] of Object.entries(raw)) {
        if (typeof v === "number" && Number.isFinite(v)) out[k] = v;
      }
      return out;
    } catch {
      return {};
    }
  }

  async function onSaveRow() {
    const s = useDesk.getState();
    setRowBusy(true);
    try {
      const title = `mix ${s.bpm}bpm`;
      await createSteelRow({
        data: {
          kind: "mix",
          title,
          payloadJson: JSON.stringify({
            amount: s.amount,
            speed: s.speed,
            tonic: s.tonic,
            mode: s.mode,
            drive: s.drive,
            ceiling: s.ceiling,
            beatGain: s.beatGain,
            vocalGain: s.vocalGain,
            glue: s.glue,
            bpm: s.bpm,
          }),
        },
      });
      const next = await listSteelRows({ data: { kind: "mix" } });
      setRows(next);
      toast.success(t(lang, "rowSaved"));
    } catch {
      toast.error(t(lang, "rowFail"));
    } finally {
      setRowBusy(false);
    }
  }

  function loadRow(row: SteelRow) {
    const p = parsePayload(row);
    const s = useDesk.getState();
    const num = (k: string, fallback: number) => (typeof p[k] === "number" ? p[k] : fallback);
    s.set({
      amount: num("amount", s.amount),
      speed: num("speed", s.speed),
      tonic: Math.round(num("tonic", s.tonic)) % 12,
      mode: (Math.round(num("mode", s.mode)) % 3) as 0 | 1 | 2,
      drive: num("drive", s.drive),
      ceiling: num("ceiling", s.ceiling),
      beatGain: num("beatGain", s.beatGain),
      vocalGain: num("vocalGain", s.vocalGain),
      glue: num("glue", s.glue),
      bpm: Math.round(num("bpm", s.bpm)),
    });
    pushParams();
    toast.success(row.title);
  }

  async function withBusy(fn: () => Promise<void>, ok: string) {
    d.set({ aiBusy: true });
    try {
      await fn();
      toast.success(ok);
    } catch {
      toast.error(t(lang, "needSlots"));
    } finally {
      d.set({ aiBusy: false });
    }
  }

  async function onVideo() {
    if (!mediaFiles.length) {
      mediaRef.current?.click();
      return;
    }
    d.set({ videoBusy: true, aiBusy: true });
    try {
      const tap = tapDeskAudio();
      const blob = await renderDeskVideo({
        files: mediaFiles,
        prompt: d.videoPrompt,
        lyrics: d.lyrics,
        duration: 8,
        bpm: d.bpm,
        analyser: tap?.analyser ?? null,
        audio: tap?.stream ?? null,
        width: adapt.videoW,
        height: adapt.videoH,
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "steel-visual.webm";
      a.click();
      URL.revokeObjectURL(a.href);
      toast.success("STEEL visual");
    } catch {
      toast.error(t(lang, "needSlots"));
    } finally {
      d.set({ videoBusy: false, aiBusy: false });
    }
  }

  const peakDb = d.peak > 0 ? (20 * Math.log10(d.peak)).toFixed(1) : "-∞";
  const loudN = Math.min(1, Math.max(0, (d.lufs + 70) / 70));
  const duckDb = d.duck < 0.999 ? (20 * Math.log10(Math.max(0.001, d.duck))).toFixed(1) : "0.0";

  return (
    <div className={cn("relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]", d.aiBusy && "desk-busy")}>
      {d.aiBusy ? <div className="desk-wash" aria-hidden /> : null}
      <section className="min-w-0">
        <p className="font-mono text-2xs tracking-[0.2em] text-steel uppercase">{t(lang, "deskKicker")}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl">{t(lang, "deskTitle")}</h1>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{t(lang, "deskLead")}</p>
        <p className="mt-2 font-mono text-2xs text-ice">{adapt.label} · {t(lang, "adaptNote")}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <SlotCard
            lang={lang}
            title={t(lang, "slotBeat")}
            name={d.beatName}
            onPick={() => beatRef.current?.click()}
            pickLabel={t(lang, "loadBeat")}
            extra={
              <Button type="button" variant="secondary" size="sm" onClick={() => void loadDemoBeat()}>
                {t(lang, "demoBeat")}
              </Button>
            }
          />
          <SlotCard
            lang={lang}
            title={t(lang, "slotVocal")}
            name={d.vocalName}
            onPick={() => vocalRef.current?.click()}
            pickLabel={t(lang, "loadVocal")}
            extra={
              <>
                <Button type="button" variant="secondary" size="sm" onClick={() => void loadDemoVocal()}>
                  {t(lang, "demoVocal")}
                </Button>
                <Button type="button" variant={d.recording ? "stamp" : "secondary"} size="sm" onClick={() => void onRec()}>
                  {t(lang, "recVoice")}
                </Button>
                <Button type="button" variant={d.liveMic ? "live" : "secondary"} size="sm" onClick={() => void onMic()}>
                  {t(lang, "liveMic")}
                </Button>
              </>
            }
          />
        </div>

        <input
          ref={beatRef}
          type="file"
          accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void onBeat(f);
            e.target.value = "";
          }}
        />
        <input
          ref={vocalRef}
          type="file"
          accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void onVocal(f);
            e.target.value = "";
          }}
        />
        <input
          ref={recRef}
          type="file"
          accept="audio/*"
          capture="user"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void onVocal(f);
            e.target.value = "";
          }}
        />

        <div className={cn("mt-5 flex flex-wrap items-center gap-2", d.playing && "kare-hair")}>
          <Button type="button" variant={d.playing ? "stamp" : "live"} onClick={() => void onPlay()}>
            {d.playing ? t(lang, "stopMix") : t(lang, "playMix")}
          </Button>
          <Button type="button" variant="secondary" onClick={() => void onAi()} disabled={d.aiBusy}>
            {d.aiBusy ? t(lang, "aiBusy") : t(lang, "aiMix")}
          </Button>
          <Button type="button" variant="secondary" onClick={() => void onBounce()}>
            {t(lang, "bounce")}
          </Button>
          <Button type="button" variant="live" onClick={() => void withBusy(applyFix, t(lang, "fixIt"))} disabled={d.aiBusy}>
            {t(lang, "fixIt")}
          </Button>
          <label className="flex min-h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={d.autoTakt}
              onChange={(e) => d.set({ autoTakt: e.target.checked })}
            />
            {t(lang, "autoTakt")}
          </label>
          <Button type="button" variant="secondary" onClick={() => void onSaveRow()} disabled={rowBusy}>
            {t(lang, "saveRow")}
          </Button>
          <p className="font-mono text-2xs text-faint">{t(lang, "spaceHint")}</p>
        </div>
        {d.error ? <p className="mt-3 text-sm text-clip">{d.error}</p> : null}

        <div className="mt-5">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "palve")}</p>
          <textarea
            value={d.palve}
            onChange={(e) => d.set({ palve: wordClip(e.target.value, 50) })}
            placeholder={t(lang, "palvePh")}
            rows={2}
            className="mt-2 w-full rounded-[var(--radius-md)] border border-rule bg-raised p-3 text-sm"
          />
          <p className="mt-1 font-mono text-2xs text-faint">{wordCount(d.palve)} / 50 · {t(lang, "palveNote")}</p>
        </div>

        <div className="mt-4">
          <Slider label={`${t(lang, "kare")} · ${t(lang, "vEquals")}`} value={d.kare} min={0.15} max={1} onChange={(v) => d.set({ kare: v })} />
          <p className="mt-2 max-w-prose text-xs leading-relaxed text-muted">{t(lang, "kareLead")}</p>
        </div>

        <div className="mt-8">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "autotune")}</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Slider label={t(lang, "amount")} value={d.amount} min={0} max={1} onChange={(v) => d.set({ amount: v })} />
            <Slider label={t(lang, "speed")} value={d.speed} min={0.05} max={1} onChange={(v) => d.set({ speed: v })} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(
              [
                [0, t(lang, "chromatic")],
                [1, t(lang, "minor")],
                [2, t(lang, "major")],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                onClick={() => d.set({ mode: m })}
                className={cn(
                  "min-h-11 rounded-[var(--radius-sm)] border px-3 text-sm",
                  d.mode === m ? "border-ink bg-ink text-paper" : "border-rule text-muted",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="nav-scroll mt-3 flex flex-nowrap gap-1 overflow-x-auto">
            {NOTE_NAMES.map((n, i) => (
              <button
                key={n}
                type="button"
                onClick={() => d.set({ tonic: i })}
                className={cn(
                  "min-h-11 min-w-11 shrink-0 rounded-[var(--radius-sm)] border px-2 font-mono text-2xs",
                  d.tonic === i ? "border-ink bg-ink text-paper" : "border-rule text-muted",
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "regions")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => void withBusy(snapToGrid, t(lang, "snapGrid"))}>
              {t(lang, "snapGrid")}
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => void withBusy(cutSelected, t(lang, "cutClip"))}>
              {t(lang, "cutClip")}
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => void withBusy(deleteSelected, t(lang, "delClip"))}>
              {t(lang, "delClip")}
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => void withBusy(makeAdlibs, t(lang, "adlibs"))}>
              {t(lang, "adlibs")}
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => void withBusy(makeBacks, t(lang, "backs"))}>
              {t(lang, "backs")}
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => void withBusy(keepBest, t(lang, "keepBest"))}>
              {t(lang, "keepBest")}
            </Button>
            <Button
              type="button"
              variant={d.female ? "live" : "secondary"}
              size="sm"
              onClick={() => void setFemale(!d.female)}
            >
              {t(lang, "femaleBank")}
            </Button>
          </div>
          {d.regions.length === 0 ? (
            <p className="mt-3 text-sm text-faint">{t(lang, "noClip")}</p>
          ) : (
            <div className="nav-scroll mt-3 overflow-x-auto rounded-[var(--radius-md)] border border-rule">
              <div className="relative h-36 min-w-[640px]">
                {d.regions.map((c) => {
                  const span = timelineSpan(d.regions);
                  const left = (c.offset / span) * 100;
                  const width = Math.max(3.2, ((c.end - c.start) / span) * 100);
                  const lane = c.kind === "main" ? "top-1" : c.kind === "adlib" ? "top-14" : "top-24";
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => d.set({ selectedId: c.id })}
                      className={cn(
                        "absolute h-11 overflow-hidden rounded-[var(--radius-sm)] border px-1.5 text-left",
                        lane,
                        c.muted && "opacity-40",
                        d.selectedId === c.id
                          ? "border-ink bg-ink text-paper"
                          : c.kind === "adlib"
                            ? "border-stamp bg-stamp/20 text-ink"
                            : c.kind === "back"
                              ? "border-live bg-live/20 text-ink"
                              : "border-rule bg-ink/15 text-ink",
                      )}
                      style={{ left: `${left}%`, width: `${width}%`, minWidth: "44px" }}
                    >
                      <span className="block font-mono text-2xs uppercase">{c.kind}</span>
                      <span className="font-mono text-2xs tabular-nums">{(c.end - c.start).toFixed(2)}s</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "genre")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => void applyGenre(g.id)}
                className={cn(
                  "min-h-11 rounded-[var(--radius-sm)] border px-3 text-sm",
                  d.genre === g.id ? "border-ink bg-ink text-paper" : "border-rule text-muted",
                )}
              >
                {fxLabel(lang, g)}
              </button>
            ))}
          </div>
          <p className="mt-4 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "delay")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {DELAYS.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => void setFx(x.id, d.reverb)}
                className={cn(
                  "min-h-11 rounded-[var(--radius-sm)] border px-3 font-mono text-2xs",
                  d.delay === x.id ? "border-ink bg-ink text-paper" : "border-rule text-muted",
                )}
              >
                {fxLabel(lang, x)}
              </button>
            ))}
          </div>
          <p className="mt-4 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "reverb")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {REVERBS.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => void setFx(d.delay, x.id)}
                className={cn(
                  "min-h-11 rounded-[var(--radius-sm)] border px-3 font-mono text-2xs",
                  d.reverb === x.id ? "border-ink bg-ink text-paper" : "border-rule text-muted",
                )}
              >
                {fxLabel(lang, x)}
              </button>
            ))}
          </div>
          <label className="mt-4 flex min-h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={d.applyMix}
              onChange={(e) => {
                d.set({ applyMix: e.target.checked });
                pushParams();
              }}
            />
            {d.applyMix ? t(lang, "applyMix") : t(lang, "drySnap")}
          </label>
          {d.micLabel ? <p className="mt-2 font-mono text-2xs text-faint">{d.micLabel}</p> : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Slider label={t(lang, "delayMix")} value={d.delayMix} min={0} max={0.6} onChange={(v) => d.set({ delayMix: v })} />
            <Slider label={t(lang, "reverbMix")} value={d.reverbMix} min={0} max={0.6} onChange={(v) => d.set({ reverbMix: v })} />
          </div>
        </div>

        <div className="mt-8">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "videoTitle")}</p>
          <p className="mt-2 max-w-prose text-sm text-muted">{t(lang, "videoLead")}</p>
          <textarea
            value={d.videoPrompt}
            onChange={(e) => d.set({ videoPrompt: wordClip(e.target.value, 80) })}
            placeholder={t(lang, "videoPrompt")}
            rows={3}
            className="mt-3 w-full rounded-[var(--radius-md)] border border-rule bg-raised p-3 text-sm"
          />
          <p className="mt-1 font-mono text-2xs text-faint tabular-nums">
            {wordCount(d.videoPrompt)} / 80
          </p>
          <p className="mt-4 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "lyrics")}</p>
          <textarea
            value={d.lyrics}
            onChange={(e) => d.set({ lyrics: wordClip(e.target.value, 250) })}
            placeholder={t(lang, "lyricsPh")}
            rows={5}
            className="mt-2 w-full rounded-[var(--radius-md)] border border-rule bg-raised p-3 text-sm"
          />
          <p className="mt-1 font-mono text-2xs text-faint tabular-nums">
            {wordCount(d.lyrics)} / 250
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => mediaRef.current?.click()}>
              {t(lang, "loadMedia")}
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => void onVideo()} disabled={d.videoBusy}>
              {d.videoBusy ? t(lang, "videoBusy") : t(lang, "videoGo")}
            </Button>
            {mediaFiles.length ? (
              <p className="font-mono text-2xs text-faint">{mediaFiles.length} faili</p>
            ) : null}
          </div>
          <input
            ref={mediaRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => {
              setMediaFiles(Array.from(e.target.files ?? []).slice(0, 8));
              e.target.value = "";
            }}
          />
        </div>
      </section>

      <aside className="min-w-0 rounded-[var(--radius-lg)] border border-rule bg-raised/60 p-5">
        <SteelOled />
        <p className="mt-2 text-xs leading-relaxed text-faint">{t(lang, "oledNote")}</p>
        <p className="mt-6 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "analytics")}</p>
        <div className="mt-4 space-y-3">
          <MeterBar label={t(lang, "peak")} unit={`${peakDb} dBFS`} value={d.peak} clip={d.peak > 0.95} />
          <MeterBar label={t(lang, "loud")} unit={`${d.lufs.toFixed(1)} LUFS`} value={loudN} clip={d.lufs > -9} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Stat label={t(lang, "detected")} value={pitchLabel(d.pitch)} unit={`${d.pitch.toFixed(0)} Hz`} />
          <Stat label={t(lang, "bpm")} value={`${d.bpm}`} unit="BPM" />
          <Stat label={t(lang, "duck")} value={duckDb} unit="dB" />
          <Stat label={t(lang, "clips")} value={`${d.clips}`} unit="tun" />
        </div>
        <div className="mt-5 space-y-3">
          <Slider label={t(lang, "slotBeat")} value={d.beatGain} min={0} max={1.2} onChange={(v) => d.set({ beatGain: v })} />
          <Slider label={t(lang, "slotVocal")} value={d.vocalGain} min={0} max={1.2} onChange={(v) => d.set({ vocalGain: v })} />
          <Slider label={t(lang, "glue")} value={d.glue} min={0} max={1} onChange={(v) => d.set({ glue: v })} />
          <Slider label={t(lang, "fade")} value={d.fade} min={0.004} max={0.25} onChange={(v) => d.set({ fade: v })} />
          <Slider label={t(lang, "drive")} value={d.drive} min={0} max={1} onChange={(v) => d.set({ drive: v })} />
          <Slider label={t(lang, "ceiling")} value={d.ceiling} min={0.5} max={0.99} onChange={(v) => d.set({ ceiling: v })} />
        </div>
        {d.aiNote ? <p className="mt-5 text-sm leading-relaxed text-muted">{d.aiNote}</p> : null}
        <div className="mt-6 border-t border-rule pt-5">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "rows")}</p>
          {rows.length === 0 ? (
            <p className="mt-2 text-sm text-faint">{t(lang, "noRows")}</p>
          ) : (
            <ul className="mt-2 divide-y divide-rule">
              {rows.map((row) => (
                <li key={row.id} className="flex items-center justify-between gap-2 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm">{row.title}</p>
                    <p className="font-mono text-2xs text-faint tabular-nums">#{row.id}</p>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => loadRow(row)}>
                    {t(lang, "loadRow")}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-faint">{t(lang, "fxNote")}</p>
        <p className="mt-3 text-xs leading-relaxed text-faint">{t(lang, "tuumNote")}</p>
      </aside>
    </div>
  );
}

function MeterBar({
  label,
  unit,
  value,
  clip,
}: {
  label: string;
  unit: string;
  value: number;
  clip: boolean;
}) {
  const n = Math.min(1, Math.max(0, value));
  return (
    <div>
      <div className="flex justify-between font-mono text-2xs">
        <span className="tracking-wider text-muted uppercase">{label}</span>
        <span className={cn("tabular-nums", clip ? "text-clip" : "text-ink")}>{unit}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-rule">
        <div
          className={cn(
            "h-full origin-left rounded-full transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]",
            clip ? "bg-clip" : "bg-live",
          )}
          style={{ transform: `scaleX(${n})` }}
        />
      </div>
    </div>
  );
}

function SlotCard({
  lang,
  title,
  name,
  onPick,
  pickLabel,
  extra,
}: {
  lang: Lang;
  title: string;
  name: string | null;
  onPick: () => void;
  pickLabel: string;
  extra: ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-rule bg-raised/40 p-4">
      <p className="font-mono text-2xs tracking-wider text-steel uppercase">{title}</p>
      <p className="mt-2 truncate text-sm">{name ?? t(lang, "emptySlot")}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={onPick}>
          {pickLabel}
        </Button>
        {extra}
      </div>
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-rule px-3 py-3">
      <p className="font-mono text-2xs tracking-wider text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-2xl tabular-nums leading-none">{value}</p>
      <p className="mt-1 font-mono text-2xs text-faint">{unit}</p>
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
