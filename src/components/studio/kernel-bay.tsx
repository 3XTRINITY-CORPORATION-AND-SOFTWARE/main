import { SteelConsole } from "@/components/steel-console";
import { SteelHosts } from "@/components/steel-hosts";
import { SteelKernel } from "@/components/steel-kernel";
import { t } from "@/lib/studio/copy";
import { useStudio } from "@/lib/studio/store";
import { formatScore } from "@/lib/signal/probe";

export function StudioKernelBay() {
  const lang = useStudio((s) => s.lang);
  const path = useStudio((s) => s.path);
  const score = useStudio((s) => s.signalScore);
  const bufferSize = useStudio((s) => s.bufferSize);

  return (
    <div className="flex min-w-0 flex-col gap-10">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">{t(lang, "kernelKicker")}</p>
        <h1 className="font-display text-3xl text-ink">
          {path === "web" ? t(lang, "pathWeb") : path === "hybrid" ? t(lang, "pathHybrid") : t(lang, "pathKernel")}
        </h1>
        <p className="max-w-2xl text-pretty text-muted">{t(lang, "kernelLead")}</p>
        <p className="font-mono text-2xs tracking-wider text-muted uppercase">
          {t(lang, "hostSignal")} {formatScore(score)} · {bufferSize}
        </p>
      </header>
      <SteelKernel />
      <SteelConsole />
      <SteelHosts />
    </div>
  );
}
