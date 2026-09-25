import { cn } from "@/lib/utils";

export function LevelMeter({ peak, rms, vertical = false }: { peak: number; rms: number; vertical?: boolean }) {
  const p = Math.min(1, peak);
  const r = Math.min(1, rms * 2.2);
  const clip = p > 0.95;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-xs)] bg-paper ring-1 ring-rule",
        vertical ? "h-28 w-2.5" : "h-2.5 w-full",
      )}
      aria-hidden
    >
      <div
        className={cn("absolute bg-live/80", vertical ? "bottom-0 w-full" : "top-0 left-0 h-full")}
        style={vertical ? { height: `${r * 100}%` } : { width: `${r * 100}%` }}
      />
      <div
        className={cn(
          "absolute",
          clip ? "bg-clip" : "bg-ink",
          vertical ? "w-full" : "top-0 h-full",
        )}
        style={
          vertical
            ? { bottom: `${p * 100}%`, height: 2 }
            : { left: `${p * 100}%`, width: 2, height: "100%" }
        }
      />
    </div>
  );
}

export function DualMeter({ peak, mid, side }: { peak: number; mid: number; side: number }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <p className="mb-1 font-mono text-2xs tracking-wider text-muted uppercase">Mid</p>
        <LevelMeter peak={peak} rms={mid} />
      </div>
      <div>
        <p className="mb-1 font-mono text-2xs tracking-wider text-muted uppercase">Side</p>
        <LevelMeter peak={peak} rms={side} />
      </div>
    </div>
  );
}
