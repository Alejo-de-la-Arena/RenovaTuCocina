'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';

export default function ProjectIntroPremium({ project }) {
  const facts = [
    project.ubicacion && { label: 'Ubicación', value: project.ubicacion },
    project.año && { label: 'Año', value: String(project.año) },
    project.tipo && { label: 'Tipo', value: `Cocina en ${project.tipo}` },
    project.tiempoObra && { label: 'Obra', value: project.tiempoObra },
    project.materiales?.length && {
      label: 'Materiales',
      value: project.materiales.join(' · '),
    },
  ].filter(Boolean);

  const summary =
    project.problema?.slice(0, 200).trim() + (project.problema?.length > 200 ? '…' : '') || '';

  return (
    <Section className="bg-warm-50 border-t border-neutral-border/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl"
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-muted mb-8">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col">
              <span className="font-medium text-neutral-text uppercase tracking-wider">
                {f.label}
              </span>
              <span className="text-neutral-muted mt-0.5">{f.value}</span>
            </div>
          ))}
        </div>
        <p className="text-neutral-muted text-lg md:text-xl leading-relaxed">
          {summary}
        </p>
      </motion.div>
    </Section>
  );
}
