import { create } from "zustand";
import { auditWorkflow } from "./engine";
import { SAMPLE_WORKFLOWS } from "./samples";
import type { AuditReport } from "./types";

export type AppTab = "audit" | "permissions" | "jwt" | "library";

interface AuditState {
  yaml: string;
  sampleId: string;
  report: AuditReport;
  tab: AppTab;
  setYaml: (yaml: string) => void;
  run: () => void;
  loadSample: (id: string) => void;
  setTab: (tab: AppTab) => void;
}

const first = SAMPLE_WORKFLOWS[0];

export const useAudit = create<AuditState>((set, get) => ({
  yaml: first.yaml,
  sampleId: first.id,
  report: auditWorkflow(first.yaml),
  tab: "audit",
  setYaml: (yaml) => set({ yaml, sampleId: "custom" }),
  run: () => set({ report: auditWorkflow(get().yaml) }),
  loadSample: (id) => {
    const sample = SAMPLE_WORKFLOWS.find((s) => s.id === id);
    if (!sample) return;
    set({ yaml: sample.yaml, sampleId: id, report: auditWorkflow(sample.yaml) });
  },
  setTab: (tab) => set({ tab }),
}));
