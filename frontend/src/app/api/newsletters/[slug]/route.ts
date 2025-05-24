import { Newsletter } from '@/core/types/index';
import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Read newsletters data from JSON file
    const filePath = path.join(process.cwd(), 'src/data/newsletters.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const newsletters = JSON.parse(fileContents) as Newsletter[];

    // Find the newsletter by slug
    const newsletter = newsletters.find((n) => n.slug === slug);

    if (!newsletter) {
      return NextResponse.json(
        { error: 'Newsletter not found' },
        { status: 404 }
      );
    }

    // If there's a fullContentPath, try to read the HTML content
    if (newsletter.fullContentPath) {
      try {
        const htmlPath = path.join(
          process.cwd(),
          'public',
          newsletter.fullContentPath
        );
        const htmlContent = await fs.readFile(htmlPath, 'utf8');
        newsletter.content = htmlContent;
      } catch (htmlError) {
        console.warn('Could not read HTML content:', htmlError);
        // Keep the existing content from JSON
      }
    }

    return NextResponse.json(newsletter);
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter' },
      { status: 500 }
    );
  }
}
