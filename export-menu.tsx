import { useState } from "react";
import { FileSpreadsheet, FileText, Presentation, ScrollText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { AuditReport } from "@/lib/audit/types";

const FORMATS = [
  { id: "pdf", label: "PDF", icon: ScrollText },
  { id: "docx", label: "Word", icon: FileText },
  { id: "xlsx", label: "Excel", icon: FileSpreadsheet },
  { id: "pptx", label: "Slides", icon: Presentation },
] as const;

async function runExport(id: string, report: AuditReport) {
  switch (id) {
    case "pdf":
      return (await import("@/lib/export/pdf")).exportPdf(report);
    case "docx":
      return (await import("@/lib/export/docx")).exportDocx(report);
    case "xlsx":
      return (await import("@/lib/export/xlsx")).exportXlsx(report);
    case "pptx":
      return (await import("@/lib/export/pptx")).exportPptx(report);
    default:
      throw new Error("Unknown export");
  }
}

export function ExportMenu({ report }: { report: AuditReport }) {
  const [busy, setBusy] = useState<string | null>(null);

  async function handle(id: string, label: string) {
    setBusy(id);
    try {
      await runExport(id, report);
      toast.success(`${label} report downloaded`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Export failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {FORMATS.map((fmt) => {
        const Icon = fmt.icon;
        return (
          <Button
            key={fmt.id}
            type="button"
            variant="secondary"
            size="sm"
            disabled={busy !== null}
            onClick={() => void handle(fmt.id, fmt.label)}
          >
            <Icon className="size-3.5" strokeWidth={1.75} />
            {busy === fmt.id ? "Preparing" : fmt.label}
          </Button>
        );
      })}
    </div>
  );
}
