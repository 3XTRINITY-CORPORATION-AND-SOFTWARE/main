import { stopSource } from "@/lib/aura/engine";
import { stopLiveMic, stopMix } from "@/lib/desk/engine";
import { panic } from "@/lib/steel/engine";
import { useSteel } from "@/lib/steel/store";
import type { SteelTab } from "@/lib/steel/types";

/** Three places: OS kernel is the motor. Web Mix/Studio is the remote —
 *  leaving the remote must not disarm the OS. Mix and Studio share the desk graph. */
export function isolateForTab(next: SteelTab) {
  const cur = useSteel.getState().tab;
  if (cur === next) return;
  const remote = next === "desk" || next === "studio";
  const stayingOs =
    (cur === "kernel" || cur === "console" || cur === "pipeline") &&
    (next === "kernel" || next === "console" || next === "pipeline");
  if (!remote) {
    stopMix();
    stopLiveMic();
  }
  void stopSource();
  try {
    if (cur === "console" && !stayingOs && !remote) panic();
  } catch {
    /* tab switch still proceeds */
  }
}
