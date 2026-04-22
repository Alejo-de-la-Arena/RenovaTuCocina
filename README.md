# Renová Tu Cocina | MDV Proyectos

Micrositio premium de renovación de cocinas para MDV Proyectos. Landing + portfolio sin ecommerce ni login, orientado a conversión vía WhatsApp.

## Stack

- **Next.js 15** (App Router)
- **JavaScript** (sin TypeScript)
- **TailwindCSS**
- **Framer Motion** (animaciones elegantes)
- **next/image** (optimización de imágenes)
- **lucide-react** (íconos)
- **clsx + tailwind-merge** (utilidades de clases)

## Instalación

```bash
npm install
```

## Variables de entorno

Crear archivo `.env.local` a partir de `.env.example`:

```bash
cp .env.example .env.local
```

Editar `.env.local` y configurar:

- `NEXT_PUBLIC_WA_NUMBER`: Número de WhatsApp con código de país, sin + ni espacios. Ej: `5491123456789`
- `NEXT_PUBLIC_SITE_URL` (opcional): URL base del sitio para sitemap/robots. Ej: `https://renovatucocina.com.ar`

## Scripts

```bash
npm run dev    # Desarrollo (http://localhost:3000)
npm run build  # Build de producción
npm run start  # Servidor de producción
npm run lint   # ESLint
```

## Estructura del proyecto

```
/app                    # Rutas (App Router)
  /proyectos            # Listado de proyectos
  /proyectos/[slug]     # Detalle de proyecto
  /como-trabajamos      # Proceso
  /contacto             # Contacto
/components             # Componentes reutilizables
  /layout               # Header, Footer
  /ui                   # Button, Card, Input, etc.
  ProjectCard, BeforeAfterSlider, FiltersBar, ContactFormDynamic, WhatsAppCTA
/data
  projects.js           # Mock data de proyectos
/lib
  cn.js                 # clsx + tailwind-merge
  whatsapp.js           # Builder de mensajes WhatsApp
  motion.js             # Variantes Framer Motion
/styles
  globals.css           # Estilos globales
```

## Páginas

1. **/** — Home con hero, secciones Renovar / Desde cero, antes-después, proyectos destacados, testimonios, formulario de contacto
2. **/proyectos** — Listado con filtros (tipo, material, año) y búsqueda
3. **/proyectos/[slug]** — Detalle con galería, comparador antes/después, CTA WhatsApp
4. **/como-trabajamos** — Proceso en 6 pasos + FAQ
5. **/contacto** — Info de contacto + CTA WhatsApp + mapa placeholder

## Formulario dinámico

El formulario en el Home permite elegir motivo:

- **Renovar mi cocina**: medidas, estado actual, zona, presupuesto, urgencia, link opcional, mensaje
- **Cocina desde cero**: tipo, medidas, materiales, zona, presupuesto, fecha deseada, mensaje
- **Solo consulta**: nombre, zona, mensaje

Al enviar, redirige a WhatsApp con el mensaje prellenado. Si `NEXT_PUBLIC_WA_NUMBER` no está configurado, muestra "Configurar WhatsApp".

## Imágenes

Las imágenes de proyectos usan placeholders de Unsplash. Para producción, reemplazar URLs en `/data/projects.js` por imágenes reales (almacenadas localmente o en CDN).
