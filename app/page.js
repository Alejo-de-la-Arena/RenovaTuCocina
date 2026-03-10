'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Palette, Award, Zap, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProjectCard from '@/components/ProjectCard';
import ContactFormDynamic from '@/components/ContactFormDynamic';
import HeroSlider from '@/components/HeroSlider';
import RenovarSelector from '@/components/RenovarSelector';
import { projects } from '@/data/projects';
import { staggerContainer, staggerItem } from '@/lib/motion';

const beneficiosDesdeCero = [
  {
    icon: Palette,
    title: 'Proyecto integral',
    desc: 'Diseño, fabricación, instalación y revestimientos. Un solo interlocutor.',
  },
  {
    icon: Award,
    title: 'Materiales premium',
    desc: 'Melamina, laqueado, MDF, cuarzo, granito. A medida de tu presupuesto.',
  },
  {
    icon: Zap,
    title: 'Timeline claro',
    desc: 'Fechas definidas y seguimiento constante hasta la entrega.',
  },
];

const pasosProceso = [
  { paso: 1, titulo: 'Consultá', desc: 'Contanos tu proyecto por WhatsApp o formulario.' },
  { paso: 2, titulo: 'Visita', desc: 'Coordinamos visita técnica sin cargo.' },
  { paso: 3, titulo: 'Presupuesto', desc: 'Recibís propuesta detallada en 48-72 hs.' },
  { paso: 4, titulo: 'Obra', desc: 'Fabricación e instalación según cronograma acordado.' },
];

const faqProceso = [
  { title: '¿En qué zonas trabajan?', content: 'Principalmente zona norte (Vicente López, San Isidro, Olivos, Martínez, etc.) y CABA.' },
  { title: '¿Cuánto tarda una renovación?', content: 'Depende del alcance. Una renovación estándar puede llevar 2-4 semanas. Una cocina desde cero, 4-6 semanas.' },
  { title: '¿Dan presupuesto sin cargo?', content: 'Sí, coordinamos visita técnica y te enviamos presupuesto detallado en 48-72 horas.' },
];

const testimonios = [
  { nombre: 'María G.', zona: 'Vicente López', texto: 'Quedamos muy conformes. La cocina quedó impecable y el equipo muy profesional.', rating: 5 },
  { nombre: 'Carlos R.', zona: 'San Isidro', texto: 'Renovamos la cocina en 3 semanas. Excelente resultado y buen trato.', rating: 5 },
  { nombre: 'Laura M.', zona: 'Palermo', texto: 'Diseño moderno, materiales de calidad. Recomendamos MDV.', rating: 5 },
];

export default function HomePage() {
  return (
    <>
      {/* Hero (imagen) */}
      <HeroSlider
        onCtaRenovar={
          <Button
            href="#renovar"
            variant="primary"
            size="lg"
            className="bg-primary hover:bg-primary-hover shadow-medium hover:shadow-glow transition-shadow duration-300"
          >
            Renová tu cocina
          </Button>
        }
        onCtaDesdeCero={
          <Button
            href="#desde-cero"
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-neutral-text transition-colors duration-300"
          >
            Cocina desde cero
          </Button>
        }
      />

      {/* Renová tu cocina — fondo NEGRO, selector conversión */}
      <RenovarSelector />

      {/* Cocina desde cero — blanco */}
      <Section id="desde-cero" className="bg-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-text mb-4">
              Cocina desde cero
            </h2>
            <p className="text-neutral-muted text-lg mb-8">
              Proyecto integral: diseño, fabricación, instalación y revestimientos. Un solo interlocutor para todo el proceso.
            </p>
            <div className="space-y-6">
              {beneficiosDesdeCero.map((b, i) => (
                <div key={b.title} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-text">{b.title}</h3>
                    <p className="text-neutral-muted text-sm">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-medium">
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

      {/* Proyectos destacados — gris */}
      <Section id="proyectos" className="bg-neutral-soft">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <motion.h2 variants={staggerItem} className="font-serif text-3xl md:text-4xl font-bold text-neutral-text mb-4">
              Proyectos destacados
            </motion.h2>
            <motion.p variants={staggerItem} className="text-neutral-muted">
              Mirá algunos de nuestros trabajos recientes.
            </motion.p>
          </div>
          <motion.div variants={staggerItem}>
            <Button href="/proyectos" variant="ghost">
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Section>

      {/* Cómo trabajamos (resumen) — blanco */}
      <Section className="bg-white">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="font-serif text-3xl md:text-4xl font-bold text-neutral-text mb-4">
            Cómo trabajamos
          </motion.h2>
          <motion.p variants={staggerItem} className="text-neutral-muted max-w-2xl mx-auto">
            Proceso claro y transparente de punta a punta.
          </motion.p>
        </motion.div>
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {pasosProceso.map((paso, i) => (
            <motion.div key={paso.paso} variants={staggerItem} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg mb-4">
                  {paso.paso}
                </div>
                <h3 className="font-semibold text-neutral-text mb-2">{paso.titulo}</h3>
                <p className="text-neutral-muted text-sm">{paso.desc}</p>
              </div>
              {i < pasosProceso.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[60%] w-[80%] h-px bg-neutral-border" />
              )}
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button href="/como-trabajamos" variant="outline">
            Ver proceso completo
          </Button>
        </motion.div>
      </Section>

      {/* Testimonios — oscuro */}
      <Section className="bg-dark-section text-white">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={staggerItem} className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p variants={staggerItem} className="text-dark-muted">
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
          {testimonios.map((t, i) => (
            <motion.div key={t.nombre} variants={staggerItem}>
              <Card className="bg-white/5 border-dark-border backdrop-blur-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-white/95 mb-4">"{t.texto}"</p>
                <p className="font-medium text-white">{t.nombre}</p>
                <p className="text-sm text-dark-muted">{t.zona}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Contacto — gris */}
      <Section id="contacto" className="bg-neutral-soft">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={staggerItem} className="font-serif text-3xl md:text-4xl font-bold text-neutral-text mb-4">
            Contáctanos
          </motion.h2>
          <motion.p variants={staggerItem} className="text-neutral-muted max-w-2xl mx-auto mb-8">
            Completá el formulario según tu necesidad y te redirigimos a WhatsApp con el mensaje listo.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ContactFormDynamic />
        </motion.div>
      </Section>
    </>
  );
}
