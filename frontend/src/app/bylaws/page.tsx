import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getClient } from '../../lib/apollo-client';
import BylawsDocument from './BylawsDocument';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import KeyGovernanceSections from './KeyGovernanceSections';
import OtherDocuments from './OtherDocuments';
import { GET_BYLAWS_PAGE } from './queries';

export const metadata: Metadata = {
  title: 'Bylaws',
  description: 'Delaware DSA chapter bylaws and governance documents.'
};

export default async function Bylaws() {
  let result;
  try {
    result = await getClient().query({
      query: GET_BYLAWS_PAGE
    });
    console.log('Bylaws query raw result:', result);
  } catch (err) {
    console.error('Apollo query failed:', err);
    result = {};
  }

  const page = result?.data?.page;
  if (!page) {
    console.error('Bylaws page data not found');
    notFound();
  }

  const pageContent =
    page.content ||
    `
    <p>The Delaware DSA chapter bylaws outline our governance structure, decision-making processes, and operational procedures. These bylaws were democratically approved by our membership and can only be amended through a vote of the general membership.</p>
    <p>Our bylaws reflect our commitment to democratic governance, transparency, and member-led organizing. They establish the roles and responsibilities of elected officers, committees, and the general membership.</p>
  `;

  const bylawsPdf = page.bylaws?.pdfUrl || '/documents/delaware-dsa-bylaws.pdf';
  const lastUpdated = page.bylaws?.lastUpdated || 'January 15, 2024';

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
                Current Version: <span className="text-gray-600">Last updated {lastUpdated}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <a href={bylawsPdf} download className="btn btn-primary flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
}
