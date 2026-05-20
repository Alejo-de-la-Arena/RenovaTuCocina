'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { getTipologiaLabel, getRenovacionLabel } from '@/lib/projectFilterLabels';

/**
 * @param {object} props
 * @param {Array} props.featuredProjects — hasta 5 desde el panel (destacado_home + visible); orden por prioridad.
 */
export default function ProyectosPremium({ featuredProjects = [] }) {
  const list = useMemo(() => (Array.isArray(featuredProjects) ? featuredProjects : []).filter(Boolean).slice(0, 5), [
    featuredProjects,
  ]);
  const [index, setIndex] = useState(0); // target
  const [displayedIndex, setDisplayedIndex] = useState(0); // visible
  const [isSwitching, setIsSwitching] = useState(false);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  const hasMultiple = list.length > 1;
  const current = list[displayedIndex] || null;
  const nextCandidate = list[index] || null;
  const nextSrc = nextCandidate?.imagenPrincipal || nextCandidate?.galeriaDespues?.[0] || '/assets/brand/logo-mdv.webp';

  useEffect(() => {
    if (!list.length) return;
    if (index === displayedIndex) return;

    let cancelled = false;
    setIsSwitching(true);
    const img = new window.Image();
    img.decoding = 'async';
    img.src = nextSrc;
    img.onload = () => {
      if (cancelled) return;
      setDisplayedIndex(index);
      setIsSwitching(false);
    };
    img.onerror = () => {
      if (cancelled) return;
      setDisplayedIndex(index);
      setIsSwitching(false);
    };
    return () => {
      cancelled = true;
    };
  }, [index, displayedIndex, list.length, nextSrc]);

  function prev() {
    if (!hasMultiple) return;
    setIndex((i) => (i - 1 + list.length) % list.length);
  }

  function next() {
    if (!hasMultiple) return;
    setIndex((i) => (i + 1) % list.length);
  }

  return (
    <Section id="proyectos" className="bg-white">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-10 md:mb-14"
      >
        <div>
          <motion.h2
            variants={staggerItem}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-text mb-4 tracking-tight"
          >
            Proyectos reales
          </motion.h2>
          <motion.p variants={staggerItem} className="text-neutral-muted max-w-xl">
            Transformaciones recientes en Zona Norte y CABA.
          </motion.p>
        </div>
        <motion.div variants={staggerItem} className="hidden md:block w-full md:w-auto">
          <Button href="/proyectos" variant="ghost" className="text-neutral-text w-full md:w-auto min-h-[44px]">
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>

      {list.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-neutral-muted text-center py-8 mb-6 max-w-lg mx-auto"
        >
          Pronto sumamos nuevos proyectos destacados. Entrá al portfolio completo para ver casos reales.
        </motion.p>
      ) : (
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.article variants={staggerItem} className="relative">
            <div className="relative w-full max-w-full aspect-[16/10] sm:aspect-[21/9] min-h-[220px] sm:min-h-[280px] rounded-2xl overflow-hidden bg-neutral-soft">
              <div
                className="absolute inset-0"
                onTouchStart={(e) => {
                  if (window.innerWidth >= 640) return; // solo mobile
                  const t = e.touches?.[0];
                  if (!t) return;
                  touchStartXRef.current = t.clientX;
                  touchStartYRef.current = t.clientY;
                }}
                onTouchEnd={(e) => {
                  if (window.innerWidth >= 640) return; // solo mobile
                  const startX = touchStartXRef.current;
                  const startY = touchStartYRef.current;
                  touchStartXRef.current = null;
                  touchStartYRef.current = null;
                  const t = e.changedTouches?.[0];
                  if (startX == null || startY == null || !t) return;
                  const dx = t.clientX - startX;
                  const dy = t.clientY - startY;
                  if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy)) return;
                  if (dx > 0) prev();
                  else next();
                }}
              >
                {/* Crossfade: nunca dejamos el contenedor vacío */}
                <AnimatePresence initial={false}>
                  {current && (
                    <motion.div
                      key={`slide-${current.slug}-${displayedIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute inset-0"
                    >
                      <Link href={`/proyectos/${current.slug}`} className="group block h-full w-full">
                        <Image
                          src={current.imagenPrincipal || current.galeriaDespues?.[0] || '/assets/brand/logo-mdv.webp'}
                          alt={current.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 1200px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-10">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {current.renovacion && (
                              <span className="px-3 py-1 rounded-lg bg-primary text-white text-xs font-medium">
                                {getRenovacionLabel(current.renovacion)}
                              </span>
                            )}
                            {current.tipo && (
                              <span
                                className={
                                  current.renovacion
                                    ? 'px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-medium backdrop-blur-sm'
                                    : 'px-3 py-1 rounded-lg bg-primary text-white text-xs font-medium'
                                }
                              >
                                {getTipologiaLabel(current.tipo)}
                              </span>
                            )}
                            {current.materiales?.[0] && (
                              <span className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                                {current.materiales[0]}
                              </span>
                            )}
                          </div>
                          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-white/95 transition-colors">
                            {current.title}
                          </h3>
                          <p className="text-white/80 text-sm mb-3 md:mb-4">{current.ubicacion}</p>
                          <span className="inline-flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all">
                            Ver proyecto
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="hidden sm:flex absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/40"
                    aria-label="Anterior"
                    disabled={isSwitching}
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="hidden sm:flex absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/40"
                    aria-label="Siguiente"
                    disabled={isSwitching}
                  >
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </>
              )}
            </div>
          </motion.article>

          {/* Mobile: “Ver todos” debajo del slider */}
          <div className="mt-5 md:hidden">
            <Button href="/proyectos" variant="ghost" className="text-neutral-text w-full min-h-[44px]">
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </Section>
  );
}
