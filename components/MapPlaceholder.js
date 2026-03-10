'use client';

/**
 * Placeholder de mapa - se puede reemplazar por Google Maps/Mapbox cuando se tenga la ubicación real
 */
export default function MapPlaceholder() {
  return (
    <div className="h-64 md:h-80 rounded-2xl bg-neutral-soft border border-neutral-border shadow-card overflow-hidden flex items-center justify-center">
      <p className="text-neutral-muted text-sm">Mapa (pendiente de configurar ubicación)</p>
    </div>
  );
}
