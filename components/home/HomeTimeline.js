'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { staggerContainer, staggerItem } from '@/lib/motion';

const PASOS = [
  { paso: 1, titulo: 'Consultá', desc: 'Contanos tu proyecto por WhatsApp o formulario.' },
  { paso: 2, titulo: 'Visita', desc: 'Coordinamos visita técnica sin cargo.' },
  { paso: 3, titulo: 'Presupuesto', desc: 'Recibís propuesta detallada en 48-72 hs.' },
  { paso: 4, titulo: 'Obra', desc: 'Fabricación e instalación según cronograma acordado.' },
];

export default function HomeTimeline() {
  return (
    <Section id="como-trabajamos" className="bg-warm-50">
      <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-10 md:mb-16"
        >
          <motion.h2
            variants={staggerItem}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-text mb-4 tracking-tight"
          >
            Cómo trabajamos
          </motion.h2>
          <motion.p variants={staggerItem} className="text-neutral-muted max-w-xl mx-auto text-lg">
            Consulta, visita, presupuesto y obra. Sin sorpresas.
          </motion.p>
        </motion.div>

        {/* Timeline: horizontal desktop, vertical mobile */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 lg:gap-4">
            {PASOS.map((item, i) => (
              <motion.div
                key={item.paso}
                variants={staggerItem}
                className="relative flex flex-col items-start text-left sm:items-center sm:text-center lg:items-start lg:text-left rounded-2xl border border-neutral-border bg-white/70 p-5 md:p-6 lg:border-transparent lg:bg-transparent lg:p-0"
              >
                <div className="flex flex-row gap-4 w-full sm:flex-col sm:justify-center lg:flex-row lg:justify-start">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary text-white font-bold flex items-center justify-center text-xl shadow-soft">
                    {item.paso}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-neutral-text text-lg mb-1">{item.titulo}</h3>
                    <p className="text-neutral-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 md:mt-12"
          >
            <Button href="/como-trabajamos" variant="outline" className="w-full sm:w-auto min-h-[48px]">
              Ver proceso completo
            </Button>
          </motion.div>
        </motion.div>
    </Section>
  );
}
