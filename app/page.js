'use client';

import Button from '@/components/ui/Button';
import HeroPremium from '@/components/home/HeroPremium';
import ServiciosPremium from '@/components/home/ServiciosPremium';
import CocinaDesdeCero from '@/components/home/CocinaDesdeCero';
import ProyectosPremium from '@/components/home/ProyectosPremium';
import HomeTimeline from '@/components/home/HomeTimeline';
import TestimoniosPremium from '@/components/home/TestimoniosPremium';
import ContactoPremium from '@/components/home/ContactoPremium';

export default function HomePage() {
  return (
    <>
      <HeroPremium
        showBeforeAfter
        ctaRenovar={
          <Button
            href="#renovar"
            variant="primary"
            size="lg"
            className="bg-primary hover:bg-primary-hover shadow-medium hover:shadow-glow transition-shadow duration-300"
          >
            Renová tu cocina
          </Button>
        }
        ctaDesdeCero={
          <Button
            href="#desde-cero"
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-neutral-text transition-colors duration-300"
          >
            Cocina desde cero
          </Button>
        }
      />

      <ServiciosPremium />

      <CocinaDesdeCero />

      <ProyectosPremium />

      <HomeTimeline />

      <TestimoniosPremium />

      <ContactoPremium />
    </>
  );
}
