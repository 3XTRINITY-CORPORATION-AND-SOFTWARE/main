import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AGENT_META } from "@/lib/crew/roster";
import { useCrew } from "@/lib/crew/store";
import type { AgentId } from "@/lib/crew/types";
import { AGENT_IDS } from "@/lib/crew/types";
import { formatScore } from "@/lib/signal/probe";
import type { ComputePath } from "@/lib/signal/probe";
import { t } from "@/lib/studio/copy";
import { useStudio } from "@/lib/studio/store";
import { cn } from "@/lib/utils";

const PATHS: { id: ComputePath | "auto"; et: string; en: string }[] = [
  { id: "auto", et: "Auto", en: "Auto" },
  { id: "kernel", et: "Tuum", en: "Kernel" },
  { id: "hybrid", et: "Hübriid", en: "Hybrid" },
  { id: "web", et: "Veeb", en: "Web" },
];

function statusLabel(lang: "et" | "en", status: string) {
  if (status === "work") return t(lang, "dutyWork");
  if (status === "blocked") return t(lang, "dutyBlocked");
  if (status === "paused") return t(lang, "dutyPaused");
  return t(lang, "dutyIdle");
}

function timeAgo(at: number, lang: "et" | "en") {
  if (!at) return "—";
  const s = Math.max(0, Math.round((Date.now() - at) / 1000));
  if (s < 5) return lang === "et" ? "nüüd" : "now";
  if (s < 60) return `${s}s`;
  return `${Math.round(s / 60)}m`;
}

export function StudioCrew() {
  const lang = useStudio((s) => s.lang);
  const path = useStudio((s) => s.path);
  const score = useStudio((s) => s.signalScore);
  const cores = useStudio((s) => s.cores);
  const memoryGb = useStudio((s) => s.memoryGb);
  const connection = useStudio((s) => s.connection);
  const bufferSize = useStudio((s) => s.bufferSize);
  const visFps = useStudio((s) => s.visFps);
  const watching = useCrew((s) => s.watching);
  const forcePath = useCrew((s) => s.forcePath);
  const agents = useCrew((s) => s.agents);
  const log = useCrew((s) => s.log);
  const setWatching = useCrew((s) => s.setWatching);
  const setForcePath = useCrew((s) => s.setForcePath);
  const setOrder = useCrew((s) => s.setOrder);
  const patchCrew = useCrew((s) => s.patch);
  const [draft, setDraft] = useState<Partial<Record<AgentId, string>>>({});
  const [open, setOpen] = useState<AgentId | null>(null);

  const reversed = useMemo(() => log.slice().reverse(), [log]);

  function commit(id: AgentId) {
    const text = (draft[id] ?? agents[id].order).trim();
    if (!text) return;
    setOrder(id, text);
    setDraft((d) => ({ ...d, [id]: undefined }));
    const lower = text.toLowerCase();
    if (/\b(paus|pause)\b/.test(lower)) useCrew.getState().setAgent(id, { status: "paused" });
    if (/\b(jätka|jatka|resume)\b/.test(lower)) useCrew.getState().setAgent(id, { status: "idle" });
  }

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">{t(lang, "crewKicker")}</p>
        <h1 className="font-display text-3xl text-ink">{t(lang, "crewTitle")}</h1>
        <p className="max-w-2xl text-pretty text-muted">{t(lang, "crewLead")}</p>
      </header>

      <section className="rounded-[var(--radius-lg)] bg-raised p-4 ring-1 ring-rule">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "hostSignal")}</p>
            <p className="mt-1 font-display text-3xl tabular-nums">{formatScore(score)}</p>
          </div>
          <p className="font-display text-xl tracking-[0.12em] uppercase text-ink">
            {path === "kernel" ? t(lang, "pathKernel") : path === "web" ? t(lang, "pathWeb") : t(lang, "pathHybrid")}
          </p>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label={t(lang, "coresLabel")} value={String(cores)} />
          <Stat label={t(lang, "memoryLabel")} value={memoryGb != null ? `${memoryGb} GB` : "—"} />
          <Stat label={t(lang, "connectionLabel")} value={connection} />
          <Stat label={t(lang, "policyLabel")} value={`${bufferSize} · ${visFps} fps`} />
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          {PATHS.map((item) => {
            const active = item.id === "auto" ? forcePath == null : forcePath === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === "auto") setForcePath(null);
                  else {
                    setForcePath(item.id);
                    useStudio.getState().patch({ path: item.id });
                    patchCrew({ policyRev: useCrew.getState().policyRev + 1 });
                  }
                }}
                className={cn(
                  "min-h-11 rounded-[var(--radius-sm)] px-3 text-sm ring-1 ring-rule",
                  active ? "bg-ink text-paper" : "text-muted",
                )}
              >
                {lang === "et" ? item.et : item.en}
              </button>
            );
          })}
          <Button type="button" variant={watching ? "live" : "secondary"} onClick={() => setWatching(!watching)}>
            {watching ? t(lang, "watchOn") : t(lang, "watchOff")}
          </Button>
        </div>
      </section>

      <ul className="grid min-w-0 gap-3 sm:grid-cols-2">
        {AGENT_IDS.map((id) => {
          const agent = agents[id];
          const meta = AGENT_META[id];
          const led =
            agent.status === "work"
              ? "bg-live"
              : agent.status === "blocked"
                ? "bg-clip"
                : agent.status === "paused"
                  ? "bg-copper"
                  : "bg-rule";
          return (
            <li key={id} className="min-w-0 rounded-[var(--radius-md)] bg-raised p-4 ring-1 ring-rule">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("size-2 shrink-0 rounded-full", led)} aria-hidden />
                    <p className="font-display text-lg tracking-wide">{lang === "et" ? meta.et : meta.en}</p>
                  </div>
                  <p className="mt-1 font-mono text-2xs tracking-wider text-muted uppercase">
                    {lang === "et" ? meta.dutyEt : meta.dutyEn} · {statusLabel(lang, agent.status)}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-2xs text-muted">{timeAgo(agent.lastAt, lang)}</p>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted">{agent.lastLine || "—"}</p>
              <button
                type="button"
                className="mt-3 min-h-11 text-left font-mono text-2xs tracking-wider text-steel uppercase"
                onClick={() => setOpen(open === id ? null : id)}
              >
                {t(lang, "standingOrder")}
              </button>
              {open === id ? (
                <div className="mt-2 flex flex-col gap-2">
                  <label className="sr-only" htmlFor={`order-${id}`}>
                    {t(lang, "standingOrder")}
                  </label>
                  <textarea
                    id={`order-${id}`}
                    rows={3}
                    value={draft[id] ?? agent.order}
                    onChange={(e) => setDraft((d) => ({ ...d, [id]: e.target.value }))}
                    className="min-h-20 w-full min-w-0 resize-y rounded-[var(--radius-sm)] bg-paper px-3 py-2 text-sm text-ink ring-1 ring-rule"
                  />
                  <Button type="button" size="sm" variant="secondary" onClick={() => commit(id)}>
                    {t(lang, "issueOrder")}
                  </Button>
                </div>
              ) : (
                <p className="mt-1 line-clamp-2 font-mono text-2xs text-faint">{agent.order}</p>
              )}
            </li>
          );
        })}
      </ul>

      <section>
        <p className="mb-3 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "crewLog")}</p>
        <ol className="flex max-h-80 min-w-0 flex-col gap-2 overflow-y-auto">
          {reversed.length === 0 ? (
            <li className="text-sm text-muted">—</li>
          ) : (
            reversed.map((entry) => (
              <li key={entry.id} className="min-w-0 rounded-[var(--radius-sm)] bg-raised px-3 py-2 ring-1 ring-rule">
                <p className="font-mono text-2xs tracking-wider text-steel uppercase">
                  {lang === "et" ? AGENT_META[entry.agent].et : AGENT_META[entry.agent].en}
                </p>
                <p className="mt-1 text-sm text-ink">{entry.line}</p>
              </li>
            ))
          )}
        </ol>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="font-mono text-2xs tracking-wider text-muted uppercase">{label}</dt>
      <dd className="mt-1 truncate font-medium tabular-nums">{value}</dd>
    </div>
  );
}
