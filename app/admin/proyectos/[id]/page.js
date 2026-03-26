import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import { getProjectByIdAdmin, rowToPreviewPublic } from '@/lib/projects/admin-queries';
import { rowToFormDefaults } from '@/lib/projects/rowToFormDefaults';
import Link from 'next/link';

function FormFallback() {
  return <div className="text-sm text-neutral-muted py-8">Cargando formulario…</div>;
}

export default async function EditarProyectoPage({ params }) {
  const { id } = await params;
  const { ok, project, error } = await getProjectByIdAdmin(id);

  if (!ok || error) {
    return (
      <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error || 'Error'}</p>
    );
  }
  if (!project) notFound();

  const defaults = rowToFormDefaults(project);
  const preview = rowToPreviewPublic(project);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-text tracking-tight">Editar proyecto</h1>
        <p className="text-neutral-muted mt-2">
          Slug público:{' '}
          <code className="text-xs bg-neutral-soft px-1.5 py-0.5 rounded">{project.slug}</code>
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-neutral-border/90 bg-white/95 p-5 md:p-6">
        <p className="text-sm font-medium text-neutral-text mb-2">Vista previa</p>
        <p className="text-xs text-neutral-muted mb-3">
          Así se muestra en la web pública (solo si está visible).{' '}
          <Link href={`/proyectos/${project.slug}`} target="_blank" className="text-primary hover:underline">
            Abrir en nueva pestaña
          </Link>
        </p>
        <ul className="text-sm text-neutral-muted space-y-1">
          <li>
            <span className="text-neutral-text font-medium">{preview.title}</span> — {preview.ubicacion || 'Sin ubicación'}
          </li>
          <li>
            Visible: {project.visible_en_proyectos ? 'Sí' : 'No'} · Destacado home: {project.destacado_home ? 'Sí' : 'No'}{' '}
            · Prioridad: {project.orden_prioridad ?? 0}
          </li>
        </ul>
      </div>

      <Suspense fallback={<FormFallback />}>
        <ProjectForm key={project.id} mode="edit" projectId={project.id} defaultValues={defaults} />
      </Suspense>
    </div>
  );
}
