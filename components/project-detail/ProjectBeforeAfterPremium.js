'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/ui/Section';

/**
 * Deriva bullets "Lo que logramos" a partir del texto de solución.
 * Si el proyecto tuviera resultadosClave en el futuro, se usarían esos.
 */
function getResultadosClave(project) {
  if (project.resultadosClave?.length) return project.resultadosClave;
  const s = (project.solucion || '').toLowerCase();
  const bullets = [];
  if (s.includes('luz') || s.includes('iluminación') || s.includes('ventana')) bullets.push('Más luz natural');
  if (s.includes('espacio') || s.includes('guardado') || s.includes('módulos')) bullets.push('Mayor espacio de guardado');
  if (s.includes('circulación') || s.includes('flujo') || s.includes('abiert')) bullets.push('Mejor circulación');
  if (s.includes('modern') || s.includes('diseño') || s.includes('estética')) bullets.push('Estética actual y cuidada');
  if (s.includes('isla') || s.includes('barra')) bullets.push('Zona de trabajo y desayuno');
  if (s.includes('integral') || s.includes('renovación total')) bullets.push('Renovación integral');
  if (bullets.length === 0) bullets.push('Espacio optimizado', 'Materiales de calidad', 'Proceso claro');
  return bullets.slice(0, 4);
}

export default function ProjectBeforeAfterPremium({ project }) {
  const beforeImage = project.galeriaAntes?.[0];
  const afterImage = project.galeriaDespues?.[0] || project.imagenPrincipal;
  const [mode, setMode] = useState('despues');

  const resultados = useMemo(() => getResultadosClave(project), [project]);

  if (!beforeImage || !afterImage) return null;

  useEffect(() => {
    const t = setInterval(() => {
      setMode((prev) => (prev === 'antes' ? 'despues' : 'antes'));
    }, 7000);
    return () => clearInterval(t);
  }, []);

  const currentImage = mode === 'antes' ? beforeImage : afterImage;

  return (
    <Section className="bg-[#12110f]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className="grid xl:grid-cols-12 gap-10 xl:gap-14 items-start"
      >
        <div className="xl:col-span-8">
          <div className="inline-block mb-4">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white tracking-tight">Antes y después</h2>
            <motion.div
              initial={{ width: 0, opacity: 0.65 }}
              whileInView={{ width: '100%', opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="mt-2 h-[2px] rounded-full bg-gradient-to-r from-[#bb3a2a] via-[#a62b1f] to-[#7f2118]"
            />
          </div>
          <p className="text-white/70 mb-8 md:mb-10 max-w-2xl text-base md:text-lg">
            Alterná entre el estado inicial y el resultado final para ver el cambio de manera clara y fluida.
          </p>

          <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-3 md:p-4 shadow-[0_35px_90px_rgba(0,0,0,0.35)]">
            <div className="mb-4 md:mb-5 flex items-center justify-between gap-4 px-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/55">Comparativa visual</span>
              <div className="rounded-full border border-white/20 bg-black/30 p-1 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setMode('antes')}
                  className={`rounded-full px-4 py-2 text-xs md:text-sm transition-all duration-500 ${
                    mode === 'antes'
                      ? 'bg-white text-[#171512] shadow-[0_8px_24px_rgba(255,255,255,0.25)]'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  Antes
                </button>
                <button
                  type="button"
                  onClick={() => setMode('despues')}
                  className={`rounded-full px-4 py-2 text-xs md:text-sm transition-all duration-500 ${
                    mode === 'despues'
                      ? 'bg-white text-[#171512] shadow-[0_8px_24px_rgba(255,255,255,0.25)]'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  Después
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-[24px] border border-white/10 bg-black/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImage}
                    alt={`${project.title} — ${mode}`}
                    fill
                    sizes="(max-width: 1280px) 100vw, 70vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/25" aria-hidden />
                </motion.div>
              </AnimatePresence>

              <div className="absolute left-4 top-4 md:left-6 md:top-6">
                <span className="inline-flex rounded-full border border-white/25 bg-black/35 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                  {mode === 'antes' ? 'Estado original' : 'Resultado final'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 md:p-8">
            <h3 className="font-serif text-2xl font-semibold text-white mb-6 tracking-tight">
            Lo que logramos
            </h3>
            <ul className="space-y-4">
              {resultados.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-[#7d6f5a] bg-[#2a251d] text-[10px] text-[#d4c1a2]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white mt-1.5 leading-relaxed">{r}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
