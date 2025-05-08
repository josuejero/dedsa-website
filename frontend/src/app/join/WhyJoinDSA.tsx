import React from 'react';

export default function WhyJoinDSA() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-12">
      <h2 className="text-3xl font-bold mb-6">Why Join DSA?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2">Build Community</h3>
          <p>
            Connect with like-minded individuals committed to social and economic justice. Develop
            relationships with fellow organizers and build solidarity across movements.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
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
              d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2">Learn and Grow</h3>
          <p>
            Participate in political education and skill-building workshops. Develop your organizing
            skills and deepen your understanding of socialist politics and strategy.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
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
              d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2">Take Action</h3>
          <p>
            Join campaigns for Medicare for All, Green New Deal, housing justice, and labor
            organizing. Make a tangible difference in the lives of working people in Delaware.
          </p>
        </div>
      </div>
    </div>
  );
}
