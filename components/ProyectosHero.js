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

  const upcoming = slides.filter((_, i) => i !== index).slice(0, 2);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-10 -right-8 h-36 w-36 rounded-full bg-white/60 blur-2xl" aria-hidden />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/65 bg-white/70 p-2 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem]">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <div className="flex items-end justify-between gap-3 rounded-2xl border border-white/15 bg-black/30 p-3 backdrop-blur-sm md:p-4">
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
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-white text-xs md:text-sm font-medium backdrop-blur transition hover:bg-white/30"
              aria-label={`Ver proyecto ${current.title}`}
            >
              Ver
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {hasMultiple && (
          <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-2 py-1.5 backdrop-blur-sm">
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
      </div>

      {upcoming.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {upcoming.map((p) => {
            const thumbIndex = slides.findIndex((s) => s.slug === p.slug);
            return (
              <button
                key={p.slug}
                onClick={() => goTo(thumbIndex)}
                className="group relative overflow-hidden rounded-2xl border border-neutral-border/80 bg-white p-1 text-left transition hover:border-primary/25 hover:shadow-card"
                aria-label={`Ver ${p.title}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src={p.imagenPrincipal || p.galeriaDespues?.[0]}
                    alt={p.title}
                    fill
                    sizes="220px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <p className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white line-clamp-2">
                    {p.title}
                  </p>
                </div>
              </button>
            );
          })}
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
    <section className="relative overflow-hidden bg-[#f7f4ef] py-16 md:py-24">
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(120deg, rgba(18,18,18,0.04) 0%, rgba(255,255,255,0) 35%),' +
            'radial-gradient(900px 420px at 8% 0%, rgba(123,30,30,0.16), transparent 62%),' +
            'radial-gradient(700px 320px at 88% 16%, rgba(255,255,255,0.75), transparent 68%)'
        }}
      />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center rounded-full border border-neutral-border/80 bg-white/70 px-3 py-1 text-xs md:text-sm font-medium uppercase tracking-[0.18em] text-neutral-muted"
            >
              Portfolio curado
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-5 font-serif text-[2.35rem] leading-[1.03] font-semibold tracking-tight text-neutral-text md:text-6xl lg:text-[4rem]"
            >
              Diseños de cocina
              <span className="block text-primary">con carácter editorial</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-neutral-muted md:text-lg"
            >
              Una selección de reformas reales en CABA y zona norte. Cada caso combina funcionalidad,
              proporción y materialidad para transformar la cocina en el centro del hogar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="#proyectos-grid" size="lg" className="inline-flex items-center gap-2 rounded-full px-7">
                Ver proyectos
                <ArrowUpRight className="w-5 h-5" />
              </Button>

              <Button
                href="/contacto"
                variant="secondary"
                size="lg"
                className="inline-flex items-center gap-2 rounded-full px-7"
              >
                Consultar
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-10 grid grid-cols-3 gap-4 border-t border-neutral-border/70 pt-6"
            >
              <div>
                <p className="font-serif text-2xl text-neutral-text">{projects.length}+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-neutral-muted">Proyectos</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-neutral-text">100%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-neutral-muted">A medida</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-neutral-text">Antes/Después</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-neutral-muted">Documentado</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
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

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white/70" />
    </section>
  );
}
