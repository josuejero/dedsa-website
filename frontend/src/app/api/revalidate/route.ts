import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';


const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'DEFAULT_SECRET_CHANGE_ME';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, secret, tag } = body;

    
    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    
    if (!path && !tag) {
      return NextResponse.json({ error: 'Either path or tag must be provided' }, { status: 400 });
    }

    
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
