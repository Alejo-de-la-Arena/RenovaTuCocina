'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { hasWhatsAppConfigured, getWhatsAppUrl } from '@/lib/whatsapp';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/como-trabajamos', label: 'Cómo trabajamos' },
  { href: '/contacto', label: 'Contacto' },
];

function NavLink({ href, label, isActive }) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative py-2 px-0.5 text-base font-nav font-medium tracking-wide transition-colors duration-200',
        isActive
          ? 'text-primary'
          : 'text-neutral-text/90 hover:text-primary'
      )}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-primary"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      {!isActive && (
        <span className="absolute inset-x-0 -bottom-0.5 h-0.5 scale-x-0 rounded-full bg-primary transition-transform duration-200 group-hover:scale-x-100 origin-left" />
      )}
    </Link>
  );
}

const HIDDEN_PREFIXES = ['/admin', '/acceso'];

export default function Header() {
  const pathname = usePathname();
  const hidden = pathname && HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const waUrl = hasWhatsAppConfigured() ? getWhatsAppUrl('Hola, me gustaría consultar sobre renovación de cocinas.') : null;

  if (hidden) return null;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)]'
          : 'bg-white/70 backdrop-blur-sm'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Navegación principal">
          <Link href="/" className="flex items-center shrink-0" aria-label="MDV Proyectos - Inicio">
            <img
              src="/assets/brand/logo-mdv.webp"
              alt="MDV Proyectos"
              className="h-10 md:h-16 w-auto object-contain text-neutral-text hover:opacity-90 transition-opacity duration-200"
              width={140}
              height={36}
            />
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))}
              />
            ))}
            {waUrl ? (
              <motion.a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-whatsapp text-white shadow-soft focus-ring-whatsapp ml-2"
                whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </motion.a>
            ) : (
              <span className="text-sm text-neutral-muted px-4 py-2 bg-neutral-soft rounded-xl">Configurar WhatsApp</span>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-whatsapp text-white shadow-soft"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 min-h-[44px] min-w-[44px] rounded-xl hover:bg-neutral-soft transition-colors focus-ring"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-panel"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm md:hidden"
              aria-hidden
            />
            <motion.div
              id="mobile-menu-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-[80] w-[92vw] max-w-[420px] bg-white shadow-2xl md:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Menú móvil"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-border/80">
                <img src="/assets/brand/logo-mdv.svg" alt="MDV Proyectos" className="h-7 w-auto object-contain text-neutral-text" width={120} height={30} />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 min-h-[44px] min-w-[44px] rounded-lg hover:bg-neutral-soft transition-colors focus-ring"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
          <div className="flex-1 overflow-auto py-6 px-4">
            <div className="space-y-1">
              {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'block py-4 px-4 rounded-xl text-base font-medium transition-colors min-h-[48px]',
                          isActive ? 'bg-primary-50 text-primary' : 'text-neutral-text hover:bg-neutral-soft'
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
                {waUrl && (
                  <div className="mt-6 pt-6 border-t border-neutral-border/80">
                    <Button
                      href={waUrl}
                      variant="whatsapp"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      Escribinos por WhatsApp
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
