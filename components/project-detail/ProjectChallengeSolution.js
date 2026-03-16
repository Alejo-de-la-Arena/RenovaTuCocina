'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Lightbulb } from 'lucide-react';
import Section from '@/components/ui/Section';

export default function ProjectChallengeSolution({ project }) {
  return (
    <Section className="bg-white">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <motion.article
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-neutral-border bg-neutral-soft/30 p-8 md:p-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-text tracking-tight">
              El desafío
            </h2>
          </div>
          <p className="text-neutral-muted leading-relaxed text-lg">
            {project.problema}
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-neutral-border bg-warm-50/50 p-8 md:p-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-text tracking-tight">
              La solución
            </h2>
          </div>
          <p className="text-neutral-muted leading-relaxed text-lg">
            {project.solucion}
          </p>
        </motion.article>
      </div>
    </Section>
  );
}
