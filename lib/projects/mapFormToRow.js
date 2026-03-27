import { slugify } from '@/lib/slug';

function parseLinesToArray(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseJsonArray(text) {
  if (!text || !String(text).trim()) return [];
  try {
    const v = JSON.parse(text);
    return Array.isArray(v) ? v.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function parseGalleryText(text) {
  if (!text || typeof text !== 'string') return [];
  const lines = parseLinesToArray(text);
  if (lines.length) return lines;
  return text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseMateriales(text) {
  if (!text || typeof text !== 'string') return [];
  const lines = parseLinesToArray(text);
  if (lines.length) return lines;
  return text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/** FormData / objeto formulario → payload tabla `projects`. */
export function mapFormToRow(input) {
  const title = String(input.title || '').trim();
  let slug = String(input.slug || '').trim();
  if (!slug && title) slug = slugify(title);
  slug = slugify(slug) || slug;

  const visible =
    input.visible_en_proyectos === true ||
    input.visible_en_proyectos === 'true' ||
    input.visible_en_proyectos === 'on';
  const destacado =
    input.destacado_home === true || input.destacado_home === 'true' || input.destacado_home === 'on';
  const orden = Number.parseInt(String(input.orden_prioridad ?? '0'), 10);
  const añoRaw = input.año;
  const año =
    añoRaw === '' || añoRaw === undefined || añoRaw === null
      ? null
      : Number.parseInt(String(añoRaw), 10);

  const galeriaAntes =
    typeof input.galeria_antes_urls === 'string'
      ? parseJsonArray(input.galeria_antes_urls)
      : Array.isArray(input.galeria_antes_urls)
        ? input.galeria_antes_urls
        : parseLinesToArray(input.galeria_antes_text || '');

  const galeriaDespues =
    typeof input.galeria_despues_urls === 'string'
      ? parseJsonArray(input.galeria_despues_urls)
      : Array.isArray(input.galeria_despues_urls)
        ? input.galeria_despues_urls
        : parseLinesToArray(input.galeria_despues_text || '');

  let extra = {};
  if (input.extra_json && String(input.extra_json).trim()) {
    try {
      extra = JSON.parse(String(input.extra_json));
    } catch {
      extra = {};
    }
  }

  const galeriaProyecto = parseGalleryText(String(input.galeria_proyecto_text || ''));
  extra = {
    ...extra,
    galeriaProyecto,
  };

  const row = {
    slug,
    title: title || 'Sin título',
    visible_en_proyectos: visible,
    destacado_home: destacado,
    orden_prioridad: Number.isFinite(orden) ? orden : 0,
    ubicacion: String(input.ubicacion || '').trim() || null,
    tipo_cocina: String(input.tipo_cocina || '').trim() || null,
    año: Number.isFinite(año) ? año : null,
    tiempo_obra: String(input.tiempo_obra || '').trim() || null,
    materiales: parseMateriales(String(input.materiales_text || '')),
    descripcion_corta: String(input.descripcion_corta || '').trim() || null,
    desafio: String(input.desafio || '').trim() || null,
    solucion: String(input.solucion || '').trim() || null,
    contenido_extendido: String(input.contenido_extendido || '').trim() || null,
    imagen_principal_url: String(input.imagen_principal_url || '').trim() || null,
    imagen_card_url: String(input.imagen_card_url || '').trim() || null,
    imagen_detalle_url: String(input.imagen_detalle_url || '').trim() || null,
    galeria_antes_urls: galeriaAntes,
    galeria_despues_urls: galeriaDespues,
    meta_title: String(input.meta_title || '').trim() || null,
    meta_description: String(input.meta_description || '').trim() || null,
    alt_imagen_principal: String(input.alt_imagen_principal || '').trim() || null,
    extra,
  };

  return row;
}
