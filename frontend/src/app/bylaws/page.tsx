import React from 'react';
import { Metadata } from 'next';
import { gql } from '@apollo/client';
import { getClient } from '../../lib/apollo-client';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bylaws',
  description: 'Delaware DSA chapter bylaws and governance documents.',
};

const GET_BYLAWS_PAGE = gql`
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

export default async function Bylaws() {
  const { data } = await getClient().query({
    query: GET_BYLAWS_PAGE,
  });

  const pageContent =
    data?.page?.content ||
    `
    <p>The Delaware DSA chapter bylaws outline our governance structure, decision-making processes, and operational procedures. These bylaws were democratically approved by our membership and can only be amended through a vote of the general membership.</p>
    <p>Our bylaws reflect our commitment to democratic governance, transparency, and member-led organizing. They establish the roles and responsibilities of elected officers, committees, and the general membership.</p>
    `;

  const bylawsPdf = data?.page?.bylaws?.pdfUrl || '/documents/delaware-dsa-bylaws.pdf';
  const lastUpdated = data?.page?.bylaws?.lastUpdated || 'January 15, 2024';

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

        {/* Embedded PDF Viewer */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Bylaws Document</h2>

          <div className="aspect-[8.5/11] w-full bg-gray-100 rounded-lg overflow-hidden">
            <iframe src={bylawsPdf} className="w-full h-full" title="Delaware DSA Bylaws" />
          </div>

          <div className="mt-4 text-center text-gray-600 text-sm">
            If the document doesn&apos;t load properly, you can{' '}
            <a href={bylawsPdf} download className="text-dsa-red hover:underline">
              download the PDF directly
            </a>
            .
          </div>
        </div>

        {/* Key Governance Sections */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Key Governance Sections</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Chapter Structure</h3>
              <p className="mb-4">
                Our chapter is structured with a Steering Committee, elected officers, standing
                committees, and working groups. General membership meetings are held monthly.
              </p>
              <Link href={`${bylawsPdf}#page=2`} className="text-dsa-red hover:underline">
                Go to Chapter Structure →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Decision Making</h3>
              <p className="mb-4">
                Major decisions are made democratically through membership votes. Our chapter
                strives for consensus while recognizing the need for timely action.
              </p>
              <Link href={`${bylawsPdf}#page=4`} className="text-dsa-red hover:underline">
                Go to Decision Making →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Elections & Terms</h3>
              <p className="mb-4">
                Officers serve for two-year terms. Elections are held annually with staggered terms
                to ensure continuity of leadership and institutional knowledge.
              </p>
              <Link href={`${bylawsPdf}#page=6`} className="text-dsa-red hover:underline">
                Go to Elections & Terms →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Amendments</h3>
              <p className="mb-4">
                Bylaws can be amended through a two-thirds vote of members present at a general
                meeting, with amendments proposed at least two weeks in advance.
              </p>
              <Link href={`${bylawsPdf}#page=10`} className="text-dsa-red hover:underline">
                Go to Amendments →
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">How are bylaws amended?</h3>
              <p>
                Bylaws can be amended through a two-thirds vote of members present at a general
                meeting. Proposed amendments must be submitted to the membership at least two weeks
                before the vote.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Who can propose amendments?</h3>
              <p>
                Any DSA member in good standing can propose amendments to the bylaws. Proposals can
                be submitted to the Steering Committee, which will place them on the agenda for a
                general meeting.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">When were the bylaws last updated?</h3>
              <p>
                Our bylaws were last updated on {lastUpdated}. The changes included [description of
                recent changes or &quot;clarifications to committee structure and updates to the
                electoral process&quot;].
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">How do the bylaws relate to DSA national?</h3>
              <p>
                Our chapter bylaws complement the national DSA constitution and bylaws. In any case
                where our local bylaws conflict with national governing documents, the national
                documents take precedence.
              </p>
            </div>
          </div>
        </div>

        {/* Other Governing Documents */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Other Governing Documents</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/documents/delaware-dsa-resolutions.pdf"
              className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors block"
            >
              <svg
                className="h-12 w-12 text-dsa-red mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Resolutions</h3>
              <p>
                Important resolutions passed by our general membership that guide our chapter&apos;s
                priorities and positions.
              </p>
            </a>

            <a
              href="/documents/delaware-dsa-policies.pdf"
              className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors block"
            >
              <svg
                className="h-12 w-12 text-dsa-red mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Policies</h3>
              <p>
                Internal policies including code of conduct, conflict resolution process, and
                endorsement procedures.
              </p>
            </a>

            <a
              href="https://www.dsausa.org/constitution"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors block"
            >
              <svg
                className="h-12 w-12 text-dsa-red mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">National DSA Constitution</h3>
              <p>
                The national DSA constitution and bylaws that govern the organization as a whole and
                all its chapters.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
