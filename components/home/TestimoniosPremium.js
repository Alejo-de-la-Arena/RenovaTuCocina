'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import { staggerContainer, staggerItem } from '@/lib/motion';

const TESTIMONIOS = [
  {
    nombre: 'María G.',
    zona: 'Vicente López',
    proyecto: 'Cocina integral',
    texto: 'Quedamos muy conformes. La cocina quedó impecable y el equipo muy profesional.',
    rating: 5,
  },
  {
    nombre: 'Carlos R.',
    zona: 'San Isidro',
    proyecto: 'Renovación completa',
    texto: 'Renovamos la cocina en 3 semanas. Excelente resultado y buen trato.',
    rating: 5,
  },
  {
    nombre: 'Laura M.',
    zona: 'Palermo',
    proyecto: 'Diseño a medida',
    texto: 'Diseño moderno, materiales de calidad. Recomendamos MDV.',
    rating: 5,
  },
];

export default function TestimoniosPremium() {
  return (
    <Section className="bg-dark-section py-20 md:py-28">
      <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.h2
            variants={staggerItem}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p variants={staggerItem} className="text-dark-muted max-w-xl mx-auto text-lg">
            Experiencias reales de quienes renovaron con nosotros.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {TESTIMONIOS.map((t) => (
            <motion.article
              key={t.nombre}
              variants={staggerItem}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col"
            >
              <div className="flex gap-1 mb-4" aria-hidden>
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-primary text-lg" aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-white/95 text-lg leading-relaxed mb-6 flex-1">"{t.texto}"</p>
              <div>
                <p className="font-semibold text-white">{t.nombre}</p>
                <p className="text-sm text-dark-muted">{t.zona}</p>
                {t.proyecto && (
                  <p className="text-xs text-white/50 mt-1">Proyecto: {t.proyecto}</p>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
    </Section>
  );
}
