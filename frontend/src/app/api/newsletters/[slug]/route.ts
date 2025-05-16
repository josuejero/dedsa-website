import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
import newslettersData from '../../../../data/newsletters.json';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const newsletter = newslettersData.find((n) => n.slug === slug);

  if (!newsletter) {
    return NextResponse.json(
      { error: 'Newsletter not found' },
      { status: 404 }
    );
  }

  try {
    // Read the full HTML content
    const fullContentPath = path.join(
      process.cwd(),
      'public',
      newsletter.fullContentPath
    );
    const fullContent = fs.readFileSync(fullContentPath, 'utf-8');

    return NextResponse.json({
      ...newsletter,
      fullContent,
    });
  } catch (error) {
    console.error('Error reading newsletter content:', error);
    return NextResponse.json(
      { error: 'Error reading newsletter content' },
      { status: 500 }
    );
  }
}
