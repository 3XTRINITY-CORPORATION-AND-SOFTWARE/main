import { cn } from "@/lib/utils";

export function Fader({
  label,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
  unit,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
  unit?: string;
}) {
  const pretty =
    max > 10
      ? String(Math.round(value))
      : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  return (
    <label className="flex min-h-11 flex-col gap-1">
      <span className="flex items-baseline justify-between font-mono text-2xs tracking-wider text-muted uppercase">
        <span>{label}</span>
        <span className="tabular-nums text-ink">
          {pretty}
          {unit ?? ""}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn("steel-range")}
      />
    </label>
  );
}

export function VerticalFader({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <label className="flex flex-col items-center gap-2">
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="steel-fader"
      />
      <span className="font-mono text-2xs tabular-nums text-muted">{Math.round(value * 100)}</span>
    </label>
  );
}
