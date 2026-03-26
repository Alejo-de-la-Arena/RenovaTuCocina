import Link from 'next/link';
import { FolderKanban, Plus } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/env';

export default function AdminHomePage() {
  const ok = isSupabaseConfigured();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-text tracking-tight">Panel de administración</h1>
        <p className="text-neutral-muted mt-2 max-w-xl">
          Gestioná proyectos, visibilidad pública y destacados en la home. El sitio público no muestra enlaces a esta
          zona.
        </p>
      </div>

      {!ok && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Configurá variables de Supabase en <code className="text-xs">.env.local</code> para habilitar el panel.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/admin/proyectos"
          className="flex items-center gap-4 rounded-2xl border border-neutral-border bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FolderKanban className="h-6 w-6" />
          </span>
          <span>
            <span className="block font-semibold text-neutral-text">Proyectos</span>
            <span className="text-sm text-neutral-muted">Listado, edición y publicación</span>
          </span>
        </Link>
        <Link
          href="/admin/proyectos/nuevo"
          className="flex items-center gap-4 rounded-2xl border border-neutral-border bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-soft text-neutral-text">
            <Plus className="h-6 w-6" />
          </span>
          <span>
            <span className="block font-semibold text-neutral-text">Nuevo proyecto</span>
            <span className="text-sm text-neutral-muted">Alta con imágenes y textos</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
