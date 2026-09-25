import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SCOPE_CATALOG, permissionsToYaml, type PermissionMap } from "@/lib/audit/permissions";
import type { AccessLevel, PermissionScope } from "@/lib/audit/types";
import { useAudit } from "@/lib/audit/store";
import { t } from "@/lib/i18n";
import { useSteel } from "@/lib/steel/store";
import { cn } from "@/lib/utils";

const INITIAL: PermissionMap = {
  contents: "read",
  issues: "write",
};

export function PermissionBuilder() {
  const lang = useSteel((s) => s.lang);
  const [map, setMap] = useState<PermissionMap>(INITIAL);
  const [name, setName] = useState("Open new issue");
  const [trigger, setTrigger] = useState("workflow_dispatch");
  const [jobId, setJobId] = useState("open-issue");
  const loadCustom = useAudit((s) => s.setYaml);
  const run = useAudit((s) => s.run);
  const setTab = useAudit((s) => s.setTab);

  const yaml = useMemo(() => permissionsToYaml(name, trigger, jobId, map), [name, trigger, jobId, map]);

  function setLevel(scope: PermissionScope, level: AccessLevel) {
    setMap((prev) => ({ ...prev, [scope]: level }));
  }

  function attest() {
    loadCustom(yaml);
    run();
    setTab("audit");
    toast.success(t(lang, "permSent"));
  }

  async function copy() {
    await navigator.clipboard.writeText(yaml);
    toast.success(t(lang, "permCopied"));
  }

  const levelLabel: Record<AccessLevel, string> = {
    none: t(lang, "permNone"),
    read: t(lang, "permRead"),
    write: t(lang, "permWrite"),
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)]">
      <section className="min-w-0">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">{t(lang, "permKicker")}</p>
        <h2 className="mt-1 text-2xl sm:text-3xl">{t(lang, "permTitle")}</h2>
        <p className="mt-3 max-w-prose text-muted">{t(lang, "permLead")}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Field label={t(lang, "permName")} value={name} onChange={setName} />
          <Field label={t(lang, "permTrigger")} value={trigger} onChange={setTrigger} />
          <Field label={t(lang, "permJob")} value={jobId} onChange={setJobId} />
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-rule text-left font-mono text-2xs tracking-wider text-muted uppercase">
                <th className="py-2 pr-3 font-medium">{t(lang, "permScope")}</th>
                <th className="py-2 pr-3 font-medium">{t(lang, "permNone")}</th>
                <th className="py-2 pr-3 font-medium">{t(lang, "permRead")}</th>
                <th className="py-2 pr-3 font-medium">{t(lang, "permWrite")}</th>
                <th className="py-2 font-medium">{t(lang, "permUnlock")}</th>
              </tr>
            </thead>
            <tbody>
              {SCOPE_CATALOG.map((scope) => {
                const level = map[scope.id] ?? "none";
                const hint = level === "write" ? scope.write : scope.read;
                return (
                  <tr key={scope.id} className="border-b border-rule/70">
                    <th className="py-3 pr-3 text-left font-mono text-sm font-medium">{scope.label}</th>
                    {(["none", "read", "write"] as AccessLevel[]).map((opt) => (
                      <td key={opt} className="py-3 pr-3">
                        <button
                          type="button"
                          aria-pressed={level === opt}
                          onClick={() => setLevel(scope.id, opt)}
                          className={cn(
                            "min-h-11 rounded-[var(--radius-sm)] border px-2.5 py-1 font-mono text-2xs uppercase tracking-wide transition-colors duration-[var(--motion-quick)]",
                            level === opt
                              ? "border-ink bg-ink text-paper"
                              : "border-rule text-muted hover:border-ink/40 hover:text-ink",
                          )}
                        >
                          {levelLabel[opt]}
                        </button>
                      </td>
                    ))}
                    <td className="py-3 text-muted">{hint}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <p className="font-mono text-2xs tracking-[0.18em] text-muted uppercase">{t(lang, "permYaml")}</p>
        <pre className="mt-3 overflow-x-auto rounded-[var(--radius-lg)] border border-rule bg-raised/70 p-4 font-mono text-xs leading-relaxed text-ink">
          {yaml}
        </pre>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={attest}>
            {t(lang, "permAttest")}
          </Button>
          <Button type="button" variant="secondary" onClick={() => void copy()}>
            {t(lang, "permCopyBtn")}
          </Button>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="font-mono text-2xs tracking-wider text-muted uppercase">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-11 w-full rounded-[var(--radius-md)] border border-rule bg-paper px-3 text-sm text-ink outline-none focus:border-ink/40 focus:ring-2 focus:ring-ink/15"
      />
    </label>
  );
}
