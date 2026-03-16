'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Palette, Award, Zap } from 'lucide-react';
import Section from '@/components/ui/Section';
import { staggerContainer, staggerItem } from '@/lib/motion';

const BENEFICIOS = [
  {
    icon: Palette,
    title: 'Proyecto integral',
    desc: 'Diseño, fabricación, instalación y revestimientos. Un solo interlocutor para todo el proceso.',
  },
  {
    icon: Award,
    title: 'Materiales premium',
    desc: 'Melamina, laqueado, MDF, cuarzo, granito. A medida de tu presupuesto y estilo.',
  },
  {
    icon: Zap,
    title: 'Timeline claro',
    desc: 'Fechas definidas y seguimiento constante hasta la entrega. Sin sorpresas.',
  },
];

const MATERIALES = ['Melamina', 'Laqueado', 'MDF', 'Cuarzo', 'Granito'];

export default function CocinaDesdeCero() {
  return (
    <Section id="desde-cero" className="bg-warm-50">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.p
              variants={staggerItem}
              className="text-primary font-semibold text-sm uppercase tracking-wider mb-4"
            >
              Cocina desde cero
            </motion.p>
            <motion.h2
              variants={staggerItem}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-text mb-6 tracking-tight leading-tight"
            >
              Un solo equipo para todo
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="text-neutral-muted text-lg mb-10 max-w-xl leading-relaxed"
            >
              Un solo equipo: diseño, materiales premium y plazos definidos. De la idea al resultado sin intermediarios.
            </motion.p>

            <div className="space-y-8">
              {BENEFICIOS.map((b) => (
                <motion.div
                  key={b.title}
                  variants={staggerItem}
                  className="flex gap-6"
                >
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white border border-neutral-border shadow-soft flex items-center justify-center">
                    <b.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-text text-lg mb-1">{b.title}</h3>
                    <p className="text-neutral-muted leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={staggerItem}
              className="mt-10 pt-8 border-t border-neutral-border"
            >
              <p className="text-sm font-medium text-neutral-muted mb-3">Materiales y terminaciones</p>
              <div className="flex flex-wrap gap-2">
                {MATERIALES.map((m) => (
                  <span
                    key={m}
                    className="px-4 py-2 rounded-xl bg-white border border-neutral-border text-neutral-text text-sm font-medium shadow-card"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="relative order-first lg:order-none"
          >
            <div className="aspect-[4/5] lg:aspect-[3/4] relative rounded-2xl overflow-hidden shadow-medium">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
                alt="Cocina integral moderna"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
    </Section>
  );
}
