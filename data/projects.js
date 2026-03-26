/**
 * Datos de respaldo cuando Supabase no está configurado o falla la lectura.
 * Con `NEXT_PUBLIC_SUPABASE_URL` + anon key, la web pública usa la tabla `projects`.
 * Imágenes: Unsplash (placeholders).
 */

export const projects = [
  {
    slug: 'cocina-integral-vicente-lopez',
    title: 'Cocina integral Vicente López',
    ubicacion: 'Vicente López, Zona Norte',
    año: 2024,
    tipo: 'L',
    materiales: ['Melamina laqueada', 'Mesada de cuarzo'],
    tiempoObra: '3 semanas',
    problema: 'Cocina antigua con muebles deteriorados, poco espacio de trabajo y sin conectividad visual con el living.',
    solucion: 'Renovación total con diseño en L que optimizó el espacio. Mesada de cuarzo blanco, módulos superiores hasta el cielorraso y campana integrada. Conexión visual con el comedor mediante barra desayunadora.',
    galeriaAntes: [
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    galeriaDespues: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200',
    ],
    imagenPrincipal: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600',
  },
  {
    slug: 'cocina-americana-san-isidro',
    title: 'Cocina americana San Isidro',
    ubicacion: 'San Isidro, Zona Norte',
    año: 2024,
    tipo: 'isla',
    materiales: ['MDF laqueado', 'Granito negro'],
    tiempoObra: '4 semanas',
    problema: 'Ambiente cerrado y oscuro. Los dueños querían una cocina social, abierta al jardín, con isla central.',
    solucion: 'Demolición de paredes internas y apertura hacia el jardín. Cocina con isla central de 3,20m, cubierta de granito negro. Módulos en MDF laqueado blanco mate. Instalación de piso porcelanato y amplias ventanas.',
    galeriaAntes: [
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
      'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800',
    ],
    galeriaDespues: [
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200',
    ],
    imagenPrincipal: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1600',
  },
  {
    slug: 'renovacion-rapida-olivos',
    title: 'Renovación rápida Olivos',
    ubicacion: 'Olivos, Zona Norte',
    año: 2023,
    tipo: 'lineal',
    materiales: ['Melamina', 'Mesada compacta'],
    tiempoObra: '2 semanas',
    problema: 'Cocina funcional pero estéticamente desactualizada. Presupuesto acotado y necesidad de mínima intervención.',
    solucion: 'Cambio de frente de módulos existentes (melamina blanca), nueva mesada compacta y grifería. Nuevo revestimiento splash y iluminación LED bajo muebles. Resultado moderno con bajo impacto en la obra.',
    galeriaAntes: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
    ],
    galeriaDespues: [
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
    ],
    imagenPrincipal: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600',
  },
  {
    slug: 'cocina-u-palermo',
    title: 'Cocina en U Palermo',
    ubicacion: 'Palermo, CABA',
    año: 2024,
    tipo: 'U',
    materiales: ['MDF lacado', 'Silestone', 'Madera natural'],
    tiempoObra: '5 semanas',
    problema: 'Departamento con cocina muy pequeña, sin espacio de guardado. Cliente exigía diseño premium y materiales de primera.',
    solucion: 'Rediseño en U que aprovecha cada centímetro. Módulos en MDF lacado gris antracita, mesada Silestone Calacatta Gold. Detalles en madera natural en el sector barra. Electrodomésticos integrados y campana decorativa.',
    galeriaAntes: [
      'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    ],
    galeriaDespues: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
    ],
    imagenPrincipal: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600',
  },
  {
    slug: 'cocina-lineal-martinez',
    title: 'Cocina lineal Martínez',
    ubicacion: 'Martínez, Zona Norte',
    año: 2023,
    tipo: 'lineal',
    materiales: ['Melamina fenólica', 'Cuarzo'],
    tiempoObra: '3 semanas',
    problema: 'Espacio angosto tipo pasillo. Cliente necesitaba cocina práctica y fácil de limpiar, con estilo nórdico.',
    solucion: 'Diseño lineal de 4m con módulos en melamina fenólica blanca (anti-rayones). Mesada de cuarzo gris claro. Splash de subway blanco. Abertura de ventana ampliada para mayor luz natural. Resultado limpio y funcional.',
    galeriaAntes: [
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
      'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
    ],
    galeriaDespues: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200',
    ],
    imagenPrincipal: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600',
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs() {
  return projects.map((p) => p.slug);
}
