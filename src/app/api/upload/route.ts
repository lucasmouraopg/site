import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { v2 as cloudinary } from 'cloudinary';

const ADMIN_UUID = '7855f56b-16dc-474d-8fb8-44ef9e1072d8';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 10;

// Magic bytes — assinaturas reais dos formatos aceitos
const SIGNATURES: Record<string, number[][]> = {
  'image/jpeg': [[0xff, 0xd8, 0xff]],
  'image/png': [[0x89, 0x50, 0x4e, 0x47]],
  'image/webp': [
    [0x52, 0x49, 0x46, 0x46], // RIFF header (pos 0-3)
    // bytes 8-12 devem ser "WEBP"
  ],
  'image/gif': [[0x47, 0x49, 0x46, 0x38]], // GIF8
};

function matchesSignature(header: Uint8Array, mimeType: string): boolean {
  const sigs = SIGNATURES[mimeType];
  if (!sigs) return false;

  // WebP precisa de checagem dupla: RIFF no início + WEBP no offset 8
  if (mimeType === 'image/webp') {
    const riff = sigs[0];
    for (let i = 0; i < riff.length; i++) {
      if (header[i] !== riff[i]) return false;
    }
    // bytes 8-12 = "WEBP" (0x57 0x45 0x42 0x50)
    return (
      header[8] === 0x57 &&
      header[9] === 0x45 &&
      header[10] === 0x42 &&
      header[11] === 0x50
    );
  }

  const sig = sigs[0];
  for (let i = 0; i < sig.length; i++) {
    if (header[i] !== sig[i]) return false;
  }
  return true;
}

function detectMimeType(header: Uint8Array): string | null {
  for (const mime of Object.keys(SIGNATURES)) {
    if (matchesSignature(header, mime)) return mime;
  }
  return null;
}

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

export async function POST(request: NextRequest) {
  try {
    const { session } = await getSession(request);

    if (!session) {
      return NextResponse.json({ error: 'Nao autenticado.' }, { status: 401 });
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
        { error: `Maximo de ${MAX_FILES} arquivos por upload.` },
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

      // Ler primeiros 12 bytes para magic bytes check
      const slice = file.slice(0, 12);
      const header = new Uint8Array(await slice.arrayBuffer());
      const detectedMime = detectMimeType(header);

      if (!detectedMime) {
        return NextResponse.json(
          { error: `Tipo de arquivo nao permitido: "${file.name}". Formatos aceitos: JPG, PNG, WebP, GIF.` },
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
  } catch {
    return NextResponse.json({ error: 'Erro ao fazer upload.' }, { status: 500 });
  }
}
