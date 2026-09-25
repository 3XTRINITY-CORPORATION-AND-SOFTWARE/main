import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/geo-CMCODtKA.js
/** Free ip-api.com: HTTP only, 45/min, no CORS. Server-side, never from the page. */
var BASE = "http://ip-api.com/json/";
var FIELDS = "status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query,proxy,hosting,mobile";
var TIMEOUT_MS = 8e3;
var CACHE_MS = 6e4;
var holdUntil = 0;
var lastOk = null;
var lastAt = 0;
var lastQuery = "";
var inFlight = null;
function safeQuery(raw) {
	const value = raw.trim();
	if (!value) return "";
	if (value.length > 253) return null;
	if (/^[0-9a-fA-F:.]+$/.test(value) && /[:.]/.test(value)) return value;
	if (/^[a-zA-Z0-9.-]+$/.test(value) && value.includes(".")) return value;
	return null;
}
function holdLeft() {
	return Math.max(0, Math.ceil((holdUntil - Date.now()) / 1e3));
}
async function lookupOnce(query) {
	const wait = holdLeft();
	if (wait > 0) {
		if (lastOk) return lastOk;
		return {
			ok: false,
			error: `rate ${wait}s`
		};
	}
	if (lastOk && lastQuery === query && Date.now() - lastAt < CACHE_MS) return lastOk;
	const url = `${BASE}${query ? encodeURIComponent(query) : ""}?fields=${FIELDS}&lang=en`;
	let res;
	try {
		res = await fetch(url, {
			headers: {
				Accept: "application/json",
				"User-Agent": "steel-studio/1.0"
			},
			signal: AbortSignal.timeout(TIMEOUT_MS)
		});
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
	const remain = res.headers.get("x-rl") ?? res.headers.get("X-Rl") ?? "";
	const ttl = res.headers.get("x-ttl") ?? res.headers.get("X-Ttl") ?? "";
	const waitSec = Number.parseInt(ttl || "60", 10) || 60;
	if (res.status === 429) {
		holdUntil = Date.now() + waitSec * 1e3;
		if (lastOk) return lastOk;
		return {
			ok: false,
			error: `rate ${waitSec}s`
		};
	}
	if (!res.ok) return {
		ok: false,
		error: `geo ${res.status}`
	};
	const body = await res.json();
	if (body.status !== "success") return {
		ok: false,
		error: body.message ?? "fail"
	};
	const ok = {
		ok: true,
		line: [
			body.city,
			body.regionName,
			body.countryCode
		].filter(Boolean).join(" · "),
		isp: body.isp ?? "",
		query: body.query ?? query,
		tz: body.timezone ?? "",
		remain
	};
	lastOk = ok;
	lastAt = Date.now();
	lastQuery = query;
	if (remain === "0") holdUntil = Date.now() + waitSec * 1e3;
	return ok;
}
var lookupHost_createServerFn_handler = createServerRpc({
	id: "c244bf9d2a84abd80e71350a3b24ae789f10e088f6681ba97f3513e34509772a",
	name: "lookupHost",
	filename: "src/lib/studio/geo.ts"
}, (opts) => lookupHost.__executeServer(opts));
var lookupHost = createServerFn({ method: "POST" }).validator((input) => input).handler(lookupHost_createServerFn_handler, async ({ data }) => {
	const parsed = safeQuery(data.query ?? "");
	if (parsed === null) return {
		ok: false,
		error: "query"
	};
	if (inFlight) return inFlight;
	const job = lookupOnce(parsed).finally(() => {
		inFlight = null;
	});
	inFlight = job;
	return job;
});
//#endregion
export { lookupHost_createServerFn_handler };
