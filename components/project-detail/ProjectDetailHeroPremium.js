'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

const AUTOPLAY_MS = 8000;
const TRANSITION_DURATION = 0.8;
const easing = [0.25, 0.46, 0.45, 0.94];

function formatCounter(i, total) {
  return String(i + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
}

export default function ProjectDetailHeroPremium({ project }) {
  const afterImages = project?.galeriaDespues?.length
    ? project.galeriaDespues
    : project?.imagenPrincipal
      ? [project.imagenPrincipal]
      : [];
  const slides = project?.imagenPrincipal && !afterImages.includes(project.imagenPrincipal)
    ? [project.imagenPrincipal, ...afterImages]
    : afterImages;
  const hasMultiple = slides.length > 1;

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (i) => setIndex((prev) => (i + slides.length) % slides.length),
    [slides.length]
  );
  const next = useCallback(
    () => setIndex((prev) => (prev + 1) % slides.length),
    [slides.length]
  );
  const prev = useCallback(
    () => setIndex((prev) => (prev - 1 + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (!hasMultiple || isPaused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [index, isPaused, next, hasMultiple]);

  if (!project || !slides.length) return null;

  const mainMaterial = project.materiales?.[0] || null;
  const tagline =
    project.solucion?.slice(0, 120).trim() + (project.solucion?.length > 120 ? '…' : '') || '';

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      onMouseEnter={() => hasMultiple && setIsPaused(true)}
      onMouseLeave={() => hasMultiple && setIsPaused(false)}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION, ease: easing }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index]}
              alt={`${project.title} — imagen ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50"
              aria-hidden
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contador premium */}
      {hasMultiple && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          <span className="font-mono text-sm text-white/90 tracking-widest">
            {formatCounter(index, slides.length)}
          </span>
        </div>
      )}

      {/* Navegación: flechas */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Bloque de información integrado — franja inferior */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easing }}
          className="max-w-4xl"
        >
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm text-white/80 mb-3">
            {project.ubicacion && <span>{project.ubicacion}</span>}
            {project.año && <span>{project.año}</span>}
            {project.tiempoObra && <span>{project.tiempoObra}</span>}
            {project.tipo && (
              <span className="capitalize">Cocina en {project.tipo}</span>
            )}
            {mainMaterial && <span>{mainMaterial}</span>}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
            {project.title}
          </h1>
          {tagline && (
            <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
              {tagline}
            </p>
          )}
        </motion.div>

        {/* Dots */}
        {hasMultiple && (
          <div className="flex items-center gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  'rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                  i === index ? 'w-10 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/70'
                )}
                aria-label={`Ir a imagen ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
