'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Section from '@/components/ui/Section';
import WhatsAppCTA from '@/components/WhatsAppCTA';

const MapPlaceholder = dynamic(
  () => import('@/components/MapPlaceholder'),
  { ssr: false, loading: () => <div className="h-64 bg-neutral-soft rounded-2xl animate-pulse" /> }
);

export default function ContactoPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-neutral-soft">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-text mb-4 tracking-tight">
              Contacto
            </h1>
            <p className="text-neutral-muted text-lg leading-relaxed">
              ¿Consultas? Escribinos por WhatsApp o revisá nuestra información de contacto.
            </p>
          </motion.div>
        </Section>
      </section>

      <Section className="bg-white">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="font-serif text-2xl font-bold text-neutral-text">Información</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="font-medium text-neutral-text block mb-0.5">Dirección</span>
                  <p className="text-neutral-muted">Zona Norte, Buenos Aires</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="font-medium text-neutral-text block mb-0.5">Teléfono</span>
                  <p className="text-neutral-muted">(011) 1234-5678</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="font-medium text-neutral-text block mb-0.5">Email</span>
                  <p className="text-neutral-muted">info@mdvproyectos.com</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="font-medium text-neutral-text block mb-0.5">Horario</span>
                  <p className="text-neutral-muted">Lun a Vie 9 a 18 hs. Sábados con turno.</p>
                </div>
              </li>
            </ul>
            <div className="pt-2">
              <WhatsAppCTA
                message="Hola, me gustaría consultar sobre renovación de cocinas."
                size="lg"
                label="Escribinos por WhatsApp"
              />
            </div>
            <p className="text-sm text-neutral-muted">
              También podés usar el <Link href="/#contacto" className="text-primary hover:underline">formulario de la home</Link> y te redirigimos a WhatsApp con el mensaje listo.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-serif text-2xl font-bold text-neutral-text mb-4">Ubicación</h2>
            <MapPlaceholder />
          </motion.div>
        </div>
      </Section>
    </>
  );
}
