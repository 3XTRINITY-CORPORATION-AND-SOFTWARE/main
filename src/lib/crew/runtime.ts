import { policyFor, probeSignal, type ComputePath } from "@/lib/signal/probe";
import { checkChannel, versionGte } from "@/lib/steel/updates";
import { useSteel } from "@/lib/steel/store";
import { useStudio } from "@/lib/studio/store";
import { AGENT_IDS, type AgentId } from "./types";
import { useCrew } from "./store";

const TICK_MS = 6000;
const HIDDEN_MS = 20000;
let timer: ReturnType<typeof setTimeout> | null = null;
let cursor = 0;
let running = false;

function lang() {
  return useStudio.getState().lang;
}

function line(et: string, en: string) {
  return lang() === "en" ? en : et;
}

function applyPolicy(path: ComputePath) {
  const policy = policyFor(path);
  useStudio.getState().patch({
    path: policy.path,
    signalScore: probeSignal().score,
    bufferSize: policy.bufferSize,
    visFps: policy.visFps,
    visQuality: policy.visQuality,
  });
  useSteel.getState().patch({
    buffer: policy.bufferSize,
    webOut: policy.path !== "kernel",
  });
  useCrew.getState().patch({ livePath: policy.path, appliedRev: useCrew.getState().policyRev });
}

function readForceFromOrder(order: string): ComputePath | "pause" | "resume" | null {
  const o = order.toLowerCase();
  if (/\b(paus|pause|stopp?)\b/.test(o)) return "pause";
  if (/\b(jätka|jatka|resume|continue)\b/.test(o)) return "resume";
  if (/\b(tuum|kernel)\b/.test(o) && !/\b(veeb|web)\b/.test(o)) return "kernel";
  if (/\b(veeb|web)\b/.test(o) && !/\b(tuum|kernel)\b/.test(o)) return "web";
  if (/\b(hübriid|hubriid|hybrid)\b/.test(o)) return "hybrid";
  return null;
}

async function duty(id: AgentId) {
  const crew = useCrew.getState();
  const agent = crew.agents[id];
  if (agent.status === "paused") return;
  crew.setAgent(id, { status: "work", ticks: agent.ticks + 1 });

  try {
    switch (id) {
      case "architect": {
        const report = probeSignal(true);
        const forced = crew.forcePath;
        const path = forced ?? report.path;
        const studio = useStudio.getState();
        studio.patch({
          signalScore: report.score,
          cores: report.cores,
          memoryGb: report.memoryGb,
          connection: report.connection,
          path,
        });
        if (path !== crew.livePath) {
          crew.patch({ policyRev: crew.policyRev + 1 });
          crew.pushLog(
            id,
            line(
              `Poliitika ${path.toUpperCase()} · signaal ${Math.round(report.score * 100)} · ${report.cores} tuuma`,
              `Policy ${path.toUpperCase()} · signal ${Math.round(report.score * 100)} · ${report.cores} cores`,
            ),
          );
        } else {
          crew.pushLog(
            id,
            line(
              `Signaal ${Math.round(report.score * 100)} hoiab teed ${path}.`,
              `Signal ${Math.round(report.score * 100)} holds path ${path}.`,
            ),
          );
        }
        break;
      }
      case "builder": {
        const next = useCrew.getState();
        if (next.policyRev !== next.appliedRev) {
          applyPolicy(useStudio.getState().path);
          next.pushLog(
            id,
            line(
              `Rakendatud ${useStudio.getState().path} · puhver ${useStudio.getState().bufferSize} · ${useStudio.getState().visFps} fps`,
              `Applied ${useStudio.getState().path} · buffer ${useStudio.getState().bufferSize} · ${useStudio.getState().visFps} fps`,
            ),
          );
        } else {
          next.pushLog(id, line("Pult on poliitikaga kooskõlas.", "Desk matches policy."));
        }
        break;
      }
      case "maintenance": {
        const s = useStudio.getState();
        if (s.error) {
          useCrew.getState().pushLog(id, line(`Viga: ${s.error}`, `Fault: ${s.error}`));
        } else if (s.cpu > 78 && s.bufferSize < 1024) {
          const nextBuf = s.bufferSize <= 128 ? 256 : s.bufferSize <= 256 ? 512 : 1024;
          s.patch({ bufferSize: nextBuf });
          useSteel.getState().patch({ buffer: nextBuf });
          useCrew.getState().pushLog(
            id,
            line(`CPU ${s.cpu.toFixed(0)} · puhver ${nextBuf}`, `CPU ${s.cpu.toFixed(0)} · buffer ${nextBuf}`),
          );
        } else {
          useCrew.getState().pushLog(
            id,
            line(
              s.armed ? "Mootor sees, latentsus stabiilne." : "Mootor ootel. Vahid jäävad.",
              s.armed ? "Engine live, latency stable." : "Engine idle. Watch holds.",
            ),
          );
        }
        break;
      }
      case "seeker": {
        try {
          const man = await checkChannel();
          useCrew.getState().patch({ channelLatest: man.latest });
          const k = useSteel.getState().kernel;
          const behind = !versionGte(k, man.latest);
          useCrew.getState().pushLog(
            id,
            behind
              ? line(`Kanal ${man.latest} ootab (jookseb ${k}).`, `Channel ${man.latest} waiting (running ${k}).`)
              : line(`Kanal paigas · ${k}.`, `Channel current · ${k}.`),
          );
        } catch (err) {
          useCrew.getState().setAgent(id, { status: "blocked" });
          useCrew.getState().pushLog(
            id,
            line(
              `Kanal vaikne: ${err instanceof Error ? err.message : "down"}`,
              `Channel quiet: ${err instanceof Error ? err.message : "down"}`,
            ),
          );
          return;
        }
        break;
      }
      case "executioner": {
        const next = useCrew.getState();
        const want = useStudio.getState().path;
        if (want !== next.livePath) {
          applyPolicy(want);
          next.pushLog(id, line(`Tee vahetatud → ${want}.`, `Path switched → ${want}.`));
        } else {
          next.pushLog(id, line("Täitmist ei ole. Tee paigas.", "Nothing to execute. Path holds."));
        }
        break;
      }
      case "kernel": {
        const report = probeSignal();
        const armed = useStudio.getState().armed || useSteel.getState().armed;
        if (!report.worklet) {
          useCrew.getState().setAgent(id, { status: "blocked" });
          useCrew.getState().pushLog(id, line("AudioWorklet puudub — jääb veebitee.", "No AudioWorklet — staying on web."));
          return;
        }
        useCrew.getState().pushLog(
          id,
          line(
            armed ? "Tuum laetud, worklet sees." : "Tuum valmis. Ootab esimest puudutust.",
            armed ? "Kernel loaded, worklet live." : "Kernel ready. Waiting for first tap.",
          ),
        );
        break;
      }
      case "web": {
        const path = useStudio.getState().path;
        const fps = useStudio.getState().visFps;
        useCrew.getState().pushLog(
          id,
          path === "web"
            ? line(`Veebitee kandev · visuaal ${fps} fps.`, `Web path carrying · visuals ${fps} fps.`)
            : line(`Veeb ootel. Tuum kannab.`, `Web standing by. Kernel carries.`),
        );
        break;
      }
    }
    const after = useCrew.getState().agents[id];
    if (after.status !== "paused" && after.status !== "blocked") {
      useCrew.getState().setAgent(id, { status: "idle" });
    }
  } catch (err) {
    useCrew.getState().setAgent(id, { status: "blocked" });
    useCrew.getState().pushLog(id, err instanceof Error ? err.message : "blocked");
  }

  const hint = readForceFromOrder(useCrew.getState().agents[id].order);
  if (hint === "pause") useCrew.getState().setAgent(id, { status: "paused" });
  if (hint === "resume") useCrew.getState().setAgent(id, { status: "idle" });
  if (hint === "kernel" || hint === "web" || hint === "hybrid") {
    if (id === "architect") useCrew.getState().setForcePath(hint);
  }
}

function schedule() {
  if (!running) return;
  const hidden = typeof document !== "undefined" && document.visibilityState === "hidden";
  const ms = hidden ? HIDDEN_MS : TICK_MS;
  timer = setTimeout(() => {
    void tick();
  }, ms);
}

async function tick() {
  if (!running) return;
  const crew = useCrew.getState();
  if (!crew.watching) {
    schedule();
    return;
  }
  const id = AGENT_IDS[cursor % AGENT_IDS.length];
  cursor += 1;
  const cap = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("watch cap")), 4500);
  });
  try {
    await Promise.race([duty(id), cap]);
  } catch {
    const agent = useCrew.getState().agents[id];
    if (agent.status === "work") useCrew.getState().setAgent(id, { status: "idle" });
  }
  schedule();
}

export function startCrew() {
  if (running) return;
  running = true;
  const report = probeSignal(true);
  const forced = useCrew.getState().forcePath;
  const path = forced ?? report.path;
  useStudio.getState().patch({
    path,
    signalScore: report.score,
    cores: report.cores,
    memoryGb: report.memoryGb,
    connection: report.connection,
  });
  applyPolicy(path);
  useCrew.getState().pushLog(
    "architect",
    line(
      `Vahid sees · ${path.toUpperCase()} · signaal ${Math.round(report.score * 100)}`,
      `Watch on · ${path.toUpperCase()} · signal ${Math.round(report.score * 100)}`,
    ),
  );
  schedule();
}

export function stopCrew() {
  running = false;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}
