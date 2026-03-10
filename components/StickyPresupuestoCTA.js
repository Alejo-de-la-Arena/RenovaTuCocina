'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WhatsAppCTA from '@/components/WhatsAppCTA';

export default function StickyPresupuestoCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const show = y > 600;
      setVisible(show);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-0 left-0 right-0 z-30 hidden md:block"
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-neutral-border shadow-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <p className="font-semibold text-neutral-text text-sm">
            ¿Querés presupuesto sin compromiso?
          </p>
          <WhatsAppCTA
            message="Hola, me gustaría recibir un presupuesto para mi cocina."
            size="md"
            label="Presupuesto por WhatsApp"
          />
        </div>
      </div>
    </motion.div>
  );
}
