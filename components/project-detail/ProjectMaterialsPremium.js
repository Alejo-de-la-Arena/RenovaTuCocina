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
    <Section className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-text mb-2 tracking-tight">
          Materiales y decisiones
        </h2>
        <p className="text-neutral-muted mb-10 max-w-xl">
          Terminaciones, recursos y criterios que definieron este proyecto.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-neutral-border bg-warm-50/50 p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-2">
                {item.type === 'material' && (
                  <Layers className="w-5 h-5 text-primary shrink-0" />
                )}
                {item.type === 'decision' && (
                  <Ruler className="w-5 h-5 text-primary shrink-0" />
                )}
                {item.type === 'timing' && (
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                )}
                <span className="font-semibold text-neutral-text">{item.label}</span>
              </div>
              {item.desc && (
                <p className="text-neutral-muted text-sm leading-relaxed mt-1">{item.desc}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
