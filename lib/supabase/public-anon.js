import { createClient } from '@supabase/supabase-js';

/**
 * Cliente sin sesión: las consultas públicas respetan RLS como rol `anon`
 * (no expone borradores a visitantes aunque haya cookie de admin en el mismo navegador).
 */
export function createPublicAnonClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
