import { setWebTap } from "@/lib/steel/engine";
import { useSteel } from "@/lib/steel/store";
import { versionGte } from "@/lib/steel/updates";
import { cn } from "@/lib/utils";

const NODES = [
  { id: "in", label: "Desk in", sub: "Mic · ASIO loop · MIDI" },
  { id: "hpf", label: "High-pass", sub: "DC / rumble" },
  { id: "eq", label: "EQ", sub: "Lo · mid · hi" },
  { id: "sat", label: "Tape sat", sub: "Soft tanh" },
  { id: "comp", label: "Bus comp", sub: "Feed-forward" },
  { id: "transient", label: "Transient", sub: "Kernel 3.5+" },
  { id: "limit", label: "Brickwall", sub: "0.95 ceil" },
  { id: "out", label: "Web out", sub: "Worklet → page" },
];

export function SteelPipeline() {
  const addons = useSteel((s) => s.addons);
  const kernel = useSteel((s) => s.kernel);
  const webOut = useSteel((s) => s.webOut);
  const patch = useSteel((s) => s.patch);
  const peak = useSteel((s) => s.peak);
  const armed = useSteel((s) => s.armed);

  function toggle(id: string) {
    if (id === "in" || id === "out") return;
    if (id === "transient" && !versionGte(kernel, "3.5.0")) return;
    patch({ addons: { ...addons, [id]: !addons[id] } });
  }

  return (
    <div>
      <p className="font-mono text-2xs tracking-[0.2em] text-steel uppercase">Insert chain</p>
      <h2 className="mt-2 text-3xl">Steel-structure the graph, then push it to the page.</h2>
      <p className="mt-3 max-w-prose text-sm text-muted">
        Every block is an AudioWorklet insert. Bypass is a parameter, not a graph rebuild. Web
        out is a MediaStream destination — a virtual input the rest of the site (or a WebRTC peer)
        can tap.
      </p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {NODES.map((node, i) => {
          const locked = node.id === "transient" && !versionGte(kernel, "3.5.0");
          const on =
            node.id === "in" || node.id === "out"
              ? node.id === "out"
                ? webOut
                : true
              : Boolean(addons[node.id]);
          return (
            <li key={node.id}>
              <button
                type="button"
                onClick={() => {
                  if (node.id === "out") setWebTap(!webOut);
                  else toggle(node.id);
                }}
                disabled={locked}
                className={cn(
                  "flex h-full min-h-28 w-full flex-col rounded-[var(--radius-md)] border px-4 py-4 text-left transition-colors duration-[var(--motion-quick)]",
                  on ? "border-live/50 bg-live/10" : "border-rule bg-raised/40",
                  locked && "opacity-40",
                )}
              >
                <span className="font-mono text-2xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-2 font-display text-xl">{node.label}</span>
                <span className="mt-1 text-xs text-muted">{locked ? "Needs kernel 3.5.0" : node.sub}</span>
                <span className={cn("mt-3 font-mono text-2xs uppercase tracking-wider", on ? "text-live" : "text-faint")}>
                  {on ? "in circuit" : "bypassed"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="mt-8 rounded-[var(--radius-md)] border border-rule px-4 py-4">
        <p className="font-mono text-2xs tracking-wider text-muted uppercase">Web pipeline</p>
        <p className="mt-2 text-sm text-muted">
          Processed audio is mixed to the page output and cloned to a MediaStream. Peak{" "}
          <span className="font-mono text-ink tabular-nums">{(peak * 100).toFixed(0)}%</span>
          {armed ? " · kernel armed" : " · arm the kernel first"}. Tap the keys or a DAW MIDI port
          — the same graph feeds speakers and the web tap.
        </p>
      </div>
    </div>
  );
}
