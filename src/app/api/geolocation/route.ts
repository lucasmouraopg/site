import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0]?.trim() || realIp || '';

  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
    return NextResponse.json({ city: null, region: null, country: null });
  }

  try {
    const res = await fetch(`https://ip-api.com/json/${ip}?fields=status,country,regionName,city`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ city: null, region: null, country: null });
    }

    const data = await res.json();

    if (data.status !== 'success' || data.country !== 'Brazil') {
      return NextResponse.json({ city: null, region: null, country: null });
    }

    return NextResponse.json({
      city: data.city || null,
      region: data.regionName || null,
      country: data.country || null,
    });
  } catch {
    return NextResponse.json({ city: null, region: null, country: null });
  }
}
