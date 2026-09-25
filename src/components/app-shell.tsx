import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { PlaceBar } from "@/components/place-bar";
import { teardownAura } from "@/lib/aura/engine";
import { teardownDesk } from "@/lib/desk/engine";
import { t, nextLang, type I18nKey } from "@/lib/i18n";
import { disarmKernel } from "@/lib/steel/engine";
import { isolateForTab } from "@/lib/steel/isolate";
import { bindComputerKeys, unbindComputerKeys } from "@/lib/steel/midi";
import { hydrateSteel, useSteel, watchSteelPersist } from "@/lib/steel/store";
import type { SteelTab } from "@/lib/steel/types";
import { checkChannel, versionGte } from "@/lib/steel/updates";
import { placeForTab, type PlaceId } from "@/lib/studio/places";
import { useRack } from "@/lib/studio/store";
import { cn } from "@/lib/utils";

const GROUPS: { place: PlaceId | "lab"; label: I18nKey; items: { id: SteelTab; key: I18nKey }[] }[] = [
  {
    place: "os",
    label: "placeOs",
    items: [
      { id: "kernel", key: "kernel" },
      { id: "console", key: "console" },
      { id: "pipeline", key: "pipeline" },
    ],
  },
  { place: "web", label: "placeWeb", items: [{ id: "desk", key: "desk" }, { id: "studio", key: "studio" }] },
  { place: "host", label: "placeHost", items: [{ id: "hosts", key: "hosts" }] },
  { place: "lab", label: "placeLab", items: [{ id: "aura", key: "aura" }, { id: "audit", key: "audit" }] },
];

export function AppShell({ children }: { children: ReactNode }) {
  const tab = useSteel((s) => s.tab);
  const setTab = useSteel((s) => s.setTab);
  const lang = useSteel((s) => s.lang);
  const patch = useSteel((s) => s.patch);
  const armed = useSteel((s) => s.armed);
  const kernel = useSteel((s) => s.kernel);
  const latest = useSteel((s) => s.latest);
  const behind = latest != null && !versionGte(kernel, latest);
  const here = placeForTab(tab);
  const modules = GROUPS.find((g) => g.place === here)?.items ?? GROUPS[0].items;
  const lab = GROUPS.find((g) => g.place === "lab")!;

  useEffect(() => {
    hydrateSteel();
    const stopPersist = watchSteelPersist();
    void checkChannel().catch(() => undefined);
    bindComputerKeys();
    return () => {
      stopPersist();
      unbindComputerKeys();
      void disarmKernel();
      void teardownDesk();
      void teardownAura();
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (here !== "lab") useRack.getState().set({ place: here });
  }, [here]);

  function go(next: SteelTab) {
    try {
      isolateForTab(next);
    } catch {
      /* still switch */
    }
    setTab(next);
    const p = placeForTab(next);
    if (p !== "lab") useRack.getState().set({ place: p });
  }

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        {t(lang, "skip")}
      </a>
      <header className="sticky top-0 z-20 border-b border-rule bg-paper/95 backdrop-blur-sm">
        <div className="shell-header shell-pad mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-3 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={cn("size-2 shrink-0 rounded-full", armed ? "bg-live" : "bg-rule")}
                aria-hidden
              />
              <p className="font-display text-xl tracking-[0.14em]">STEEL</p>
              <p className="hidden font-mono text-2xs tracking-wider text-muted uppercase sm:block">
                OS {kernel} · WEB remote · HOST · 250×3
              </p>
              {behind ? (
                <button
                  type="button"
                  data-tab="kernel"
                  onClick={() => go("kernel")}
                  className="hidden rounded-[var(--radius-sm)] border border-live/40 px-2 py-1 font-mono text-2xs tracking-wider text-live uppercase sm:inline"
                >
                  {latest} {t(lang, "ready")}
                </button>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => patch({ lang: nextLang(lang) })}
              className="min-h-11 min-w-11 shrink-0 rounded-[var(--radius-sm)] border border-rule px-2 font-mono text-2xs tracking-wider text-muted uppercase"
              aria-label="Language"
            >
              {lang.toUpperCase()}
            </button>
          </div>
          <div className="pb-2">
            <PlaceBar navigate />
          </div>
          <nav aria-label="Primary" className="nav-scroll flex max-w-full flex-nowrap items-end gap-5 overflow-x-auto pb-3">
            <div className="flex shrink-0 flex-col gap-1">
              <span className="px-1 font-mono text-2xs tracking-wider text-faint uppercase">
                {t(lang, GROUPS.find((g) => g.place === here)?.label ?? "placeOs")}
              </span>
              <div className="flex flex-nowrap gap-1">
                {modules.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    data-tab={item.id}
                    onClick={() => go(item.id)}
                    aria-current={tab === item.id ? "page" : undefined}
                    className={cn(
                      "min-h-11 shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-[var(--motion-quick)]",
                      tab === item.id ? "bg-ink text-paper" : "text-muted hover:bg-ink/[0.06] hover:text-ink",
                    )}
                  >
                    {t(lang, item.key)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-1">
              <span className="px-1 font-mono text-2xs tracking-wider text-faint uppercase">{t(lang, "placeLab")}</span>
              <div className="flex flex-nowrap gap-1">
                {lab.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    data-tab={item.id}
                    onClick={() => go(item.id)}
                    aria-current={tab === item.id ? "page" : undefined}
                    className={cn(
                      "min-h-11 shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-[var(--motion-quick)]",
                      tab === item.id ? "bg-ink text-paper" : "text-muted hover:bg-ink/[0.06] hover:text-ink",
                    )}
                  >
                    {t(lang, item.key)}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main
        id="main"
        className={
          tab === "aura"
            ? "shell-pad mx-auto max-w-6xl py-4"
            : "shell-pad mx-auto min-w-0 max-w-6xl py-6 sm:py-8"
        }
      >
        {children}
      </main>
      <footer className="shell-footer shell-pad mx-auto max-w-6xl border-t border-rule py-5 font-mono text-2xs tracking-wide text-muted uppercase">
        <span className="block max-w-full text-pretty">{t(lang, "footer")}</span>
      </footer>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "!bg-raised !text-ink !border-rule !font-[inherit] !rounded-[6px]",
        }}
      />
    </div>
  );
}
