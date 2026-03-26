import { isSupabaseConfigured } from '@/lib/env';
import { createPublicAnonClient } from '@/lib/supabase/public-anon';
import { projects as staticProjects } from '@/data/projects';
import { mapRowToPublic } from '@/lib/projects/mapRowToPublic';
import { MAX_FEATURED_HOME } from '@/lib/projects/constants';

function staticAsPublic() {
  return staticProjects.map((p) => ({
    ...p,
    descripcionCorta: p.descripcionCorta ?? '',
    visibleEnProyectos: true,
    destacadoHome: false,
    ordenPrioridad: 0,
  }));
}

/** Proyectos visibles en /proyectos (anon / sin sesión). */
export async function getPublicProjectsList() {
  if (!isSupabaseConfigured()) {
    return staticAsPublic();
  }
  const supabase = createPublicAnonClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('visible_en_proyectos', true)
    .order('orden_prioridad', { ascending: true })
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('[getPublicProjectsList]', error.message);
    return staticAsPublic();
  }
  return (data || []).map(mapRowToPublic).filter(Boolean);
}

/** Hasta MAX_FEATURED_HOME destacados visibles para home. */
export async function getFeaturedProjectsForHome() {
  if (!isSupabaseConfigured()) {
    return staticAsPublic().slice(0, MAX_FEATURED_HOME);
  }
  const supabase = createPublicAnonClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('visible_en_proyectos', true)
    .eq('destacado_home', true)
    .order('orden_prioridad', { ascending: true })
    .order('updated_at', { ascending: false })
    .limit(MAX_FEATURED_HOME);

  if (error) {
    console.error('[getFeaturedProjectsForHome]', error.message);
    return staticAsPublic().slice(0, MAX_FEATURED_HOME);
  }
  return (data || []).map(mapRowToPublic).filter(Boolean);
}

/** Detalle público por slug (solo visible). */
export async function getPublicProjectBySlug(slug) {
  if (!slug) return null;
  if (!isSupabaseConfigured()) {
    const p = staticProjects.find((x) => x.slug === slug);
    if (!p) return null;
    return {
      ...p,
      descripcionCorta: p.descripcionCorta ?? '',
      visibleEnProyectos: true,
      destacadoHome: false,
      ordenPrioridad: 0,
    };
  }
  const supabase = createPublicAnonClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('visible_en_proyectos', true)
    .maybeSingle();

  if (error) {
    console.error('[getPublicProjectBySlug]', error.message);
    const p = staticProjects.find((x) => x.slug === slug);
    return p
      ? {
          ...p,
          descripcionCorta: p.descripcionCorta ?? '',
          visibleEnProyectos: true,
          destacadoHome: false,
          ordenPrioridad: 0,
        }
      : null;
  }
  return data ? mapRowToPublic(data) : null;
}

/** Slugs para sitemap (solo visibles). */
export async function getPublicProjectSlugs() {
  if (!isSupabaseConfigured()) {
    return staticProjects.map((p) => p.slug);
  }
  const supabase = createPublicAnonClient();
  const { data, error } = await supabase
    .from('projects')
    .select('slug')
    .eq('visible_en_proyectos', true);

  if (error) {
    console.error('[getPublicProjectSlugs]', error.message);
    return staticProjects.map((p) => p.slug);
  }
  return (data || []).map((r) => r.slug).filter(Boolean);
}
