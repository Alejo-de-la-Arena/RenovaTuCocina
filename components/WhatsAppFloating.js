'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { hasWhatsAppConfigured, getWhatsAppUrl } from '@/lib/whatsapp';

const defaultMessage = 'Hola, me gustaría pedir presupuesto para mi cocina.';

export default function WhatsAppFloating() {
  const [visible, setVisible] = useState(false);
  const [avoidBottom, setAvoidBottom] = useState(false); // mobile: no tapar contenido

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setAvoidBottom(mq.matches);
    const handler = () => setAvoidBottom(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const waUrl = hasWhatsAppConfigured() ? getWhatsAppUrl(defaultMessage) : null;
  if (!waUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.9,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      transition={{ duration: 0.25 }}
      className="fixed z-40 right-4 md:right-6 bottom-6 md:bottom-8"
      style={avoidBottom ? { bottom: '5.5rem' } : undefined}
      aria-label="Abrir WhatsApp para consultas"
    >
      <Link
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-whatsapp text-white shadow-lg hover:bg-whatsapp-hover focus-ring-whatsapp focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon className="w-8 h-8 md:w-9 md:h-9" />
      </Link>
    </motion.div>
  );
}
