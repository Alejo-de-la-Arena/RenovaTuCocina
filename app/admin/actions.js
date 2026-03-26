'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { mapFormToRow } from '@/lib/projects/mapFormToRow';

async function requireUser(supabase) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

function formDataToObject(formData) {
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

function revalidateProjectPaths(slug) {
  revalidatePath('/');
  revalidatePath('/proyectos');
  if (slug) revalidatePath(`/proyectos/${slug}`);
  revalidatePath('/admin/proyectos');
}

export async function createProjectAction(prevState, formData) {
  const supabase = await createClient();
  const user = await requireUser(supabase);
  if (!user) return { ok: false, error: 'No autorizado.' };

  const raw = formDataToObject(formData);
  const row = mapFormToRow(raw);

  if (!row.slug || !row.title) {
    return { ok: false, error: 'Completá al menos título y slug.' };
  }

  const { data, error } = await supabase.from('projects').insert(row).select('id, slug').single();

  if (error) {
    return {
      ok: false,
      error: error.message.includes('duplicate') ? 'El slug ya existe. Elegí otro.' : error.message,
    };
  }

  revalidateProjectPaths(data.slug);
  redirect(`/admin/proyectos/${data.id}?created=1`);
}

export async function updateProjectAction(prevState, formData) {
  const projectId = formData.get('project_id');
  if (!projectId) return { ok: false, error: 'ID de proyecto inválido.' };

  const supabase = await createClient();
  const user = await requireUser(supabase);
  if (!user) return { ok: false, error: 'No autorizado.' };

  const raw = formDataToObject(formData);
  const row = mapFormToRow(raw);

  const { error } = await supabase.from('projects').update(row).eq('id', projectId);

  if (error) {
    return { ok: false, error: error.message.includes('duplicate') ? 'El slug ya existe.' : error.message };
  }

  revalidateProjectPaths(row.slug);
  return { ok: true, error: null };
}

export async function deleteProjectAction(projectId) {
  const supabase = await createClient();
  const user = await requireUser(supabase);
  if (!user) return { ok: false, error: 'No autorizado.' };

  const { data: existing } = await supabase.from('projects').select('slug').eq('id', projectId).maybeSingle();

  const { error } = await supabase.from('projects').delete().eq('id', projectId);

  if (error) return { ok: false, error: error.message };

  revalidateProjectPaths(existing?.slug);
  return { ok: true, error: null };
}

export async function updateProjectFlagsAction(projectId, flags) {
  const supabase = await createClient();
  const user = await requireUser(supabase);
  if (!user) return { ok: false, error: 'No autorizado.' };

  const patch = {};
  if (typeof flags.visible_en_proyectos === 'boolean') patch.visible_en_proyectos = flags.visible_en_proyectos;
  if (typeof flags.destacado_home === 'boolean') patch.destacado_home = flags.destacado_home;
  if (typeof flags.orden_prioridad === 'number') patch.orden_prioridad = flags.orden_prioridad;

  const { data: row } = await supabase.from('projects').select('slug').eq('id', projectId).maybeSingle();

  const { error } = await supabase.from('projects').update(patch).eq('id', projectId);

  if (error) return { ok: false, error: error.message };

  revalidateProjectPaths(row?.slug);
  return { ok: true, error: null };
}
