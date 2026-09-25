import type { Finding, Severity } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

const ORDER: Severity[] = ["critical", "high", "medium", "low", "info", "pass"];

function tone(s: Severity) {
  if (s === "pass") return "text-sage";
  if (s === "info") return "text-muted";
  return "text-stamp";
}

export function FindingsPanel({ findings }: { findings: Finding[] }) {
  const grouped = ORDER.map((sev) => ({
    sev,
    items: findings.filter((f) => f.severity === sev),
  })).filter((g) => g.items.length);

  let n = 0;
  return (
    <ol className="flex flex-col gap-5">
      {grouped.map((group) =>
        group.items.map((f) => {
          n += 1;
          const id = `F-${String(n).padStart(3, "0")}`;
          return (
            <li
              key={f.id}
              className="find-enter border-t border-rule pt-4"
              style={{ animationDelay: `${Math.min(n, 8) * 40}ms` }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className={cn("font-mono text-2xs tracking-wider uppercase", tone(f.severity))}>
                  {id} · {f.severity}
                </p>
                {f.location ? (
                  <p className="max-w-full truncate font-mono text-2xs text-faint">{f.location}</p>
                ) : null}
              </div>
              <h3 className="mt-1 text-xl text-ink">{f.title}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-ink/90">{f.detail}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <span className="font-medium text-ink">Fix. </span>
                {f.remediation}
              </p>
            </li>
          );
        }),
      )}
    </ol>
  );
}
