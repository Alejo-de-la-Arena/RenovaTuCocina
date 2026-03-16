# Propuesta de rediseño Home — Renová tu Cocina MDV

## 1. Estructura nueva de la home

| Orden | Sección | Objetivo principal |
|-------|---------|--------------------|
| 1 | **Hero** | Impacto visual, confianza arriba del fold, CTAs claros |
| 2 | **Trust bar** (micro) | Años de experiencia, proyectos, zona, respuesta rápida |
| 3 | **Servicios** | Selector visual premium: tipo de intervención + tiempo + CTA WhatsApp |
| 4 | **Cocina desde cero** | Beneficios en bloques grandes + materiales + imagen aspiracional |
| 5 | **Proyectos** | Proyecto destacado + grilla secundaria + antes/después + filtro simple |
| 6 | **Cómo trabajamos** | Timeline horizontal/vertical moderna, pasos con más presencia |
| 7 | **Testimonios** | Layout premium, cita destacada, más credibilidad |
| 8 | **Contacto** | Formulario guiado por pasos, WhatsApp integrado de forma elegante |

---

## 2. Cambios visuales por sección

### 2.1 Hero
- **Layout**: Full viewport (min-h-screen), imagen o video de fondo con overlay suave (no negro puro; tono cálido oscuro).
- **Composición**: Texto a la izquierda (desktop) / centrado (mobile). Reservar espacio inferior para CTAs y opcional “Antes / Después” como toggle o pill.
- **Tipografía**: Headline en serif grande (Playfair), subtítulo en sans con buen line-height. Sin script en hero para sensación más editorial.
- **CTAs**: Primario sólido (terracota), secundario outline claro. Un solo nivel de jerarquía.
- **Trust signals**: Barra fina arriba del fold o justo debajo del hero: “+X años • +X proyectos • Zona Norte y CABA • Respuesta en 24 h”.

### 2.2 Servicios
- **UI**: Cards grandes (o tabs con preview visual), no chips pequeños. Cada opción: ícono/imagen de referencia, título, tiempo estimado, tipo de intervención, lista corta de “Incluye” y botón WhatsApp.
- **Interacción**: Al cambiar de servicio, transición suave de contenido (fade/slide corto). Sin slider de imágenes; un solo bloque de contenido que cambia.
- **Fondo**: Bloque oscuro (igual que ahora) con acento terracota en hover/activo.

### 2.3 Cocina desde cero
- **Composición**: 2 columnas en desktop: texto + beneficios en bloques grandes a la izquierda; imagen grande (ratio 4/5 o 3/4) a la derecha. En mobile: texto, luego imagen.
- **Beneficios**: Cada uno en un “bloque” con título, descripción corta y opcional ícono sutil. Más aire entre bloques.
- **Materiales/terminaciones**: Pequeña línea o chips: “Melamina • Laqueado • MDF • Cuarzo • Granito” como refuerzo de calidad.
- **Visual**: Una sola imagen premium, no carrusel.

### 2.4 Proyectos
- **Destacado**: Un proyecto “featured” arriba: imagen grande, título, ubicación, badges (tipo, materiales), CTA “Ver proyecto”.
- **Grilla**: 2–3 columnas de cards. Cada card: imagen con overlay sutil al hover, badge de tipo (y opcional material), título, ubicación. Opcional badge “Antes/Después” si aplica.
- **Filtros**: Un solo nivel: tipo (Todos, Renovación, Integral, etc.) con pills o tabs, sin dropdowns complejos.
- **Jerarquía**: Título de sección + breve descripción; link “Ver todos” discreto.

### 2.5 Cómo trabajamos
- **Layout**: Timeline horizontal en desktop (pasos unidos por línea o guión); vertical en mobile.
- **Cada paso**: Número grande o ícono, título, descripción corta. Microanimación al entrar en viewport (fade-up suave).
- **Estilo**: Fondo claro cálido o blanco; línea/connector en gris suave o terracota muy sutil. Sin cajas pesadas.

### 2.6 Testimonios
- **Layout**: Una cita destacada grande (opcional con foto) + 2 cards laterales o debajo. O 3 cards iguales con más espacio y tipografía generosa.
- **Credibilidad**: Nombre, zona, y opcional “Proyecto: Cocina integral” para anclar a algo concreto. Estrellas visibles pero no gigantes.
- **Fondo**: Oscuro o bloque terracota muy suave para contraste con el resto.

### 2.7 Contacto
- **Flujo**: Paso 1 → “¿Qué buscás?” (Renovar / Desde cero / Consulta). Paso 2 → Formulario corto según opción. Paso 3 → Resumen + “Enviar por WhatsApp”.
- **Diseño**: Cards con bordes suaves, mucho espacio en blanco. Botón WhatsApp claro pero no invasivo (ícono + texto “Continuar por WhatsApp”).
- **Microcopy**: Labels claros, placeholders útiles, mensaje de éxito o redirección explícita.

---

## 3. Mejoras de UX

- **Jerarquía clara**: Un H1 en hero; H2 por sección; sin saltos de nivel.
- **CTAs únicos por bloque**: Un CTA principal por sección (ej. “Consultar por WhatsApp” en servicios, “Ver proyectos” en proyectos).
- **Navegación**: Anchor links en header hacia #servicios, #proyectos, #como-trabajamos, #contacto.
- **WhatsApp**: Siempre visible (flotante) pero pequeño y no molesto; en contacto como acción principal del formulario.
- **Performance**: Una imagen hero prioritaria; resto lazy. Sin videos autoplay pesados; si hay video, optimizado y opcional.
- **Accesibilidad**: Contraste suficiente (terracota sobre blanco/oscuro probado), focus visible, labels en formularios.

---

## 4. Microcopy propuesto

| Ubicación | Actual (referencia) | Propuesto |
|-----------|---------------------|-----------|
| Hero headline | Renovación de cocinas a medida | **Transformamos tu cocina.** O: **Tu cocina, renovada.** |
| Hero sub | Diseño, fabricación e instalación. Antes y después reales. | Proyecto integral: diseño, fabricación e instalación. Resultados reales, proceso claro. |
| Servicios título | Renová tu cocina | Cómo querés renovar |
| Servicios sub | Optimizá espacio... | Elegí el tipo de intervención y te guiamos con un presupuesto sin cargo. |
| Desde cero título | Cocina desde cero | Cocina desde cero |
| Desde cero sub | Proyecto integral... | Un solo equipo: diseño, materiales premium y plazos definidos. |
| Proyectos título | Proyectos destacados | Proyectos reales |
| Proyectos sub | Mirá algunos... | Transformaciones recientes en Zona Norte y CABA. |
| Proceso título | Cómo trabajamos | Cómo trabajamos |
| Proceso sub | Proceso claro... | Consulta, visita, presupuesto y obra. Sin sorpresas. |
| Testimonios título | Lo que dicen... | Lo que dicen nuestros clientes |
| Contacto título | Contáctanos | Empecemos tu proyecto |
| Contacto sub | Completá el formulario... | Contanos en dos pasos y te respondemos por WhatsApp en 24 h. |

---

## 5. Animaciones sugeridas (sutiles)

- **Hero**: Fade-up del bloque de texto (0.5–0.6 s, ease suave). Sin movimiento de imagen.
- **Scroll**: Elementos con `whileInView`: opacity 0→1, y 16–24px→0; `once: true`; stagger 0.08–0.1 s en listas/cards.
- **Servicios**: Al cambiar de pestaña/card: fade 0.25 s + ligero slide vertical (4–8px).
- **Proyectos**: Cards con hover: ligero lift (translateY -4px) y sombra un poco más marcada; imagen con scale(1.02) en 0.3 s.
- **Timeline**: Cada paso con fade-up al entrar en viewport; sin animar líneas de forma compleja.
- **Contacto**: Transición suave entre pasos del formulario (opacity + height o AnimatePresence).
- **Evitar**: Parallax fuerte, scroll-jacking, animaciones en loop, muchos elementos que se muevan a la vez.

---

## 6. Layout desktop vs mobile

| Sección | Desktop | Mobile |
|---------|---------|--------|
| Hero | Texto 50% izquierda, imagen full; trust bar en una línea | Stack: trust bar compacto, texto centrado, CTAs apilados |
| Servicios | Tabs o cards en fila; contenido debajo centrado | Cards apiladas o selector tipo acordeón |
| Desde cero | 2 columnas 50/50 | Columna única; imagen después del texto |
| Proyectos | Featured 100% ancho; grilla 3 cols | Featured; grilla 1 col |
| Cómo trabajamos | Timeline horizontal 4 pasos | Timeline vertical |
| Testimonios | 3 columnas o 1+2 | 1 col o slider mínimo |
| Contacto | Formulario centrado max-w-2xl | Full width con padding generoso |

---

## 7. Stack e implementación

- **Next.js (App Router)** y componentes en `app/` y `components/`.
- **Tailwind**: tokens existentes + nuevos para terracota refinado, fondos cálidos (`warm-50`, `warm-100`), y oscuro sofisticado (`dark-section`).
- **Framer Motion**: solo donde aporte (hero, scroll reveal, cambio de servicio, pasos del formulario).
- **Fuentes**: Playfair (títulos), Inter o DM Sans (cuerpo); sin script en hero.
- **Imágenes**: `next/image` con `priority` en hero, `loading="lazy"` en el resto; `sizes` adecuados.
- Los nuevos componentes se crean en `components/home/` (HeroPremium, ServiciosPremium, etc.) y se integran en `app/page.js` reemplazando los actuales.
