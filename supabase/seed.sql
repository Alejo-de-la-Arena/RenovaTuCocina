-- Datos iniciales opcionales (ejecutar en SQL Editor después de 001_projects_and_storage.sql)
-- Ajustá visibilidad y destacados según necesites.

insert into public.projects (
  slug, title, visible_en_proyectos, destacado_home, orden_prioridad,
  ubicacion, tipo_cocina, año, tiempo_obra, materiales,
  descripcion_corta, desafio, solucion,
  imagen_principal_url,
  galeria_antes_urls, galeria_despues_urls,
  meta_title, meta_description
) values (
  'cocina-integral-vicente-lopez',
  'Cocina integral Vicente López',
  true,
  true,
  0,
  'Vicente López, Zona Norte',
  'L',
  2024,
  '3 semanas',
  array['Melamina laqueada', 'Mesada de cuarzo'],
  'Renovación integral con diseño en L y mesada de cuarzo.',
  'Cocina antigua con muebles deteriorados, poco espacio de trabajo y sin conectividad visual con el living.',
  'Renovación total con diseño en L que optimizó el espacio. Mesada de cuarzo blanco, módulos superiores hasta el cielorraso y campana integrada.',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600',
  '["https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"]'::jsonb,
  '["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200","https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200"]'::jsonb,
  'Cocina integral Vicente López | Renová tu Cocina',
  'Cocina en L en Vicente López: renovación integral con cuarzo y diseño editorial.'
)
on conflict (slug) do nothing;

-- Podés duplicar el bloque anterior para el resto de casos o cargarlos desde el panel admin.
