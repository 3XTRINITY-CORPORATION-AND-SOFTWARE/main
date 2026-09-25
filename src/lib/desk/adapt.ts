/** Web is a remote of the OS kernel. Same commander on a narrow window. */

export type DeskTier = "remote" | "desk";

export type DeskAdapt = {
  tier: DeskTier;
  cores: number;
  videoW: number;
  videoH: number;
  label: string;
};

export const DESK_DEFAULT: DeskAdapt = {
  tier: "desk",
  cores: 4,
  videoW: 1920,
  videoH: 1080,
  label: "WEB remote · OS kernel",
};

export function probeDesk(): DeskAdapt {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return DESK_DEFAULT;
  }
  const cores = navigator.hardwareConcurrency || 4;
  let narrow = false;
  try {
    narrow = window.matchMedia("(max-width: 700px)").matches;
  } catch {
    return { ...DESK_DEFAULT, cores };
  }
  if (narrow) {
    return { tier: "remote", cores, videoW: 1280, videoH: 720, label: "WEB remote · 720p30" };
  }
  return { tier: "desk", cores, videoW: 1920, videoH: 1080, label: "WEB remote · OS kernel" };
}

export function wordClip(s: string, n: number) {
  const words = s.trim().split(/\s+/).filter(Boolean);
  if (words.length <= n) return s;
  return words.slice(0, n).join(" ");
}

export function wordCount(s: string) {
  return s.trim() ? s.trim().split(/\s+/).filter(Boolean).length : 0;
}
