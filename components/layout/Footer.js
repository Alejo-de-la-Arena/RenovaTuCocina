'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { hasWhatsAppConfigured, getWhatsAppUrl } from '@/lib/whatsapp';

const HIDDEN_PREFIXES = ['/admin', '/acceso'];

const footerLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/como-trabajamos', label: 'Cómo trabajamos' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Footer() {
  const pathname = usePathname();
  const hidden = pathname && HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const waUrl = hasWhatsAppConfigured() ? getWhatsAppUrl('Hola, me gustaría consultar sobre renovación de cocinas.') : null;

  if (hidden) return null;

  return (
    <footer className="relative overflow-hidden bg-premium-dark-soft text-white border-t border-white/10">
      <div className="pointer-events-none absolute -top-28 right-10 h-56 w-56 rounded-full bg-[#d1a66f]/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-[#f7d9aa]/8 blur-3xl" />
      <Container>
        <div className="relative z-10 py-18 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block" aria-label="MDV Proyectos - Inicio">
              <img
                src="https://res.cloudinary.com/dasch1s5i/image/upload/v1776964613/RTC-logo_s0br3r.png"
                alt="Renova Tu Cocina"
                className="h-12 md:h-18 w-[200px] object-contain opacity-100 hover:opacity-100 transition-opacity"
                width={180}
                height={64}
              />
            </Link>
            <p className="mt-5 text-white/70 text-sm leading-relaxed max-w-xs">
              Renovación de cocinas a medida. Diseño, fabricación e instalación en zona norte y CABA.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider opacity-90">Navegación</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider opacity-90">Contacto</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 shrink-0 text-primary-400" />
                Zona Norte, Buenos Aires
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-primary-400" />
                11 6205-0737
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-primary-400" />
                info@renovatucocina.com.ar
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider opacity-90">¿Consultas?</h3>
            {waUrl ? (
              <motion.a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full md:w-auto px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-whatsapp shadow-soft focus-ring-whatsapp"
                whileHover={{ scale: 1.03, boxShadow: '0 6px 20px rgba(37, 211, 102, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                Escribinos por WhatsApp
              </motion.a>
            ) : (
              <p className="text-white/45 text-sm">Configurar NEXT_PUBLIC_WA_NUMBER</p>
            )}
          </div>
        </div>

        <div className="relative z-10 py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/45 text-sm">
            © {new Date().getFullYear()} MDV Proyectos. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
