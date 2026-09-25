import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { startCrew, stopCrew } from "@/lib/crew/runtime";
import { hydrateCrew, watchCrewPersist } from "@/lib/crew/store";
import { t, type CopyKey } from "@/lib/studio/copy";
import { disarmEngine, onVisibility, pushAll, togglePlay } from "@/lib/studio/engine";
import { startStudioWatch, stopStudioWatch } from "@/lib/studio/runtime";
import { disarmKernel } from "@/lib/steel/engine";
import { hydrateSteel, useSteel, watchSteelPersist } from "@/lib/steel/store";
import { hydrateStudio, useStudio, watchStudioPersist } from "@/lib/studio/store";
import type { StudioTab } from "@/lib/studio/types";
import { cn } from "@/lib/utils";
import { Transport } from "./transport";

const TABS: { id: StudioTab; key: CopyKey }[] = [
  { id: "desk", key: "desk" },
  { id: "vocals", key: "vocals" },
  { id: "visuals", key: "visuals" },
  { id: "matrix", key: "matrix" },
  { id: "monitor", key: "monitor" },
  { id: "kernel", key: "kernel" },
  { id: "crew", key: "crew" },
  { id: "audit", key: "audit" },
  { id: "banks", key: "banks" },
  { id: "film", key: "film" },
  { id: "theory", key: "theory" },
];

function isolate(next: StudioTab) {
  if (next === "kernel") {
    void disarmEngine();
  } else if (next !== "crew") {
    void disarmKernel();
  }
}

export function StudioShell({ children }: { children: ReactNode }) {
  const tab = useStudio((s) => s.tab);
  const setTab = useStudio((s) => s.setTab);
  const lang = useStudio((s) => s.lang);
  const patch = useStudio((s) => s.patch);
  const armed = useStudio((s) => s.armed);
  const playing = useStudio((s) => s.playing);
  const processing = useStudio((s) => s.processing);
  const path = useStudio((s) => s.path);

  useEffect(() => {
    hydrateStudio();
    hydrateSteel();
    hydrateCrew(useStudio.getState().lang);
    const stop = watchStudioPersist();
    const stopSteel = watchSteelPersist();
    const stopCrewPersist = watchCrewPersist();
    startCrew();
    startStudioWatch();
    const onVis = () => onVisibility();
    document.addEventListener("visibilitychange", onVis);
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      e.preventDefault();
      void togglePlay();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      stop();
      stopSteel();
      stopCrewPersist();
      stopCrew();
      stopStudioWatch();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("keydown", onKey);
      void disarmEngine();
      void disarmKernel();
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    useSteel.getState().patch({ lang });
  }, [lang]);

  useEffect(() => {
    pushAll();
  }, [tab]);

  const pathLabel =
    path === "kernel" ? t(lang, "pathKernel") : path === "web" ? t(lang, "pathWeb") : t(lang, "pathHybrid");

  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col overflow-x-hidden bg-paper text-ink">
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
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  processing ? "bg-copper" : armed || playing ? "bg-live" : "bg-rule",
                )}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="font-display text-xl tracking-[0.14em]">STEEL</p>
                <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">{t(lang, "studio")}</p>
              </div>
              <button
                type="button"
                onClick={() => setTab("crew")}
                className="hidden min-h-11 shrink-0 rounded-[var(--radius-sm)] px-2 font-mono text-2xs tracking-[0.16em] text-steel uppercase ring-1 ring-rule sm:inline-flex sm:items-center"
              >
                {pathLabel}
              </button>
            </div>
            <button
              type="button"
              onClick={() => patch({ lang: lang === "et" ? "en" : "et" })}
              className="min-h-11 min-w-11 shrink-0 rounded-[var(--radius-sm)] ring-1 ring-rule px-2 font-mono text-2xs tracking-wider text-muted uppercase"
              aria-label="Language"
            >
              {lang === "et" ? "ET" : "EN"}
            </button>
          </div>
          <nav aria-label="Primary" className="nav-scroll -mx-1 pb-3">
            <div className="flex w-max flex-nowrap gap-1 px-1">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  isolate(item.id);
                  setTab(item.id);
                }}
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
          </nav>
        </div>
      </header>
      <main id="main" className="shell-pad mx-auto w-full min-w-0 max-w-6xl flex-1 py-6 sm:py-8">
        {children}
      </main>
      <footer className="shell-pad mx-auto max-w-6xl py-4 font-mono text-2xs tracking-wide text-muted uppercase">
        {t(lang, "footer")}
      </footer>
      {tab !== "kernel" && tab !== "audit" ? <Transport /> : null}
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "!bg-raised !text-ink !border-rule !font-[inherit] !rounded-[6px]",
        }}
      />
    </div>
  );
}
