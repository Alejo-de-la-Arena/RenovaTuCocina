-- Renová tu Cocina — esquema producción (Supabase / PostgreSQL)
-- Ejecutar en el SQL Editor de Supabase o con supabase db push

-- Extensión para UUID
create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  visible_en_proyectos boolean not null default false,
  destacado_home boolean not null default false,
  orden_prioridad integer not null default 0,
  ubicacion text,
  tipo_cocina text,
  año integer,
  tiempo_obra text,
  materiales text[] not null default '{}',
  descripcion_corta text,
  desafio text,
  solucion text,
  contenido_extendido text,
  imagen_principal_url text,
  imagen_card_url text,
  imagen_detalle_url text,
  galeria_antes_urls jsonb not null default '[]'::jsonb,
  galeria_despues_urls jsonb not null default '[]'::jsonb,
  meta_title text,
  meta_description text,
  alt_imagen_principal text,
  extra jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_projects_visible on public.projects (visible_en_proyectos);
create index if not exists idx_projects_destacado on public.projects (destacado_home, orden_prioridad);
create index if not exists idx_projects_slug on public.projects (slug);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
  before update on public.projects
  for each row
  execute procedure public.set_updated_at();

alter table public.projects enable row level security;

-- Lectura pública: solo proyectos marcados visibles (cliente anónimo)
drop policy if exists "public_read_visible_projects" on public.projects;
create policy "public_read_visible_projects"
  on public.projects
  for select
  to anon
  using (visible_en_proyectos = true);

-- Sesión autenticada (admin): lectura y escritura completa
-- El usuario admin se crea manualmente en Authentication; no hay registro público.
drop policy if exists "authenticated_all_projects" on public.projects;
create policy "authenticated_all_projects"
  on public.projects
  for all
  to authenticated
  using (true)
  with check (true);

-- Bucket de imágenes (público para lectura CDN)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do nothing;

drop policy if exists "public_read_project_images" on storage.objects;
create policy "public_read_project_images"
  on storage.objects for select
  using (bucket_id = 'project-images');

drop policy if exists "authenticated_upload_project_images" on storage.objects;
create policy "authenticated_upload_project_images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images');

drop policy if exists "authenticated_update_own_project_images" on storage.objects;
create policy "authenticated_update_own_project_images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images');

drop policy if exists "authenticated_delete_project_images" on storage.objects;
create policy "authenticated_delete_project_images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images');
