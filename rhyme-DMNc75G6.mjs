import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rhyme-DMNc75G6.js
var lockRhyme_createServerFn_handler = createServerRpc({
	id: "e366012e87c7f9f61afe69826e18e78acf2adce9c73cb30ecb29117424df0845",
	name: "lockRhyme",
	filename: "src/lib/studio/rhyme.ts"
}, (opts) => lockRhyme.__executeServer(opts));
var lockRhyme = createServerFn({ method: "POST" }).validator((input) => input).handler(lockRhyme_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "offline"
	};
	const seed = data.seed.slice(0, 1200);
	if (!seed.trim()) return {
		ok: false,
		error: "empty"
	};
	const langName = data.lang === "et" ? "Estonian" : data.lang === "ru" ? "Russian" : data.lang === "es" ? "Spanish" : data.lang === "de" ? "German" : "English";
	const job = data.want === "hook" ? "Write a 4 or 8 bar hook from the locked images. Do not replace locked lines." : data.want === "verse" ? "Write the next verse in the same speaker and takt. Keep locked lines verbatim." : "Fix spelling, takt, and broken syntax only. Do not rewrite meaning or slang.";
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			signal: AbortSignal.timeout(12e3),
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 700,
				messages: [{
					role: "system",
					content: "You are STEEL rhyme-lock. Locked seed lines stay verbatim. Stay in the user's language mix, including Estonian, Russian, Spanish, German — not A–Z only. No emoji. No moral rewrite. No stereotypical rap filler, no stock reactions, no celebrity cadence. Keep the speaker's real diction even when it is quiet or odd. Output: 1) full lyric 2) locked phrases 3) fixes 4) rhyme map of end words."
				}, {
					role: "user",
					content: `Language mix: ${langName}. BPM ${data.bpm}. Task: ${job}\n\nSEED (locked):\n${seed}`
				}]
			})
		});
		if (!res.ok) return {
			ok: false,
			error: `xAI ${res.status}`
		};
		return {
			ok: true,
			text: (await res.json()).choices?.[0]?.message?.content?.trim() ?? ""
		};
	} catch (err) {
		const name = err instanceof Error ? err.name : "";
		if (name === "TimeoutError" || name === "AbortError") return {
			ok: false,
			error: "timeout"
		};
		return {
			ok: false,
			error: "upstream"
		};
	}
});
//#endregion
export { lockRhyme_createServerFn_handler };
