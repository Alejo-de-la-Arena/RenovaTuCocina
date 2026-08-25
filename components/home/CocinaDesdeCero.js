'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Clock3, ListFilter } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { cn } from '@/lib/cn';
import { hasWhatsAppConfigured, getWhatsAppUrl, trackWhatsAppContact } from '@/lib/whatsapp';

const COCINAS = [
  {
    id: 'moderna',
    nombre: 'Cocina moderna integrada',
    resumen: 'Distribución abierta, isla central y circulación cómoda para el día a día.',
    duracion: '6-8 semanas',
    beneficios: [
      'Mobiliario a medida con guardado real.',
      'Mesadas resistentes y terminaciones premium.',
    ],
    ideal: 'Casas o deptos con cocina integrada',
    mensaje: 'Hola, me interesa una *cocina moderna integrada* desde cero. ¿Podemos coordinar una propuesta?',
    image: 'https://res.cloudinary.com/dasch1s5i/image/upload/v1780960959/Cocina_moderna_integrada_n557au.jpg',
  },
  {
    id: 'familiar',
    nombre: 'Cocina familiar completa',
    resumen: 'Pensada para cocinar todos los días, con más superficie de trabajo y orden.',
    duracion: '7-9 semanas',
    beneficios: [
      'Sectores definidos para cocinar, lavar y guardar.',
      'Muebles altos y bajos para máxima capacidad.',
    ],
    ideal: 'Familias que usan mucho la cocina',
    mensaje: 'Hola, quiero cotizar una *cocina familiar completa* desde cero. ¿Qué opciones recomiendan?',
    image: 'https://res.cloudinary.com/dasch1s5i/image/upload/v1780960965/Cocina_familiar_completa_vk82ym.png',
  },
  {
    id: 'premium',
    nombre: 'Cocina premium a medida',
    resumen: 'Proyecto personalizado con foco en detalle, estética y durabilidad.',
    duracion: '8-10 semanas',
    beneficios: [
      'Materiales de alta gama y herrajes premium.',
      'Integración de electrodomésticos con diseño limpio.',
    ],
    ideal: 'Quienes buscan un resultado protagonista',
    mensaje: 'Hola, me gustaría diseñar una *cocina premium a medida* desde cero. ¿Podemos hablar?',
    image: 'https://res.cloudinary.com/dasch1s5i/image/upload/v1780960959/Cocina_premium_a_medida_u35uux.jpg',
  },
];

export default function CocinaDesdeCero() {
  const [selectedId, setSelectedId] = useState(COCINAS[0].id);
  const selected = COCINAS.find((item) => item.id === selectedId) ?? COCINAS[0];
  const waUrl = hasWhatsAppConfigured() ? getWhatsAppUrl(selected.mensaje) : null;

  return (
    <Section id="desde-cero" className="relative overflow-hidden bg-[#f7f5f2]">
      <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-[#96291c]/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[#d1a66f]/20 blur-3xl" />

      <div className="relative z-10">
        <p className="text-primary font-semibold text-xs md:text-sm uppercase tracking-[0.16em] mb-3">
          Cocinas desde cero
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-text tracking-tight leading-tight max-w-2xl">
          Diseños de cocina pensados para tu forma de vivir
        </h2>
        <p className="text-neutral-muted text-base md:text-lg mt-3 md:mt-4 max-w-2xl leading-relaxed">
          Compará estilos, tiempos y prestaciones en segundos. Elegí la opción que mejor se ajusta a tu espacio.
        </p>
      </div>

      <div className="relative z-10 mt-8 md:mt-10">
        <div className="md:hidden">
          <label
            htmlFor="tipo-cocina-select"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-text mb-2"
          >
            <ListFilter className="w-4 h-4 text-primary" />
            Tipos de cocinas
          </label>
          <div className="relative">
            <select
              id="tipo-cocina-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full rounded-xl border border-neutral-border bg-white px-4 py-3 pr-10 text-sm text-neutral-text shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {COCINAS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {COCINAS.map((item) => {
            const active = selected.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-neutral-border text-neutral-text hover:border-primary/40'
                )}
              >
                {item.nombre}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 mt-5 grid lg:grid-cols-[1.15fr_minmax(0,1fr)] gap-5 md:gap-6"
        >
          <div className="rounded-[24px] overflow-hidden border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white">
            <div className="relative aspect-[4/3] md:aspect-[16/10]">
              <Image
                src={selected.image}
                alt={selected.nombre}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            </div>
          </div>

          <div className="rounded-[24px] border border-neutral-border/80 bg-white p-5 md:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
            <h3 className="font-serif text-2xl md:text-3xl text-neutral-text leading-tight">{selected.nombre}</h3>
            <p className="text-neutral-muted mt-2">{selected.resumen}</p>

            <ul className="mt-5 space-y-2.5">
              {selected.beneficios.map((beneficio) => (
                <li key={beneficio} className="flex items-start gap-2.5 text-neutral-text">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{beneficio}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-2 text-sm text-neutral-text">
              <Clock3 className="w-4 h-4 text-primary" />
              Tiempo estimado: {selected.duracion}
            </div>

            <p className="text-sm text-neutral-muted mt-4">
              <span className="font-semibold text-neutral-text">Ideal para:</span> {selected.ideal}
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-stretch">
              {waUrl ? (
                <Button
                  href={waUrl}
                  onClick={trackWhatsAppContact}
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  Quiero esta cocina
                </Button>
              ) : (
                <p className="text-sm text-neutral-muted">Configurá NEXT_PUBLIC_WA_NUMBER para activar el contacto.</p>
              )}

              <Link
                href="/como-trabajamos"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl border border-neutral-border px-5 text-neutral-text hover:bg-neutral-100 transition-colors"
              >
                Ver proceso de trabajo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
