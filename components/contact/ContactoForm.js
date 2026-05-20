'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Hammer, HelpCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Section from '@/components/ui/Section';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { cn } from '@/lib/cn';
import {
  hasWhatsAppConfigured,
  getWhatsAppUrl,
  buildRenovarMessage,
  buildDesdeCeroMessage,
  buildConsultaMessage,
} from '@/lib/whatsapp';

const MOTIVO_OPTIONS = [
  { value: 'renovar', label: 'Renovar mi cocina', short: 'Renovación', icon: Hammer },
  { value: 'desde-cero', label: 'Cocina desde cero', short: 'Desde cero', icon: Building2 },
  { value: 'consulta', label: 'Solo consulta', short: 'Consulta', icon: HelpCircle },
];

const PLAZOS_OPTIONS = [
  { value: 'baja', label: 'Sin urgencia' },
  { value: 'media', label: 'De 2 a 3 meses' },
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
  { value: 'enchapado', label: 'Enchapado natural' },
  { value: 'iluminación', label: 'Iluminación Led' },
  { value: 'cuarzo', label: 'Mesada cuarzo' },
  { value: 'granito', label: 'Mesada granito' },
];  

const formEase = [0.23, 1, 0.32, 1];

function FormRenovar({ form, setForm, errors, inputClass }) {
  return (
    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
      <Input
        id="medidas"
        label="Dimensiones aprox."
        placeholder="Ej: 3m x 2m"
        value={form.medidas || ''}
        onChange={(e) => setForm({ ...form, medidas: e.target.value })}
        error={errors.medidas}
        helperText="Orientativo"
        className={inputClass}
      />
      <Select
        id="estadoActual"
        label="Estado actual"
        value={form.estadoActual || ''}
        onChange={(e) => setForm({ ...form, estadoActual: e.target.value })}
        options={ESTADO_OPTIONS}
        error={errors.estadoActual}
      />
      <Input
        id="zona"
        label="Zona"
        placeholder="Vicente López, San Isidro..."
        value={form.zona || ''}
        onChange={(e) => setForm({ ...form, zona: e.target.value })}
        error={errors.zona}
        className={inputClass}
      />
      <Select
        id="urgencia"
        label="Plazos"
        value={form.urgencia || ''}
        onChange={(e) => setForm({ ...form, urgencia: e.target.value })}
        options={PLAZOS_OPTIONS}
        error={errors.urgencia}
      />
      <Input
        id="linkOpcional"
        label="Tu foto de referencia (opcional)"
        placeholder="Cargar aquí"
        value={form.linkOpcional || ''}
        onChange={(e) => setForm({ ...form, linkOpcional: e.target.value })}
        className={cn('md:col-span-2', inputClass)}
      />
      <Textarea
        id="mensaje"
        label="Contanos brevemente qué buscás"
        placeholder="..."
        value={form.mensaje || ''}
        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
        className={cn('md:col-span-2', inputClass)}
        error={errors.mensaje}
      />
    </div>
  );
}

function FormDesdeCero({ form, setForm, errors, inputClass }) {
  const materialesSeleccionados = Array.isArray(form.materiales)
    ? form.materiales
    : form.materiales
      ? [form.materiales]
      : [];

  const toggleMaterial = (value) => {
    const next = materialesSeleccionados.includes(value)
      ? materialesSeleccionados.filter((v) => v !== value)
      : [...materialesSeleccionados, value];
    setForm({ ...form, materiales: next });
  };

  return (
    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
      <Select
        id="tipoCocina"
        label="Tipo de cocina"
        value={form.tipoCocina || ''}
        onChange={(e) => setForm({ ...form, tipoCocina: e.target.value })}
        options={TIPO_COCINA_OPTIONS}
        error={errors.tipoCocina}
      />
      <Input
        id="medidas"
        label="Dimensiones aprox."
        placeholder="Ej: 4m x 3m"
        value={form.medidas || ''}
        onChange={(e) => setForm({ ...form, medidas: e.target.value })}
        className={inputClass}
        error={errors.medidas}
      />
      <fieldset className="md:col-span-2 space-y-2">
        <legend
          className={cn(
            'block text-sm font-semibold text-neutral-text mb-1',
            inputClass && 'text-[#1a1612]',
          )}
        >
          Materiales preferidos
        </legend>
        <p className={cn('text-xs -mt-0.5 mb-2', inputClass ? 'text-[#8a8277]' : 'text-neutral-muted')}>
          Podés elegir más de uno.
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {MATERIALES_OPTIONS.map((o) => {
            const checked = materialesSeleccionados.includes(o.value);
            return (
              <label
                key={o.value}
                className={cn(
                  'flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors',
                  checked
                    ? 'border-primary/40 bg-primary/5 text-neutral-text ring-1 ring-primary/15'
                    : 'border-neutral-border bg-white text-neutral-text hover:border-neutral-border/80',
                  inputClass && 'border-[#e3dcd4] bg-[#fdfcfa]',
                  inputClass && checked && 'border-primary/35 bg-white ring-primary/20',
                )}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 shrink-0 rounded border-neutral-border text-primary focus:ring-primary/30"
                  checked={checked}
                  onChange={() => toggleMaterial(o.value)}
                />
                <span>{o.label}</span>
              </label>
            );
          })}
        </div>
        {errors.materiales ? (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.materiales}
          </p>
        ) : null}
      </fieldset>
      <Input
        id="zona"
        label="Zona"
        placeholder="Palermo, Olivos..."
        value={form.zona || ''}
        onChange={(e) => setForm({ ...form, zona: e.target.value })}
        error={errors.zona}
        className={inputClass}
      />
      <Input
        id="fechaDeseada"
        label="Fecha deseada (opcional)"
        placeholder="Ej: Marzo 2025"
        value={form.fechaDeseada || ''}
        onChange={(e) => setForm({ ...form, fechaDeseada: e.target.value })}
        className={inputClass}
      />
      <Input
        id="linkOpcional"
        label="Tu foto de referencia (opcional)"
        placeholder="Cargar aquí"
        value={form.linkOpcional || ''}
        onChange={(e) => setForm({ ...form, linkOpcional: e.target.value })}
        className={inputClass}
      />
      <Textarea
        id="mensaje"
        label="Contanos más sobre tu proyecto"
        placeholder="..."
        value={form.mensaje || ''}
        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
        className={cn('md:col-span-2', inputClass)}
        error={errors.mensaje}
      />
    </div>
  );
}

function FormConsulta({ form, setForm, errors, inputClass }) {
  return (
    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
      <Input
        id="nombre"
        label="Nombre"
        placeholder="Tu nombre"
        value={form.nombre || ''}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        className={inputClass}
        error={errors.nombre}
      />
      <Input
        id="zona"
        label="Zona"
        placeholder="Zona Norte, CABA..."
        value={form.zona || ''}
        onChange={(e) => setForm({ ...form, zona: e.target.value })}
        error={errors.zona}
        className={inputClass}
      />
      <Textarea
        id="mensaje"
        label="Mensaje"
        placeholder="¿En qué podemos ayudarte?"
        value={form.mensaje || ''}
        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
        error={errors.mensaje}
        className={cn('md:col-span-2', inputClass)}
      />
    </div>
  );
}

export default function ContactoForm({ variant = 'home' }) {
  const isPage = variant === 'page';
  const [motivo, setMotivo] = useState(isPage ? 'renovar' : '');
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const selectOptions = MOTIVO_OPTIONS.map(({ value, label }) => ({ value, label }));

  const validate = () => {
    const newErrors = {};
    if (!motivo) newErrors.motivo = 'Seleccioná un motivo';

    if (motivo === 'renovar') {
      if (!form.medidas?.trim()) newErrors.medidas = 'Indicá las medidas';
      if (!form.estadoActual) newErrors.estadoActual = 'Seleccioná el estado';
      if (!form.zona?.trim()) newErrors.zona = 'Indicá la zona';
      if (!form.urgencia) newErrors.urgencia = 'Seleccioná los plazos';
      if (!form.mensaje?.trim()) newErrors.mensaje = 'Contanos qué buscás';
    }

    if (motivo === 'desde-cero') {
      if (!form.tipoCocina) newErrors.tipoCocina = 'Elegí el tipo de cocina';
      if (!form.medidas?.trim()) newErrors.medidas = 'Indicá las medidas';
      const mats = form.materiales;
      if (!(Array.isArray(mats) ? mats.length > 0 : Boolean(mats)))
        newErrors.materiales = 'Elegí al menos un material';
      if (!form.zona?.trim()) newErrors.zona = 'Indicá la zona';
      if (!form.mensaje?.trim()) newErrors.mensaje = 'Contanos sobre tu proyecto';
    }

    if (motivo === 'consulta') {
      if (!form.nombre?.trim()) newErrors.nombre = 'Indicá tu nombre';
      if (!form.zona?.trim()) newErrors.zona = 'Indicá la zona';
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

  const setMotivoAndReset = (value) => {
    setMotivo(value);
    setForm({});
    setErrors({});
  };

  const inputClassPage = isPage
    ? 'border-[#e3dcd4] bg-[#fdfcfa] focus:border-primary/40 focus:ring-primary/15'
    : undefined;

  const formBody = (
    <>
      {isPage ? (
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a8277]">Paso 1</p>
          <p className="font-serif text-lg font-semibold text-[#1a1612] md:text-xl">¿Qué querés hacer?</p>
          <div
            className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-2 rounded-[20px] border border-[#e5ddd4] bg-[#f5f1eb] p-2 sm:p-2"
            role="tablist"
            aria-label="Tipo de consulta"
          >
            {MOTIVO_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = motivo === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMotivoAndReset(opt.value)}
                  className={cn(
                    'flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition-all duration-300 sm:flex-col sm:justify-center sm:gap-1.5 sm:py-4 sm:text-center',
                    active
                      ? 'bg-white text-primary shadow-[0_10px_28px_-8px_rgba(150,41,28,0.25)] ring-1 ring-primary/15'
                      : 'text-[#5c554c] hover:bg-white/70 hover:text-[#1a1612]'
                  )}
                >
                  <Icon
                    className={cn('h-5 w-5 shrink-0', active ? 'text-primary' : 'text-[#a89888]')}
                    strokeWidth={1.5}
                  />
                  <span className="leading-tight">{opt.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="motivo" className="block font-semibold text-neutral-text mb-3">
            Paso 1 — ¿Qué buscás?
          </label>
          <Select
            id="motivo"
            aria-label="Motivo de contacto"
            value={motivo}
            onChange={(e) => setMotivoAndReset(e.target.value)}
            options={selectOptions}
            error={errors.motivo}
            placeholder="Elegí una opción..."
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {motivo === 'renovar' && (
          <motion.div
            key="renovar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: formEase }}
            className="space-y-5"
          >
            <p className={cn('font-semibold text-neutral-text', isPage && 'font-serif text-base text-[#1a1612] md:text-lg')}>
              {isPage ? 'Detalle de tu renovación' : 'Paso 2 — Tu proyecto'}
            </p>
            <FormRenovar form={form} setForm={setForm} errors={errors} inputClass={inputClassPage} />
          </motion.div>
        )}
        {motivo === 'desde-cero' && (
          <motion.div
            key="desde-cero"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: formEase }}
            className="space-y-5"
          >
            <p className={cn('font-semibold text-neutral-text', isPage && 'font-serif text-base text-[#1a1612] md:text-lg')}>
              {isPage ? 'Tu cocina desde cero' : 'Paso 2 — Tu proyecto'}
            </p>
            <FormDesdeCero form={form} setForm={setForm} errors={errors} inputClass={inputClassPage} />
          </motion.div>
        )}
        {motivo === 'consulta' && (
          <motion.div
            key="consulta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: formEase }}
            className="space-y-5"
          >
            <p className={cn('font-semibold text-neutral-text', isPage && 'font-serif text-base text-[#1a1612] md:text-lg')}>
              {isPage ? 'Tus datos' : 'Paso 2 — Datos básicos'}
            </p>
            <FormConsulta form={form} setForm={setForm} errors={errors} inputClass={inputClassPage} />
          </motion.div>
        )}
      </AnimatePresence>

      {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}

      {motivo && (
        <button
          type="submit"
          className={cn(
            'w-full inline-flex items-center justify-center gap-2 font-semibold text-white bg-whatsapp hover:bg-whatsapp-hover focus-ring-whatsapp transition-all duration-300 min-h-[52px] active:scale-[0.99]',
            isPage
              ? 'rounded-2xl px-8 py-4 text-base shadow-[0_14px_36px_-10px_rgba(37,211,102,0.45)] hover:shadow-[0_18px_40px_-8px_rgba(37,211,102,0.5)] hover:-translate-y-0.5'
              : 'rounded-xl px-8 py-4 shadow-soft hover:scale-[1.01]'
          )}
        >
          <WhatsAppIcon className="w-5 h-5 shrink-0" />
          Continuar por WhatsApp
        </button>
      )}
    </>
  );

  if (isPage) {
    return (
      <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
        <div
          className={cn(
            'flex flex-col gap-8 rounded-[28px] border border-[#e8e2da] bg-[linear-gradient(180deg,#ffffff_0%,#faf8f5_100%)] p-6 shadow-[0_28px_70px_-40px_rgba(20,16,12,0.2)] sm:p-8 md:gap-10 md:p-10',
            'ring-1 ring-black/[0.03]'
          )}
        >
          {formBody}
        </div>
      </form>
    );
  }

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
          Contanos en dos pasos y te respondemos por WhatsApp en 24hs.
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
          {formBody}
        </div>
      </motion.form>
    </Section>
  );
}