// src/app/bylaws/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import json from '../../content/bylaws/page.json';
import BylawsDocument from './BylawsDocument';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import KeyGovernanceSections from './KeyGovernanceSections';
import OtherDocuments from './OtherDocuments';

export const dynamic = 'force-dynamic';
export const revalidate = 300;
export const metadata: Metadata = {
  title: 'Bylaws',
  description: 'Chapter bylaws and governance.',
};

const j = json as {
  title: string;
  fallbackContent: string;
  currentVersionLabel: string;
  lastUpdatedLabel: string;
  downloadButtonText: string;
};
const Q = `query{page(id:"bylaws",idType:URI){content,bylaws{pdfUrl,lastUpdated}}}`;

export default async function BylawsPage() {
  const ep =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'http://delaware-dsa-backend.local/graphql';

  try {
    const res = await fetch(ep, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      body: JSON.stringify({ query: Q }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const pg = (await res.json()).data.page;
    if (!pg) return notFound();

    const html = pg.content ?? j.fallbackContent;
    const pdf = pg.bylaws?.pdfUrl ?? '/documents/delaware-dsa-bylaws.pdf';
    const lu = pg.bylaws?.lastUpdated ?? 'January 15, 2024';

    return (
      <div className="bg-gray-100 py-12">
        <div className="container-page">
          <h1 className="text-4xl font-bold mb-4">{j.title}</h1>

          <div
            className="bg-white p-8 rounded-lg shadow-md mb-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="flex justify-between bg-gray-50 p-4 rounded-lg mb-6">
            <p className="font-medium">
              {j.currentVersionLabel}{' '}
              <span className="text-gray-600">
                {j.lastUpdatedLabel} {lu}
              </span>
            </p>
            <a
              href={pdf}
              download
              className="btn btn-primary flex items-center"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {j.downloadButtonText}
            </a>
          </div>

          <BylawsDocument bylawsPdf={pdf} />
          <KeyGovernanceSections bylawsPdf={pdf} />
          <FrequentlyAskedQuestions lastUpdated={lu} />
          <OtherDocuments />
        </div>
      </div>
    );
  } catch (error: unknown) {
    console.error('Bylaws fetch error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return (
      <ErrorDisplay
        title="Error Loading Bylaws"
        message="We're having trouble loading this page. Please try again later."
        error={msg}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }
}
