import { createClient } from '@/lib/supabase/server';
import { mapRowToPublic } from '@/lib/projects/mapRowToPublic';

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

export async function listProjectsAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'No autorizado', projects: [] };

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('orden_prioridad', { ascending: true })
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('[listProjectsAdmin]', error.message);
    return { ok: false, error: error.message, projects: [] };
  }
  return { ok: true, projects: data || [], error: null };
}

export async function getProjectByIdAdmin(id) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'No autorizado', project: null };

  const { data, error } = await supabase.from('projects').select('*').eq('id', id).maybeSingle();

  if (error) {
    console.error('[getProjectByIdAdmin]', error.message);
    return { ok: false, error: error.message, project: null };
  }
  return { ok: true, project: data, error: null };
}

/** Vista previa admin: mismo shape que público + flags */
export function rowToPreviewPublic(row) {
  return mapRowToPublic(row);
}
