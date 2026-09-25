import { create } from "zustand";
import { AGENT_IDS, type AgentId, type AgentState, type CrewLog, type CrewState } from "./types";
import { DEFAULT_ORDERS } from "./roster";

const PERSIST_KEY = "steel-crew-v1";
const LOG_CAP = 80;

function defaultAgents(lang: "et" | "en"): Record<AgentId, AgentState> {
  const agents = {} as Record<AgentId, AgentState>;
  for (const id of AGENT_IDS) {
    agents[id] = {
      id,
      status: "idle",
      order: DEFAULT_ORDERS[id][lang],
      lastLine: "",
      lastAt: 0,
      ticks: 0,
    };
  }
  return agents;
}

type Persisted = {
  forcePath: CrewState["forcePath"];
  watching: boolean;
  orders: Partial<Record<AgentId, string>>;
};

export const useCrew = create<CrewState>((set, get) => ({
  watching: true,
  forcePath: null,
  policyRev: 0,
  appliedRev: 0,
  livePath: "hybrid",
  channelLatest: null,
  log: [],
  agents: defaultAgents("et"),
  setWatching: (on) => set({ watching: on }),
  setForcePath: (path) => set({ forcePath: path }),
  setOrder: (id, order) =>
    set((s) => ({ agents: { ...s.agents, [id]: { ...s.agents[id], order } } })),
  setAgent: (id, patch) =>
    set((s) => ({ agents: { ...s.agents, [id]: { ...s.agents[id], ...patch } } })),
  pushLog: (agent, line) => {
    const id = Date.now() + Math.floor(Math.random() * 99);
    const entry: CrewLog = { id, at: Date.now(), agent, line };
    const log = [...get().log, entry];
    if (log.length > LOG_CAP) log.splice(0, log.length - LOG_CAP);
    set({
      log,
      agents: {
        ...get().agents,
        [agent]: { ...get().agents[agent], lastLine: line, lastAt: entry.at },
      },
    });
  },
  patch: (partial) => set(partial),
}));

export function hydrateCrew(lang: "et" | "en") {
  if (typeof localStorage === "undefined") return;
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) {
      useCrew.setState({ agents: defaultAgents(lang) });
      return;
    }
    const saved = JSON.parse(raw) as Persisted;
    const agents = defaultAgents(lang);
    if (saved.orders) {
      for (const id of AGENT_IDS) {
        const o = saved.orders[id];
        if (typeof o === "string" && o.trim()) agents[id].order = o;
      }
    }
    useCrew.setState({
      agents,
      watching: saved.watching !== false,
      forcePath: saved.forcePath === "kernel" || saved.forcePath === "web" || saved.forcePath === "hybrid" ? saved.forcePath : null,
    });
  } catch {
    useCrew.setState({ agents: defaultAgents(lang) });
  }
}

export function watchCrewPersist() {
  let last = "";
  return useCrew.subscribe((s) => {
    try {
      const orders: Persisted["orders"] = {};
      for (const id of AGENT_IDS) orders[id] = s.agents[id].order;
      const body = JSON.stringify({ forcePath: s.forcePath, watching: s.watching, orders } satisfies Persisted);
      if (body === last) return;
      last = body;
      localStorage.setItem(PERSIST_KEY, JSON.stringify({ forcePath: s.forcePath, watching: s.watching, orders }));
    } catch {
      /* quota */
    }
  });
}
