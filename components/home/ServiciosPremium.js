'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { hasWhatsAppConfigured, getWhatsAppUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';

const SERVICIOS = [
  {
    id: 'frentes',
    label: 'Cambio de frentes',
    short: 'Frentes',
    tiempo: '2–3 semanas',
    tipo: 'Renovación de módulos',
    beneficios: ['Nuevo aspecto sin cambiar estructura.', 'Melamina, laqueado o chapas.'],
    incluye: 'Diseño de color, fabricación e instalación de frentes.',
    mensaje: 'Hola, me interesa renovar mi cocina con *cambio de frentes*. ¿Podrían darme más información?',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
  },
  {
    id: 'mesada',
    label: 'Mesada',
    short: 'Mesada',
    tiempo: '1–2 semanas',
    tipo: 'Reemplazo de superficies',
    beneficios: ['Nueva mesada y bacha. Cuarzo, granito o compacto.', 'Opcional: nuevo splash.'],
    incluye: 'Medición, elección de material, corte e instalación.',
    mensaje: 'Hola, quiero cambiar la *mesada* de mi cocina. ¿Podrían cotizarme?',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  },
  {
    id: 'reconfig',
    label: 'Reconfiguración completa',
    short: 'Completa',
    tiempo: '4–6 semanas',
    tipo: 'Rediseño integral',
    beneficios: ['Rediseño del layout. Más espacio, mejor flujo.', 'Nuevos módulos, mesada, iluminación.'],
    incluye: 'Diseño integral, fabricación, instalación y detalles.',
    mensaje: 'Hola, busco una *reconfiguración completa* de mi cocina. ¿Podemos coordinar una visita?',
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800',
  },
  {
    id: 'iluminacion',
    label: 'Iluminación y herrajes',
    short: 'Iluminación',
    tiempo: '3–7 días',
    tipo: 'Detalle y acabados',
    beneficios: ['LED bajo muebles, spots y herrajes premium.', 'Impacto visual con poca obra.'],
    incluye: 'Asesoramiento, materiales e instalación.',
    mensaje: 'Hola, me interesa mejorar la *iluminación y herrajes* de mi cocina. ¿Tienen opciones?',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  },
];

export default function ServiciosPremium() {
  const [selected, setSelected] = useState(SERVICIOS[0]);
  const waUrl = hasWhatsAppConfigured() ? getWhatsAppUrl(selected.mensaje) : null;

  return (
    <section id="renovar" className="relative bg-premium-dark-soft py-18 md:py-30 overflow-hidden border-y border-white/10">
      <div className="pointer-events-none absolute -top-28 right-[8%] h-72 w-72 rounded-full bg-[#d1a66f]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 left-[4%] h-80 w-80 rounded-full bg-[#f7d9aa]/10 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-10 md:mb-18"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight leading-tight">
            Cómo querés renovar
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Elegí el tipo de intervención y te guiamos con un presupuesto sin cargo.
          </p>
        </motion.div>

        {/* Selector tipo cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4 mb-8 md:mb-16">
          {SERVICIOS.map((s) => {
            const isSelected = selected.id === s.id;
            return (
              <motion.button
                key={s.id}
                type="button"
                onClick={() => setSelected(s)}
                className={cn(
                  'relative rounded-2xl overflow-hidden text-left p-4 sm:p-5 md:p-6 transition-all duration-500 min-h-[96px]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-text',
                  isSelected
                    ? 'bg-primary/85 ring-2 ring-primary-300 ring-offset-2 ring-offset-[#17130f] shadow-[0_20px_44px_rgba(0,0,0,0.35)]'
                    : 'bg-white/[0.08] border border-white/15 hover:bg-white/[0.13] hover:border-white/30'
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <span
                  className={cn(
                    'relative font-semibold text-sm md:text-base',
                    isSelected ? 'text-white' : 'text-white/90'
                  )}
                >
                  {s.short}
                </span>
                <span className="relative block text-xs text-white/70 mt-0.5">{s.tiempo}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Contenido dinámico + preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45 }}
            className="grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 items-start"
          >
            <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-square rounded-[24px] overflow-hidden border border-white/20 bg-white/[0.06] shadow-[0_24px_50px_rgba(0,0,0,0.28)]">
              <Image
                src={selected.image}
                alt={selected.label}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="lg:col-span-3 rounded-[26px] border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.04)_60%)] backdrop-blur-md p-6 md:p-10 shadow-[0_24px_55px_rgba(0,0,0,0.2)]">
              <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">
                {selected.tipo}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight">
                {selected.label}
              </h3>
              <p className="text-white/70 text-sm mb-6">
                Tiempo estimado: <strong className="text-white">{selected.tiempo}</strong>
              </p>
              <ul className="space-y-3 mb-6">
                {selected.beneficios.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <Check className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-white/70 mb-8">{selected.incluye}</p>
              {waUrl && (
                <Button
                  href={waUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white shadow-[0_0_20px_rgba(150,41,28,0.25)] hover:shadow-[0_0_28px_rgba(150,41,28,0.4)] transition-all duration-300 min-h-[48px]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Consultar por WhatsApp
                </Button>
              )}
              {!waUrl && (
                <p className="text-white/50 text-sm">
                  Configurá NEXT_PUBLIC_WA_NUMBER para el botón de contacto.
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
