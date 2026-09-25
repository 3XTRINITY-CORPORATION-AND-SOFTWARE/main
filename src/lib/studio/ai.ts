import { createServerFn } from "@tanstack/react-start";
import { KIND_VOICE } from "./night";

export const writeHook = createServerFn({ method: "POST" })
  .validator((input: { lang: "et" | "en" | "ru" | "es" | "de"; genre: string; seed: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "offline" };
    const seed = data.seed.trim();
    if (!seed) return { ok: false as const, error: "tags" };
    const langName =
      data.lang === "et"
        ? "Estonian"
        : data.lang === "ru"
          ? "Russian"
          : data.lang === "es"
            ? "Spanish"
            : data.lang === "de"
              ? "German"
              : "English";
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        signal: AbortSignal.timeout(12000),
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 220,
          messages: [
            {
              role: "system",
              content:
                "You write short vocal hooks from a locked seed. Stay in the requested language and the seed's own alphabet (Cyrillic, Estonian õäöüšž, Spanish accents — never fold into A-Z English). Keep locked lines verbatim. Do not invent a generic club / steel / neon stock hook. Night lane: quiet lead, louder stack. No emoji. No quotes around the whole answer. No celebrity names. Return lyrics only.",
            },
            {
              role: "user",
              content: `Language: ${langName}. Genre: ${data.genre}. SEED (locked diction):\n${seed.slice(0, 280)}\nContinue in that speaker. 4-line hook, under 80 words.`,
            },
          ],
        }),
      });
      if (!res.ok) return { ok: false as const, error: `xAI ${res.status}` };
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      return { ok: true as const, text: body.choices?.[0]?.message?.content?.trim() ?? "" };
    } catch (err) {
      const name = err instanceof Error ? err.name : "";
      if (name === "TimeoutError" || name === "AbortError") return { ok: false as const, error: "timeout" };
      return { ok: false as const, error: "upstream" };
    }
  });

export const speakHook = createServerFn({ method: "POST" })
  .validator(
    (input: {
      text: string;
      bank: "lead" | "harmony" | "choir" | "adlib";
      kind?: "scream" | "growl" | "belt" | "rap" | "chop" | "speak" | "whisper" | "air" | "choir" | "opera";
      lang?: "et" | "en" | "ru" | "es" | "de";
    }) => input,
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "offline" };
    const text = data.text.slice(0, 180);
    if (!text) return { ok: false as const, error: "empty" };
    const voice =
      (data.kind && KIND_VOICE[data.kind]) ||
      (data.bank === "harmony" ? "eve" : data.bank === "adlib" ? "helix" : data.bank === "choir" ? "orion" : "zagan");
    const langHint =
      data.lang === "et"
        ? "et"
        : data.lang === "ru"
          ? "ru"
          : data.lang === "es"
            ? "es"
            : data.lang === "de"
              ? "de"
              : "en";
    const res = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({ text, voice_id: voice, language: langHint }),
    });
    if (!res.ok) {
      const alt = await fetch("https://api.x.ai/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          model: "grok-voice-latest",
          voice,
          input: text,
          language: langHint,
        }),
      });
      if (!alt.ok) return { ok: false as const, error: `xAI ${alt.status}` };
      const buf = await alt.arrayBuffer();
      return { ok: true as const, audio: bufferToB64(buf), mime: alt.headers.get("content-type") || "audio/mpeg" };
    }
    const buf = await res.arrayBuffer();
    return { ok: true as const, audio: bufferToB64(buf), mime: res.headers.get("content-type") || "audio/mpeg" };
  });

export const detectLyrics = createServerFn({ method: "POST" })
  .validator((input: { genre: string; hint: string; lang: "et" | "en" }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "offline" };
    const lang = data.lang === "et" ? "Estonian" : "English";
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 180,
        messages: [
          {
            role: "user",
            content: `Infer a short ${lang} lyric caption (max 40 words) for a ${data.genre} visualizer. Direction: ${data.hint.slice(0, 200) || "steel club night"}. No emoji. Lyrics only.`,
          },
        ],
      }),
    });
    if (!res.ok) return { ok: false as const, error: `xAI ${res.status}` };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { ok: true as const, text: body.choices?.[0]?.message?.content?.trim() ?? "" };
  });

export const visualParams = createServerFn({ method: "POST" })
  .validator((input: { prompt: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "offline" };
    const prompt = data.prompt.trim().slice(0, 500);
    if (!prompt) return { ok: false as const, error: "empty" };
    const res = await fetch("https://api.x.ai/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(20000),
      body: JSON.stringify({
        model: "grok-imagine-image",
        prompt: `${prompt}. Industrial steel mixing desk atmosphere, graphite, cream paper light, no neon, no purple, photoreal editorial still.`,
        n: 1,
        response_format: "url",
      }),
    });
    if (!res.ok) return { ok: false as const, error: `xAI ${res.status}` };
    const body = (await res.json()) as { data?: { url?: string }[] };
    const url = body.data?.[0]?.url;
    if (!url) return { ok: false as const, error: "empty" };
    return { ok: true as const, url };
  });

export const scaleRadar = createServerFn({ method: "POST" })
  .validator((input: { title: string; note: string; lang: "et" | "en" }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "offline" };
    const lang = data.lang === "et" ? "Estonian" : "English";
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 160,
        messages: [
          {
            role: "user",
            content: `A DAW shipped this: "${data.title}". ${data.note.slice(0, 280)}. In ${lang}, 50 words: how STEEL STUDIO should scale it for Hardstyle/Rap production. No emoji. No marketing fluff.`,
          },
        ],
      }),
    });
    if (!res.ok) return { ok: false as const, error: `xAI ${res.status}` };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { ok: true as const, text: body.choices?.[0]?.message?.content?.trim() ?? "" };
  });

function bufferToB64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}
