'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { hasWhatsAppConfigured, getWhatsAppUrl, trackWhatsAppContact } from '@/lib/whatsapp';

const TIPOS_RENOVACION = [
  {
    id: 'frentes',
    label: 'Cambio de frentes',
    short: 'Frentes',
    beneficios: ['Nuevo aspecto sin cambiar estructura.', 'Múltiples terminaciones: melamina, laqueado, chapas.'],
    tiempo: '2–3 semanas',
    incluye: 'Diseño de color, fabricación e instalación de frentes.',
    mensaje: 'Hola, me interesa renovar mi cocina con *cambio de frentes*. ¿Podrían darme más información?',
  },
  {
    id: 'mesada',
    label: 'Mesada',
    short: 'Mesada',
    beneficios: ['Nueva mesada y bacha. Cuarzo, granito o compacto.', 'Opcional: nuevo splash.'],
    tiempo: '1–2 semanas',
    incluye: 'Medición, elección de material, corte e instalación.',
    mensaje: 'Hola, quiero cambiar la *mesada* de mi cocina. ¿Podrían cotizarme?',
  },
  {
    id: 'reconfig',
    label: 'Reconfiguración completa',
    short: 'Completa',
    beneficios: ['Rediseño del layout. Más espacio, mejor flujo.', 'Nuevos módulos, mesada, iluminación.'],
    tiempo: '4–6 semanas',
    incluye: 'Diseño integral, fabricación, instalación y detalles.',
    mensaje: 'Hola, busco una *reconfiguración completa* de mi cocina. ¿Podemos coordinar una visita?',
  },
  {
    id: 'iluminacion',
    label: 'Iluminación y herrajes',
    short: 'Iluminación',
    beneficios: ['LED bajo muebles, spots y herrajes premium.', 'Impacto visual con poca obra.'],
    tiempo: '3–7 días',
    incluye: 'Asesoramiento, materiales e instalación.',
    mensaje: 'Hola, me interesa mejorar la *iluminación y herrajes* de mi cocina. ¿Tienen opciones?',
  },
];

export default function RenovarSelector() {
  const [selected, setSelected] = useState(TIPOS_RENOVACION[0]);
  const waUrl = hasWhatsAppConfigured() ? getWhatsAppUrl(selected.mensaje) : null;

  return (
    <section id="renovar" className="relative bg-neutral-text py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-white mb-4 tracking-tight leading-tight">
            Renová tu cocina
          </h2>
          <p className="text-white/75 text-lg max-w-xl mx-auto">
            Optimizá espacio, materiales y estética. Obras cortas y resultados premium.
          </p>
        </motion.div>

        {/* Chips selector */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12"
        >
          {TIPOS_RENOVACION.map((t) => {
            const isSelected = selected.id === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelected(t)}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-text
                  ${isSelected
                    ? 'bg-primary text-white shadow-[0_0_24px_rgba(150,41,28,0.35)]'
                    : 'bg-white/10 text-white/85 border border-white/20 hover:bg-white/15 hover:border-white/30'
                  }
                `}
              >
                {t.short}
              </button>
            );
          })}
        </motion.div>

        {/* Contenido dinámico */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-8 md:p-10">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
                {selected.label}
              </h3>
              <ul className="space-y-3 mb-6">
                {selected.beneficios.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <Check className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4 text-sm text-white/75 mb-8">
                <span><strong className="text-white/90">Tiempo estimado:</strong> {selected.tiempo}</span>
                <span><strong className="text-white/90">Incluye:</strong> {selected.incluye}</span>
              </div>
              {waUrl && (
                <Button
                  href={waUrl}
                  onClick={trackWhatsAppContact}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white shadow-[0_0_20px_rgba(150,41,28,0.25)] hover:shadow-[0_0_28px_rgba(150,41,28,0.4)] transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Consultar por WhatsApp
                </Button>
              )}
              {!waUrl && (
                <p className="text-white/60 text-sm">Configurá NEXT_PUBLIC_WA_NUMBER para el botón de contacto.</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
