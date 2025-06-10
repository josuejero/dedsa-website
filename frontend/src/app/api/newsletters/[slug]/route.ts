// src/app/api/newsletters/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Mock newsletter data - replace with your actual data source
const newsletters = {
  'march-2024': {
    id: 'march-2024',
    title: 'Delaware DSA March 2024 Newsletter',
    date: '2024-03-01',
    content: 'March newsletter content...',
    author: 'Delaware DSA Communications Committee',
    excerpt:
      'Updates on our organizing efforts, upcoming events, and member spotlights.',
  },
  'february-2024': {
    id: 'february-2024',
    title: 'Delaware DSA February 2024 Newsletter',
    date: '2024-02-01',
    content: 'February newsletter content...',
    author: 'Delaware DSA Communications Committee',
    excerpt:
      'Building momentum in the new year with exciting campaigns and actions.',
  },
  latest: {
    id: 'latest',
    title: 'Delaware DSA Latest Newsletter',
    date: '2024-06-01',
    content: 'Latest newsletter content...',
    author: 'Delaware DSA Communications Committee',
    excerpt: 'Our most recent updates and upcoming activities.',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await the params since they're now async in Next.js 15
    const { slug } = await params;

    // Validate slug
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Invalid newsletter slug' },
        { status: 400 }
      );
    }

    // Get newsletter data
    const newsletter = newsletters[slug as keyof typeof newsletters];

    if (!newsletter) {
      return NextResponse.json(
        { error: 'Newsletter not found' },
        { status: 404 }
      );
    }

    // Return newsletter data
    return NextResponse.json({
      success: true,
      data: newsletter,
    });
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Add other HTTP methods if needed
export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const newsletter = newsletters[slug as keyof typeof newsletters];

    if (!newsletter) {
      return new NextResponse(null, { status: 404 });
    }

    return new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': newsletter.date,
      },
    });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
