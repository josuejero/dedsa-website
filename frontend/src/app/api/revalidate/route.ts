import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Removed the unsafe default fallback
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Validate that the secret exists
    if (!REVALIDATE_SECRET) {
      console.error('REVALIDATE_SECRET environment variable is not set');
      return NextResponse.json(
        { error: 'Server misconfiguration - revalidation is not available' },
        { status: 500 },
      );
    }

    const body = await request.json();
    const { path, secret, tag } = body;

    // Validate the secret token
    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    // Validate that path or tag is provided
    if (!path && !tag) {
      return NextResponse.json({ error: 'Either path or tag must be provided' }, { status: 400 });
    }

    // Revalidate the path or tag
    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        message: `Path "${path}" revalidated.`,
      });
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        tag,
        message: `Tag "${tag}" revalidated.`,
      });
    }

    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
