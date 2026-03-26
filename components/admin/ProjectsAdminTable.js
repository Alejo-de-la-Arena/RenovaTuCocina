'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Eye, EyeOff, Star, StarOff } from 'lucide-react';
import { deleteProjectAction, updateProjectFlagsAction } from '@/app/admin/actions';
import { cn } from '@/lib/cn';

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'visible', label: 'Visibles' },
  { id: 'hidden', label: 'Ocultos' },
  { id: 'featured', label: 'Destacados' },
];

export default function ProjectsAdminTable({ projects }) {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [busyId, setBusyId] = useState(null);

  const rows = useMemo(() => {
    let list = projects || [];
    if (filter === 'visible') list = list.filter((p) => p.visible_en_proyectos);
    if (filter === 'hidden') list = list.filter((p) => !p.visible_en_proyectos);
    if (filter === 'featured') list = list.filter((p) => p.destacado_home);
    return list;
  }, [projects, filter]);

  async function onDelete(id) {
    if (!confirm('¿Eliminar este proyecto? Esta acción no se puede deshacer.')) return;
    setBusyId(id);
    try {
      const res = await deleteProjectAction(id);
      if (!res?.ok) alert(res?.error || 'Error al eliminar');
      else router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  async function toggleVisible(id, current) {
    setBusyId(id);
    try {
      const res = await updateProjectFlagsAction(id, { visible_en_proyectos: !current });
      if (!res?.ok) alert(res?.error || 'Error');
      else router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  async function toggleDestacado(id, current) {
    setBusyId(id);
    try {
      const res = await updateProjectFlagsAction(id, { destacado_home: !current });
      if (!res?.ok) alert(res?.error || 'Error');
      else router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium border transition-colors',
              filter === f.id
                ? 'bg-primary text-white border-primary'
                : 'bg-white/80 border-neutral-border text-neutral-muted hover:border-primary/40'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-neutral-border/80 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-border/80 text-left text-neutral-muted">
              <th className="px-4 py-3 font-medium">Proyecto</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Slug</th>
              <th className="px-4 py-3 font-medium">Orden</th>
              <th className="px-4 py-3 font-medium text-center">Visible</th>
              <th className="px-4 py-3 font-medium text-center">Home</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-neutral-muted">
                  No hay proyectos con este filtro.
                </td>
              </tr>
            ) : (
              rows.map((p) => {
                const busy = busyId === p.id;
                return (
                  <tr key={p.id} className="border-b border-neutral-border/60 last:border-0">
                    <td className="px-4 py-3 font-medium text-neutral-text max-w-[200px]">
                      <span className="line-clamp-2">{p.title}</span>
                    </td>
                    <td className="px-4 py-3 text-neutral-muted font-mono text-xs hidden md:table-cell">{p.slug}</td>
                    <td className="px-4 py-3 text-neutral-muted">{p.orden_prioridad ?? 0}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => toggleVisible(p.id, p.visible_en_proyectos)}
                        className={cn(
                          'inline-flex items-center justify-center rounded-lg p-2 border transition-colors',
                          p.visible_en_proyectos
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                            : 'border-neutral-border bg-neutral-soft/50 text-neutral-muted'
                        )}
                        title={p.visible_en_proyectos ? 'Visible en proyectos' : 'Oculto'}
                      >
                        {p.visible_en_proyectos ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => toggleDestacado(p.id, p.destacado_home)}
                        className={cn(
                          'inline-flex items-center justify-center rounded-lg p-2 border transition-colors',
                          p.destacado_home
                            ? 'border-amber-200 bg-amber-50 text-amber-900'
                            : 'border-neutral-border bg-neutral-soft/50 text-neutral-muted'
                        )}
                        title={p.destacado_home ? 'Destacado en home' : 'No destacado'}
                      >
                        {p.destacado_home ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/proyectos/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-neutral-muted hover:bg-neutral-soft hover:text-primary"
                          title="Ver público (si está visible)"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/proyectos/${p.id}`}
                          className="rounded-lg p-2 text-neutral-muted hover:bg-neutral-soft hover:text-primary"
                          title="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => onDelete(p.id)}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
