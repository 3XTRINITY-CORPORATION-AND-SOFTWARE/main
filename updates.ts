import type { KernelManifest } from "./types";
import { useSteel } from "./store";
import { armKernel } from "./engine";

export function versionGte(a: string, b: string) {
  const pa = a.split(".").map((n) => Number(n) || 0);
  const pb = b.split(".").map((n) => Number(n) || 0);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] ?? 0) > (pb[i] ?? 0)) return true;
    if ((pa[i] ?? 0) < (pb[i] ?? 0)) return false;
  }
  return true;
}

export async function fetchManifest(): Promise<KernelManifest> {
  const res = await fetch(`/kernel/manifest.json?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Kernel channel unreachable");
  return (await res.json()) as KernelManifest;
}

export async function checkChannel() {
  const man = await fetchManifest();
  useSteel.getState().patch({ latest: man.latest });
  return man;
}

export async function applyKernel(version: string) {
  const s = useSteel.getState();
  s.patch({ updating: true, error: null });
  try {
    const man = await fetchManifest();
    const nextAddons = { ...s.addons };
    for (const addon of man.addons) {
      if (!versionGte(version, addon.minKernel)) nextAddons[addon.id] = false;
      else if (addon.id === "transient") nextAddons[addon.id] = true;
    }
    s.patch({ kernel: version, addons: nextAddons, latest: man.latest, updating: false });
    if (s.armed) await armKernel();
  } catch (err) {
    s.patch({
      updating: false,
      error: err instanceof Error ? err.message : "Update failed",
    });
  }
}
