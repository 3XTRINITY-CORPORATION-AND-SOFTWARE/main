import { useEffect, useRef } from "react";
import { OLED_H, OLED_W, paintOled } from "@/lib/desk/oled";
import { useDesk } from "@/lib/desk/store";
import { pitchLabel } from "@/lib/desk/engine";

function token(name: string, fallback: string) {
  if (typeof document === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export function SteelOled() {
  const ref = useRef<HTMLCanvasElement>(null);
  const peak = useDesk((s) => s.peak);
  const lufs = useDesk((s) => s.lufs);
  const bpm = useDesk((s) => s.bpm);
  const kare = useDesk((s) => s.kare);
  const playing = useDesk((s) => s.playing);
  const pitch = useDesk((s) => s.pitch);
  const lyrics = useDesk((s) => s.lyrics);
  const palve = useDesk((s) => s.palve);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    const ember = token("--color-ember", "#e8783a");
    const ice = token("--color-ice", "#4aa7d4");
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();
    function tick() {
      if (!ctx) return;
      paintOled(
        ctx,
        {
          peak,
          lufs,
          bpm,
          kare,
          playing,
          key: pitchLabel(pitch),
          crawl: palve || lyrics || "KARESTIK TUNNEL MIRROR NEST",
          t: reduce ? 0 : (performance.now() - t0) / 1000,
        },
        ember,
        ice,
      );
      raf = requestAnimationFrame(tick);
    }
    tick();
    return () => cancelAnimationFrame(raf);
  }, [peak, lufs, bpm, kare, playing, pitch, lyrics, palve]);

  return (
    <div className="oled-panel rounded-[var(--radius-md)] border border-rule bg-paper p-3">
      <p className="font-mono text-2xs tracking-wider text-ice uppercase">SSD1315 · PAGE0–7 · 128×64</p>
      <canvas
        ref={ref}
        width={OLED_W}
        height={OLED_H}
        className="mt-2 w-full max-w-sm"
        style={{ imageRendering: "pixelated", aspectRatio: "128 / 64", height: "auto" }}
        aria-label="STEEL OLED"
      />
    </div>
  );
}
