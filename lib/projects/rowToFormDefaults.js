function linesFromJsonOrArray(value) {
  if (!value) return '';
  if (Array.isArray(value)) return value.filter(Boolean).join('\n');
  if (typeof value === 'string') {
    try {
      const p = JSON.parse(value);
      return Array.isArray(p) ? p.filter(Boolean).join('\n') : '';
    } catch {
      return '';
    }
  }
  return '';
}

function linesFromExtraGallery(extra) {
  if (!extra || typeof extra !== 'object') return '';
  const raw = extra.galeriaProyecto;
  if (!raw) return '';
  if (Array.isArray(raw)) return raw.filter(Boolean).join('\n');
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter(Boolean).join('\n') : '';
    } catch {
      return '';
    }
  }
  return '';
}

/** Fila DB → valores iniciales del formulario admin */
export function rowToFormDefaults(row) {
  if (!row) {
    return {
      title: '',
      slug: '',
      visible_en_proyectos: 'false',
      destacado_home: 'false',
      orden_prioridad: '0',
      ubicacion: '',
      tipo_cocina: '',
      año: '',
      tiempo_obra: '',
      materiales_text: '',
      descripcion_corta: '',
      desafio: '',
      solucion: '',
      contenido_extendido: '',
      imagen_principal_url: '',
      imagen_card_url: '',
      imagen_detalle_url: '',
      galeria_antes_text: '',
      galeria_despues_text: '',
      meta_title: '',
      meta_description: '',
      alt_imagen_principal: '',
      extra_json: '',
      galeria_proyecto_text: '',
    };
  }

  return {
    title: row.title ?? '',
    slug: row.slug ?? '',
    visible_en_proyectos: row.visible_en_proyectos ? 'true' : 'false',
    destacado_home: row.destacado_home ? 'true' : 'false',
    orden_prioridad: String(row.orden_prioridad ?? 0),
    ubicacion: row.ubicacion ?? '',
    tipo_cocina: row.tipo_cocina ?? '',
    año: row.año != null ? String(row.año) : '',
    tiempo_obra: row.tiempo_obra ?? '',
    materiales_text: Array.isArray(row.materiales) ? row.materiales.join('\n') : '',
    descripcion_corta: row.descripcion_corta ?? '',
    desafio: row.desafio ?? '',
    solucion: row.solucion ?? '',
    contenido_extendido: row.contenido_extendido ?? '',
    imagen_principal_url: row.imagen_principal_url ?? '',
    imagen_card_url: row.imagen_card_url ?? '',
    imagen_detalle_url: row.imagen_detalle_url ?? '',
    galeria_antes_text: linesFromJsonOrArray(row.galeria_antes_urls),
    galeria_despues_text: linesFromJsonOrArray(row.galeria_despues_urls),
    meta_title: row.meta_title ?? '',
    meta_description: row.meta_description ?? '',
    alt_imagen_principal: row.alt_imagen_principal ?? '',
    extra_json: row.extra && Object.keys(row.extra).length ? JSON.stringify(row.extra, null, 2) : '',
    galeria_proyecto_text: linesFromExtraGallery(row.extra),
  };
}
