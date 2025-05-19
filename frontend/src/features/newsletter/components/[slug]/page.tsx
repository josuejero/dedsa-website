import { promises as fs } from 'fs';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import path from 'path';
import ErrorDisplay from '../../../components/errors/ErrorDisplay';
import { Newsletter } from '../../../types/newsletter';
import { generateStaticParams } from './generateStaticParams';
export { generateStaticParams };

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  try {
    // Read newsletters data
    const filePath = path.join(process.cwd(), 'src/data/newsletters.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const newsletters = JSON.parse(fileContents) as Newsletter[];

    const newsletter = newsletters.find((n: Newsletter) => n.slug === slug);

    if (!newsletter) {
      return {
        title: 'Newsletter Not Found',
        description: 'The requested newsletter could not be found.',
      };
    }

    return {
      title: newsletter.title,
      description: newsletter.excerpt,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Delaware DSA Newsletter',
      description: 'Latest news from Delaware DSA',
    };
  }
}

export default async function NewsletterSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  try {
    // Read newsletters data
    const filePath = path.join(process.cwd(), 'src/data/newsletters.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const newsletters = JSON.parse(fileContents) as Newsletter[];

    const newsletter = newsletters.find((n: Newsletter) => n.slug === slug);

    if (!newsletter) {
      return notFound();
    }

    // Read the full HTML content
    const fullContentPath = path.join(
      process.cwd(),
      'public',
      newsletter.fullContentPath
    );
    const fullContent = await fs.readFile(fullContentPath, 'utf-8');

    return (
      <div className="bg-gray-100 py-12">
        <div className="container-page">
          <div className="mb-6">
            <Link href="/newsletter" className="text-dsa-red hover:underline">
              ← Back to Newsletter List
            </Link>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md mb-6">
            <h1 className="text-4xl font-bold mb-4">{newsletter.title}</h1>
            <p className="text-gray-600 mb-6">
              {new Date(newsletter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <div className="newsletter-container">
              <iframe
                srcDoc={fullContent}
                style={{
                  width: '100%',
                  height: '800px',
                  border: 'none',
                  overflow: 'auto',
                }}
                title={newsletter.title}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return (
      <ErrorDisplay
        title="Error Loading Newsletter"
        message="We're having trouble loading this newsletter. Please try again later."
        error={errorMessage}
        actionLabel="Return to Newsletter List"
        actionHref="/newsletter"
      />
    );
  }
}
