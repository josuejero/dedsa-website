// frontend/src/app/api/newsletters/route.ts
import fs from 'fs/promises';
import { JSDOM } from 'jsdom';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'public/newsletters');
    const files = await fs.readdir(dir);

    const newsletters = await Promise.all(
      files
        .filter((f) => f.endsWith('.html'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.html$/, '');
          const filePath = path.join(dir, fileName);
          const html = await fs.readFile(filePath, 'utf-8');

          // parse <title>, <time datetime="...">, and first <p> as excerpt
          const dom = new JSDOM(html);
          const doc = dom.window.document;
          const title = doc.querySelector('h1')?.textContent?.trim() || slug;
          const timeEl = doc.querySelector('time[datetime]');
          const date = timeEl
            ? timeEl.getAttribute('datetime')!
            : new Date().toISOString();
          const firstP = doc.querySelector('p');
          const excerpt = firstP ? firstP.textContent!.slice(0, 200) + '…' : '';

          return {
            id: slug,
            title,
            date,
            slug,
            excerpt,
            htmlPath: `/newsletters/${fileName}`,
          };
        })
    );

    // sort by date descending
    newsletters.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    return NextResponse.json(newsletters);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to load newsletters' },
      { status: 500 }
    );
  }
}
