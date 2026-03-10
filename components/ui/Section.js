'use client';

import { cn } from '@/lib/cn';
import Container from './Container';

export default function Section({ children, className, containerClassName, id }) {
  return (
    <section id={id} className={cn('py-18 md:py-24', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
