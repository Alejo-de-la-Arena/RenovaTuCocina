'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, FileText, Wrench } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Accordion from '@/components/ui/Accordion';
import { staggerContainer, staggerItem } from '@/lib/motion';

const pasos = [
  { titulo: 'Consultá', desc: 'Escribinos por WhatsApp o completá el formulario con tu proyecto. Indicá medidas aproximadas, zona y presupuesto estimado.' },
  { titulo: 'Visita técnica', desc: 'Coordinamos una visita sin cargo para medir el espacio, ver el estado actual y entender tus necesidades.' },
  { titulo: 'Presupuesto', desc: 'En 48-72 horas recibís una propuesta detallada con diseño, materiales, plazos y precio. Sin compromiso.' },
  { titulo: 'Fabricación', desc: 'Una vez aprobado, fabricamos tu cocina en nuestro taller con materiales seleccionados.' },
  { titulo: 'Instalación', desc: 'Instalamos según cronograma acordado. Obra limpia y supervisada hasta la entrega final.' },
  { titulo: 'Entrega', desc: 'Revisión conjunta, entrega de documentación y garantía. Tu cocina lista para disfrutar.' },
];

const tiemposCards = [
  { icon: Clock, title: 'Renovación', text: '2 a 4 semanas según alcance.' },
  { icon: FileText, title: 'Presupuesto', text: 'En 48-72 hs después de la visita.' },
  { icon: Wrench, title: 'Incluye', text: 'Diseño, fabricación e instalación.' },
];

const faqs = [
  { title: '¿En qué zonas trabajan?', content: 'Principalmente zona norte (Vicente López, San Isidro, Olivos, Martínez, Tigre, etc.) y CABA. Para otras zonas consultar.' },
  { title: '¿Cuánto tarda una renovación?', content: 'Una renovación estándar puede llevar 2-4 semanas. Una cocina desde cero, entre 4 y 6 semanas según complejidad.' },
  { title: '¿Dan presupuesto sin cargo?', content: 'Sí. Coordinamos visita técnica y te enviamos presupuesto detallado en 48-72 horas. Sin compromiso.' },
  { title: '¿Qué materiales usan?', content: 'Melamina, MDF laqueado, compactos, cuarzo, granito, silestone. Trabajamos con distintos proveedores para adaptarnos a tu presupuesto.' },
  { title: '¿Incluyen plomería y electricidad?', content: 'La fabricación e instalación de muebles la hacemos nosotros. Para conexiones de agua y gas trabajamos con instaladores matriculados o podemos coordinar con el tuyo.' },
  { title: '¿Cómo es el pago?', content: 'Seña al aprobar, porcentaje al iniciar fabricación y saldo al finalizar. Detalles según proyecto.' },
];

function StepCard({ paso, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35, once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="relative flex gap-6 md:gap-8 w-full"
    >
      <div className="shrink-0 flex flex-col items-center relative z-10">
        <motion.div
          className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl font-bold flex items-center justify-center text-lg shadow-soft ring-4 ring-white transition-colors duration-300 ${inView ? 'bg-primary text-white scale-100' : 'bg-neutral-soft text-neutral-muted scale-95'
            }`}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          {index + 1}
        </motion.div>
      </div>
      <motion.div
        className={`flex-1 rounded-2xl border p-6 md:p-8 transition-all duration-300 ${inView ? 'border-primary/30 bg-white shadow-medium' : 'border-neutral-border bg-neutral-soft/50 shadow-card'
          }`}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-serif text-xl md:text-2xl font-bold text-neutral-text mb-2">{paso.titulo}</h2>
        <p className="text-neutral-muted leading-relaxed">{paso.desc}</p>
      </motion.div>
    </motion.div>
  );
}

export default function ComoTrabajamosPage() {
  return (
    <>
      {/* Hero con fondo animado (sin imagen) */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-primary">
        {/* Capa animada (mesh) en rojo MDV */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 10%, rgba(255,255,255,0.14), transparent 60%)," +
              "radial-gradient(55% 55% at 80% 30%, rgba(0,0,0,0.18), transparent 60%)," +
              "radial-gradient(65% 60% at 50% 90%, rgba(255,255,255,0.10), transparent 60%)"
          }}
          aria-hidden
        />

        {/* Movimiento sutil */}
        <motion.div
          className="absolute inset-0"
          aria-hidden
          initial={{ scale: 1, rotate: 0 }}
          animate={{ scale: 1.05, rotate: 1.2 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{
            background:
              "radial-gradient(50% 45% at 30% 20%, rgba(255,255,255,0.10), transparent 60%)," +
              "radial-gradient(55% 50% at 70% 40%, rgba(0,0,0,0.12), transparent 60%)"
          }}
        />

        <Container className="relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.h1
              variants={staggerItem}
              className="font-serif text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-white mb-4 tracking-tight"
            >
              Cómo trabajamos
            </motion.h1>

            <motion.p variants={staggerItem} className="text-white/80 text-lg max-w-xl">
              Proceso claro y transparente, de la consulta inicial a la entrega final.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Steps: full width, editorial, línea de progreso vertical */}
      <Section className="bg-white">
        <Container>
          <div className="relative pl-0">
            <div className="absolute left-6 md:left-7 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-neutral-border to-neutral-border/60 hidden md:block" aria-hidden />
            <div className="space-y-6 md:space-y-8">
              {pasos.map((paso, i) => (
                <StepCard key={paso.titulo} paso={paso} index={i} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Tiempos estimados */}
      <Section className="bg-neutral-soft">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {tiemposCards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              className="rounded-2xl border border-neutral-border bg-white p-6 shadow-card hover:shadow-medium hover:border-primary/20 transition-all duration-300"
            >
              <card.icon className="w-10 h-10 text-primary mb-4" aria-hidden />
              <h3 className="font-semibold text-neutral-text mb-2">{card.title}</h3>
              <p className="text-neutral-muted text-sm">{card.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* FAQ */}
      <Section className="bg-white">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="mb-10">
          <motion.h2 variants={staggerItem} className="font-serif text-3xl font-bold text-neutral-text mb-2">
            Preguntas frecuentes
          </motion.h2>
          <motion.p variants={staggerItem} className="text-neutral-muted">
            Respuestas a las dudas más habituales.
          </motion.p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <Accordion items={faqs} />
        </motion.div>
      </Section>
    </>
  );
}
