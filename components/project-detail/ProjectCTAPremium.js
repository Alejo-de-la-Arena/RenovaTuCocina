'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { hasWhatsAppConfigured, getWhatsAppUrl, buildProyectoSimilarMessage, trackWhatsAppContact } from '@/lib/whatsapp';

export default function ProjectCTAPremium({ project }) {
  const waMessage = buildProyectoSimilarMessage(project.title);
  const waUrl = hasWhatsAppConfigured() ? getWhatsAppUrl(waMessage) : null;

  return (
    <Section className="bg-[radial-gradient(circle_at_10%_10%,#403224_0%,#221b15_42%,#17130f_100%)] py-24 md:py-32 border-t border-[#5a4b39]/40">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[34px] border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.03)_54%)] px-6 py-12 md:px-12 md:py-16 text-center shadow-[0_40px_90px_rgba(0,0,0,0.38)]"
      >
        <div className="pointer-events-none absolute -top-24 right-6 h-56 w-56 rounded-full bg-[#f7d9aa]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[#d1a66f]/12 blur-3xl" />
        <span className="mb-4 inline-flex rounded-full border border-white/20 bg-black/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white/80">
          Paso siguiente
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-semibold text-white mb-5 tracking-tight leading-tight">
          ¿Querés renovar tu cocina con un resultado así?
        </h2>
        <p className="text-white/75 text-base md:text-lg mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
          Contanos tu espacio y te asesoramos. Diseñamos, fabricamos e instalamos según tu necesidad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {waUrl && (
            <Button
              href={waUrl}
              onClick={trackWhatsAppContact}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1b1611] hover:bg-[#f4eee5] shadow-[0_20px_40px_rgba(0,0,0,0.32)] px-8 py-4 rounded-xl font-semibold transition-all duration-400"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Consultar por WhatsApp
            </Button>
          )}
          <Button
            href="/proyectos"
            variant="outline"
            className="border border-white/40 text-white hover:bg-white/10 inline-flex items-center gap-2 px-8 py-4 rounded-xl"
          >
            Ver más proyectos
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </motion.div>
    </Section>
  );
}
