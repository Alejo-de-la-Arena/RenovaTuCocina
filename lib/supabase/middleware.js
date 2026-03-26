import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin') && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/acceso';
    url.searchParams.set('next', path);
    return NextResponse.redirect(url);
  }

  if (path === '/acceso' && user) {
    const next = request.nextUrl.searchParams.get('next');
    const url = request.nextUrl.clone();
    url.pathname = next && next.startsWith('/admin') ? next : '/admin';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
