import fs from 'fs';
import path from 'path';
import { Newsletter } from '../../../types/newsletter';

export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/newsletters.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const newsletters = JSON.parse(fileContents) as Newsletter[];

    return newsletters.map((newsletter: Newsletter) => ({
      slug: newsletter.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ slug: 'placeholder' }];
  }
}
