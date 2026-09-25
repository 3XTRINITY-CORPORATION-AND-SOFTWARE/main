import { isolateForTab } from "@/lib/steel/isolate";
import { t, type Lang } from "@/lib/i18n";
import { useSteel } from "@/lib/steel/store";
import { PLACE_HOME, PLACES, placeForTab, type PlaceId } from "@/lib/studio/places";
import { useRack } from "@/lib/studio/store";
import { cn } from "@/lib/utils";

function copy(lang: Lang, id: PlaceId) {
  const p = PLACES.find((x) => x.id === id) ?? PLACES[0];
  if (lang === "et") return p.et;
  if (lang === "ru") return p.ru;
  return p.en;
}

export function PlaceBar({ compact = false, navigate = false }: { compact?: boolean; navigate?: boolean }) {
  const lang = useSteel((s) => s.lang);
  const tab = useSteel((s) => s.tab);
  const setTab = useSteel((s) => s.setTab);
  const rackPlace = useRack((s) => s.place);
  const setRack = useRack((s) => s.set);
  const current = navigate ? placeForTab(tab) : rackPlace;

  function pick(id: PlaceId) {
    setRack({ place: id });
    if (!navigate) return;
    if (placeForTab(useSteel.getState().tab) === id) return;
    const home = PLACE_HOME[id];
    try {
      isolateForTab(home);
    } catch {
      /* still switch */
    }
    setTab(home);
  }

  return (
    <div role="group" aria-label={t(lang, "placeKicker")} className="flex min-w-0 max-w-full flex-wrap gap-1">
      {PLACES.map((p) => (
        <button
          key={p.id}
          type="button"
          data-place={p.id}
          onClick={() => pick(p.id)}
          aria-pressed={current === p.id}
          aria-label={p.id.toUpperCase()}
          className={cn(
            "min-h-11 rounded-[var(--radius-sm)] border px-2.5 font-mono text-2xs tracking-wider uppercase transition-colors duration-[var(--motion-quick)]",
            compact ? "min-w-11" : "px-3 py-2 text-left",
            current === p.id ? "border-ink bg-ink text-paper" : "border-rule text-muted hover:text-ink",
          )}
        >
          <span className="block">{p.id}</span>
          {compact ? null : (
            <span className="mt-1 block font-sans text-2xs normal-case tracking-normal opacity-80">{copy(lang, p.id)}</span>
          )}
        </button>
      ))}
    </div>
  );
}
