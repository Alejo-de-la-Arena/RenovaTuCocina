import ReformasContent from '@/components/reformas/ReformasContent';

export const revalidate = 3600;

export const metadata = {
  title: 'Reformas · MDV Proyectos',
  description:
    'Obras y reformas integrales con dirección de arquitecto matriculado. Demoliciones, integración de ambientes, aberturas y terminaciones. Zona norte GBA y CABA.',
};

export default function ReformasPage() {
  return <ReformasContent />;
}
