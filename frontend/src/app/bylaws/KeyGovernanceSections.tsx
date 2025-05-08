import React from 'react';
import Link from 'next/link';

interface KeyGovernanceSectionsProps {
  bylawsPdf: string;
}

export default function KeyGovernanceSections({ bylawsPdf }: KeyGovernanceSectionsProps) {
  return (
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
            Major decisions are made democratically through membership votes. Our chapter strives
            for consensus while recognizing the need for timely action.
          </p>
          <Link href={`${bylawsPdf}#page=4`} className="text-dsa-red hover:underline">
            Go to Decision Making →
          </Link>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">Elections & Terms</h3>
          <p className="mb-4">
            Officers serve for two-year terms. Elections are held annually with staggered terms to
            ensure continuity of leadership and institutional knowledge.
          </p>
          <Link href={`${bylawsPdf}#page=6`} className="text-dsa-red hover:underline">
            Go to Elections & Terms →
          </Link>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">Amendments</h3>
          <p className="mb-4">
            Bylaws can be amended through a two-thirds vote of members present at a general meeting,
            with amendments proposed at least two weeks in advance.
          </p>
          <Link href={`${bylawsPdf}#page=10`} className="text-dsa-red hover:underline">
            Go to Amendments →
          </Link>
        </div>
      </div>
    </div>
  );
}
