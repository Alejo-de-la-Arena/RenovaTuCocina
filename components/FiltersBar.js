'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const tipoOptions = [
  { value: 'L', label: 'En L' },
  { value: 'U', label: 'En U' },
  { value: 'lineal', label: 'Lineal' },
  { value: 'isla', label: 'Con isla' },
];

const materialOptions = [
  { value: 'melamina', label: 'Melamina' },
  { value: 'laqueado', label: 'Laqueado' },
  { value: 'MDF', label: 'MDF' },
  { value: 'cuarzo', label: 'Cuarzo' },
  { value: 'compacto', label: 'Compacto' },
  { value: 'granito', label: 'Granito' },
];

function getLabel(value, options) {
  const opt = options.find((o) => o.value === value);
  return opt ? opt.label : value;
}

export default function FiltersBar({ onFilter, anos }) {
  const [search, setSearch] = useState('');
  const [tipo, setTipo] = useState('');
  const [material, setMaterial] = useState('');
  const [ano, setAno] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCount = [search, tipo, material, ano].filter(Boolean).length;

  const emit = (overrides = {}) => {
    const next = {
      search: overrides.search ?? search,
      tipo: overrides.tipo ?? tipo,
      material: overrides.material ?? material,
      ano: overrides.ano ?? ano,
    };
    onFilter?.(next);
  };

  const handleSearchChange = (e) => {
    const v = e.target.value;
    setSearch(v);
    emit({ search: v });
  };

  const handleTipoChange = (e) => {
    const v = e.target.value;
    setTipo(v);
    emit({ tipo: v });
  };

  const handleMaterialChange = (e) => {
    const v = e.target.value;
    setMaterial(v);
    emit({ material: v });
  };

  const handleAnoChange = (e) => {
    const v = e.target.value;
    setAno(v);
    emit({ ano: v });
  };

  const clearFilters = () => {
    setSearch('');
    setTipo('');
    setMaterial('');
    setAno('');
    onFilter?.({ search: '', tipo: '', material: '', ano: '' });
    setMobileOpen(false);
  };

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const chips = [];
  if (search) chips.push({ key: 'search', label: `"${search}"`, onRemove: () => { setSearch(''); emit({ search: '' }); } });
  if (tipo) chips.push({ key: 'tipo', label: getLabel(tipo, tipoOptions), onRemove: () => { setTipo(''); emit({ tipo: '' }); } });
  if (material) chips.push({ key: 'material', label: getLabel(material, materialOptions), onRemove: () => { setMaterial(''); emit({ material: '' }); } });
  if (ano) chips.push({ key: 'ano', label: ano, onRemove: () => { setAno(''); emit({ ano: '' }); } });

  const inputBase = 'h-11 px-4 rounded-2xl border border-neutral-border/90 bg-white/95 text-sm text-neutral-text placeholder-neutral-muted shadow-[0_8px_24px_-20px_rgba(0,0,0,0.45)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/70 focus-visible:ring-2';
  const selectBase = 'h-11 px-4 rounded-2xl border border-neutral-border/90 bg-white/95 text-sm text-neutral-text min-w-0 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.45)] transition-all cursor-pointer appearance-none bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center] pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/70 focus-visible:ring-2';
  const searchInput = (
    <div className="relative flex-1 min-w-0 max-w-[220px] md:max-w-[200px] proyectos-filters-search">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-muted pointer-events-none" />
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleSearchChange}
        className={`w-full pl-10 pr-4 ${inputBase}`}
        aria-label="Buscar proyectos"
      />
    </div>
  );

  const filtersContent = (
    <>
      {searchInput}
      <select id="filter-tipo" value={tipo} onChange={handleTipoChange} className={`w-full md:w-36 ${selectBase}`} aria-label="Filtrar por tipo" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")" }}>
        <option value="">Tipo</option>
        {tipoOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <select id="filter-material" value={material} onChange={handleMaterialChange} className={`w-full md:w-36 ${selectBase}`} aria-label="Filtrar por material" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")" }}>
        <option value="">Material</option>
        {materialOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <select id="filter-ano" value={ano} onChange={handleAnoChange} className={`w-full md:w-28 ${selectBase}`} aria-label="Filtrar por año" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")" }}>
        <option value="">Año</option>
        {(anos || [2024, 2023, 2022]).map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </>
  );

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-neutral-border/80 bg-[#fbfaf8] p-3 md:p-4">
      {/* Desktop: una fila compacta y alineada */}
      <div className="hidden md:flex md:items-center md:gap-3 md:flex-wrap">
        {filtersContent}
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="h-11 px-4 text-sm font-medium text-neutral-muted hover:text-primary transition-colors rounded-2xl hover:bg-primary-50"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Mobile: botón Filtrar + panel */}
      <div className="md:hidden flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className={cn(
            'inline-flex items-center gap-2 h-11 px-4 rounded-2xl border border-neutral-border bg-white font-medium text-neutral-text shadow-[0_8px_20px_-16px_rgba(0,0,0,0.45)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25',
            activeCount > 0 && 'border-primary-200 bg-primary-50 text-primary'
          )}
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filtrar
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-neutral-muted hover:text-neutral-text"
          >
            Limpiar
          </button>
        )}
      </div>
      </div>

      {/* Chips de filtros activos — compactos y finos */}
      <AnimatePresence>
        {chips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {chips.map((c) => (
              <motion.span
                key={c.key}
                layout
                className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg bg-neutral-soft text-neutral-text text-xs font-medium border border-neutral-border/80"
              >
                {c.label}
                <button
                  type="button"
                  onClick={c.onRemove}
                  className="p-1 rounded-md hover:bg-neutral-soft-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  aria-label={`Quitar ${c.label}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sheet/Drawer mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              aria-hidden
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-neutral-border">
                <h3 className="font-serif text-lg font-semibold text-neutral-text">Filtros</h3>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-neutral-soft"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-4 overflow-auto [&_.proyectos-filters-search]:max-w-none">
                {filtersContent}
              </div>
              <div className="p-4 border-t border-neutral-border flex gap-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex-1 py-3 rounded-xl border border-neutral-border font-medium text-neutral-muted hover:bg-neutral-soft"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover"
                >
                  Ver resultados
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
