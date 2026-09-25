-- Unowned ledger. No user_id — auth is off. No YAML, keys, or audio.
create table if not exists steel_rows (
  id         serial primary key,
  kind       text not null check (kind in ('mix', 'audit')),
  title      text not null,
  payload    jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists steel_rows_kind_created_idx
  on steel_rows (kind, created_at desc);
