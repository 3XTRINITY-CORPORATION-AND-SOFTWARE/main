/** Same-tick command-block chain. Signal always forwards. Conditional only skips the command. */

export type ChainKind = "impulse" | "chain" | "repeat";
export type ChainCond = "always" | "ok" | "fail" | "seed" | "rap" | "armed";

export interface ChainBlock {
  i: number;
  kind: ChainKind;
  cond: ChainCond;
  op: string;
  facing: number | null;
  activated: boolean;
}

export interface ChainCtx {
  seed: string;
  rapped: boolean;
  armed: boolean;
  geoOk: boolean;
}

export interface ChainStep {
  i: number;
  op: string;
  kind: ChainKind;
  cond: ChainCond;
  fired: boolean;
  forwarded: boolean;
  success: number;
  note: string;
  lockProcessing: boolean;
}

const LOCK: Record<string, boolean> = {
  GEO_LOOKUP: false,
  RHYME_LOCK: true,
  THEORY_EMIT: false,
  EQ_WRITE: true,
  MOTOR: false,
  STANDIN: false,
  MEASURE: false,
  MIMIC: false,
};

export function nightChain(): ChainBlock[] {
  const ops: Array<{ kind: ChainKind; cond: ChainCond; op: string }> = [
    { kind: "impulse", cond: "always", op: "THEORY_EMIT" },
    { kind: "chain", cond: "seed", op: "RHYME_LOCK" },
    { kind: "chain", cond: "always", op: "GEO_LOOKUP" },
    { kind: "chain", cond: "always", op: "EQ_WRITE" },
    { kind: "chain", cond: "always", op: "MOTOR" },
  ];
  return ops.map((b, i) => ({
    ...b,
    i,
    facing: i + 1 < ops.length ? i + 1 : null,
    activated: true,
  }));
}

function gate(block: ChainBlock, prevSuccess: number, ctx: ChainCtx): { ok: boolean; note: string } {
  if (block.cond === "ok" && prevSuccess <= 0) return { ok: false, note: "cond ok — predecessor success 0" };
  if (block.cond === "fail" && prevSuccess > 0) return { ok: false, note: "cond fail — predecessor success > 0" };
  if (block.cond === "seed" && !ctx.seed.trim()) return { ok: false, note: "tags — empty seed" };
  if (block.cond === "rap" && !ctx.rapped) return { ok: false, note: "mimic waits for a rapped take" };
  if (block.cond === "armed" && !ctx.armed) return { ok: false, note: "needs arm" };
  return { ok: true, note: "fire" };
}

function execOp(op: string, ctx: ChainCtx): { ok: boolean; note: string } {
  if (op === "RHYME_LOCK") {
    if (!ctx.seed.trim()) return { ok: false, note: "tags — empty seed" };
    return { ok: true, note: "seed locked verbatim" };
  }
  if (op === "GEO_LOOKUP") {
    return ctx.geoOk ? { ok: true, note: "geoBusy only" } : { ok: false, note: "geo fail — processing untouched" };
  }
  if (op === "MIMIC") {
    if (!ctx.rapped) return { ok: false, note: "refuse — no rapped take" };
    return { ok: true, note: "dsp toward scalars" };
  }
  if (op === "THEORY_EMIT") return { ok: true, note: "extras 10" };
  if (op === "MOTOR") return { ok: true, note: "motor independent of geo" };
  if (op === "STANDIN") return { ok: true, note: "stand-in tags, not a clone" };
  if (op === "MEASURE") return { ok: true, note: "scalars only" };
  if (op === "EQ_WRITE") return { ok: true, note: "keep rate, no upsample" };
  return { ok: true, note: "ok" };
}

/**
 * Minecraft analog:
 * - Any fired block triggers the chain it faces, same tick, arrow order.
 * - Conditional skips the command when the block behind did not succeed.
 * - Skip still forwards. Loops fire each block at most once per tick.
 * - Inactive (needs not met) forwards without executing.
 */
export function runChain(blocks: ChainBlock[], ctx: ChainCtx): ChainStep[] {
  const log: ChainStep[] = [];
  const success = new Array(blocks.length).fill(0);
  const seen = new Set<number>();

  const trigger = (i: number, prevSuccess: number) => {
    const b = blocks[i];
    if (!b) return;
    if (seen.has(i)) return;
    seen.add(i);

    const lockProcessing = Boolean(LOCK[b.op]);
    if (!b.activated) {
      success[i] = 0;
      log.push({
        i,
        op: b.op,
        kind: b.kind,
        cond: b.cond,
        fired: false,
        forwarded: b.facing !== null,
        success: 0,
        note: "inactive — forward",
        lockProcessing,
      });
      if (b.facing !== null) trigger(b.facing, 0);
      return;
    }

    const g = gate(b, prevSuccess, ctx);
    if (!g.ok) {
      success[i] = 0;
      log.push({
        i,
        op: b.op,
        kind: b.kind,
        cond: b.cond,
        fired: false,
        forwarded: b.facing !== null,
        success: 0,
        note: g.note,
        lockProcessing: false,
      });
      if (b.facing !== null) trigger(b.facing, 0);
      return;
    }

    const result = execOp(b.op, ctx);
    success[i] = result.ok ? 1 : 0;
    log.push({
      i,
      op: b.op,
      kind: b.kind,
      cond: b.cond,
      fired: true,
      forwarded: b.facing !== null,
      success: success[i],
      note: result.note,
      lockProcessing: b.op === "GEO_LOOKUP" ? false : lockProcessing,
    });
    if (b.facing !== null) trigger(b.facing, success[i]);
  };

  if (blocks.length) trigger(0, 1);
  return log;
}

export function chainLockedProcessing(log: ChainStep[]) {
  return log.some((s) => s.fired && s.lockProcessing && s.op === "GEO_LOOKUP");
}
