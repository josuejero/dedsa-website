import { ApolloError } from '@apollo/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import { getClient } from '../../lib/apollo-client';
import BylawsDocument from './BylawsDocument';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import KeyGovernanceSections from './KeyGovernanceSections';
import OtherDocuments from './OtherDocuments';
import { GET_BYLAWS_PAGE } from './queries';

export const metadata: Metadata = {
  title: 'Bylaws',
  description: 'Delaware DSA chapter bylaws and governance documents.',
};

interface BylawsPageData {
  page?: {
    content?: string | null;
    bylaws?: {
      pdfUrl?: string | null;
      lastUpdated?: string | null;
    } | null;
  } | null;
}

export default async function Bylaws() {
  let data: BylawsPageData = { page: null };

  try {
    const result = await getClient().query<BylawsPageData>({
      query: GET_BYLAWS_PAGE,
    });
    data = result.data;

    // Render 404 if page doesn't exist
    if (!data?.page) {
      return notFound();
    }

    const pageContent =
      data.page.content ||
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
  } catch (error) {
    console.error('Bylaws query error:', error);

    // Different error handling based on error type
    if (error instanceof ApolloError) {
      if (error.networkError) {
        return (
          <ErrorDisplay
            title="Network Error"
            message="We're having trouble connecting to our servers. Please check your internet connection and try again."
            error={error}
            actionLabel="Return to Home"
            actionHref="/"
          />
        );
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        return (
          <ErrorDisplay
            title="Data Error"
            message="There was a problem loading the bylaws data. Our team has been notified."
            error={error.graphQLErrors[0]}
            showDetails={process.env.NODE_ENV === 'development'}
            actionLabel="Return to Home"
            actionHref="/"
          />
        );
      }
    }

    // Generic error fallback
    return (
      <ErrorDisplay
        title="Error Loading Bylaws"
        message="We're having trouble loading this page. Please try again later."
        error={error}
        showDetails={process.env.NODE_ENV === 'development'}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }
}
