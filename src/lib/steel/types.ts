export type HostId = "fl" | "ableton" | "generic";
export type OsId = "win8" | "win10" | "win11" | "linux";
export type SteelTab = "console" | "desk" | "studio" | "aura" | "pipeline" | "hosts" | "kernel" | "audit";

export interface Addon {
  id: string;
  name: string;
  version: string;
  minKernel: string;
  enabled: boolean;
}

export interface KernelManifest {
  channel: string;
  current: string;
  latest: string;
  released: string;
  asio4all: string;
  hosts: Record<string, string>;
  addons: Array<Omit<Addon, "enabled">>;
  notes: string;
}

export interface MidiPortInfo {
  id: string;
  name: string;
  manufacturer: string;
  type: "in" | "out";
}

export interface MeterFrame {
  peak: number;
  rms: number;
  voices: number;
}
