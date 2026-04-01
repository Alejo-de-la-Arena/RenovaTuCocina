'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const easing = [0.23, 1, 0.32, 1];

function projectImage(p) {
  return p?.imagenPrincipal || p?.imagenCard || p?.galeriaDespues?.[0] || '';
}

export default function ProyectosHero({ projects = [] }) {
  const list = useMemo(() => (projects || []).filter(Boolean).slice(0, 6), [projects]);
  const totalCount = (projects || []).length;
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const featured = list[featuredIndex] || null;
  const displayed = list[displayedIndex] || null;
  const displayedSrc = displayed ? projectImage(displayed) : '';

  useEffect(() => {
    if (!list.length) return;
    if (featuredIndex === displayedIndex) return;
    const next = list[featuredIndex];
    const nextSrc = projectImage(next);
    if (!nextSrc) {
      setDisplayedIndex(featuredIndex);
      return;
    }
    let cancelled = false;
    setIsSwitching(true);
    const img = new window.Image();
    img.src = nextSrc;
    img.decoding = 'async';
    img.onload = () => {
      if (cancelled) return;
      setDisplayedIndex(featuredIndex);
      setIsSwitching(false);
    };
    img.onerror = () => {
      if (cancelled) return;
      // Si falla la precarga, igual cambiamos para no bloquear UI.
      setDisplayedIndex(featuredIndex);
      setIsSwitching(false);
    };
    return () => {
      cancelled = true;
    };
  }, [featuredIndex, displayedIndex, list]);

  const textVariants = {
    hidden: { opacity: 0, y: 18 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: 0.08 * i, ease: easing },
    }),
  };

  return (
    <section className="relative overflow-hidden pb-20 pt-14 sm:pb-24 sm:pt-16 md:pb-28 md:pt-20 lg:pb-32 lg:pt-24">
      {/* Fondo premium: base cálida + profundidad + glows suaves */}
      <div className="pointer-events-none absolute inset-0 bg-[#f3efe8]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 80% at 0% 0%, rgba(150, 41, 28, 0.07) 0%, transparent 55%),' +
            'radial-gradient(90% 60% at 100% 10%, rgba(209, 166, 111, 0.12) 0%, transparent 50%),' +
            'radial-gradient(70% 50% at 50% 100%, rgba(255, 255, 255, 0.85) 0%, transparent 65%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(30,24,18,0.06) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[#c9a882]/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-[#96291c]/10 blur-3xl" aria-hidden />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
          {/* Columna copy — mobile-first: orden natural arriba */}
          <div className="lg:col-span-5 xl:col-span-5">
            <motion.span
              custom={0}
              initial="hidden"
              animate="show"
              variants={textVariants}
              className="inline-flex items-center rounded-full border border-[#d9d0c4] bg-white/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b6358] shadow-sm backdrop-blur-sm sm:text-[11px]"
            >
              Portfolio de proyectos
            </motion.span>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="show"
              variants={textVariants}
              className="mt-5 max-w-[13ch] text-[2.15rem] font-bold leading-[0.98] tracking-[-0.045em] sm:text-[2.65rem] md:max-w-none md:text-[3.4rem] lg:text-[4rem] xl:text-[4.35rem]"
            >
              <span className="block text-primary">Proyectos reales,</span>
              <span className="mt-1 block text-[#1a1612] sm:mt-2">
                cocinas con identidad
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="show"
              variants={textVariants}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-[#4f473f] sm:text-base md:mt-6"
            >
              Reformas documentadas en CABA y zona norte: proporción, materiales y resultado final
              para quien busca algo más que un catálogo.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="show"
              variants={textVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <Button
                href="#proyectos-grid"
                size="lg"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl px-8 shadow-[0_12px_32px_-8px_rgba(150,41,28,0.35)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
              >
                Explorar proyectos
                <ArrowDown className="h-5 w-5" aria-hidden />
              </Button>
              <Button
                href="/contacto"
                variant="secondary"
                size="lg"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border-[#d4cbc0] bg-white/90 px-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:bg-white sm:w-auto"
              >
                Consultar
                <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
              </Button>
            </motion.div>

            <motion.p
              custom={4}
              initial="hidden"
              animate="show"
              variants={textVariants}
              className="mt-8 text-xs uppercase tracking-[0.2em] text-[#8a8277]"
            >
              {totalCount > 0 ? (
                <>
                  <span className="font-semibold text-[#3d3830]">{totalCount}</span>{' '}
                  {totalCount === 1 ? 'proyecto' : 'proyectos'} documentados
                </>
              ) : (
                'Pronto nuevos casos'
              )}
            </motion.p>
          </div>

          {/* Columna visual — más aire respecto al texto en desktop */}
          <div className="lg:col-span-7 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: easing }}
              className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none"
            >
              {featured ? (
                <>
                  <div className="relative rounded-[28px] border border-white/80 bg-white/60 p-2 shadow-[0_32px_80px_-24px_rgba(20,16,12,0.35)] backdrop-blur-md sm:rounded-[32px] sm:p-2.5 lg:p-3">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#e8e2da] sm:aspect-[16/11] sm:rounded-[26px]">
                      {displayedSrc ? (
                        <motion.div
                          key={displayed?.slug || displayedIndex}
                          initial={{ opacity: 0, scale: 1.01 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.22, ease: easing }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={displayedSrc}
                            alt={displayed?.title || featured.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            priority
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-[#120f0c]/85 via-[#120f0c]/15 to-transparent"
                            aria-hidden
                          />
                        </motion.div>
                      ) : (
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-[#ebe4dc] to-[#d4cbc0]"
                          aria-hidden
                        />
                      )}

                      <div
                        className={cn(
                          'absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-7',
                          displayedSrc
                            ? ''
                            : 'rounded-b-[22px] bg-white/95 backdrop-blur-sm sm:rounded-b-[26px]'
                        )}
                      >
                        <p
                          className={cn(
                            'text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-[11px]',
                            displayedSrc ? 'text-white/75' : 'text-[#8a8277]'
                          )}
                        >
                          Proyecto destacado
                        </p>
                        <p
                          className={cn(
                            'mt-2 font-serif text-xl font-semibold leading-tight sm:text-2xl md:text-3xl',
                            displayedSrc ? 'text-white' : 'text-[#1a1612]'
                          )}
                        >
                          {(displayed || featured).title}
                        </p>
                        <p className={cn('mt-1.5 text-sm', displayedSrc ? 'text-white/80' : 'text-[#5c554c]')}>
                          {(displayed || featured).ubicacion || 'CABA · Zona Norte'}
                        </p>
                        <Link
                          href={`/proyectos/${(displayed || featured).slug}`}
                          className={cn(
                            'mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-lg transition',
                            displayedSrc
                              ? 'bg-white text-[#1a1612] hover:bg-[#faf8f5]'
                              : 'border border-[#e5ddd4] bg-[#faf8f6] text-[#1a1612] hover:bg-white'
                          )}
                        >
                          Ver proyecto completo
                          <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {list.length > 1 && (
                    <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
                      {list.map((p, i) => {
                        const thumb = projectImage(p);
                        const active = i === featuredIndex;
                        return (
                          <button
                            key={p.slug}
                            type="button"
                            onClick={() => setFeaturedIndex(i)}
                            className={cn(
                              'group relative h-14 w-14 overflow-hidden rounded-xl border-2 transition-all duration-300 sm:h-16 sm:w-16',
                              active
                                ? 'border-primary shadow-[0_8px_24px_-6px_rgba(150,41,28,0.45)] ring-2 ring-primary/20'
                                : 'border-transparent opacity-80 hover:opacity-100'
                            )}
                            aria-label={`Mostrar proyecto ${p.title}`}
                            aria-pressed={active}
                            disabled={isSwitching && active}
                          >
                            {thumb ? (
                              <Image src={thumb} alt="" fill className="object-cover" sizes="64px" />
                            ) : (
                              <span className="flex h-full w-full items-center justify-center bg-neutral-soft text-[10px] text-neutral-muted">
                                ···
                              </span>
                            )}
                            <span
                              className={cn(
                                'absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10',
                                active && 'bg-black/0'
                              )}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-[28px] border border-dashed border-[#d4cbc0] bg-white/50 p-8 text-center text-sm text-[#6b6358]">
                  Cuando cargues proyectos, aparecerán aquí como referencia visual.
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Hint scroll — invita a bajar al grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mt-14 flex flex-col items-center justify-center gap-2 sm:mt-16 md:mt-20"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8a8277] sm:text-[11px]">
            Deslizá para ver el listado
          </span>
          <motion.a
            href="#proyectos-grid"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9d0c4] bg-white/90 text-[#5c554c] shadow-sm backdrop-blur-sm transition hover:border-primary/30 hover:text-primary"
            aria-label="Ir a proyectos"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-5 w-5" aria-hidden />
          </motion.a>
        </motion.div>
      </Container>

      {/* Transición suave hacia la sección blanca del filtro + grid */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-[#f8f5f0]/90 to-white"
        aria-hidden
      />
    </section>
  );
}
