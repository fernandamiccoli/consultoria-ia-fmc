create table if not exists public.contact_submissions (
  id bigint primary key generated always as identity,
  created_at timestamptz not null default now(),
  nombre text not null,
  email text not null,
  organizacion text not null,
  segmento text not null check (segmento in ('empresa', 'institucion_educativa')),
  mensaje text not null,
  source_path text,
  user_agent text
);

alter table public.contact_submissions enable row level security;

revoke all on table public.contact_submissions from anon, authenticated;
grant insert on table public.contact_submissions to service_role;
grant select, update, delete on table public.contact_submissions to service_role;
