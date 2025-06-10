import { NewsletterService } from '@/core/services/newsletterService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Invalid newsletter slug' },
        { status: 400 }
      );
    }

    const newsletterService = NewsletterService.getInstance();
    const newsletter = await newsletterService.getNewsletter(slug);

    if (!newsletter) {
      return NextResponse.json(
        { error: 'Newsletter not found' },
        { status: 404 }
      );
    }

    const content = await newsletterService.getNewsletterContent(newsletter);

    return NextResponse.json({
      success: true,
      data: {
        ...newsletter,
        content,
      },
    });
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
