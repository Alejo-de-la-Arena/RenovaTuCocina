'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Lightbulb } from 'lucide-react';
import Section from '@/components/ui/Section';

export default function ProjectChallengeSolution({ project }) {
  const cards = [
    {
      id: 'desafio',
      title: 'El desafío',
      text: project.problema,
      icon: AlertCircle,
      eyebrow: '01 · Punto de partida',
      accent: 'from-[#d7d1c6] to-[#f6f1e9]',
    },
    {
      id: 'solucion',
      title: 'La solución',
      text: project.solucion,
      icon: Lightbulb,
      eyebrow: '02 · Estrategia de diseño',
      accent: 'from-[#d0c2ad] to-[#f3e9dc]',
    },
  ];

  return (
    <Section className="bg-[linear-gradient(180deg,#f7f5f1_0%,#f0ede8_100%)] border-y border-[#e7e2da]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="mb-10 md:mb-14">
          <span className="inline-flex rounded-full border border-[#cec7bb] bg-white/75 px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[#6b6358]">
            Narrativa del proyecto
          </span>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-[28px] border border-[#ddd6ca] bg-white p-8 md:p-10 lg:p-12 shadow-[0_18px_45px_rgba(29,24,18,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(29,24,18,0.14)]"
              >
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.accent}`} />
                <div className="mb-7 flex items-center justify-between gap-4">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[#7f7566]">{card.eyebrow}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7f2e8] text-[#6c5f4b] border border-[#eadfce]">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#201b16] tracking-tight leading-tight mb-5 md:mb-6">
                  {card.title}
                </h2>
                <p className="text-[#4f483f] leading-relaxed text-base md:text-lg">{card.text}</p>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-[#d7cfc2] via-[#e9e3d9] to-transparent" />
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}
