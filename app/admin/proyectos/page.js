import Link from 'next/link';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProjectsAdminTable from '@/components/admin/ProjectsAdminTable';
import { listProjectsAdmin } from '@/lib/projects/admin-queries';

export const dynamic = 'force-dynamic';

export default async function AdminProyectosPage() {
  const { ok, projects, error } = await listProjectsAdmin();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-text tracking-tight">Proyectos</h1>
          <p className="text-neutral-muted mt-2 max-w-xl">
            Gestioná visibilidad, destacados y orden. La home muestra hasta 5 destacados según prioridad.
          </p>
        </div>
        <Button href="/admin/proyectos/nuevo" variant="primary" className="inline-flex items-center gap-2 rounded-xl min-h-[44px] shrink-0">
          <Plus className="h-4 w-4" />
          Nuevo proyecto
        </Button>
      </div>

      {!ok && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error || 'No se pudo cargar la lista.'}
        </p>
      )}

      {ok && <ProjectsAdminTable projects={projects} />}
    </div>
  );
}
