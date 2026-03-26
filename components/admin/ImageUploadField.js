'use client';

import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function ImageUploadField({ label, className, onUploaded, disabled }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onChange(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError(null);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al subir');
      onUploaded?.(json.url);
    } catch (err) {
      setError(err.message || 'Error al subir');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && <p className="text-xs font-medium text-neutral-600">{label}</p>}
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-border bg-white px-4 py-2.5 text-sm font-medium text-neutral-text shadow-sm transition hover:border-primary/40 hover:bg-primary-50/40">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {loading ? 'Subiendo…' : 'Subir imagen'}
        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={onChange} disabled={disabled || loading} />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
