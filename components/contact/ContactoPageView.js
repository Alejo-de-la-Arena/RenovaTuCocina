'use client';

import { motion } from 'framer-motion';
import { Clock, Mail, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import ContactoForm from '@/components/contact/ContactoForm';

export default function ContactoPageView() {
  return (
    <>
      {/* Formulario + info */}
      <section id="formulario-contacto" className="relative bg-[#f5f1ea] pb-20 pt-10 md:pb-28 md:pt-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(30,24,18,0.04) 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden
        />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center md:mb-14"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8a8277]">Paso a paso</span>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#1a1612] md:text-3xl">
              Contactanos
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-[15px] text-[#5c554c] md:text-base">
              Misma experiencia que en la home: tres variantes, un solo flujo hacia WhatsApp.
            </p>
          </motion.div>

          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-7">
              <ContactoForm variant="page" />
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden rounded-[28px] border border-[#e8e2da] bg-[linear-gradient(165deg,#ffffff_0%,#faf8f5_100%)] p-6 shadow-[0_24px_60px_-36px_rgba(20,16,12,0.18)] ring-1 ring-black/[0.03] sm:p-8"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a8277]">Contacto directo</p>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-[#1a1612] md:text-2xl">Estamos para ayudarte</h3>
                  <p className="mt-5 text-sm leading-relaxed text-[#5c554c]">
                    Respuesta en menos de 24 h hábiles. Atención personalizada, sin letras chicas.
                  </p>

                  <ul className="mt-8 space-y-5">
                    <li className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#f0ebe4] bg-[#faf8f6] text-primary">
                        <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8a8277]">Teléfono</span>
                        <p className="mt-0.5 font-medium text-[#1a1612]">(011) 1234-5678</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#f0ebe4] bg-[#faf8f6] text-primary">
                        <Mail className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8a8277]">Email</span>
                        <p className="mt-0.5 break-all font-medium text-[#1a1612]">info@mdvproyectos.com</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#f0ebe4] bg-[#faf8f6] text-primary">
                        <Clock className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8a8277]">Horario</span>
                        <p className="mt-0.5 text-[15px] leading-relaxed text-[#5c554c] sm:text-base">
                          Lun a Vie 9 a 18 hs. Sábados con turno.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#f0ebe4] bg-[#faf8f6] text-primary">
                        <MessageCircle className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8a8277]">Zona de trabajo</span>
                        <p className="mt-0.5 text-[15px] leading-relaxed text-[#5c554c] sm:text-base">
                          Zona Norte y CABA. Otras zonas: consultar.
                        </p>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-8 rounded-2xl border border-[#ebe4dc] bg-[#faf9f7] p-4">
                    <div className="flex gap-3">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
                      <p className="text-sm leading-relaxed text-[#5c554c]">
                        Tu mensaje se arma automáticamente según lo que completes: menos fricción y más claridad para
                        cotizar.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
