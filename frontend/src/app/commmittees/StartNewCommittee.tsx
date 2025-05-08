import React from 'react';
import Link from 'next/link';

export default function StartNewCommittee() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Starting a New Committee or Working Group</h2>

      <p className="mb-4">
        Have an idea for a new committee or working group? Delaware DSA encourages member
        initiative!
      </p>

      <p className="mb-6">
        To propose a new committee or working group, prepare a brief proposal outlining:
      </p>

      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>The focus and goals of the committee</li>
        <li>How it aligns with our chapter priorities</li>
        <li>Initial campaigns or projects</li>
        <li>Resources needed</li>
      </ul>

      <p className="mb-6">
        Submit your proposal to the Steering Committee, who will review it and potentially bring it
        to a general membership meeting for discussion and approval.
      </p>

      <Link href="/contact" className="btn btn-primary">
        Contact the Steering Committee
      </Link>
    </div>
  );
}
