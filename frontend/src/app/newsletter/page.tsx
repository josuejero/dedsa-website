import { promises as fs } from 'fs';
import { Metadata } from 'next';
import Link from 'next/link';
import path from 'path';
import ErrorDisplay from '../../components/errors/ErrorDisplay';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Latest updates from Delaware DSA',
};

export default async function NewsletterPage() {
  try {
    // Read newsletters data from JSON file
    const filePath = path.join(process.cwd(), 'src/data/newsletters.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const newsletters = JSON.parse(fileContents);

    return (
      <div className="bg-gray-100 py-12">
        <div className="container-page py-12">
          <h1 className="text-4xl font-bold mb-8">Newsletter</h1>

          {newsletters.length > 0 ? (
            <div className="space-y-8">
              {newsletters.map((newsletter) => (
                <div
                  key={newsletter.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h2 className="text-2xl font-bold mb-2">
                    <Link
                      href={`/newsletter/${newsletter.slug}`}
                      className="text-dsa-red hover:underline"
                    >
                      {newsletter.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {new Date(newsletter.date).toLocaleDateString()}
                  </p>
                  <div className="mb-4">{newsletter.excerpt}</div>
                  <Link
                    href={`/newsletter/${newsletter.slug}`}
                    className="text-dsa-red font-medium hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </div>
    );
  } catch (err) {
    console.error('Error fetching newsletters:', err);
    return (
      <ErrorDisplay
        title="Error Loading Newsletter"
        message="We're having trouble loading the newsletter. Please try again later."
        error={err.message}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }
}
