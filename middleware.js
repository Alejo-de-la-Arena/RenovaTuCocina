import { NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const path = request.nextUrl.pathname;

  if (!url || !key) {
    if (path.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/acceso', request.url));
    }
    return NextResponse.next();
  }

  return updateSession(request);
}

export const config = {
  matcher: ['/acceso', '/admin/:path*'],
};
