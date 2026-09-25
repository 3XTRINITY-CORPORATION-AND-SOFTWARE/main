const KEY = "steel-connectors-v1";

export interface ConnectorVault {
  version: 1;
  savedAt: number;
  banks: string[];
  extras: string[];
  visemes: string[];
  patterns: { id: string; src: string }[];
}

const DEFAULT_PATTERNS: ConnectorVault["patterns"] = [
  { id: "rings", src: "drawRings — concentric kick rings, sage phosphor" },
  { id: "tunnel", src: "drawTunnel — Kärestik tunnel, no gravity lock" },
  { id: "scope", src: "drawScope — 1000-bin wave, cream ink" },
  { id: "bars", src: "drawBars — spectrum plates" },
  { id: "lips", src: "drawLips — viseme lock from lyrics + rms" },
  { id: "film", src: "drawFilm — still + wave + mouth, recordable" },
];

export function loadVault(): ConnectorVault {
  if (typeof localStorage === "undefined") return freshVault();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return freshVault();
    const v = JSON.parse(raw) as ConnectorVault;
    if (v?.version !== 1) return freshVault();
    return v;
  } catch {
    return freshVault();
  }
}

export function saveVault(partial: Partial<ConnectorVault>) {
  const next: ConnectorVault = { ...loadVault(), ...partial, version: 1, savedAt: Date.now() };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* quota */
  }
  return next;
}

export function freshVault(): ConnectorVault {
  return {
    version: 1,
    savedAt: Date.now(),
    banks: [],
    extras: [],
    visemes: ["rest", "closed", "wide", "round", "teeth", "open"],
    patterns: DEFAULT_PATTERNS,
  };
}

export function vaultJson(v: ConnectorVault) {
  return JSON.stringify(v, null, 2);
}
