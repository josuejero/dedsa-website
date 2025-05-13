import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import BylawsDocument from './BylawsDocument';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import KeyGovernanceSections from './KeyGovernanceSections';
import OtherDocuments from './OtherDocuments';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Bylaws',
  description: 'Delaware DSA chapter bylaws and governance documents.',
};

// ISR: Revalidate this page every 5 minutes
export const revalidate = 300;

// GraphQL query string
const GET_BYLAWS_PAGE = `
  query GetBylawsPage {
    page(id: "bylaws", idType: URI) {
      content
      bylaws {
        pdfUrl
        lastUpdated
      }
    }
  }
`;

interface BylawsPageData {
  page?: {
    content?: string | null;
    bylaws?: {
      pdfUrl?: string | null;
      lastUpdated?: string | null;
    } | null;
  } | null;
}

export default async function BylawsPage() {
  const endpoint =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'http://delaware-dsa-backend.local/graphql';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      body: JSON.stringify({ query: GET_BYLAWS_PAGE }),
    });

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }

    const json = await res.json();
    const data = (json.data ?? {}) as BylawsPageData;

    // If there's no page data, render 404
    if (!data.page) {
      return notFound();
    }

    const pageContent =
      data.page.content ??
      `
      <p>The Delaware DSA chapter bylaws outline our governance structure, decision-making processes, and operational procedures. These bylaws were democratically approved by our membership and can only be amended through a vote of the general membership.</p>
      <p>Our bylaws reflect our commitment to democratic governance, transparency, and member-led organizing. They establish the roles and responsibilities of elected officers, committees, and the general membership.</p>
    `;

    const bylawsPdf =
      data.page.bylaws?.pdfUrl || '/documents/delaware-dsa-bylaws.pdf';
    const lastUpdated = data.page.bylaws?.lastUpdated || 'January 15, 2024';

    return (
      <div className="bg-gray-100 py-12">
        <div className="container-page">
          <h1 className="text-4xl font-bold mb-4">Delaware DSA Bylaws</h1>

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div
              className="prose prose-lg max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-4 rounded-lg mb-6">
              <div>
                <p className="font-medium">
                  Current Version:{' '}
                  <span className="text-gray-600">
                    Last updated {lastUpdated}
                  </span>
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <a
                  href={bylawsPdf}
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
                  Download PDF
                </a>
              </div>
            </div>
          </div>

          <BylawsDocument bylawsPdf={bylawsPdf} />
          <KeyGovernanceSections bylawsPdf={bylawsPdf} />
          <FrequentlyAskedQuestions lastUpdated={lastUpdated} />
          <OtherDocuments />
        </div>
      </div>
    );
  } catch (err: unknown) {
    console.error('Bylaws fetch error:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);

    return (
      <ErrorDisplay
        title="Error Loading Bylaws"
        message="We're having trouble loading this page. Please try again later."
        error={errorMessage}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }
}
