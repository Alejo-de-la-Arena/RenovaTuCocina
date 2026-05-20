/** Etiquetas para filtros y badges de proyectos (tipología + tipo de renovación). */

export const TIPOLOGIA_OPTIONS = [
  { value: 'L', label: 'En L' },
  { value: 'U', label: 'En U' },
  { value: 'lineal', label: 'Lineal' },
  { value: 'paralela', label: 'Paralela' },
  { value: 'isla', label: 'Con isla' },
];

export const RENOVACION_OPTIONS = [
  { value: 'estetica', label: 'Estética' },
  { value: 'funcional', label: 'Funcional' },
  { value: 'integral', label: 'Integral' },
  { value: 'ampliacion', label: 'Ampliación' },
];

export function getTipologiaLabel(value) {
  if (!value) return '';
  const v = String(value).toLowerCase();
  const opt = TIPOLOGIA_OPTIONS.find((o) => o.value.toLowerCase() === v);
  return opt ? opt.label : value;
}

export function getRenovacionLabel(value) {
  if (!value) return '';
  const v = String(value).toLowerCase();
  const opt = RENOVACION_OPTIONS.find((o) => o.value.toLowerCase() === v);
  return opt ? opt.label : value;
}
