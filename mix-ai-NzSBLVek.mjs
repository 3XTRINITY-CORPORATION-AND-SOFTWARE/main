import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mix-ai-NzSBLVek.js
var suggestMix_createServerFn_handler = createServerRpc({
	id: "74e523f54ad27ab7047434cafef075bd7d66de84597d2e63234ea513c82fc438",
	name: "suggestMix",
	filename: "src/lib/desk/mix-ai.ts"
}, (opts) => suggestMix.__executeServer(opts));
var suggestMix = createServerFn({ method: "POST" }).validator((input) => input).handler(suggestMix_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "offline"
	};
	const lang = data.lang === "et" ? "Estonian" : data.lang === "ru" ? "Russian" : "English";
	const prompt = `You are a hardstyle/rawstyle mixer. Kärestik: tunnel kick to mono-centre, mirror the same vocal in stereo, nest a quieter reflection. V=s/t punch=${data.kare.toFixed(2)}. Intent: ${data.palve || "none"}. Snapshot: peak=${data.peak.toFixed(3)} rms=${data.rms.toFixed(3)} lufs=${data.lufs.toFixed(1)} pitchHz=${data.pitch.toFixed(1)} bpm=${data.bpm} beat=${data.hasBeat} vocal=${data.hasVocal} clips=${data.clips} genre=${data.genre}. Reply in ${lang}, max 90 words: 1) autotune 0-1, 2) raise V or nest, 3) vocal vs kick, 4) one cut. No clone. No marketing. No emoji.`;
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 260,
			messages: [{
				role: "user",
				content: prompt
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI ${res.status}`
	};
	return {
		ok: true,
		text: (await res.json()).choices?.[0]?.message?.content ?? ""
	};
});
//#endregion
export { suggestMix_createServerFn_handler };
