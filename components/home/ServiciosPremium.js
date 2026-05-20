'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { hasWhatsAppConfigured, getWhatsAppUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';

const SERVICIOS = [
  {
    id: 'estetica',
    label: 'Renovación Estética',
    short: 'Estética',
    tiempo: '2–3 semanas',
    tipo: 'Actualización visual',
    beneficios: [
      'Cambio de frentes, herrajes y actualización visual.',
      'Mantenemos tu estructura actual.',
    ],
    incluye: 'Diseño de color y montaje rápido para modernizar el espacio.',
    mensaje: 'Hola, me interesa una *Renovación Estética* para mi cocina. ¿Podrían darme más información?',
    image: 'https://images.unsplash.com/photo-1764526612515-6b4ab2868a6e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'funcional',
    label: 'Renovación Funcional',
    short: 'Funcional',
    tiempo: '4–5 semanas',
    tipo: 'Optimización de uso',
    beneficios: [
      'Reconfiguración del layout para maximizar la comodidad.',
      'Fabricación de nuevos módulos y mesadas.',
      'Cambio de mesada (opcional).',
    ],
    incluye: 'Diseño a medida para optimizar el espacio y el almacenamiento.',
    mensaje: 'Hola, me interesa una *Renovación Funcional* para mi cocina. ¿Podrían asesorarme?',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'integral',
    label: 'Renovación Integral',
    short: 'Integral',
    tiempo: '6–8 semanas',
    tipo: 'Recambio completo',
    beneficios: [
      'Desarme de amoblamiento existente y reemplazo total.',
      'Instalación del nuevo diseño y superficies desde cero.',
    ],
    incluye: 'El servicio completo de recambio de amoblamiento, sin demoliciones ni escombros.',
    mensaje: 'Hola, estoy buscando una *Renovación Integral* de cocina. ¿Podemos coordinar una visita?',
    image: 'https://images.unsplash.com/photo-1682888818650-0a7cbb35287d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'ampliacion',
    label: 'Renovación con Ampliación',
    short: 'Ampliación',
    tiempo: '+8 semanas',
    tipo: 'Proyecto de gran escala',
    beneficios: [
      'Integración: expandimos la cocina hacia otros ambientes.',
      'Obra civil completa: demolición, plomería, electricidad, pisos, etc.',
    ],
    incluye: 'Proyectos de gran escala que transforman la dinámica de la casa.',
    mensaje: 'Hola, me interesa una *Renovación con Ampliación* para integrar ambientes. ¿Podrían asesorarme?',
    image: 'https://images.unsplash.com/photo-1643034738686-d69e7bc047e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function ServiciosPremium() {
  const [selected, setSelected] = useState(SERVICIOS[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [portalEl, setPortalEl] = useState(null);
  const waUrl = hasWhatsAppConfigured() ? getWhatsAppUrl(selected.mensaje) : null;

  useEffect(() => {
    if (typeof document !== 'undefined') setPortalEl(document.body);
  }, []);

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
                onClick={() => {
                  setSelected(s);
                  setIsDialogOpen(false);
                }}
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
              <ul className="space-y-3 mb-6">
                {selected.beneficios.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <Check className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white/70 text-sm mb-6">
                Tiempo estimado: <strong className="text-white">{selected.tiempo}</strong>
              </p>
              <p className="text-sm text-white/70 mb-8">{selected.incluye}</p>
              {selected.id === 'ampliacion' ? (
                <div className="flex flex-col sm:flex-row sm:items-stretch gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                    className="w-full sm:w-auto min-h-[48px] border-white/60 text-white hover:bg-white/15"
                  >
                    Conocer más
                  </Button>
                  {waUrl && (
                    <Button
                      href={waUrl}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] bg-primary hover:bg-primary-hover text-white shadow-[0_0_20px_rgba(150,41,28,0.25)] hover:shadow-[0_0_28px_rgba(150,41,28,0.4)] transition-all duration-300"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Consultar por WhatsApp
                    </Button>
                  )}
                </div>
              ) : (
                waUrl && (
                  <Button
                    href={waUrl}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white shadow-[0_0_20px_rgba(150,41,28,0.25)] hover:shadow-[0_0_28px_rgba(150,41,28,0.4)] transition-all duration-300 min-h-[48px]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Consultar por WhatsApp
                  </Button>
                )
              )}
              {!waUrl && (
                <p className="text-white/50 text-sm">
                  Configurá NEXT_PUBLIC_WA_NUMBER para el botón de contacto.
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {portalEl &&
          createPortal(
            <AnimatePresence>
              {isDialogOpen && selected.id === 'ampliacion' && (
                <motion.div
                  className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsDialogOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-2xl max-h-[min(92dvh,760px)] overflow-y-auto rounded-3xl border border-white/20 bg-[#18120d] p-6 md:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
                  >
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.16em]">
                          Proyecto de gran escala
                        </p>
                        <h4 className="font-serif text-2xl md:text-3xl text-white mt-1">Renovación con Ampliación</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsDialogOpen(false)}
                        className="rounded-full border border-white/20 p-2 text-white/80 hover:text-white hover:border-white/40 transition-colors"
                        aria-label="Cerrar diálogo"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <ul className="space-y-3 mb-5">
                      <li className="flex items-start gap-3 text-white/90">
                        <Check className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" aria-hidden />
                        <span>Integración: expandimos la cocina hacia otros ambientes.</span>
                      </li>
                      <li className="flex items-start gap-3 text-white/90">
                        <Check className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" aria-hidden />
                        <span>Obra civil completa: demolición, plomería, electricidad, pisos, etc.</span>
                      </li>
                    </ul>

                    <p className="text-white/75 text-sm mb-4">
                      Tiempo estimado: <strong className="text-white">+8 semanas</strong>
                    </p>
                    <p className="text-white/75 mb-4">
                      Proyectos de gran escala que transforman la dinámica de la casa.
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      En esta modalidad trabajamos con planificación por etapas, reuniones semanales de avance,
                      coordinación de proveedores y control de terminaciones premium. También podemos sumar
                      iluminación escénica, isla central multifunción y soluciones de guardado oculto para mejorar
                      la estética y el uso diario del espacio.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => setIsDialogOpen(false)} className="min-h-[44px]">
                        Entendido
                      </Button>
                      {waUrl && (
                        <Button
                          href={waUrl}
                          className="min-h-[44px] bg-white/10 hover:bg-white/20 text-white border border-white/30 shadow-none"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Consultar este servicio
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            portalEl
          )}
      </Container>
    </section>
  );
}
