import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { channelLabel, genreLabel, t } from "@/lib/studio/copy";
import { loadBeatFile, loadGenre, loadVocalFile, pushAll, startMic, stopMic } from "@/lib/studio/engine";
import { useStudio } from "@/lib/studio/store";
import { CHANNELS, GENRE_META, STEPS, type ChannelId, type Genre } from "@/lib/studio/types";
import { cn } from "@/lib/utils";
import { Fader } from "./fader";
import { StudioKeys } from "./keyboard";
import { LevelMeter } from "./meter";

const GENRES: Genre[] = ["hardstyle", "rawstyle", "techno", "rap", "trap"];

export function StudioDesk() {
  const lang = useStudio((s) => s.lang);
  const genre = useStudio((s) => s.genre);
  const channels = useStudio((s) => s.channels);
  const steps = useStudio((s) => s.steps);
  const step = useStudio((s) => s.step);
  const playing = useStudio((s) => s.playing);
  const vocalName = useStudio((s) => s.vocalName);
  const beatName = useStudio((s) => s.beatName);
  const inputLive = useStudio((s) => s.inputLive);
  const master = useStudio((s) => s.master);
  const width = useStudio((s) => s.width);
  const drive = useStudio((s) => s.drive);
  const glue = useStudio((s) => s.glue);
  const swing = useStudio((s) => s.swing);
  const centerLock = useStudio((s) => s.centerLock);
  const peak = useStudio((s) => s.peak);
  const rms = useStudio((s) => s.rms);
  const setChannel = useStudio((s) => s.setChannel);
  const toggleStep = useStudio((s) => s.toggleStep);
  const patch = useStudio((s) => s.patch);
  const beatRef = useRef<HTMLInputElement>(null);
  const vocalRef = useRef<HTMLInputElement>(null);

  function applyMix() {
    pushAll();
  }

  async function onFile(kind: "beat" | "vocal", file: File | undefined) {
    if (!file) return;
    try {
      if (kind === "beat") await loadBeatFile(file);
      else await loadVocalFile(file);
      toast.success(file.name);
    } catch {
      toast.error(t(lang, "decodeFail"));
    }
  }

  return (
    <div className="flex min-w-0 max-w-full flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">STEEL · {t(lang, "desk")}</p>
        <h1 className="font-display text-3xl text-ink">Kick in the center. Voice in the width.</h1>
        <p className="max-w-2xl text-pretty text-muted">
          {lang === "et"
            ? "Neli-on-the-floor või rap-ruut. Üks puudutus käivitab kernel’i. Kick ja bass lukustuvad monosse; vokaal ja lead avanevad stereos."
            : "Four-on-the-floor or a rap grid. One tap arms the kernel. Kick and bass lock to mono-center; vocals and lead open in stereo."}
        </p>
      </header>

      <div className="nav-scroll">
        <div className="flex w-max gap-2 pr-1">
          {GENRES.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => {
              loadGenre(g);
              applyMix();
            }}
            className={cn(
              "min-h-11 shrink-0 rounded-[var(--radius-sm)] px-3 text-sm",
              genre === g ? "bg-ink text-paper" : "text-muted ring-1 ring-rule hover:text-ink",
            )}
          >
            {genreLabel(lang, g)}
            <span className="ml-2 font-mono text-2xs tabular-nums opacity-70">{GENRE_META[g].bpm}</span>
          </button>
          ))}
        </div>
      </div>

      <div className="nav-scroll w-full min-w-0 max-w-full overflow-x-auto">
        <div className="flex w-max gap-2 pr-1">
          {CHANNELS.map((id) => (
            <Strip
              key={id}
              id={id}
              label={channelLabel(lang, id)}
              gain={channels[id].gain}
              mute={channels[id].mute}
              solo={channels[id].solo}
              pan={channels[id].pan}
              send={channels[id].send}
              peak={id === "kick" || id === "bass" ? peak : rms}
              onGain={(gain) => {
                setChannel(id, { gain });
                applyMix();
              }}
              onMute={() => {
                setChannel(id, { mute: !channels[id].mute });
                applyMix();
              }}
              onSolo={() => {
                setChannel(id, { solo: !channels[id].solo });
                applyMix();
              }}
              onPan={(pan) => {
                setChannel(id, { pan });
                applyMix();
              }}
              onSend={(send) => {
                setChannel(id, { send });
                applyMix();
              }}
            />
          ))}
        </div>
      </div>

      <section className="min-w-0 rounded-[var(--radius-lg)] bg-raised p-3 ring-1 ring-rule sm:p-4">
        <p className="mb-3 font-mono text-2xs tracking-wider text-muted uppercase">16-step</p>
        <div className="flex min-w-0 flex-col gap-1 overflow-x-auto">
          {CHANNELS.filter((id) => id !== "vocal").map((id) => (
            <div key={id} className="flex items-center gap-2">
              <span className="w-10 shrink-0 font-mono text-2xs tracking-wider text-muted uppercase">{id}</span>
              <div className="grid min-w-0 flex-1 grid-cols-16 gap-px">
                {Array.from({ length: STEPS }, (_, i) => {
                  const on = (steps[id][i] ?? 0) > 0.2;
                  const now = playing && step === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      aria-pressed={on}
                      onClick={() => {
                        toggleStep(id, i);
                        applyMix();
                      }}
                      className={cn(
                        "h-8 min-h-8 rounded-[var(--radius-xs)] ring-1 ring-rule sm:h-9",
                        on ? "bg-ink" : "bg-paper",
                        now && "ring-2 ring-live",
                        i % 4 === 0 && !on && "bg-raised",
                      )}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--radius-lg)] bg-raised p-4 ring-1 ring-rule">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "loadBeat")}</p>
          <p className="mt-1 truncate text-sm text-ink">{beatName ?? t(lang, "emptyVocal")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => beatRef.current?.click()}>
              {t(lang, "loadBeat")}
            </Button>
            <input
              ref={beatRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => void onFile("beat", e.target.files?.[0])}
            />
          </div>
        </div>
        <div className="rounded-[var(--radius-lg)] bg-raised p-4 ring-1 ring-rule">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "vocal")}</p>
          <p className="mt-1 truncate text-sm text-ink">{vocalName ?? t(lang, "emptyVocal")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => vocalRef.current?.click()}>
              {t(lang, "loadVocal")}
            </Button>
            <Button
              type="button"
              variant={inputLive ? "live" : "secondary"}
              size="sm"
              onClick={() => void (inputLive ? stopMic() : startMic())}
            >
              {t(lang, "liveMic")}
            </Button>
            <input
              ref={vocalRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => void onFile("vocal", e.target.files?.[0])}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Fader
          label={t(lang, "master")}
          value={master}
          onChange={(v) => {
            patch({ master: v });
            applyMix();
          }}
        />
        <Fader
          label={t(lang, "width")}
          value={width}
          onChange={(v) => {
            patch({ width: v });
            applyMix();
          }}
        />
        <Fader
          label={t(lang, "drive")}
          value={drive}
          onChange={(v) => {
            patch({ drive: v });
            applyMix();
          }}
        />
        <Fader
          label={t(lang, "glue")}
          value={glue}
          onChange={(v) => {
            patch({ glue: v });
            applyMix();
          }}
        />
        <Fader
          label={t(lang, "swing")}
          value={swing}
          max={0.4}
          onChange={(v) => {
            patch({ swing: v });
            applyMix();
          }}
        />
        <label className="flex min-h-11 items-center justify-between gap-3 rounded-[var(--radius-md)] px-1">
          <span className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "center")}</span>
          <button
            type="button"
            role="switch"
            aria-checked={centerLock}
            onClick={() => {
              patch({ centerLock: !centerLock });
              applyMix();
            }}
            className={cn(
              "h-7 w-12 rounded-full ring-1 ring-rule transition-colors duration-[var(--motion-quick)]",
              centerLock ? "bg-live" : "bg-raised",
            )}
          >
            <span
              className={cn(
                "block size-6 rounded-full bg-ink transition-transform duration-[var(--motion-quick)]",
                centerLock ? "translate-x-5" : "translate-x-0.5",
              )}
            />
          </button>
        </label>
      </div>

      <StudioKeys />
      <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "keys")}</p>
    </div>
  );
}

function Strip({
  id,
  label,
  gain,
  mute,
  solo,
  pan,
  send,
  peak,
  onGain,
  onMute,
  onSolo,
  onPan,
  onSend,
}: {
  id: ChannelId;
  label: string;
  gain: number;
  mute: boolean;
  solo: boolean;
  pan: number;
  send: number;
  peak: number;
  onGain: (v: number) => void;
  onMute: () => void;
  onSolo: () => void;
  onPan: (v: number) => void;
  onSend: (v: number) => void;
}) {
  return (
    <div className="flex w-20 shrink-0 flex-col items-center gap-2 rounded-[var(--radius-md)] bg-raised p-2 ring-1 ring-rule">
      <p className="font-mono text-2xs tracking-wider text-muted uppercase">{label}</p>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={onMute}
          className={cn(
            "h-9 min-w-9 rounded-[var(--radius-xs)] font-mono text-2xs uppercase ring-1 ring-rule",
            mute ? "bg-clip text-paper" : "text-muted",
          )}
        >
          M
        </button>
        <button
          type="button"
          onClick={onSolo}
          className={cn(
            "h-9 min-w-9 rounded-[var(--radius-xs)] font-mono text-2xs uppercase ring-1 ring-rule",
            solo ? "bg-live text-paper" : "text-muted",
          )}
        >
          S
        </button>
      </div>
      <LevelMeter peak={peak * gain} rms={peak * gain * 0.6} vertical />
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={gain}
        aria-label={label}
        onChange={(e) => onGain(Number(e.target.value))}
        className="steel-range"
      />
      <input
        type="range"
        min={-1}
        max={1}
        step={0.01}
        value={pan}
        aria-label={`${label} pan`}
        onChange={(e) => onPan(Number(e.target.value))}
        className="steel-range"
      />
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={send}
        aria-label={`${label} send`}
        onChange={(e) => onSend(Number(e.target.value))}
        className="steel-range"
      />
      <span className="sr-only">{id}</span>
    </div>
  );
}
