import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { AuraStage } from "@/components/aura-stage";
import { SteelConsole } from "@/components/steel-console";
import { SteelDesk } from "@/components/steel-desk";
import { SteelHosts } from "@/components/steel-hosts";
import { SteelKernel } from "@/components/steel-kernel";
import { SteelAudit } from "@/components/steel-audit";
import { SteelPipeline } from "@/components/steel-pipeline";
import { SteelStudio } from "@/components/steel-studio";
import { useSteel } from "@/lib/steel/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const tab = useSteel((s) => s.tab);
  return (
    <AppShell>
      {tab === "desk" ? <SteelDesk /> : null}
      {tab === "studio" ? <SteelStudio /> : null}
      {tab === "console" ? <SteelConsole /> : null}
      {tab === "aura" ? <AuraStage /> : null}
      {tab === "pipeline" ? <SteelPipeline /> : null}
      {tab === "hosts" ? <SteelHosts /> : null}
      {tab === "kernel" ? <SteelKernel /> : null}
      {tab === "audit" ? <SteelAudit /> : null}
    </AppShell>
  );
}