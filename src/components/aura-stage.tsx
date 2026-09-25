import { useEffect, useRef, useState, type DragEvent } from "react";
import {
  Activity,
  Aperture,
  AudioLines,
  BarChart3,
  Maximize,
  Mic,
  Pause,
  Play,
  Square,
  Upload,
  Volume2,
  VolumeX,
  Waves,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { probeCaps } from "@/lib/aura/caps";
import { drawFrame } from "@/lib/aura/draw";
import {
  applyEqGains,
  getAnalyser,
  readAnalyser,
  setFft,
  setVolume,
  startCapture,
  startSource,
  stopCapture,
  stopSource,
  togglePlay,
} from "@/lib/aura/engine";
import { paletteById, PALETTES } from "@/lib/aura/palettes";
import { exportCapsXlsx } from "@/lib/aura/report";
import { EQ_HZ, useAura } from "@/lib/aura/store";
import {
  BUFFER_INCS,
  QUALITY_ARMS,
  profileForArm,
  type AuraMode,
  type CapsReport,
} from "@/lib/aura/types";
import { t } from "@/lib/i18n";
import { useSteel } from "@/lib/steel/store";
import { cn } from "@/lib/utils";

const MODES: { id: AuraMode; label: string; icon: typeof BarChart3; key: string }[] = [
  { id: "bars", label: "Bars", icon: BarChart3, key: "1" },
  { id: "ring", label: "Ring", icon: Aperture, key: "2" },
  { id: "wave", label: "Wave", icon: Waves, key: "3" },
  { id: "bloom", label: "Bloom", icon: Activity, key: "4" },
];

export function AuraStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const idleRef = useRef<number>(0);
  const [idle, setIdle] = useState(false);
  const [caps, setCaps] = useState<CapsReport | null>(null);
  const [fs, setFs] = useState(false);
  const aura = useAura();
  const steelArmed = useSteel((s) => s.armed);
  const lang = useSteel((s) => s.lang);

  useEffect(() => {
    setCaps(probeCaps());
    const onMove = () => {
      setIdle(false);
      window.clearTimeout(idleRef.current);
      idleRef.current = window.setTimeout(() => setIdle(true), 2600);
    };
    onMove();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.clearTimeout(idleRef.current);
      void stopSource();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    let raf = 0;
    let frames = 0;
    let last = performance.now();
    let freq = new Uint8Array(1024);
    let time = new Uint8Array(2048);
    const pal = () => paletteById(useAura.getState().palette);

    const resize = () => {
      const rec = useAura.getState().recording;
      const arm = useAura.getState().arm;
      const maxT = caps?.maxTexture ?? 4096;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (rec) {
        const p = profileForArm(arm, maxT);
        canvas.width = p.w;
        canvas.height = p.h;
        return;
      }
      const r = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const loop = () => {
      const ctx = canvas.getContext("2d");
      const a = getAnalyser();
      if (ctx) {
        if (a) {
          if (a.frequencyBinCount !== freq.length) freq = new Uint8Array(a.frequencyBinCount);
          if (a.fftSize !== time.length) time = new Uint8Array(a.fftSize);
          readAnalyser(freq, time);
          const s = useAura.getState();
          drawFrame(ctx, canvas.width, canvas.height, freq, time, s.mode, pal(), s.sensitivity);
        } else {
          ctx.fillStyle = "#111210";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
      frames++;
      const now = performance.now();
      if (now - last > 500) {
        useAura.getState().set({ fps: Math.round((frames * 1000) / (now - last)) });
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [caps?.maxTexture]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        void togglePlay();
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        void toggleFs();
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        const next = !useAura.getState().muted;
        useAura.getState().set({ muted: next });
        setVolume(useAura.getState().volume, next);
      } else if (e.key >= "1" && e.key <= "4") {
        const mode = MODES[Number(e.key) - 1]?.id;
        if (mode) useAura.getState().set({ mode });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function toggleFs() {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      setFs(false);
    } else {
      await el.requestFullscreen();
      setFs(true);
    }
  }

  async function onDemo() {
    try {
      await startSource("demo");
      toast.success("Demo pulse armed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Demo failed");
    }
  }

  async function onMic() {
    await startSource("mic");
  }

  async function onSteel() {
    await startSource("steel");
  }

  async function onFile(file: File) {
    await startSource("file", file);
  }

  async function onRecord() {
    const canvas = canvasRef.current;
    if (!canvas || !caps) return;
    if (aura.recording) {
      const blob = await stopCapture();
      if (blob) {
        const ext = blob.type.includes("mp4") ? "mp4" : "webm";
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `aura-${aura.mode}.${ext}`;
        a.click();
        URL.revokeObjectURL(a.href);
        toast.success(`Saved ${ext.toUpperCase()} · 320 kbps`);
      }
      return;
    }
    if (!aura.playing) {
      toast.error("Play a source first");
      return;
    }
    await startCapture(canvas, aura.arm, caps.maxTexture);
    toast.success("Recording canvas + audio");
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) void onFile(file);
  }

  const showHud = !idle || aura.recording;

  return (
    <div
      ref={wrapRef}
      className="relative min-h-[70vh] overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-paper sm:min-h-[78vh]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <input
        ref={fileRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void onFile(f);
        }}
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex flex-col justify-between p-3 transition-opacity duration-[var(--motion-fast)] sm:p-6",
          showHud ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="pointer-events-auto flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-2xs tracking-[0.2em] text-steel uppercase">{t(lang, "auraKicker")}</p>
            <h2 className="mt-1 font-display text-xl sm:text-3xl">{t(lang, "auraTitle")}</h2>
          </div>
          <p className="font-mono text-2xs text-muted">
            {aura.fps} fps · {aura.inc} inc · {caps ? `${caps.recordCeiling.w}×${caps.recordCeiling.h}` : "—"}
          </p>
        </div>

        <div className="pointer-events-auto space-y-2 sm:space-y-3">
          <div className="nav-scroll flex flex-nowrap gap-2 overflow-x-auto">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => aura.set({ mode: m.id })}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-[var(--radius-sm)] border px-3 text-sm",
                  aura.mode === m.id
                    ? "border-ink bg-ink text-paper"
                    : "border-rule bg-paper/80 text-muted hover:text-ink",
                )}
              >
                <m.icon className="size-4" aria-hidden />
                {m.label}
                <span className="hidden font-mono text-2xs opacity-60 sm:inline">{m.key}</span>
              </button>
            ))}
          </div>

          <div className="nav-scroll flex flex-nowrap gap-2 overflow-x-auto">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => aura.set({ palette: p.id })}
                className={cn(
                  "min-h-11 shrink-0 rounded-[var(--radius-sm)] border px-3 text-sm",
                  aura.palette === p.id
                    ? "border-ink bg-ink text-paper"
                    : "border-rule bg-paper/80 text-muted hover:text-ink",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="nav-scroll flex flex-nowrap items-center gap-2 overflow-x-auto rounded-[var(--radius-md)] border border-rule bg-paper/90 p-2">
            <Button type="button" variant={aura.playing ? "secondary" : "live"} size="sm" onClick={() => void togglePlay()}>
              {aura.playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              {aura.playing ? t(lang, "auraPause") : t(lang, "auraPlay")}
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => void onDemo()}>
              {t(lang, "auraDemo")}
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => void onMic()}>
              <Mic className="size-4" />
              {t(lang, "liveMic")}
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
              <Upload className="size-4" />
              {t(lang, "auraOpen")}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={!steelArmed}
              onClick={() => void onSteel()}
            >
              <AudioLines className="size-4" />
              {t(lang, "auraSteelTap")}
            </Button>
            <Button type="button" variant={aura.recording ? "stamp" : "secondary"} size="sm" onClick={() => void onRecord()}>
              <Square className="size-3 fill-current" />
              {aura.recording ? `${t(lang, "auraStopRec")} ${aura.recSec}s` : t(lang, "auraRecord")}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                const next = !aura.muted;
                aura.set({ muted: next });
                setVolume(aura.volume, next);
              }}
              aria-label={aura.muted ? t(lang, "auraUnmute") : t(lang, "auraMute")}
            >
              {aura.muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={() => void toggleFs()} aria-label={t(lang, "auraFs")}>
              <Maximize className="size-4" />
            </Button>
          </div>

          <div className="grid gap-3 rounded-[var(--radius-md)] border border-rule bg-paper/90 p-3 sm:grid-cols-3">
            <label className="block">
              <span className="flex justify-between font-mono text-2xs text-muted">
                <span className="uppercase">{t(lang, "auraSens")}</span>
                <span className="tabular-nums">{aura.sensitivity.toFixed(2)}</span>
              </span>
              <input
                type="range"
                min={0.4}
                max={2.2}
                step={0.01}
                value={aura.sensitivity}
                onChange={(e) => aura.set({ sensitivity: Number(e.target.value) })}
                className="mt-1 w-full accent-live"
              />
            </label>
            <label className="block">
              <span className="flex justify-between font-mono text-2xs text-muted">
                <span className="uppercase">{t(lang, "auraVol")}</span>
                <span className="tabular-nums">{aura.volume.toFixed(2)}</span>
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={aura.volume}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  aura.set({ volume: v });
                  setVolume(v, aura.muted);
                }}
                className="mt-1 w-full accent-live"
              />
            </label>
            <label className="block">
              <span className="font-mono text-2xs text-muted uppercase">{t(lang, "auraInc")}</span>
              <select
                className="mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-rule bg-raised px-2 text-sm"
                value={aura.inc}
                onChange={(e) => {
                  const inc = Number(e.target.value) as (typeof BUFFER_INCS)[number];
                  aura.set({ inc });
                  setFft(inc);
                }}
              >
                {BUFFER_INCS.map((n) => (
                  <option key={n} value={n}>
                    {n} inc
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="nav-scroll flex flex-nowrap items-center gap-2 overflow-x-auto">
            <span className="shrink-0 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "auraArms")}</span>
            {QUALITY_ARMS.map((arm) => (
              <button
                key={arm}
                type="button"
                onClick={() => aura.set({ arm })}
                className={cn(
                  "min-h-11 shrink-0 rounded-[var(--radius-sm)] border px-3 font-mono text-sm",
                  aura.arm === arm ? "border-ink bg-ink text-paper" : "border-rule text-muted",
                )}
              >
                {arm === 528 ? "528p" : `${arm}x`}
              </button>
            ))}
            <Button type="button" variant="ghost" size="sm" onClick={() => aura.set({ eqOpen: !aura.eqOpen })}>
              EQ
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => aura.set({ capsOpen: !aura.capsOpen })}>
              Caps
            </Button>
            {aura.fileName ? (
              <span className="font-mono text-2xs text-muted">{aura.fileName}</span>
            ) : null}
          </div>

          {aura.eqOpen ? (
            <div className="grid grid-cols-4 gap-2 rounded-[var(--radius-md)] border border-rule bg-paper/90 p-3 sm:grid-cols-8">
              {EQ_HZ.map((hz, i) => (
                <label key={hz} className="flex flex-col items-center gap-1">
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    step={0.5}
                    value={aura.eq[i]}
                    onChange={(e) => {
                      const next = [...aura.eq];
                      next[i] = Number(e.target.value);
                      aura.set({ eq: next });
                      applyEqGains(next);
                    }}
                    className="h-24 accent-live"
                    style={{ writingMode: "vertical-lr", direction: "rtl" }}
                    aria-label={`${hz} Hz`}
                  />
                  <span className="font-mono text-2xs text-muted">{hz >= 1000 ? `${hz / 1000}k` : hz}</span>
                </label>
              ))}
            </div>
          ) : null}

          {aura.capsOpen && caps ? <CapsPanel caps={caps} /> : null}
          {aura.error ? <p className="text-sm text-clip">{aura.error}</p> : null}
          <p className="hidden font-mono text-2xs text-faint sm:block">
            {t(lang, "auraKeys")}
            {fs ? " · fullscreen" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

function CapsPanel({ caps }: { caps: CapsReport }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-rule bg-paper/95 p-4">
      <p className="font-mono text-2xs tracking-wider text-muted uppercase">Device analyser</p>
      <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <Row k="GPU" v={caps.gpu} />
        <Row k="Texture" v={`${caps.maxTexture}px`} />
        <Row k="Screen" v={`${caps.screen} · ${caps.refresh} Hz · ${caps.cores} cores`} />
        <Row k="Audio" v={`${caps.audioRate} Hz · ${caps.audioLatencyMs.toFixed(1)} ms RTL · ${caps.maxChannels} ch`} />
        <Row
          k="Ceiling"
          v={`${caps.recordCeiling.w}×${caps.recordCeiling.h} @ ${caps.recordCeiling.fps} · arm ${caps.recordCeiling.arm}`}
        />
        <Row k="Capture" v={caps.mime} />
      </dl>
      <p className="mt-3 text-xs text-muted">{caps.imax}</p>
      <p className="mt-1 text-xs text-muted">
        0.5 ms overclock target is below a Web Audio quantum (~2.7 ms at 48 kHz). 320 kbps · 44.1 kHz on the
        tap. 8000p / 164 fps is not a browser raster.
      </p>
      <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={() => void exportCapsXlsx(caps)}>
        Export caps sheet
      </Button>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-2xs text-steel">{k}</dt>
      <dd className="break-words text-muted">{v}</dd>
    </div>
  );
}
