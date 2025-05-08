import React from 'react';

export default function OtherDocuments() {
  return (
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
          href="https://www.nationaldsa.org/constitution"
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
            The national DSA constitution and bylaws that govern the organization as a whole and all
            its chapters.
          </p>
        </a>
      </div>
    </div>
  );
}
