'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { hasWhatsAppConfigured, getWhatsAppUrl, buildProyectoSimilarMessage } from '@/lib/whatsapp';

export default function ProjectCTAPremium({ project }) {
  const waMessage = buildProyectoSimilarMessage(project.title);
  const waUrl = hasWhatsAppConfigured() ? getWhatsAppUrl(waMessage) : null;

  return (
    <Section className="bg-neutral-text py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          ¿Querés renovar tu cocina con un resultado así?
        </h2>
        <p className="text-white/75 text-lg mb-10">
          Contanos tu espacio y te asesoramos. Diseñamos, fabricamos e instalamos según tu necesidad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {waUrl && (
            <Button
              href={waUrl}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white shadow-lg px-8 py-4 rounded-xl font-medium"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Consultar por WhatsApp
            </Button>
          )}
          <Button
            href="/proyectos"
            variant="outline"
            className="border-2 border-white/40 text-white hover:bg-white hover:text-neutral-text inline-flex items-center gap-2"
          >
            Ver más proyectos
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
