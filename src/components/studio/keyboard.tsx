import { useEffect } from "react";
import { sendNote } from "@/lib/studio/engine";
import { useStudio } from "@/lib/studio/store";
import { cn } from "@/lib/utils";

const KEYS = [
  { k: "z", midi: 60, black: false },
  { k: "s", midi: 61, black: true },
  { k: "x", midi: 62, black: false },
  { k: "d", midi: 63, black: true },
  { k: "c", midi: 64, black: false },
  { k: "v", midi: 65, black: false },
  { k: "g", midi: 66, black: true },
  { k: "b", midi: 67, black: false },
  { k: "h", midi: 68, black: true },
  { k: "n", midi: 69, black: false },
  { k: "j", midi: 70, black: true },
  { k: "m", midi: 71, black: false },
];

export function StudioKeys() {
  const last = useStudio((s) => s.lastNote);

  useEffect(() => {
    const down = new Set<string>();
    const onDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.repeat) return;
      const hit = KEYS.find((k) => k.k === e.key.toLowerCase());
      if (!hit) return;
      e.preventDefault();
      down.add(hit.k);
      sendNote(true, hit.midi);
    };
    const onUp = (e: KeyboardEvent) => {
      const hit = KEYS.find((k) => k.k === e.key.toLowerCase());
      if (!hit) return;
      down.delete(hit.k);
      sendNote(false, hit.midi);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return (
    <div>
      <p className="mb-2 font-mono text-2xs tracking-wider text-muted uppercase">Lead · {last}</p>
      <div className="relative flex h-16 overflow-hidden rounded-[var(--radius-md)] ring-1 ring-rule">
        {KEYS.filter((k) => !k.black).map((k) => (
          <button
            key={k.k}
            type="button"
            className="min-h-11 min-w-0 flex-1 border-r border-rule bg-ink text-paper last:border-r-0"
            onPointerDown={(e) => {
              e.preventDefault();
              sendNote(true, k.midi);
            }}
            onPointerUp={() => sendNote(false, k.midi)}
            onPointerLeave={() => sendNote(false, k.midi)}
          >
            <span className="font-mono text-2xs uppercase">{k.k}</span>
          </button>
        ))}
        {KEYS.filter((k) => k.black).map((k) => {
          const whites = KEYS.filter((x) => !x.black);
          const idx = whites.findIndex((w) => w.midi === k.midi - 1);
          const left = ((idx + 1) / whites.length) * 100;
          return (
            <button
              key={k.k}
              type="button"
              className={cn(
                "absolute top-0 h-9 w-[7%] -translate-x-1/2 rounded-b-[var(--radius-sm)] bg-paper text-ink ring-1 ring-rule",
              )}
              style={{ left: `${left}%` }}
              onPointerDown={(e) => {
                e.preventDefault();
                sendNote(true, k.midi);
              }}
              onPointerUp={() => sendNote(false, k.midi)}
              onPointerLeave={() => sendNote(false, k.midi)}
            />
          );
        })}
      </div>
    </div>
  );
}
