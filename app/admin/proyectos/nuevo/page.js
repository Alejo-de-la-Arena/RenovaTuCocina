import { Suspense } from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import { rowToFormDefaults } from '@/lib/projects/rowToFormDefaults';

function FormFallback() {
  return <div className="text-sm text-neutral-muted py-8">Cargando formulario…</div>;
}

export default function NuevoProyectoPage() {
  const defaults = rowToFormDefaults(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-text tracking-tight">Nuevo proyecto</h1>
        <p className="text-neutral-muted mt-2">Completá los datos y guardá. Podés seguir editando después.</p>
      </div>
      <Suspense fallback={<FormFallback />}>
        <ProjectForm mode="create" defaultValues={defaults} />
      </Suspense>
    </div>
  );
}
