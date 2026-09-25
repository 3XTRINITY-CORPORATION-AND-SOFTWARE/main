import { AuditWorkspace } from "@/components/audit-workspace";
import { JwtLab } from "@/components/jwt-lab";
import { PermissionBuilder } from "@/components/permission-builder";
import { useAudit, type AppTab } from "@/lib/audit/store";
import { t } from "@/lib/i18n";
import { useSteel } from "@/lib/steel/store";
import { cn } from "@/lib/utils";

const INNER: { id: AppTab; et: string; en: string }[] = [
  { id: "audit", et: "Töövoog", en: "Workflow" },
  { id: "jwt", et: "JWT", en: "JWT" },
  { id: "permissions", et: "Õigused", en: "Permissions" },
];

export function SteelAudit() {
  const lang = useSteel((s) => s.lang);
  const tab = useAudit((s) => s.tab);
  const setTab = useAudit((s) => s.setTab);

  return (
    <div>
      <p className="font-mono text-2xs tracking-[0.2em] text-steel uppercase">{t(lang, "auditKicker")}</p>
      <h1 className="mt-2 text-3xl sm:text-4xl">{t(lang, "auditTitle")}</h1>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{t(lang, "auditLead")}</p>
      <div className="nav-scroll mt-5 flex flex-nowrap gap-1 overflow-x-auto">
        {INNER.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "min-h-11 shrink-0 rounded-[var(--radius-sm)] px-3 text-sm",
              tab === item.id ? "bg-ink text-paper" : "text-muted hover:bg-ink/[0.06] hover:text-ink",
            )}
          >
            {lang === "et" ? item.et : item.en}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {tab === "audit" ? <AuditWorkspace /> : null}
        {tab === "jwt" ? <JwtLab /> : null}
        {tab === "permissions" ? <PermissionBuilder /> : null}
      </div>
    </div>
  );
}
