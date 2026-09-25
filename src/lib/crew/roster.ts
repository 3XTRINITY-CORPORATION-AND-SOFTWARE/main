import type { AgentId } from "./types";

export const DEFAULT_ORDERS: Record<AgentId, { et: string; en: string }> = {
  architect: {
    et: "Loe hosti signaal. Nõrk masin → veebitee. Tugev masin → tuum. Kirjuta poliitika.",
    en: "Read host signal. Weak machine → web path. Strong machine → kernel. Write policy.",
  },
  builder: {
    et: "Rakenda arhitekti poliitika puhvrisse ja visuaali. Ära kirjuta mixi üle ilma põhjuseta.",
    en: "Apply architect policy to buffer and visuals. Do not overwrite the mix without cause.",
  },
  maintenance: {
    et: "Hoia mootor elus. Kui latentsus või CPU jookseb, suurenda puhvrit. Logi vead.",
    en: "Keep the engine alive. If latency or CPU runs away, raise the buffer. Log faults.",
  },
  seeker: {
    et: "Otsi tuuma kanalilt uuendusi ja võimekuse muutusi.",
    en: "Seek kernel-channel updates and capability changes.",
  },
  executioner: {
    et: "Vaheta tuum/veeb kui arhitekt muudab poliitikat. Ära sunni kerneliversiooni ilma kinnituseta.",
    en: "Switch kernel/web when the architect changes policy. Do not force a kernel version unconfirmed.",
  },
  kernel: {
    et: "Hoia AudioWorklet ja 4D maatriks. Raporteeri kui tuum ei lae.",
    en: "Hold the AudioWorklet and 4D matrix. Report if the kernel fails to load.",
  },
  web: {
    et: "Kui signaal on nõrk, kanna koormus veebiteele: suurem puhver, kergem visuaal.",
    en: "When the signal is weak, carry load on the web path: larger buffer, lighter visuals.",
  },
};

export const AGENT_META: Record<
  AgentId,
  { et: string; en: string; dutyEt: string; dutyEn: string }
> = {
  architect: {
    et: "Arhitekt",
    en: "Architect",
    dutyEt: "Poliitika ja tee",
    dutyEn: "Policy and path",
  },
  builder: {
    et: "Ehitaja",
    en: "Builder",
    dutyEt: "Rakendus",
    dutyEn: "Apply",
  },
  maintenance: {
    et: "Hooldus",
    en: "Maintenance",
    dutyEt: "Elushoid",
    dutyEn: "Keep-alive",
  },
  seeker: {
    et: "Otsija",
    en: "Seeker",
    dutyEt: "Uuendused",
    dutyEn: "Updates",
  },
  executioner: {
    et: "Täitja",
    en: "Executioner",
    dutyEt: "Teevahetus",
    dutyEn: "Path switch",
  },
  kernel: {
    et: "Tuum",
    en: "Kernel",
    dutyEt: "Kohalik mootor",
    dutyEn: "Local motor",
  },
  web: {
    et: "Veeb",
    en: "Web",
    dutyEt: "Kerge tee",
    dutyEn: "Light path",
  },
};
