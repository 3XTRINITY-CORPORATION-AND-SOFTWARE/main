import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { speakHook, writeHook } from "@/lib/studio/ai";
import { mimicAllowed } from "@/lib/studio/caps";
import { t } from "@/lib/studio/copy";
import { applyProcessedVocal, captureVoiceCap, getContext, getVocalBuffer, loadNightStandin, pushAll } from "@/lib/studio/engine";
import { HOOK_PLACEHOLDER, KIND_LABEL, VOCAL_KINDS, VOCAL_LANGS, type VocalKind } from "@/lib/studio/night";
import { useStudio } from "@/lib/studio/store";
import { processCurrent, vocalProcessor, auditionKind } from "@/lib/studio/vocal";
import type { FxChain, VocalLang, VoiceBank } from "@/lib/studio/types";
import { cn } from "@/lib/utils";
import { Fader } from "./fader";

const CHAINS: { id: FxChain; key: "dry" | "hardDelay" | "clubVerb" | "radio" | "trapSpace" }[] = [
  { id: "dry", key: "dry" },
  { id: "hard-delay", key: "hardDelay" },
  { id: "club-verb", key: "clubVerb" },
  { id: "radio", key: "radio" },
  { id: "trap-space", key: "trapSpace" },
];

const BANKS: { id: VoiceBank; key: "leadVoice" | "female" | "choir" | "adlib" }[] = [
  { id: "lead", key: "leadVoice" },
  { id: "harmony", key: "female" },
  { id: "choir", key: "choir" },
  { id: "adlib", key: "adlib" },
];

export function StudioVocals() {
  const lang = useStudio((s) => s.lang);
  const vocalLang = useStudio((s) => s.vocalLang);
  const vocalKind = useStudio((s) => s.vocalKind);
  const nightLane = useStudio((s) => s.nightLane);
  const voiceBank = useStudio((s) => s.voiceBank);
  const fxChain = useStudio((s) => s.fxChain);
  const hook = useStudio((s) => s.hook);
  const lyrics = useStudio((s) => s.lyrics);
  const vocalName = useStudio((s) => s.vocalName);
  const mic = useStudio((s) => s.mic);
  const restoreOn = useStudio((s) => s.restoreOn);
  const tuneAmount = useStudio((s) => s.tuneAmount);
  const processing = useStudio((s) => s.processing);
  const kindBusy = useStudio((s) => s.kindBusy);
  const processNote = useStudio((s) => s.processNote);
  const genre = useStudio((s) => s.genre);
  const pitch = useStudio((s) => s.pitch);
  const voiceCap = useStudio((s) => s.voiceCap);
  const patch = useStudio((s) => s.patch);
  const canMimic = mimicAllowed(voiceCap);
  const busy = processing || kindBusy;

  async function run(kind: "quantize" | "restore" | "harmony" | "choir" | "fx" | "tune" | "mirror" | "kind") {
    if (kind === "kind" && !canMimic) {
      toast.error(t(lang, "rapFirst"));
      return;
    }
    if (kind === "kind") patch({ kindBusy: true, processNote: t(lang, "processing") });
    else patch({ processing: true, processNote: t(lang, "processing") });
    try {
      const buf = await processCurrent(kind);
      if (!buf) {
        toast.error(kind === "kind" ? t(lang, "rapFirst") : t(lang, "emptyVocal"));
        return;
      }
      await applyProcessedVocal(buf, `${kind}-${vocalName ?? "take"}`);
      toast.success(kind === "kind" ? KIND_LABEL[vocalKind] : kind);
    } catch {
      toast.error(t(lang, "decodeFail"));
    } finally {
      if (kind === "kind") patch({ kindBusy: false, processNote: null });
      else patch({ processing: false, processNote: null });
    }
  }

  async function onHook() {
    const seed = hook.trim();
    if (!seed) {
      toast.error(t(lang, "tagsOnly"));
      return;
    }
    patch({ processing: true, processNote: t(lang, "processing") });
    try {
      const res = await writeHook({ data: { lang: vocalLang, genre, seed } });
      if (!res.ok) {
        toast.error(res.error === "tags" ? t(lang, "tagsOnly") : res.error);
        return;
      }
      patch({ lyrics: res.text, hook: res.text });
    } finally {
      patch({ processing: false, processNote: null });
    }
  }

  async function onSpeak() {
    const text = (lyrics || hook).trim();
    if (!text) return;
    patch({ kindBusy: true, processNote: t(lang, "processing") });
    try {
      const res = await speakHook({ data: { text, bank: voiceBank, kind: vocalKind, lang: vocalLang } });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      const ctx = getContext();
      if (!ctx) {
        toast.error(t(lang, "needArm"));
        return;
      }
      const bin = atob(res.audio);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const buf = await ctx.decodeAudioData(bytes.buffer.slice(0));
      let styled = await vocalProcessor.styleKind(buf, vocalKind);
      if (canMimic) styled = await vocalProcessor.formantToward(styled, voiceCap);
      await applyProcessedVocal(styled, `${vocalKind}-tts`);
      toast.success(canMimic ? t(lang, "mimicOn") : t(lang, "tagsOnly"));
    } catch {
      toast.error(t(lang, "decodeFail"));
    } finally {
      patch({ kindBusy: false, processNote: null });
    }
  }

  async function onStandin() {
    patch({ kindBusy: true, processNote: t(lang, "processing") });
    try {
      await loadNightStandin();
      toast.success(t(lang, "standinOn"));
    } catch {
      toast.error(t(lang, "decodeFail"));
    } finally {
      patch({ kindBusy: false, processNote: null });
    }
  }

  function onMeasure() {
    if (!getVocalBuffer()) {
      toast.error(t(lang, "emptyVocal"));
      return;
    }
    const cap = captureVoiceCap();
    toast.success(cap.rapped ? t(lang, "takeLive") : t(lang, "rapFirst"));
  }

  async function onKindTap(id: VocalKind) {
    patch({ vocalKind: id });
    if (!canMimic) return;
    patch({ kindBusy: true });
    try {
      const res = await auditionKind(id);
      if (res === "empty") toast.error(t(lang, "emptyVocal"));
      if (res === "rap") toast.error(t(lang, "rapFirst"));
    } catch {
      toast.error(t(lang, "decodeFail"));
    } finally {
      patch({ kindBusy: false });
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">
          STEEL · {t(lang, "vocals")} · {t(lang, "gen3")}
        </p>
        <h1 className="font-display text-3xl text-ink">
          {lang === "et" ? "Kümme kätt. Sinu vahemik." : "Ten kinds. Your range."}
        </h1>
        <p className="max-w-2xl text-pretty text-muted">{t(lang, "capsLead")}</p>
      </header>

      <div className="rounded-[var(--radius-lg)] bg-raised p-4 ring-1 ring-rule">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "nightLane")}</p>
          <button
            type="button"
            role="switch"
            aria-checked={nightLane}
            aria-label={t(lang, "nightLane")}
            onClick={() => {
              const next = !nightLane;
              patch({ nightLane: next, vocalKind: next ? "whisper" : vocalKind });
              if (next) void onStandin();
              else pushAll();
            }}
            className={cn("h-7 w-12 rounded-full ring-1 ring-rule", nightLane ? "bg-live" : "bg-paper")}
          >
            <span className={cn("block size-6 rounded-full bg-ink", nightLane ? "translate-x-5" : "translate-x-0.5")} />
          </button>
        </div>
        <p className="mt-3 font-mono text-2xs tracking-wider text-muted uppercase">
          {nightLane ? `${t(lang, "standinOn")} · ` : ""}
          {t(lang, "quietLead")} · {t(lang, "loudStack")}
        </p>
        <Button type="button" variant="secondary" className="mt-3" disabled={kindBusy} onClick={() => void onStandin()}>
          {t(lang, "standin")}
        </Button>
      </div>

      <section className="rounded-[var(--radius-lg)] bg-raised p-4 ring-1 ring-rule">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "capsTitle")}</p>
          <p className={cn("font-mono text-2xs tracking-wider uppercase", canMimic ? "text-live" : "text-faint")}>
            {canMimic ? t(lang, "mimicOn") : t(lang, "mimicOff")}
          </p>
        </div>
        <p className="mt-2 text-sm text-muted">{canMimic ? t(lang, "takeLive") : t(lang, "tagsOnly")}</p>
        {voiceCap.hasTake ? (
          <dl className="mt-3 grid grid-cols-3 gap-3 font-mono text-sm tabular-nums">
            <div>
              <dt className="text-2xs tracking-wider text-muted uppercase">{t(lang, "f0")}</dt>
              <dd className="text-ink">{voiceCap.f0Hz || "—"} Hz</dd>
            </div>
            <div>
              <dt className="text-2xs tracking-wider text-muted uppercase">{t(lang, "range")}</dt>
              <dd className="text-ink">
                {voiceCap.f0Min && voiceCap.f0Max ? `${voiceCap.f0Min}–${voiceCap.f0Max}` : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-2xs tracking-wider text-muted uppercase">RMS</dt>
              <dd className="text-ink">{voiceCap.rms.toFixed(3)}</dd>
            </div>
          </dl>
        ) : null}
        <ul className="mt-4 flex flex-col gap-2">
          {VOCAL_KINDS.map((id) => {
            const score = voiceCap.scores[id] ?? 0;
            const pct = Math.max(2, Math.min(100, score * 10));
            return (
              <li key={id} className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => patch({ vocalKind: id })}
                  className={cn(
                    "w-16 shrink-0 text-left font-mono text-2xs tracking-wider uppercase",
                    vocalKind === id ? "text-ink" : "text-muted",
                  )}
                >
                  {KIND_LABEL[id]}
                </button>
                <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-paper ring-1 ring-rule">
                  <div
                    className={cn("h-full rounded-full", canMimic ? "bg-live" : "bg-steel/50")}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right font-mono text-2xs tabular-nums text-muted">{score.toFixed(1)}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" disabled={kindBusy || !vocalName} onClick={onMeasure}>
            {t(lang, "measureTake")}
          </Button>
          <Button type="button" variant="live" disabled={kindBusy || !canMimic} onClick={() => void run("kind")}>
            {t(lang, "applyKind")}
          </Button>
        </div>
      </section>

      <div>
        <p className="mb-2 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "variant")}</p>
        <p className="mb-3 text-sm text-muted">{t(lang, "hearKind")}</p>
        <div className="flex flex-wrap gap-2">
          {VOCAL_KINDS.map((id: VocalKind) => (
            <button
              key={id}
              type="button"
              disabled={kindBusy}
              onClick={() => void onKindTap(id)}
              className={cn(
                "min-h-11 rounded-[var(--radius-sm)] px-3 font-mono text-2xs tracking-wider uppercase ring-1 ring-rule",
                vocalKind === id ? "bg-ink text-paper" : "text-muted",
              )}
            >
              {KIND_LABEL[id]}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[var(--radius-lg)] bg-raised p-4 ring-1 ring-rule">
        <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "micTitle")}</p>
        {mic ? (
          <dl className="mt-3 grid grid-cols-2 gap-3 font-mono text-sm tabular-nums">
            <div>
              <dt className="text-2xs tracking-wider text-muted uppercase">In</dt>
              <dd className="truncate text-ink">{mic.label}</dd>
            </div>
            <div>
              <dt className="text-2xs tracking-wider text-muted uppercase">Noise</dt>
              <dd className="text-ink">{mic.noiseFloor.toFixed(3)}</dd>
            </div>
            <div>
              <dt className="text-2xs tracking-wider text-muted uppercase">SR</dt>
              <dd className="text-ink">{mic.sampleRate}</dd>
            </div>
            <div>
              <dt className="text-2xs tracking-wider text-muted uppercase">Pitch</dt>
              <dd className="text-ink">{pitch ? `${Math.round(pitch)} Hz` : "—"}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-2 text-sm text-muted">{t(lang, "micNone")}</p>
        )}
        <label className="mt-4 flex min-h-11 items-center justify-between gap-3">
          <span className="text-sm">{t(lang, "restoreOn")}</span>
          <button
            type="button"
            role="switch"
            aria-checked={restoreOn}
            onClick={() => {
              patch({ restoreOn: !restoreOn });
              pushAll();
            }}
            className={cn("h-7 w-12 rounded-full ring-1 ring-rule", restoreOn ? "bg-live" : "bg-paper")}
          >
            <span className={cn("block size-6 rounded-full bg-ink", restoreOn ? "translate-x-5" : "translate-x-0.5")} />
          </button>
        </label>
        <Fader
          label="Tune"
          value={tuneAmount}
          onChange={(v) => {
            patch({ tuneAmount: v });
            pushAll();
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" disabled={processing} onClick={() => void run("quantize")}>
          {t(lang, "quantize")}
        </Button>
        <Button type="button" variant="secondary" disabled={processing} onClick={() => void run("restore")}>
          {t(lang, "restore")}
        </Button>
        <Button type="button" variant="secondary" disabled={processing} onClick={() => void run("harmony")}>
          {t(lang, "harmony")}
        </Button>
        <Button type="button" variant="secondary" disabled={processing} onClick={() => void run("choir")}>
          {t(lang, "choir")}
        </Button>
        <Button type="button" variant="secondary" disabled={processing} onClick={() => void run("fx")}>
          {t(lang, "fx")}
        </Button>
        <Button type="button" variant="live" disabled={processing} onClick={() => void run("tune")}>
          {t(lang, "tune")}
        </Button>
        <Button type="button" variant="secondary" disabled={processing} onClick={() => void run("mirror")}>
          {t(lang, "analogMirror")}
        </Button>
      </div>

      <div>
        <p className="mb-2 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "fx")}</p>
        <div className="flex flex-wrap gap-2">
          {CHAINS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                patch({ fxChain: c.id });
                pushAll();
              }}
              className={cn(
                "min-h-11 rounded-[var(--radius-sm)] px-3 text-sm ring-1 ring-rule",
                fxChain === c.id ? "bg-ink text-paper" : "text-muted",
              )}
            >
              {t(lang, c.key)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "voiceBank")}</p>
        <div className="flex flex-wrap gap-2">
          {BANKS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => patch({ voiceBank: b.id })}
              className={cn(
                "min-h-11 rounded-[var(--radius-sm)] px-3 text-sm ring-1 ring-rule",
                voiceBank === b.id ? "bg-ink text-paper" : "text-muted",
              )}
            >
              {t(lang, b.key)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "langVocal")}</p>
        <div className="flex flex-wrap gap-2">
          {VOCAL_LANGS.map((id: VocalLang) => (
            <button
              key={id}
              type="button"
              onClick={() => patch({ vocalLang: id })}
              className={cn(
                "min-h-11 min-w-11 rounded-[var(--radius-sm)] px-3 font-mono text-sm uppercase ring-1 ring-rule",
                vocalLang === id ? "bg-ink text-paper" : "text-muted",
              )}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "hook")}</span>
        <textarea
          value={hook}
          rows={4}
          maxLength={400}
          onChange={(e) => patch({ hook: e.target.value })}
          className="min-h-24 rounded-[var(--radius-md)] bg-raised p-3 text-sm text-ink ring-1 ring-rule"
          placeholder={HOOK_PLACEHOLDER[vocalLang]}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <Button type="button" disabled={processing} onClick={() => void onHook()}>
          {t(lang, "generate")}
        </Button>
        <Button type="button" variant="secondary" disabled={busy || !(lyrics || hook).trim()} onClick={() => void onSpeak()}>
          {t(lang, "adlib")}
        </Button>
      </div>
      {lyrics ? (
        <pre className="whitespace-pre-wrap rounded-[var(--radius-md)] bg-paper p-4 text-sm text-ink ring-1 ring-rule">
          {lyrics}
        </pre>
      ) : null}
      {processNote ? <p className="font-mono text-2xs tracking-wider text-copper uppercase">{processNote}</p> : null}
    </div>
  );
}
