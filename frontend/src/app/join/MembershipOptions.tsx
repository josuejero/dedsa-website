import React from 'react';
import Link from 'next/link';

export default function MembershipOptions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* DSA Membership Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">DSA Membership</h2>
          <p className="text-lg">Join the national Democratic Socialists of America</p>
        </div>
        <div className="p-6">
          <ul className="space-y-4 mb-6">
            <li className="flex">
              <svg
                className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>National membership</strong> with automatic Delaware chapter membership
              </span>
            </li>
            <li className="flex">
              <svg
                className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>Sliding scale dues</strong> based on income ($27-$130 annually)
              </span>
            </li>
            <li className="flex">
              <svg
                className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>Publications</strong> including the Democratic Left magazine
              </span>
            </li>
            <li className="flex">
              <svg
                className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>Voting rights</strong> in Delaware DSA chapter decisions
              </span>
            </li>
            <li className="flex">
              <svg
                className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>Full participation</strong> in national and local campaigns
              </span>
            </li>
          </ul>
          <a
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn btn-primary text-center block"
          >
            Join DSA
          </a>
        </div>
      </div>

      {/* Dues Waiver Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">Dues Waiver Program</h2>
          <p className="text-lg">Financial assistance for membership dues</p>
        </div>
        <div className="p-6">
          <p className="mb-4">
            We believe that financial circumstances should never be a barrier to joining DSA. Our
            dues waiver program provides options for those who cannot afford the standard membership
            dues.
          </p>
          <p className="mb-4">
            DSA offers reduced dues options starting at $1/month for those experiencing financial
            hardship. Delaware DSA can also sponsor memberships for those who cannot afford any dues
            at all.
          </p>
          <p className="mb-6">
            To request a dues waiver or sponsorship from Delaware DSA, please contact us using the
            button below.
          </p>
          <Link
            href="/contact?subject=Dues%20Waiver"
            className="w-full btn btn-primary text-center block"
          >
            Request Dues Waiver
          </Link>
        </div>
      </div>
    </div>
  );
}
