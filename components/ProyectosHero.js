'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const AUTOPLAY_MS = 5500;
const easing = [0.25, 0.46, 0.45, 0.94];

function MiniProjectSlider({ items }) {
  const slides = items?.length ? items : [];
  const hasMultiple = slides.length > 1;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i) => {
    setIndex((prev) => (i + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!hasMultiple || paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [hasMultiple, paused, next]);

  if (!slides.length) return null;

  const current = slides[index];

  return (
    <div
      className="relative rounded-3xl overflow-hidden border border-neutral-border bg-black/5 shadow-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.slug + index}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: easing }}
            className="absolute inset-0"
          >
            <Image
              src={current.imagenPrincipal || current.galeriaDespues?.[0]}
              alt={current.title}
              fill
              sizes="(max-width: 1024px) 90vw, 520px"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* overlay info */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-white text-sm md:text-base font-semibold leading-snug line-clamp-2">
                {current.title}
              </p>
              <p className="text-white/75 text-xs md:text-sm mt-1 line-clamp-1">
                {(current.ubicacion || current.location || 'Zona Norte / CABA')}
              </p>
            </div>

            <Link
              href={`/proyectos/${current.slug}`}
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-white text-xs md:text-sm font-medium backdrop-blur hover:bg-white/20 transition"
              aria-label={`Ver proyecto ${current.title}`}
            >
              Ver
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* dots */}
        {hasMultiple && (
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  'rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                  i === index ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/60 hover:bg-white/80'
                )}
                aria-label={`Ir a slide ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        )}
      </div>

      {/* quick thumbs (opcional, queda premium y ayuda a diferenciarse) */}
      {slides.length >= 3 && (
        <div className="grid grid-cols-3 gap-2 p-3 bg-white">
          {slides.slice(0, 3).map((p, i) => (
            <button
              key={p.slug + i}
              onClick={() => goTo(i)}
              className={cn(
                'relative aspect-[4/3] rounded-2xl overflow-hidden border transition',
                i === index ? 'border-primary/40 ring-2 ring-primary/15' : 'border-neutral-border hover:border-primary/25'
              )}
              aria-label={`Ver ${p.title}`}
            >
              <Image
                src={p.imagenPrincipal || p.galeriaDespues?.[0]}
                alt={p.title}
                fill
                sizes="220px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProyectosHero({ projects = [] }) {
  const sliderItems = useMemo(() => {
    const items = (projects || []).filter(Boolean).slice(0, 5);
    return items;
  }, [projects]);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Fondo suave como “Cómo trabajamos”, pero neutro */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(900px 380px at 20% 10%, rgba(123,30,30,0.10), transparent 60%),' +
            'radial-gradient(700px 320px at 80% 20%, rgba(0,0,0,0.05), transparent 65%)'
        }}
      />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Texto izquierda */}
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-sm md:text-base font-medium text-neutral-muted tracking-wide"
            >
              Conocé nuestros proyectos
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="font-serif text-4xl md:text-5xl lg:text-[3rem] font-bold text-neutral-text mt-3 mb-4 tracking-tight"
            >
              Proyectos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-neutral-muted text-lg leading-relaxed max-w-xl"
            >
              Antes y después reales en zona norte y CABA. Mirá materiales, estilos y soluciones aplicadas en cocinas de distintos tamaños.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="#proyectos-grid" size="lg" className="inline-flex items-center gap-2">
                Ver proyectos
                <ArrowUpRight className="w-5 h-5" />
              </Button>

              <Button
                href="/contacto"
                variant="ghost"
                size="lg"
                className="inline-flex items-center gap-2"
              >
                Consultar
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Visual derecha */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <MiniProjectSlider items={sliderItems} />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}