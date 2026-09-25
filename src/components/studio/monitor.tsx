import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { scaleRadar } from "@/lib/studio/ai";
import { t } from "@/lib/studio/copy";
import { pushAll } from "@/lib/studio/engine";
import { hostLatencyOffset } from "@/lib/studio/karestik";
import { RADAR } from "@/lib/studio/radar";
import { useStudio } from "@/lib/studio/store";
import type { HostId } from "@/lib/studio/types";
import { cn } from "@/lib/utils";

const HOSTS: HostId[] = ["standalone", "fl", "ableton", "logic"];
const BUFFERS = [128, 256, 512];

export function StudioMonitor() {
  const lang = useStudio((s) => s.lang);
  const host = useStudio((s) => s.host);
  const bufferSize = useStudio((s) => s.bufferSize);
  const sampleRate = useStudio((s) => s.sampleRate);
  const cpu = useStudio((s) => s.cpu);
  const armed = useStudio((s) => s.armed);
  const radarNote = useStudio((s) => s.radarNote);
  const processing = useStudio((s) => s.processing);
  const patch = useStudio((s) => s.patch);
  const lat = hostLatencyOffset(host, bufferSize, sampleRate);

  async function onScale(id: string) {
    const item = RADAR.find((r) => r.id === id);
    if (!item) return;
    patch({ processing: true });
    try {
      const res = await scaleRadar({ data: { title: item.title, note: item.note, lang } });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      patch({ radarNote: res.text });
    } finally {
      patch({ processing: false });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">STEEL · {t(lang, "monitor")}</p>
        <h1 className="font-display text-3xl text-ink">{t(lang, "localBridge")}</h1>
        <p className="max-w-2xl text-pretty text-muted">{t(lang, "localBridgeNote")}</p>
      </header>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-[var(--radius-md)] bg-raised p-3 ring-1 ring-rule">
          <dt className="font-mono text-2xs tracking-wider text-muted uppercase">Engine</dt>
          <dd className="mt-1 text-ink">{armed ? t(lang, "armed") : "idle"}</dd>
        </div>
        <div className="rounded-[var(--radius-md)] bg-raised p-3 ring-1 ring-rule">
          <dt className="font-mono text-2xs tracking-wider text-muted uppercase">SR</dt>
          <dd className="mt-1 font-mono tabular-nums text-ink">{sampleRate}</dd>
        </div>
        <div className="rounded-[var(--radius-md)] bg-raised p-3 ring-1 ring-rule">
          <dt className="font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "latency")}</dt>
          <dd className="mt-1 font-mono tabular-nums text-ink">{lat.toFixed(2)} ms</dd>
        </div>
        <div className="rounded-[var(--radius-md)] bg-raised p-3 ring-1 ring-rule">
          <dt className="font-mono text-2xs tracking-wider text-muted uppercase">CPU</dt>
          <dd className="mt-1 font-mono tabular-nums text-ink">{Math.round(cpu)}%</dd>
        </div>
      </dl>

      <div>
        <p className="mb-2 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "host")}</p>
        <div className="flex flex-wrap gap-2">
          {HOSTS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => patch({ host: id })}
              className={cn(
                "min-h-11 rounded-[var(--radius-sm)] px-3 text-sm ring-1 ring-rule",
                host === id ? "bg-ink text-paper" : "text-muted",
              )}
            >
              {t(lang, id)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "buffer")}</p>
        <div className="flex flex-wrap gap-2">
          {BUFFERS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                patch({ bufferSize: n });
                pushAll();
              }}
              className={cn(
                "min-h-11 rounded-[var(--radius-sm)] px-3 font-mono text-sm ring-1 ring-rule",
                bufferSize === n ? "bg-ink text-paper" : "text-muted",
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <section>
        <p className="mb-3 font-mono text-2xs tracking-wider text-muted uppercase">{t(lang, "radar")}</p>
        <ul className="flex flex-col gap-3">
          {RADAR.map((item) => (
            <li key={item.id} className="rounded-[var(--radius-lg)] bg-raised p-4 ring-1 ring-rule">
              <p className="font-mono text-2xs tracking-wider text-muted uppercase">{item.source}</p>
              <p className="mt-1 text-ink">{item.title}</p>
              <p className="mt-2 text-sm text-muted">{item.note}</p>
              <p className="mt-2 text-sm text-steel">{item.steel}</p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-3"
                disabled={processing}
                onClick={() => void onScale(item.id)}
              >
                {t(lang, "radarGo")}
              </Button>
            </li>
          ))}
        </ul>
        {radarNote ? (
          <pre className="mt-4 whitespace-pre-wrap rounded-[var(--radius-md)] bg-paper p-4 text-sm text-ink ring-1 ring-rule">
            {radarNote}
          </pre>
        ) : null}
      </section>
    </div>
  );
}
