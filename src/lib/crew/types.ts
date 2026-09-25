import type { ComputePath } from "@/lib/signal/probe";

export type AgentId =
  | "architect"
  | "builder"
  | "maintenance"
  | "seeker"
  | "executioner"
  | "kernel"
  | "web";

export type AgentStatus = "idle" | "work" | "blocked" | "paused";

export interface CrewLog {
  id: number;
  at: number;
  agent: AgentId;
  line: string;
}

export interface AgentState {
  id: AgentId;
  status: AgentStatus;
  order: string;
  lastLine: string;
  lastAt: number;
  ticks: number;
}

export interface CrewState {
  watching: boolean;
  forcePath: ComputePath | null;
  policyRev: number;
  appliedRev: number;
  livePath: ComputePath;
  channelLatest: string | null;
  log: CrewLog[];
  agents: Record<AgentId, AgentState>;
  setWatching: (on: boolean) => void;
  setForcePath: (path: ComputePath | null) => void;
  setOrder: (id: AgentId, order: string) => void;
  setAgent: (id: AgentId, patch: Partial<AgentState>) => void;
  pushLog: (agent: AgentId, line: string) => void;
  patch: (partial: Partial<Omit<CrewState, "agents" | "log">>) => void;
}

export const AGENT_IDS: AgentId[] = [
  "architect",
  "builder",
  "maintenance",
  "seeker",
  "executioner",
  "kernel",
  "web",
];
