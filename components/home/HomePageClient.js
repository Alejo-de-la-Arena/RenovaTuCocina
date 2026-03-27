'use client';

import Button from '@/components/ui/Button';
import HeroPremium from '@/components/home/HeroPremium';
import ServiciosPremium from '@/components/home/ServiciosPremium';
import CocinaDesdeCero from '@/components/home/CocinaDesdeCero';
import ProyectosPremium from '@/components/home/ProyectosPremium';
import HomeTimeline from '@/components/home/HomeTimeline';
import TestimoniosPremium from '@/components/home/TestimoniosPremium';
import ContactoPremium from '@/components/home/ContactoPremium';

export default function HomePageClient({ featuredProjects = [] }) {
  return (
    <div className="relative bg-premium-dark">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_24%_10%,rgba(255,255,255,0.12),transparent_56%)]" />
      <HeroPremium
        showBeforeAfter
        ctaRenovar={
          <Button
            href="#renovar"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-primary hover:bg-primary-hover shadow-medium hover:shadow-glow transition-shadow duration-300"
          >
            Renová tu cocina
          </Button>
        }
        ctaDesdeCero={
          <Button
            href="#desde-cero"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] border-2 border-white text-white hover:bg-white hover:text-neutral-text transition-colors duration-300"
          >
            Cocina desde cero
          </Button>
        }
      />

      <ServiciosPremium />

      <CocinaDesdeCero />

      <ProyectosPremium featuredProjects={featuredProjects} />

      <HomeTimeline />

      <TestimoniosPremium />

      <ContactoPremium />
    </div>
  );
}
