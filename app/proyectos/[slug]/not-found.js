import Link from 'next/link';
import Section from '@/components/ui/Section';

export default function ProjectNotFound() {
  return (
    <Section className="py-24 text-center">
      <h1 className="font-serif text-3xl font-bold text-neutral-text mb-4">Proyecto no encontrado</h1>
      <p className="text-neutral-muted mb-6">El enlace puede haber cambiado o el proyecto ya no está publicado.</p>
      <Link href="/proyectos" className="text-primary font-medium hover:underline">
        Ver todos los proyectos
      </Link>
    </Section>
  );
}
