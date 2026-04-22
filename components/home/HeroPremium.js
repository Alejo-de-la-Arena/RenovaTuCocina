'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import TrustBar from './TrustBar';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1665507279656-0cdec047c4ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const easing = [0.25, 0.46, 0.45, 0.94];

export default function HeroPremium({
  ctaRenovar,
  ctaDesdeCero,
}) {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Imagen de fondo fija */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: easing }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGE}
            alt="Cocina renovada a medida"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/15 to-black/20"
            aria-hidden
          />
        </motion.div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full pb-14 pt-28 md:pb-32 md:pt-40">
        <Container className="pointer-events-auto">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easing }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-5 md:mb-6 leading-[1.08] tracking-tight max-w-[14ch]">
              Transformamos tu cocina.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-7 md:mb-8 max-w-xl leading-relaxed">
              Proyecto integral: diseño, fabricación e instalación. Resultados reales, proceso claro.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 md:mb-10">
              {ctaRenovar}
              {ctaDesdeCero}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-8 md:mt-16"
          >
            <TrustBar />
          </motion.div>
        </Container>
      </div>
    </section>
  );
}