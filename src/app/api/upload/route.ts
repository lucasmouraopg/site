import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { v2 as cloudinary } from 'cloudinary';

const ADMIN_UUID = '7855f56b-16dc-474d-8fb8-44ef9e1072d8';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 10;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getSession(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );
  const { data: { session } } = await supabase.auth.getSession();
  return { session, supabase };
}

function validateFileType(file: File): boolean {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return false;
  }
  const name = file.name.toLowerCase();
  return ALLOWED_EXTENSIONS.some(ext => name.endsWith(ext));
}

export async function POST(request: NextRequest) {
  try {
    const { session } = await getSession(request);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
    }

    if (session.user.id !== ADMIN_UUID) {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Máximo de ${MAX_FILES} arquivos por upload.` },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `Arquivo "${file.name}" excede o limite de ${MAX_FILE_SIZE / 1024 / 1024}MB.` },
          { status: 400 }
        );
      }

      if (!validateFileType(file)) {
        return NextResponse.json(
          { error: `Tipo de arquivo não permitido: "${file.name}". Use apenas imagens (JPG, PNG, WebP, GIF).` },
          { status: 400 }
        );
      }
    }

    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise<{ url: string; width: number; height: number }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'lucasmourao/galeria',
            resource_type: 'image',
            transformation: [{ quality: 'auto', fetch_format: 'auto' }],
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error('Upload failed'));
            } else {
              resolve({
                url: result.secure_url,
                width: result.width,
                height: result.height,
              });
            }
          }
        );
        uploadStream.end(buffer);
      });
    });

    const results = await Promise.all(uploadPromises);
    return NextResponse.json({ photos: results });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Erro ao fazer upload.' }, { status: 500 });
  }
}
