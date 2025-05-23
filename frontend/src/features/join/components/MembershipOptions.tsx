import Link from 'next/link';
import membershipOptionsData from '@/features/join/content/join.json';
import { MembershipOptionsContent } from '@/features/join/types';

// Type assertion for imported JSON
const typedContent =
  membershipOptionsData.membershipOptions as MembershipOptionsContent;

export default function MembershipOptions() {
  const { dsaMembership, duesWaiver } = typedContent;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* DSA Membership Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">{dsaMembership.title}</h2>
          <p className="text-lg">{dsaMembership.subtitle}</p>
        </div>
        <div className="p-6">
          <ul className="space-y-4 mb-6">
            {dsaMembership.benefits.map((benefit, index) => (
              <li key={index} className="flex">
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
                <span dangerouslySetInnerHTML={{ __html: benefit }} />
              </li>
            ))}
          </ul>
          <a
            href={dsaMembership.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn btn-primary text-center block"
          >
            {dsaMembership.buttonText}
          </a>
        </div>
      </div>

      {/* Dues Waiver Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">{duesWaiver.title}</h2>
          <p className="text-lg">{duesWaiver.subtitle}</p>
        </div>
        <div className="p-6">
          {duesWaiver.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
          <Link
            href={duesWaiver.buttonUrl}
            className="w-full btn btn-primary text-center block"
          >
            {duesWaiver.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
