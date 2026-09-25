import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";

export type RowKind = "mix" | "audit";

export type SteelRow = {
  id: number;
  kind: RowKind;
  title: string;
  payloadJson: string;
  createdAt: string;
};

function asKind(v: unknown): RowKind | null {
  return v === "mix" || v === "audit" ? v : null;
}

export const createSteelRow = createServerFn({ method: "POST" })
  .validator((input: { kind: RowKind; title: string; payloadJson: string }) => {
    const kind = asKind(input?.kind);
    if (!kind) throw new Error("kind");
    const title = String(input?.title ?? "").trim().slice(0, 80);
    if (!title) throw new Error("title");
    const payloadJson = String(input?.payloadJson ?? "");
    if (payloadJson.length < 2 || payloadJson.length > 4000) throw new Error("payload");
    JSON.parse(payloadJson);
    return { kind, title, payloadJson };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql.query<{ id: number; created_at: string }>(
      "insert into steel_rows (kind, title, payload) values ($1, $2, $3::jsonb) returning id, created_at",
      [data.kind, data.title, data.payloadJson],
    );
    const row = rows[0];
    return { id: Number(row.id), createdAt: String(row.created_at) };
  });

export const listSteelRows = createServerFn({ method: "POST" })
  .validator((input: { kind: RowKind }) => {
    const kind = asKind(input?.kind);
    if (!kind) throw new Error("kind");
    return { kind };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql.query<{
      id: number;
      kind: string;
      title: string;
      payload: unknown;
      created_at: string;
    }>(
      "select id, kind, title, payload, created_at from steel_rows where kind = $1 order by id desc limit 40",
      [data.kind],
    );
    return rows.map(
      (r): SteelRow => ({
        id: Number(r.id),
        kind: r.kind as RowKind,
        title: r.title,
        payloadJson: typeof r.payload === "string" ? r.payload : JSON.stringify(r.payload ?? {}),
        createdAt: String(r.created_at),
      }),
    );
  });
