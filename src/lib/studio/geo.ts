import { createServerFn } from "@tanstack/react-start";

/** Free ip-api.com: HTTP only, 45/min, no CORS. Server-side, never from the page. */
const BASE = "http://ip-api.com/json/";
const FIELDS =
  "status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query,proxy,hosting,mobile";
const TIMEOUT_MS = 8000;
const CACHE_MS = 60_000;

type GeoOk = {
  ok: true;
  line: string;
  isp: string;
  query: string;
  tz: string;
  remain: string;
};
type GeoFail = { ok: false; error: string };
type GeoResult = GeoOk | GeoFail;

let holdUntil = 0;
let lastOk: GeoOk | null = null;
let lastAt = 0;
let lastQuery = "";
let inFlight: Promise<GeoResult> | null = null;

function safeQuery(raw: string) {
  const value = raw.trim();
  if (!value) return "";
  if (value.length > 253) return null;
  if (/^[0-9a-fA-F:.]+$/.test(value) && /[:.]/.test(value)) return value;
  if (/^[a-zA-Z0-9.-]+$/.test(value) && value.includes(".")) return value;
  return null;
}

function holdLeft() {
  return Math.max(0, Math.ceil((holdUntil - Date.now()) / 1000));
}

async function lookupOnce(query: string): Promise<GeoResult> {
  const wait = holdLeft();
  if (wait > 0) {
    if (lastOk) return lastOk;
    return { ok: false, error: `rate ${wait}s` };
  }
  if (lastOk && lastQuery === query && Date.now() - lastAt < CACHE_MS) return lastOk;

  const path = query ? encodeURIComponent(query) : "";
  const url = `${BASE}${path}?fields=${FIELDS}&lang=en`;
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "steel-studio/1.0" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    const name = err instanceof Error ? err.name : "";
    if (name === "TimeoutError" || name === "AbortError") return { ok: false, error: "timeout" };
    return { ok: false, error: "upstream" };
  }

  const remain = res.headers.get("x-rl") ?? res.headers.get("X-Rl") ?? "";
  const ttl = res.headers.get("x-ttl") ?? res.headers.get("X-Ttl") ?? "";
  const waitSec = Number.parseInt(ttl || "60", 10) || 60;

  if (res.status === 429) {
    holdUntil = Date.now() + waitSec * 1000;
    if (lastOk) return lastOk;
    return { ok: false, error: `rate ${waitSec}s` };
  }
  if (!res.ok) return { ok: false, error: `geo ${res.status}` };

  const body = (await res.json()) as {
    status?: string;
    message?: string;
    country?: string;
    countryCode?: string;
    regionName?: string;
    city?: string;
    timezone?: string;
    isp?: string;
    query?: string;
  };
  if (body.status !== "success") return { ok: false, error: body.message ?? "fail" };

  const ok: GeoOk = {
    ok: true,
    line: [body.city, body.regionName, body.countryCode].filter(Boolean).join(" · "),
    isp: body.isp ?? "",
    query: body.query ?? query,
    tz: body.timezone ?? "",
    remain,
  };
  lastOk = ok;
  lastAt = Date.now();
  lastQuery = query;
  if (remain === "0") holdUntil = Date.now() + waitSec * 1000;
  return ok;
}

export const lookupHost = createServerFn({ method: "POST" })
  .validator((input: { query?: string }) => input)
  .handler(async ({ data }): Promise<GeoResult> => {
    const parsed = safeQuery(data.query ?? "");
    if (parsed === null) return { ok: false, error: "query" };
    if (inFlight) return inFlight;
    const job = lookupOnce(parsed).finally(() => {
      inFlight = null;
    });
    inFlight = job;
    return job;
  });
