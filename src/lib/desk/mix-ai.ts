import { createServerFn } from "@tanstack/react-start";

export type MixSnapshot = {
  peak: number;
  rms: number;
  lufs: number;
  pitch: number;
  hasBeat: boolean;
  hasVocal: boolean;
  lang: "et" | "en" | "ru";
  genre: string;
  clips: number;
  bpm: number;
  kare: number;
  palve: string;
};

export const suggestMix = createServerFn({ method: "POST" })
  .validator((input: MixSnapshot) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "offline" };
    const lang = data.lang === "et" ? "Estonian" : data.lang === "ru" ? "Russian" : "English";
    const prompt = `You are a hardstyle/rawstyle mixer. Kärestik: tunnel kick to mono-centre, mirror the same vocal in stereo, nest a quieter reflection. V=s/t punch=${data.kare.toFixed(2)}. Intent: ${data.palve || "none"}. Snapshot: peak=${data.peak.toFixed(3)} rms=${data.rms.toFixed(3)} lufs=${data.lufs.toFixed(1)} pitchHz=${data.pitch.toFixed(1)} bpm=${data.bpm} beat=${data.hasBeat} vocal=${data.hasVocal} clips=${data.clips} genre=${data.genre}. Reply in ${lang}, max 90 words: 1) autotune 0-1, 2) raise V or nest, 3) vocal vs kick, 4) one cut. No clone. No marketing. No emoji.`;
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 260,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) return { ok: false as const, error: `xAI ${res.status}` };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content ?? "";
    return { ok: true as const, text };
  });
