import { useMemo, useState } from "react";
import { ATLAS, ATLAS_COUNT } from "@/lib/studio/atlas";
import { PLACES, type PlaceId } from "@/lib/studio/places";
import { useRack } from "@/lib/studio/store";
import { EXTRA_IDS, type ExtraId } from "@/lib/studio/theory";
import { cn } from "@/lib/utils";

export function SteelAtlas({ compact = false }: { compact?: boolean }) {
  const [extra, setExtra] = useState<ExtraId>(EXTRA_IDS[0]);
  const pins = useRack((s) => s.pins);
  const togglePin = useRack((s) => s.togglePin);
  const cells = useMemo(() => ATLAS.filter((c) => c.extra === extra), [extra]);
  const loaded = {
    os: pins.os.length,
    web: pins.web.length,
    host: pins.host.length,
  };

  return (
    <div className="min-w-0 max-w-full">
      <p className="font-display text-3xl tabular-nums leading-none">{ATLAS_COUNT} × 3</p>
      <p className="mt-1 font-mono text-2xs tracking-wider text-muted uppercase">
        OS-target · 10 extras × 20 banks + 5 plugins · pin per place
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {PLACES.map((p) => (
          <div key={p.id} className="rounded-[var(--radius-sm)] border border-rule px-2 py-2">
            <p className="font-mono text-2xs tracking-wider text-muted uppercase">{p.id}</p>
            <p className="mt-1 font-display text-xl tabular-nums leading-none">
              {loaded[p.id]}
              <span className="font-mono text-2xs text-faint"> / {ATLAS_COUNT}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="nav-scroll mt-3 flex max-w-full flex-nowrap gap-1 overflow-x-auto">
        {EXTRA_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setExtra(id)}
            className={cn(
              "min-h-11 shrink-0 rounded-[var(--radius-sm)] border px-2 font-mono text-2xs uppercase",
              extra === id ? "border-ink bg-ink text-paper" : "border-rule text-muted",
            )}
          >
            {id}
          </button>
        ))}
      </div>
      {compact ? (
        <p className="mt-3 font-mono text-2xs text-faint">
          {cells.length} cells on {extra} · click OS / WEB / HOST to pin
        </p>
      ) : (
        <ul className="mt-3 max-h-80 divide-y divide-rule overflow-auto border-y border-rule">
          {cells.map((c) => (
            <li key={c.i} className="flex min-w-0 flex-wrap items-center gap-2 py-2">
              <span className="w-8 font-mono text-2xs tabular-nums text-faint">{c.i}</span>
              <span className="w-20 truncate font-mono text-2xs uppercase text-muted">{c.target}</span>
              {(["os", "web", "host"] as PlaceId[]).map((place) => {
                const on = pins[place].includes(c.i);
                return (
                  <button
                    key={place}
                    type="button"
                    aria-pressed={on}
                    onClick={() => togglePin(place, c.i)}
                    className={cn(
                      "min-h-11 min-w-11 rounded-[var(--radius-sm)] border px-2 font-mono text-2xs uppercase",
                      on ? "border-ink bg-ink text-paper" : "border-rule text-muted",
                    )}
                  >
                    {place}
                  </button>
                );
              })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
