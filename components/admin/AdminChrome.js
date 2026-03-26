'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, LogOut, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/cn';

const links = [
  { href: '/admin', label: 'Inicio', icon: LayoutDashboard },
  { href: '/admin/proyectos', label: 'Proyectos', icon: FolderKanban },
];

export default function AdminChrome({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f4f2ee] text-neutral-text flex flex-col md:flex-row">
      <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-neutral-border/80 bg-[#1a1816] text-white flex flex-col md:min-h-screen">
        <div className="p-6 border-b border-white/10">
          <p className="font-serif text-lg font-semibold tracking-tight">MDV Admin</p>
          <p className="text-xs text-white/55 mt-1">Renová tu Cocina</p>
        </div>
        <nav className="p-3 space-y-1 flex-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  active ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/8 hover:text-white'
                )}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-90" />
                {label}
              </Link>
            );
          })}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/8 hover:text-white transition-colors"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Ver sitio
          </a>
        </nav>
        <div className="p-3 md:p-4 border-t border-white/10">
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-5 md:p-10 max-w-6xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
