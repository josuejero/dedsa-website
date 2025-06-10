// frontend/src/app/api/newsletters/[slug]/route.ts
import fs from 'fs/promises';
import { NextRequest } from 'next/server';
import path from 'path';

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const filePath = path.join(
    process.cwd(),
    'public/newsletters',
    `${slug}.html`
  );
  try {
    const html = await fs.readFile(filePath, 'utf-8');
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
