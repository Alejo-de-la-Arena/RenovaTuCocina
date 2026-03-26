import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { STORAGE_BUCKET } from '@/lib/projects/constants';

export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string' || !file.size) {
    return NextResponse.json({ error: 'Archivo requerido' }, { status: 400 });
  }

  const ext = file.name?.split('.').pop()?.toLowerCase() || 'jpg';
  const safeName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(safeName, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(safeName);

  return NextResponse.json({ url: publicUrl });
}
