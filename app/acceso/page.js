import { Suspense } from 'react';
import LoginForm from '@/components/admin/LoginForm';
import { isSupabaseConfigured } from '@/lib/env';

function LoginFallback() {
  return (
    <div className="min-h-[200px] flex items-center justify-center text-neutral-muted text-sm" aria-busy="true">
      Cargando…
    </div>
  );
}

export default function AccesoPage() {
  const configured = isSupabaseConfigured();

  return (
    <div className="min-h-screen bg-[#f4f2ee] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-neutral-border/80 bg-white p-8 md:p-10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
        <div className="mb-8 text-center">
          <p className="font-serif text-2xl font-semibold text-neutral-text tracking-tight">Panel MDV</p>
          <p className="text-sm text-neutral-muted mt-2">Acceso exclusivo para administradores</p>
        </div>

        {!configured ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <p className="font-medium">Supabase no está configurado</p>
            <p className="mt-2 text-amber-900/90">
              Definí <code className="text-xs bg-white/80 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> y{' '}
              <code className="text-xs bg-white/80 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en{' '}
              <code className="text-xs bg-white/80 px-1 rounded">.env.local</code> y reiniciá el servidor.
            </p>
          </div>
        ) : (
          <Suspense fallback={<LoginFallback />}>
            <LoginForm />
          </Suspense>
        )}
      </div>
      <p className="mt-8 text-xs text-neutral-muted text-center max-w-sm">
        Si llegaste aquí por error, volvé al{' '}
        <a href="/" className="text-primary hover:underline">
          sitio público
        </a>
        .
      </p>
    </div>
  );
}
