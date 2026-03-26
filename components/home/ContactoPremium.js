'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import Section from '@/components/ui/Section';
import {
  hasWhatsAppConfigured,
  getWhatsAppUrl,
  buildRenovarMessage,
  buildDesdeCeroMessage,
  buildConsultaMessage,
} from '@/lib/whatsapp';

const MOTIVO_OPTIONS = [
  { value: 'renovar', label: 'Renovar mi cocina' },
  { value: 'desde-cero', label: 'Cocina desde cero' },
  { value: 'consulta', label: 'Solo consulta' },
];

const PRESUPUESTO_OPTIONS = [
  { value: 'bajo', label: 'Hasta $500.000' },
  { value: 'medio', label: '$500.000 - $1.500.000' },
  { value: 'alto', label: '$1.500.000 - $3.000.000' },
  { value: 'premium', label: 'Más de $3.000.000' },
];

const URGENCIA_OPTIONS = [
  { value: 'baja', label: 'Sin urgencia' },
  { value: 'media', label: '1-3 meses' },
  { value: 'alta', label: 'Lo antes posible' },
];

const TIPO_COCINA_OPTIONS = [
  { value: 'L', label: 'En L' },
  { value: 'U', label: 'En U' },
  { value: 'lineal', label: 'Lineal' },
  { value: 'isla', label: 'Con isla' },
];

const ESTADO_OPTIONS = [
  { value: 'funcional', label: 'Funcional pero desactualizada' },
  { value: 'deteriorada', label: 'Deteriorada' },
  { value: 'demoler', label: 'Requiere demolición' },
];

const MATERIALES_OPTIONS = [
  { value: 'melamina', label: 'Melamina' },
  { value: 'laqueado', label: 'Laqueado' },
  { value: 'MDF', label: 'MDF' },
  { value: 'madera', label: 'Madera natural' },
  { value: 'cuarzo', label: 'Mesada cuarzo' },
  { value: 'granito', label: 'Mesada granito' },
];

function FormRenovar({ form, setForm, errors }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
      <Input
        id="medidas"
        label="Medidas aprox."
        placeholder="Ej: 3m x 2m"
        value={form.medidas}
        onChange={(e) => setForm({ ...form, medidas: e.target.value })}
        error={errors.medidas}
        helperText="Orientativo"
      />
      <Select
        id="estadoActual"
        label="Estado actual"
        value={form.estadoActual}
        onChange={(e) => setForm({ ...form, estadoActual: e.target.value })}
        options={ESTADO_OPTIONS}
      />
      <Input
        id="zona"
        label="Zona"
        placeholder="Vicente López, San Isidro..."
        value={form.zona}
        onChange={(e) => setForm({ ...form, zona: e.target.value })}
        error={errors.zona}
      />
      <Select
        id="presupuesto"
        label="Presupuesto estimado"
        value={form.presupuesto}
        onChange={(e) => setForm({ ...form, presupuesto: e.target.value })}
        options={PRESUPUESTO_OPTIONS}
      />
      <Select
        id="urgencia"
        label="Urgencia"
        value={form.urgencia}
        onChange={(e) => setForm({ ...form, urgencia: e.target.value })}
        options={URGENCIA_OPTIONS}
      />
      <Input
        id="linkOpcional"
        label="Link de referencia (opcional)"
        placeholder="Pinterest o foto"
        type="url"
        value={form.linkOpcional}
        onChange={(e) => setForm({ ...form, linkOpcional: e.target.value })}
      />
      <Textarea
        id="mensaje"
        label="Contanos brevemente qué buscás"
        placeholder="..."
        value={form.mensaje}
        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
        className="md:col-span-2"
      />
    </div>
  );
}

function FormDesdeCero({ form, setForm, errors }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
      <Select
        id="tipoCocina"
        label="Tipo de cocina"
        value={form.tipoCocina}
        onChange={(e) => setForm({ ...form, tipoCocina: e.target.value })}
        options={TIPO_COCINA_OPTIONS}
      />
      <Input
        id="medidas"
        label="Medidas aprox."
        placeholder="Ej: 4m x 3m"
        value={form.medidas}
        onChange={(e) => setForm({ ...form, medidas: e.target.value })}
      />
      <Select
        id="materiales"
        label="Materiales preferidos"
        value={form.materiales}
        onChange={(e) => setForm({ ...form, materiales: e.target.value })}
        options={MATERIALES_OPTIONS}
      />
      <Input
        id="zona"
        label="Zona"
        placeholder="Palermo, Olivos..."
        value={form.zona}
        onChange={(e) => setForm({ ...form, zona: e.target.value })}
        error={errors.zona}
      />
      <Select
        id="presupuesto"
        label="Presupuesto"
        value={form.presupuesto}
        onChange={(e) => setForm({ ...form, presupuesto: e.target.value })}
        options={PRESUPUESTO_OPTIONS}
      />
      <Input
        id="fechaDeseada"
        label="Fecha deseada (opcional)"
        placeholder="Ej: Marzo 2025"
        value={form.fechaDeseada}
        onChange={(e) => setForm({ ...form, fechaDeseada: e.target.value })}
      />
      <Textarea
        id="mensaje"
        label="Contanos más sobre tu proyecto"
        placeholder="..."
        value={form.mensaje}
        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
        className="md:col-span-2"
      />
    </div>
  );
}

function FormConsulta({ form, setForm, errors }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
      <Input
        id="nombre"
        label="Nombre"
        placeholder="Tu nombre"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />
      <Input
        id="zona"
        label="Zona"
        placeholder="Zona Norte, CABA..."
        value={form.zona}
        onChange={(e) => setForm({ ...form, zona: e.target.value })}
        error={errors.zona}
      />
      <Textarea
        id="mensaje"
        label="Mensaje"
        placeholder="¿En qué podemos ayudarte?"
        value={form.mensaje}
        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
        error={errors.mensaje}
        className="md:col-span-2"
      />
    </div>
  );
}

export default function ContactoPremium() {
  const [motivo, setMotivo] = useState('');
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!motivo) newErrors.motivo = 'Seleccioná un motivo';
    if (motivo === 'renovar' || motivo === 'desde-cero') {
      if (!form.zona?.trim()) newErrors.zona = 'Indicá la zona';
    }
    if (motivo === 'consulta') {
      if (!form.mensaje?.trim()) newErrors.mensaje = 'Escribí tu mensaje';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!hasWhatsAppConfigured()) {
      setErrors({ submit: 'WhatsApp no configurado. Agregá NEXT_PUBLIC_WA_NUMBER.' });
      return;
    }

    let message = '';
    if (motivo === 'renovar') message = buildRenovarMessage(form);
    else if (motivo === 'desde-cero') message = buildDesdeCeroMessage(form);
    else message = buildConsultaMessage(form);

    const url = getWhatsAppUrl(message);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Section id="contacto" className="bg-warm-50 section-spacious">
      <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-text mb-4 tracking-tight">
            Empecemos tu proyecto
          </h2>
          <p className="text-neutral-muted max-w-xl mx-auto text-lg">
            Contanos en dos pasos y te respondemos por WhatsApp en 24 h.
          </p>
      </motion.div>

      <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-2xl border border-neutral-border bg-white p-5 sm:p-6 md:p-10 shadow-soft space-y-6 md:space-y-8">
            <div>
              <label htmlFor="motivo" className="block font-semibold text-neutral-text mb-3">
                Paso 1 — ¿Qué buscás?
              </label>
              <Select
                id="motivo"
                aria-label="Motivo de contacto"
                value={motivo}
                onChange={(e) => {
                  setMotivo(e.target.value);
                  setForm({});
                  setErrors({});
                }}
                options={MOTIVO_OPTIONS}
                error={errors.motivo}
                placeholder="Elegí una opción..."
              />
            </div>

            <AnimatePresence mode="wait">
              {motivo === 'renovar' && (
                <motion.div
                  key="renovar"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-semibold text-neutral-text mb-4">Paso 2 — Tu proyecto</p>
                  <FormRenovar form={form} setForm={setForm} errors={errors} />
                </motion.div>
              )}
              {motivo === 'desde-cero' && (
                <motion.div
                  key="desde-cero"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-semibold text-neutral-text mb-4">Paso 2 — Tu proyecto</p>
                  <FormDesdeCero form={form} setForm={setForm} errors={errors} />
                </motion.div>
              )}
              {motivo === 'consulta' && (
                <motion.div
                  key="consulta"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-semibold text-neutral-text mb-4">Paso 2 — Datos básicos</p>
                  <FormConsulta form={form} setForm={setForm} errors={errors} />
                </motion.div>
              )}
            </AnimatePresence>

            {errors.submit && (
              <p className="text-sm text-red-600">{errors.submit}</p>
            )}

            {motivo && (
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-white bg-whatsapp hover:bg-whatsapp-hover shadow-soft focus-ring-whatsapp transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] min-h-[50px]"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                Continuar por WhatsApp
              </button>
            )}
          </div>
      </motion.form>
    </Section>
  );
}
