import { EXTRA_IDS } from "./theory";
import { loadVault, saveVault } from "./connectors";
import { armedCurve } from "./banks";
import { pushAll } from "./engine";
import { pathBiasFrom, signedKarestik } from "./pyramid";
import { useStudio } from "./store";

let timer: ReturnType<typeof setTimeout> | null = null;
let running = false;

function beat() {
  if (!running) return;
  try {
    const s = useStudio.getState();
    if (s.armed) pushAll();
    const banks = Object.values(s.recs)
      .map((r) => r.bankId)
      .filter((id): id is string => Boolean(id));
    const prev = loadVault();
    saveVault({
      banks,
      extras: [...EXTRA_IDS],
      visemes: prev.visemes,
      patterns: prev.patterns,
    });
    void armedCurve(s.recs);
    void signedKarestik(s.sampleRate, s.bufferSize, Math.max(1, s.voices), pathBiasFrom(s.path));
  } catch {
    /* watch must not die */
  }
  const hidden = typeof document !== "undefined" && document.visibilityState === "hidden";
  timer = setTimeout(beat, hidden ? 18000 : 4000);
}

export function startStudioWatch() {
  if (running) return;
  running = true;
  beat();
}

export function stopStudioWatch() {
  running = false;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}
