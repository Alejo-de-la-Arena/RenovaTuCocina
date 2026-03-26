'use client';

import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createProjectAction, updateProjectAction } from '@/app/admin/actions';
import { slugify } from '@/lib/slug';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { MAX_FEATURED_HOME } from '@/lib/projects/constants';

const initialState = { ok: null, error: null };

function FieldLabel({ children }) {
  return <span className="block text-sm font-medium text-neutral-text mb-1.5">{children}</span>;
}

function SelectBool({ id, name, value, onChange, label }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-white text-neutral-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      >
        <option value="false">No</option>
        <option value="true">Sí</option>
      </select>
    </div>
  );
}

export default function ProjectForm({ mode = 'create', projectId = null, defaultValues = {} }) {
  const searchParams = useSearchParams();
  const created = searchParams.get('created');

  const [state, formAction, isPending] = useActionState(
    mode === 'create' ? createProjectAction : updateProjectAction,
    initialState
  );

  const [title, setTitle] = useState(defaultValues.title || '');
  const [slug, setSlug] = useState(defaultValues.slug || '');
  const [imagenPrincipal, setImagenPrincipal] = useState(defaultValues.imagen_principal_url || '');
  const [imagenCard, setImagenCard] = useState(defaultValues.imagen_card_url || '');
  const [imagenDetalle, setImagenDetalle] = useState(defaultValues.imagen_detalle_url || '');
  const [vis, setVis] = useState(defaultValues.visible_en_proyectos || 'false');
  const [dest, setDest] = useState(defaultValues.destacado_home || 'false');

  useEffect(() => {
    setTitle(defaultValues.title || '');
    setSlug(defaultValues.slug || '');
    setImagenPrincipal(defaultValues.imagen_principal_url || '');
    setImagenCard(defaultValues.imagen_card_url || '');
    setImagenDetalle(defaultValues.imagen_detalle_url || '');
    setVis(defaultValues.visible_en_proyectos || 'false');
    setDest(defaultValues.destacado_home || 'false');
  }, [projectId, defaultValues]);

  function generarSlug() {
    setSlug(slugify(title));
  }

  return (
    <form action={formAction} className="space-y-10">
      {mode === 'edit' && <input type="hidden" name="project_id" value={projectId} />}

      {created === '1' && (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Proyecto creado. Podés seguir editando o{' '}
          <Link href="/admin/proyectos" className="font-medium underline">
            volver al listado
          </Link>
          .
        </p>
      )}

      {state?.error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{state.error}</p>
      )}
      {state?.ok && mode === 'edit' && (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Cambios guardados correctamente.
        </p>
      )}

      <fieldset className="space-y-4 rounded-2xl border border-neutral-border/80 bg-white p-6 shadow-sm">
        <legend className="px-1 font-serif text-lg font-semibold text-neutral-text">Identificación</legend>
        <Input
          id="title"
          name="title"
          label="Título del proyecto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isPending}
        />
        <div className="grid md:grid-cols-[1fr_auto] gap-3 items-end">
          <Input
            id="slug"
            name="slug"
            label="Slug (URL)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            helperText="Solo letras minúsculas, números y guiones."
            disabled={isPending}
          />
          {mode === 'create' && (
            <Button type="button" variant="secondary" size="sm" onClick={generarSlug} disabled={isPending || !title}>
              Desde título
            </Button>
          )}
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-neutral-border/80 bg-white p-6 shadow-sm">
        <legend className="px-1 font-serif text-lg font-semibold text-neutral-text">Estado y publicación</legend>
        <p className="text-xs text-neutral-muted -mt-1">
          Los destacados en home se muestran como máximo {MAX_FEATURED_HOME}, ordenados por prioridad (menor número =
          primero).
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <SelectBool
            id="visible_en_proyectos"
            name="visible_en_proyectos"
            label="Visible en /proyectos"
            value={vis}
            onChange={(e) => setVis(e.target.value)}
          />
          <SelectBool
            id="destacado_home"
            name="destacado_home"
            label="Destacado en home"
            value={dest}
            onChange={(e) => setDest(e.target.value)}
          />
          <Input
            id="orden_prioridad"
            name="orden_prioridad"
            type="number"
            label="Prioridad / orden"
            defaultValue={defaultValues.orden_prioridad ?? '0'}
            disabled={isPending}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-neutral-border/80 bg-white p-6 shadow-sm">
        <legend className="px-1 font-serif text-lg font-semibold text-neutral-text">Datos del proyecto</legend>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            id="ubicacion"
            name="ubicacion"
            label="Ubicación / zona"
            defaultValue={defaultValues.ubicacion}
            disabled={isPending}
          />
          <Input
            id="tipo_cocina"
            name="tipo_cocina"
            label="Tipo de cocina (ej. L, isla, lineal)"
            defaultValue={defaultValues.tipo_cocina}
            disabled={isPending}
          />
          <Input id="año" name="año" type="number" label="Año" defaultValue={defaultValues.año} disabled={isPending} />
          <Input
            id="tiempo_obra"
            name="tiempo_obra"
            label="Tiempo de obra"
            defaultValue={defaultValues.tiempo_obra}
            disabled={isPending}
          />
        </div>
        <Textarea
          id="materiales_text"
          name="materiales_text"
          label="Materiales (uno por línea o separados por coma)"
          rows={3}
          defaultValue={defaultValues.materiales_text}
          disabled={isPending}
        />
        <Textarea
          id="descripcion_corta"
          name="descripcion_corta"
          label="Breve descripción (intro)"
          rows={3}
          defaultValue={defaultValues.descripcion_corta}
          disabled={isPending}
        />
        <Textarea
          id="desafio"
          name="desafio"
          label="Desafío"
          rows={4}
          defaultValue={defaultValues.desafio}
          disabled={isPending}
        />
        <Textarea
          id="solucion"
          name="solucion"
          label="Solución"
          rows={4}
          defaultValue={defaultValues.solucion}
          disabled={isPending}
        />
        <Textarea
          id="contenido_extendido"
          name="contenido_extendido"
          label="Contenido ampliado (notas, texto largo)"
          rows={6}
          defaultValue={defaultValues.contenido_extendido}
          disabled={isPending}
        />
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-neutral-border/80 bg-white p-6 shadow-sm">
        <legend className="px-1 font-serif text-lg font-semibold text-neutral-text">Imágenes</legend>
        <p className="text-xs text-neutral-muted">
          Podés pegar URL externas o subir al almacenamiento del proyecto (requiere sesión admin).
        </p>
        <div className="space-y-2">
          <FieldLabel>Imagen principal / portada</FieldLabel>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Input
              id="imagen_principal_url"
              name="imagen_principal_url"
              value={imagenPrincipal}
              onChange={(e) => setImagenPrincipal(e.target.value)}
              placeholder="https://..."
              disabled={isPending}
            />
            <ImageUploadField onUploaded={setImagenPrincipal} disabled={isPending} />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel>Imagen para card (opcional)</FieldLabel>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Input
              id="imagen_card_url"
              name="imagen_card_url"
              value={imagenCard}
              onChange={(e) => setImagenCard(e.target.value)}
              placeholder="https://..."
              disabled={isPending}
            />
            <ImageUploadField onUploaded={setImagenCard} disabled={isPending} />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel>Imagen detalle hero (opcional)</FieldLabel>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Input
              id="imagen_detalle_url"
              name="imagen_detalle_url"
              value={imagenDetalle}
              onChange={(e) => setImagenDetalle(e.target.value)}
              placeholder="https://..."
              disabled={isPending}
            />
            <ImageUploadField onUploaded={setImagenDetalle} disabled={isPending} />
          </div>
        </div>
        <Textarea
          id="galeria_antes_text"
          name="galeria_antes_text"
          label="Galería antes — una URL por línea"
          rows={4}
          defaultValue={defaultValues.galeria_antes_text}
          disabled={isPending}
        />
        <Textarea
          id="galeria_despues_text"
          name="galeria_despues_text"
          label="Galería después — una URL por línea"
          rows={4}
          defaultValue={defaultValues.galeria_despues_text}
          disabled={isPending}
        />
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-neutral-border/80 bg-white p-6 shadow-sm">
        <legend className="px-1 font-serif text-lg font-semibold text-neutral-text">SEO</legend>
        <Input id="meta_title" name="meta_title" label="Meta title" defaultValue={defaultValues.meta_title} disabled={isPending} />
        <Textarea
          id="meta_description"
          name="meta_description"
          label="Meta description"
          rows={2}
          defaultValue={defaultValues.meta_description}
          disabled={isPending}
        />
        <Input
          id="alt_imagen_principal"
          name="alt_imagen_principal"
          label="Texto alternativo imagen principal"
          defaultValue={defaultValues.alt_imagen_principal}
          disabled={isPending}
        />
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-neutral-border/80 bg-white p-6 shadow-sm">
        <legend className="px-1 font-serif text-lg font-semibold text-neutral-text">Extensible (JSON)</legend>
        <Textarea
          id="extra_json"
          name="extra_json"
          label="Campos extra (JSON válido)"
          rows={4}
          defaultValue={defaultValues.extra_json}
          disabled={isPending}
        />
        <p className="text-xs text-neutral-muted -mt-2">
          Para ampliar datos sin migrar la tabla. Ejemplo:{' '}
          <code className="text-[11px] bg-neutral-soft px-1 rounded">{`{"resultadosClave":["Más luz"]}`}</code>
        </p>
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isPending} className="min-h-[48px]">
          {isPending ? 'Guardando…' : mode === 'create' ? 'Crear proyecto' : 'Guardar cambios'}
        </Button>
        <Button variant="secondary" href="/admin/proyectos" className={isPending ? 'pointer-events-none opacity-50' : ''}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
