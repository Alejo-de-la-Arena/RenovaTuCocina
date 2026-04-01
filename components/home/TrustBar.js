'use client';

import { motion } from 'framer-motion';

const TRUST_ITEMS = [
  { value: '+10', label: 'años' },
  { value: '+200', label: 'proyectos' },
  { value: 'Zona Norte y CABA', label: '' },
  { value: '24 h', label: 'respuesta' },
];

export default function TrustBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="flex flex-nowrap justify-between sm:justify-center gap-x-2.5 sm:gap-x-8 gap-y-2 text-[11px] sm:text-sm text-white/80 leading-tight"
      role="list"
    >
      {TRUST_ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-baseline gap-1 sm:gap-1.5 whitespace-nowrap" role="listitem">
          <span className="font-semibold text-white">{item.value}</span>
          {item.label && <span>{item.label}</span>}
        </span>
      ))}
    </motion.div>
  );
}
