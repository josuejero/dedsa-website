import Link from 'next/link';
import keyGovernanceContent from '../../../content/bylaws/keyGovernanceSections.json';
import { KeyGovernanceSectionsContent } from '../../../types/content/bylaws';

// Type assertion for the imported JSON
const typedKeyGovernanceContent =
  keyGovernanceContent as KeyGovernanceSectionsContent;

interface KeyGovernanceSectionsProps {
  bylawsPdf: string;
}

export default function KeyGovernanceSections({
  bylawsPdf,
}: KeyGovernanceSectionsProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">
        {typedKeyGovernanceContent.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {typedKeyGovernanceContent.sections.map((section, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">{section.title}</h3>
            <p className="mb-4">{section.description}</p>
            <Link
              href={`${bylawsPdf}#${section.pageLink}`}
              className="text-dsa-red hover:underline"
            >
              {section.linkText} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
