function normalizeUrlArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Fila DB → forma consumida por la UI pública (cards, detalle, home).
 * Mantiene compatibilidad con nombres ya usados en componentes (problema, galeriaAntes, etc.).
 */
export function mapRowToPublic(row) {
  if (!row) return null;
  const extra = typeof row.extra === 'object' && row.extra !== null ? row.extra : {};
  const galeriaProyecto = normalizeUrlArray(extra.galeriaProyecto);
  return {
    ...extra,
    id: row.id,
    slug: row.slug,
    title: row.title,
    ubicacion: row.ubicacion ?? '',
    año: row.año ?? null,
    tipo: row.tipo_cocina ?? '',
    /** Slug: estetica | funcional | integral | ampliacion (desde extra o columna futura). */
    renovacion: extra.renovacion ?? '',
    materiales: Array.isArray(row.materiales) ? row.materiales : [],
    tiempoObra: row.tiempo_obra ?? '',
    descripcionCorta: row.descripcion_corta ?? '',
    problema: row.desafio ?? '',
    solucion: row.solucion ?? '',
    contenidoExtendido: row.contenido_extendido ?? '',
    galeriaAntes: normalizeUrlArray(row.galeria_antes_urls),
    galeriaDespues: normalizeUrlArray(row.galeria_despues_urls),
    galeriaProyecto,
    imagenPrincipal: row.imagen_principal_url ?? '',
    imagenCard: row.imagen_card_url ?? '',
    imagenDetalle: row.imagen_detalle_url ?? '',
    metaTitle: row.meta_title ?? '',
    metaDescription: row.meta_description ?? '',
    altImagenPrincipal: row.alt_imagen_principal ?? '',
    extra,
    visibleEnProyectos: row.visible_en_proyectos,
    destacadoHome: row.destacado_home,
    ordenPrioridad: row.orden_prioridad ?? 0,
  };
}
