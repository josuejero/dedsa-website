import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
import { Newsletter } from '../../../types/newsletter/index';

export async function GET() {
  try {
    // Read newsletters data from JSON file
    const filePath = path.join(process.cwd(), 'src/data/newsletters.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const newsletters = JSON.parse(fileContents) as Newsletter[];

    return NextResponse.json(newsletters);
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletters' },
      { status: 500 }
    );
  }
}
