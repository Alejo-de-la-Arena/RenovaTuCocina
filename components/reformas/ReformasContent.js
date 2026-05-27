'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hammer,
  Square,
  LayoutDashboard,
  PaintBucket,
  Wrench,
  ClipboardList,
  ArrowDown,
  ChevronDown,
} from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { fadeUp, fadeIn, staggerContainer, staggerItem } from '@/lib/motion';

const WA_MESSAGE = 'Hola, me gustaría consultar sobre una reforma en mi hogar.';

const differentiators = [
  {
    num: '01',
    title: 'Dirección profesional',
    desc: 'Arquitecto matriculado en cada proyecto, de principio a fin.',
  },
  {
    num: '02',
    title: 'Equipo de confianza',
    desc: 'Profesionales con años de experiencia trabajando juntos.',
  },
  {
    num: '03',
    title: 'Presupuesto transparente',
    desc: 'Sin costos ocultos ni sorpresas en obra.',
  },
];

const services = [
  {
    Icon: Hammer,
    title: 'Demoliciones y tabiques',
    desc: 'Tiramos paredes, creamos ambientes nuevos o ampliamos los existentes.',
  },
  {
    Icon: Square,
    title: 'Aberturas y ventanas',
    desc: 'Abrimos vanos, instalamos ventanas nuevas, integramos interior con exterior.',
  },
  {
    Icon: LayoutDashboard,
    title: 'Integración de ambientes',
    desc: 'Unimos cocina, comedor y living para ganar espacio y luz natural.',
  },
  {
    Icon: PaintBucket,
    title: 'Revestimientos y terminaciones',
    desc: 'Pisos, cerámicos, pintura, cielorrasos. Todo coordinado.',
  },
  {
    Icon: Wrench,
    title: 'Instalaciones',
    desc: 'Coordinamos plomería, electricidad y gas con instaladores matriculados.',
  },
  {
    Icon: ClipboardList,
    title: 'Dirección de obra',
    desc: 'El arquitecto supervisa cada etapa y te mantiene informado en todo momento.',
  },
];

const steps = [
  {
    num: 1,
    title: 'Consulta inicial',
    desc: 'Nos contás qué querés cambiar. Sin compromiso, sin costo.',
  },
  {
    num: 2,
    title: 'Relevamiento técnico',
    desc: 'El arquitecto visita la propiedad y evalúa el alcance real de la obra.',
  },
  {
    num: 3,
    title: 'Proyecto y presupuesto',
    desc: 'Recibís planos, renders si aplica, y un presupuesto detallado.',
  },
  {
    num: 4,
    title: 'Ejecución',
    desc: 'Nuestro equipo trabaja con plazos definidos. El arquitecto supervisa cada etapa.',
  },
  {
    num: 5,
    title: 'Entrega',
    desc: 'Recibís el espacio terminado, limpio y listo para usar.',
  },
];

const proyectos = [
  {
    title: 'Integración cocina-comedor',
    location: 'Martínez',
    desc: 'Se derrumbó la pared divisoria para crear un espacio único, amplio y luminoso.',
    antes: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800',
    despues: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
    tags: ['Integración', '6 semanas', 'Zona Norte'],
  },
  {
    title: 'Apertura de ambientes',
    location: 'San Isidro',
    desc: 'Eliminación de tabiques no estructurales para lograr planta libre y mejor circulación.',
    antes: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
    despues: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    tags: ['Apertura', '4 semanas', 'GBA Norte'],
  },
];

const faqItems = [
  {
    title: '¿En qué se diferencia una reforma de una renovación de cocina?',
    content:
      'Una reforma implica intervención estructural: mover paredes, modificar instalaciones, rediseñar ambientes completos. Una renovación de cocina es más acotada. Con MDV podés hacer las dos cosas, o combinarlas.',
  },
  {
    title: '¿Necesito un arquitecto para hacer una reforma?',
    content:
      'Para obras con modificaciones estructurales, sí es obligatorio contar con un profesional matriculado. Nosotros lo incluimos en cada proyecto de reforma, sin costo adicional.',
  },
  {
    title: '¿Cuánto tarda una reforma integral?',
    content:
      'Depende del alcance. Una reforma de un ambiente puede llevar 3-5 semanas. Una reforma integral de varios ambientes, entre 2 y 4 meses. Te damos un cronograma detallado antes de empezar.',
  },
  {
    title: '¿Trabajan en toda la zona norte y CABA?',
    content:
      'Sí. Cubrimos Vicente López, San Isidro, Olivos, Martínez, Tigre, Palermo, Belgrano y zonas aledañas. Para otros puntos del GBA, consultanos.',
  },
];

export default function ReformasContent() {
  const waUrl = getWhatsAppUrl(WA_MESSAGE);
  const [openService, setOpenService] = useState(0);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="inicio"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dark"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1635321350281-e2a91ecffd00?q=80&w=2623&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Obra de reforma estructural en vivienda"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/75 via-dark/65 to-dark/88" />
        </div>

        {/* Content */}
        <Container className="relative z-10 py-32 text-center">
          <motion.p
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-300"
          >
            Renová Tu Cocina · Arquitectura y Obra
          </motion.p>

          <motion.h1
            initial="initial"
            animate="animate"
            variants={fadeUp}
            className="text-display mx-auto max-w-4xl font-serif font-bold text-white"
          >
            Tu hogar, rediseñado desde adentro
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/75 md:text-xl"
          >
            Obras y reformas integrales con dirección de arquitecto. De la idea al resultado, sin
            sorpresas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {waUrl && (
              <Button href={waUrl} variant="whatsapp" size="lg">
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Consultá tu reforma
              </Button>
            )}
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-base font-medium text-white transition-all duration-200 hover:bg-white/10"
            >
              Ver proyectos
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </Container>

        {/* Trust badge */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <Container>
            <p className="text-sm text-white/45">Arquitecto en cada obra · Zona Norte y CABA</p>
          </Container>
        </div>
      </section>

      {/* ── DIFFERENTIATORS ──────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-18 md:py-24">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {differentiators.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8"
              >
                {/* Top border accent slides in on hover */}
                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

                {/* Decorative number */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-4 -right-3 select-none font-serif text-[7rem] font-bold leading-none text-primary/[0.13]"
                >
                  {item.num}
                </div>

                <h3 className="relative mb-3 font-serif text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="relative text-base text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <Section id="servicios">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 text-center"
        >
          <h2 className="text-display-sm font-serif font-bold text-neutral-text">
            ¿Qué incluye una reforma con MDV?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-muted">
            Nos ocupamos de todo, coordinamos cada gremio, y vos solo tenés que aprobar.
          </p>
        </motion.div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Left: sticky image panel */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:w-2/5 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1761679296920-b48e07e9e267?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Reforma en proceso"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-xl bg-primary/90 px-4 py-2 text-sm font-medium text-white">
                6 servicios incluidos
              </div>
            </div>
          </motion.div>

          {/* Right: services accordion */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex-1"
          >
            {services.map((service, i) => {
              const isOpen = openService === i;
              return (
                <motion.div
                  key={service.title}
                  variants={staggerItem}
                  className={`border-b border-neutral-border transition-all duration-300 last:border-b-0 ${isOpen ? 'border-l-2 border-l-primary pl-4' : 'border-l-2 border-l-transparent pl-4'}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenService(isOpen ? null : i)}
                    className="flex w-full items-center gap-3 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="shrink-0 font-mono text-xs font-semibold text-primary/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <service.Icon
                      className={`h-4 w-4 shrink-0 transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-neutral-muted'}`}
                    />
                    <span
                      className={`flex-1 font-serif font-bold transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-neutral-text'}`}
                    >
                      {service.title}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-neutral-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm leading-relaxed text-neutral-muted">
                          {service.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* ── PROCESS TIMELINE ─────────────────────────────────────────────── */}
      <Section id="proceso" className="bg-dark">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-14 text-center"
        >
          <h2 className="text-display-sm font-serif font-bold text-white">
            Cómo llevamos tu reforma
          </h2>
        </motion.div>

        {/* Desktop: horizontal */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative hidden md:grid md:grid-cols-5"
        >
          <div className="absolute left-[10%] right-[10%] top-5 h-px bg-white/15" />
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={staggerItem}
              className="relative flex flex-col items-center gap-4 px-3 text-center"
            >
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-glow">
                {step.num}
              </div>
              <h3 className="font-serif text-sm font-bold leading-snug text-white">{step.title}</h3>
              <p className="text-xs leading-relaxed text-dark-muted">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: vertical */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col md:hidden"
        >
          {steps.map((step, i) => (
            <motion.div key={step.num} variants={staggerItem} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-white/15" />
                )}
              </div>
              <div className={`${i < steps.length - 1 ? 'pb-8' : 'pb-0'}`}>
                <h3 className="font-serif font-bold text-white">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-dark-muted">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────────────── */}
      <Section id="proyectos">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 text-center"
        >
          <h2 className="text-display-sm font-serif font-bold text-neutral-text">
            Transformaciones reales
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-muted">
            Cada obra empieza con un problema y termina con un espacio que no reconocés.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {proyectos.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-soft"
            >
              <div className="grid grid-cols-2">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.antes}
                    alt={`Antes — ${project.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    Antes
                  </span>
                </div>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.despues}
                    alt={`Después — ${project.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    Después
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-neutral-text">
                  {project.title} · <span className="font-normal">{project.location}</span>
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-muted">{project.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-warm-50 px-2.5 py-1 text-xs text-neutral-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── TESTIMONIAL ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1a1008] py-18 md:py-24">
        {/* Radial glow behind text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(150,41,28,0.13) 0%, transparent 70%)',
          }}
        />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl">
            {/* Decorative quote mark — absolute, top-left of card */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-6 -left-4 select-none font-serif text-[11rem] leading-none text-primary/20 md:-left-6 md:text-[13rem]"
              >
                &ldquo;
              </div>

              <div className="relative pt-20 md:pt-24">
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-serif text-xl font-medium italic leading-relaxed text-white md:text-2xl"
                >
                  No pensábamos que una pared podía cambiar tanto la vida en casa. MDV nos acompañó
                  en todo, desde el primer boceto hasta el último detalle. Resultado increíble.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-8"
                >
                  <div className="mb-4 h-px w-12 bg-primary" />
                  <p className="text-sm font-medium text-white/50">
                    Familia Rodríguez · San Isidro · Reforma integral 2024
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-10 text-center">
            <h2 className="text-display-sm font-serif font-bold text-neutral-text">
              Preguntas frecuentes
            </h2>
          </div>
          <Accordion items={faqItems} variant="premium" defaultOpenIndex={0} />
        </motion.div>
      </Section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <Section id="contacto" className="bg-dark">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-display-sm font-serif font-bold text-white">
            ¿Tenés una reforma en mente?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-dark-muted">
            Contanos qué querés cambiar y el arquitecto te asesora sin cargo.
          </p>
          {waUrl && (
            <div className="mt-10">
              <Button href={waUrl} variant="whatsapp" size="lg" className="px-10 py-5 text-lg">
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Empezar mi reforma
              </Button>
            </div>
          )}
        </motion.div>
      </Section>
    </>
  );
}
