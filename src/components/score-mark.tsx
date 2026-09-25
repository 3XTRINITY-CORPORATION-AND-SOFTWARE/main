import type { Grade } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

export function ScoreMark({
  grade,
  score,
  className,
}: {
  grade: Grade;
  score: number;
  className?: string;
}) {
  const failed = grade === "D" || grade === "F";
  return (
    <div className={cn("relative flex size-28 shrink-0 items-center justify-center sm:size-32", className)}>
      <svg viewBox="0 0 120 120" className="absolute inset-0" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r="56"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className={failed ? "text-stamp" : "text-rule"}
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          className="text-rule"
        />
      </svg>
      <div className="relative text-center">
        <div
          className={cn(
            "stamp-grade text-5xl leading-none sm:text-6xl",
            failed ? "text-stamp" : "text-ink",
          )}
        >
          {grade}
        </div>
        <div className="mt-1 font-mono text-2xs tracking-wider text-muted tabular-nums">
          {score}
        </div>
      </div>
    </div>
  );
}
