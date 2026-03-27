'use client';

import { motion } from 'framer-motion';
import { Layers, Ruler, Clock } from 'lucide-react';
import Section from '@/components/ui/Section';

/**
 * Construye ítems de materiales y decisiones a partir del proyecto.
 * Si en el futuro el proyecto tiene "decisiones" o "recursos", se pueden sumar.
 */
function getMaterialItems(project) {
  const items = [];
  (project.materiales || []).forEach((m) => {
    items.push({ type: 'material', label: m, desc: null });
  });
  if (project.tipo) {
    items.push({
      type: 'decision',
      label: `Cocina en ${project.tipo}`,
      desc: 'Diseño adaptado al espacio disponible',
    });
  }
  if (project.tiempoObra) {
    items.push({
      type: 'timing',
      label: project.tiempoObra,
      desc: 'Plazo de obra',
    });
  }
  return items;
}

export default function ProjectMaterialsPremium({ project }) {
  const items = getMaterialItems(project);
  if (!items.length) return null;

  return (
    <Section className="bg-[#f5f2ec] border-y border-[#e7e0d4]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
      >
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1f1913] mb-3 tracking-tight">
          Materiales y decisiones
        </h2>
        <p className="text-[#5c5449] mb-10 md:mb-12 max-w-2xl text-base md:text-lg">
          Terminaciones, recursos y criterios que definieron este proyecto.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="group rounded-3xl border border-[#dfd6c8] bg-white p-6 md:p-7 flex flex-col shadow-[0_14px_35px_rgba(40,30,18,0.07)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(40,30,18,0.12)]"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-[#e7d9c5] bg-[#f8f1e6] text-[#6e5e47] transition-colors duration-300 group-hover:bg-[#f3e7d5]">
                {item.type === 'material' && (
                  <Layers className="h-5 w-5 shrink-0" />
                )}
                {item.type === 'decision' && (
                  <Ruler className="h-5 w-5 shrink-0" />
                )}
                {item.type === 'timing' && (
                  <Clock className="h-5 w-5 shrink-0" />
                )}
              </div>
              <span className="font-semibold text-[#211b15] text-lg leading-snug">{item.label}</span>
              {item.desc && (
                <p className="text-[#655d52] text-sm md:text-[15px] leading-relaxed mt-3">{item.desc}</p>
              )}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-[#ddd2c2] to-transparent" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
