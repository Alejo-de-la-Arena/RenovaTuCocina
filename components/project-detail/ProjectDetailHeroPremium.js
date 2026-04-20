'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

const AUTOPLAY_MS = 8000;
const TRANSITION_DURATION = 0.6;
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
    (i) => setIndex(() => (i + slides.length) % slides.length),
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

  const tagline =
    project.solucion?.slice(0, 120).trim() + (project.solucion?.length > 120 ? '…' : '') || '';

  return (
    <section
      className="relative w-full overflow-hidden bg-neutral-text md:min-h-screen"
      onMouseEnter={() => hasMultiple && setIsPaused(true)}
      onMouseLeave={() => hasMultiple && setIsPaused(false)}
    >
      {/* Wrapper de imagen: en mobile solo la imagen (sin área extra) */}
      <div className="relative aspect-[4/3] w-full md:h-auto md:min-h-0 md:max-h-none md:absolute md:inset-0 md:aspect-auto">
        {/* Capa principal con crossfade */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
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
                className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20 md:bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.12),transparent_38%),linear-gradient(180deg,rgba(8,8,8,0.15)_0%,rgba(8,8,8,0.3)_34%,rgba(8,8,8,0.8)_100%)]"
                aria-hidden
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contador superior — anclado a la imagen */}
        {hasMultiple && (
          <div className="absolute top-4 md:top-10 left-1/2 -translate-x-1/2 z-20">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-black/25 px-3 py-1.5 md:px-4 md:py-2 font-mono text-[10px] md:text-sm text-white/90 tracking-[0.28em] backdrop-blur-md">
              {formatCounter(index, slides.length)}
            </span>
          </div>
        )}

        {/* Flechas */}
        {hasMultiple && (
          <>
            <motion.button
              type="button"
              onClick={prev}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="absolute left-3 md:left-8 lg:left-10 top-1/2 -translate-y-1/2 z-40 h-10 w-10 md:h-14 md:w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
            <motion.button
              type="button"
              onClick={next}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="absolute right-3 md:right-8 lg:right-10 top-1/2 -translate-y-1/2 z-40 h-10 w-10 md:h-14 md:w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </>
        )}
      </div>
      {/* Card: en mobile va justo debajo de la imagen, en desktop overlay */}
      <div className="relative md:absolute md:bottom-0 md:left-0 md:right-0 z-20 px-4 pt-3 pb-5 md:p-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easing }}
          className="pointer-events-auto mx-auto w-full max-w-lg rounded-2xl border border-white/10 md:border-white/20 bg-black/50 md:bg-black/30 px-5 py-4 md:px-6 md:py-5 backdrop-blur-md shadow-[0_20px_48px_rgba(0,0,0,0.3)] text-center"
        >
          <h1 className="font-serif text-lg md:text-2xl lg:text-3xl font-bold text-white leading-[1.15] tracking-tight mb-2">
            {project.title}
          </h1>
          {tagline && (
            <p className="text-xs md:text-sm text-white/80 leading-relaxed line-clamp-3">
              {tagline}
            </p>
          )}
          {hasMultiple && (
            <div className="flex items-center justify-center gap-2 mt-3 md:mt-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    'rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                    i === index
                      ? 'h-1.5 w-8 bg-white'
                      : 'h-1.5 w-1.5 bg-white/40 hover:bg-white/65'
                  )}
                  aria-label={`Ir a imagen ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}