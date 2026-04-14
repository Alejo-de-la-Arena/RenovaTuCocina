'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Factory,
  FileText,
  Hammer,
  MapPin,
  MessageCircle,
  Sparkles,
  Wrench,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import { cn } from '@/lib/cn';

const easing = [0.23, 1, 0.32, 1];

const pasos = [
  {
    titulo: 'Consultá',
    desc: 'Escribinos por WhatsApp o completá el formulario con tu proyecto. Indicá medidas aproximadas, zona y presupuesto estimado.',
    icon: MessageCircle,
    tag: 'Inicio',
  },
  {
    titulo: 'Visita técnica',
    desc: 'Coordinamos una visita sin cargo para medir el espacio, ver el estado actual y entender tus necesidades.',
    icon: MapPin,
    tag: 'Diagnóstico',
  },
  {
    titulo: 'Presupuesto',
    desc: 'En 48-72 horas recibís una propuesta detallada con diseño, materiales, plazos y precio. Sin compromiso.',
    icon: FileText,
    tag: 'Propuesta',
  },
  {
    titulo: 'Fabricación',
    desc: 'Una vez aprobado, fabricamos tu cocina en nuestro taller con materiales seleccionados.',
    icon: Factory,
    tag: 'Producción',
  },
  {
    titulo: 'Instalación',
    desc: 'Instalamos según cronograma acordado. Obra limpia y supervisada hasta la entrega final.',
    icon: Hammer,
    tag: 'Obra',
  },
  {
    titulo: 'Entrega',
    desc: 'Revisión conjunta, entrega de documentación y garantía. Tu cocina lista para disfrutar.',
    icon: Sparkles,
    tag: 'Cierre',
  },
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
  { title: '¿Hacen obras y reformas?', content: 'Sí. Además de la fabricación e instalación de cocinas, realizamos obras y reformas asociadas: demoliciones menores, revestimientos, pintura, instalaciones y todo lo necesario para entregar el espacio terminado.' },
  { title: '¿Trabajan con profesionales?', content: 'Sí. Podemos trabajar tanto con tus arquitectos o diseñadores como con nuestros profesionales de confianza, adaptándonos al equipo que ya estés coordinando.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: easing },
  }),
};

function ProcessStep({ paso, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45, margin: '-12% 0px -12% 0px' });
  const Icon = paso.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: easing }}
      className="relative"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {/* Columna rail + número — desktop alineado a la línea */}
        <>
          {/* Mobile / tablet chica */}
          <div className="flex shrink-0 gap-4 md:hidden">
            <div
              className={cn(
                'relative z-10 flex h-[52px] w-[52px] min-w-[52px] items-center justify-center rounded-2xl border text-lg font-semibold tracking-tight transition-all duration-500 sm:h-14 sm:w-14',
                inView
                  ? 'border-primary/40 bg-gradient-to-br from-primary to-[#7d2218] text-white shadow-[0_12px_32px_-8px_rgba(150,41,28,0.45)]'
                  : 'border-[#e3dcd6] bg-[#faf8f6] text-[#8a8277]'
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden shrink-0 items-center justify-end gap-3 md:flex md:w-[150px] lg:w-[170px]">
            <span
              className={cn(
                'text-right text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300',
                inView ? 'text-primary' : 'text-[#a8a098]'
              )}
            >
              {paso.tag}
            </span>

            <div
              className={cn(
                'relative z-10 flex h-14 w-14 min-w-[56px] items-center justify-center rounded-2xl border text-lg font-semibold tracking-tight transition-all duration-500',
                inView
                  ? 'border-primary/40 bg-gradient-to-br from-primary to-[#7d2218] text-white shadow-[0_12px_32px_-8px_rgba(150,41,28,0.45)]'
                  : 'border-[#e3dcd6] bg-[#faf8f6] text-[#8a8277]'
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        </>

        {/* Card */}
        <div
          className={cn(
            'relative flex-1 overflow-hidden rounded-[28px] border p-6 transition-all duration-500 sm:p-8',
            inView
              ? 'border-primary/25 bg-white shadow-[0_24px_60px_-28px_rgba(20,16,12,0.18)] ring-1 ring-primary/10'
              : 'border-[#e8e2da] bg-[#faf9f7]/90 shadow-[0_8px_30px_-18px_rgba(20,16,12,0.08)]'
          )}
        >
          <div
            className={cn(
              'pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500',
              inView ? 'bg-primary/[0.07] opacity-100' : 'bg-neutral-200/40 opacity-0'
            )}
            aria-hidden
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="mb-1 flex items-center gap-2 md:hidden">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90">{paso.tag}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-primary/25 to-transparent" />
              </div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#1a1612] sm:text-[1.65rem] md:text-[1.85rem]">
                {paso.titulo}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5c554c] sm:text-base">{paso.desc}</p>
            </div>
            <div
              className={cn(
                'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500',
                inView
                  ? 'border-primary/20 bg-primary/[0.06] text-primary'
                  : 'border-[#ebe4dc] bg-[#f8f5f1] text-[#a89888]'
              )}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ComoTrabajamosContent() {
  return (
    <>
      {/* —— Hero —— */}
      <section className="relative overflow-hidden bg-premium-dark-soft pb-20 pt-16 sm:pb-24 sm:pt-20 md:pb-28 md:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(150,41,28,0.35),transparent_55%)]" aria-hidden />
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#d1a66f]/15 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#96291c]/20 blur-3xl" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden
        />

        <Container className="relative z-10">
          <motion.div initial="hidden" animate="show" className="mx-auto max-w-4xl text-center">
            <motion.span
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm sm:text-[11px]"
            >
              Método · Transparencia · Acompañamiento
            </motion.span>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="mt-6 font-serif text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]"
            >
              Conocé cómo llevamos
              <span className="mt-1 block text-white/90">tu cocina del proyecto a la realidad</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
            >
              Proceso claro, tiempos definidos y comunicación directa. Sin sorpresas: sabés qué pasa en cada etapa hasta
              la entrega.
            </motion.p>

            {/* Mini preview del journey */}
            <motion.div custom={3} variants={fadeUp} className="mt-10 flex flex-col items-center gap-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/45">Seis etapas</p>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {pasos.map((_, i) => (
                  <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                    <div className="h-2 w-2 rounded-full bg-white/25 sm:h-2.5 sm:w-2.5" />
                    {i < pasos.length - 1 && (
                      <div className="h-px w-3 bg-gradient-to-r from-white/20 to-white/10 sm:w-5" />
                    )}
                  </div>
                ))}
              </div>
              <a
                href="#proceso"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
              >
                <span className="border-b border-white/30 pb-0.5 transition group-hover:border-white/60">
                  Ver el recorrido
                </span>
                <ChevronDown className="h-4 w-4 opacity-80 transition group-hover:translate-y-0.5" aria-hidden />
              </a>
            </motion.div>
          </motion.div>
        </Container>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#f5f1ea]"
          aria-hidden
        />
      </section>

      {/* —— Proceso —— */}
      <Section id="proceso" className="relative bg-[#f5f1ea] pb-20 pt-14 md:pb-28 md:pt-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(30,24,18,0.04) 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden
        />
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-14 max-w-2xl text-center md:mb-20"
          >
            <span className="inline-flex rounded-full border border-[#d4cbc0] bg-white/90 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b6358]">
              El proceso
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[#1a1612] md:text-4xl">
              Un camino ordenado, de punta a punta
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5c554c] md:text-lg">
              Cada paso está pensado para que tomes decisiones con información y acompañamiento real.
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-3xl lg:max-w-5xl">
            {/* Línea vertical premium */}
            <div
              className="absolute left-[26px] top-3 bottom-3 hidden w-px bg-gradient-to-b from-primary/20 via-[#d4cbc0] to-[#e8e2da] sm:left-[31px] md:block md:left-[calc(150px-28px)] lg:left-[calc(170px-28px)]"
              aria-hidden
            />
            <div className="space-y-8 md:space-y-10 lg:space-y-12">
              {pasos.map((paso, i) => (
                <ProcessStep key={paso.titulo} paso={paso} index={i} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* —— Beneficios / datos —— */}
      <Section className="relative border-y border-[#ebe4dc] bg-[linear-gradient(180deg,#faf8f5_0%,#f3efe8_100%)] py-24 md:py-28">
        <div className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-3xl" aria-hidden />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8a8277]">Tiempos y alcance</span>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#1a1612] md:text-4xl">
            Lo esencial, en un vistazo
          </h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {tiemposCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-[24px] border border-[#e7dfd6] bg-white p-7 shadow-[0_16px_40px_-24px_rgba(20,16,12,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_50px_-20px_rgba(150,41,28,0.12)]"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/[0.04] blur-2xl transition-opacity group-hover:opacity-100" aria-hidden />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f0e8df] bg-[#faf6f1] text-primary transition-colors group-hover:border-primary/15 group-hover:bg-primary/[0.06]">
                <card.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold text-[#1a1612]">{card.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#5c554c]">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* —— FAQ —— */}
      <Section className="relative bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center md:mb-14"
          >
            <span className="inline-flex rounded-full border border-[#e8e2da] bg-[#faf9f7] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b6358]">
              Dudas habituales
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[#1a1612] md:text-4xl">
              Preguntas frecuentes
            </h2>
            <p className="mt-3 text-[15px] text-[#5c554c] md:text-base">Respuestas claras antes de escribirnos.</p>
          </motion.div>
          <Accordion items={faqs} variant="premium" defaultOpenIndex={0} />
        </div>
      </Section>

      {/* —— Cierre CTA —— */}
      <section className="relative overflow-hidden border-t border-white/10 bg-premium-dark py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(150,41,28,0.25),transparent_55%)]" aria-hidden />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl md:text-[2rem]">
              ¿Querés avanzar con tu cocina?
            </h2>
            <p className="mt-3 max-w-lg text-base text-white/70">
              Contanos tu espacio y coordinamos el primer paso sin compromiso.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                href="/contacto"
                size="lg"
                className="min-h-[52px] rounded-2xl bg-white px-8 text-[#1a1612] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] hover:bg-[#f5f1ea]"
              >
                Pedir consulta
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Button>
              <Button
                href="/proyectos"
                variant="secondary"
                size="lg"
                className="min-h-[52px] rounded-2xl border border-white/25 bg-transparent px-8 text-white hover:bg-white/10"
              >
                Ver proyectos
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
