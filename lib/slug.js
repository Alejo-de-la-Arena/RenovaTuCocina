/**
 * Genera slug URL-seguro a partir de un título.
 */
export function slugify(input) {
  if (!input || typeof input !== 'string') return '';
  return input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}
