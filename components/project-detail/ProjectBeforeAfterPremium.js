'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import { cn } from '@/lib/cn';

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
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const resultados = useMemo(() => getResultadosClave(project), [project]);

  if (!beforeImage || !afterImage) return null;

  return (
    <Section className="bg-neutral-soft">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start"
      >
        <div className="lg:col-span-3">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-text mb-6 tracking-tight">
            Antes y después
          </h2>
          <p className="text-neutral-muted mb-8 max-w-xl">
            Deslizá para comparar el espacio antes de la intervención y el resultado final.
          </p>

          <div
            ref={containerRef}
            className={cn(
              'relative w-full aspect-[4/3] rounded-2xl overflow-hidden select-none border border-neutral-border shadow-medium',
              isDragging && 'cursor-col-resize'
            )}
            onMouseMove={isDragging ? (e) => updatePosition(e.clientX) : undefined}
            onMouseLeave={() => setIsDragging(false)}
            onMouseUp={() => setIsDragging(false)}
            onTouchMove={(e) => {
              e.preventDefault();
              updatePosition(e.touches[0].clientX);
            }}
            onTouchEnd={() => setIsDragging(false)}
            onTouchCancel={() => setIsDragging(false)}
            role="img"
            aria-label="Comparación antes y después"
          >
            <div className="absolute inset-0">
              <Image
                src={afterImage}
                alt={`${project.title} — después`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={beforeImage}
                alt={`${project.title} — antes`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
              style={{
                left: `${sliderPosition}%`,
                transform: 'translateX(-50%)',
              }}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-medium flex items-center justify-center border border-neutral-border"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-text"
                >
                  <path d="M15 18l-6-6 6-6" />
                  <path d="M9 18l-6-6 6-6" />
                </svg>
              </motion.div>
            </div>

            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="px-3 py-1.5 bg-black/70 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                Antes
              </span>
              <span className="px-3 py-1.5 bg-black/70 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                Después
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-serif text-xl font-bold text-neutral-text mb-4 tracking-tight">
            Lo que logramos
          </h3>
          <ul className="space-y-3">
            {resultados.map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span className="text-neutral-muted leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </Section>
  );
}
