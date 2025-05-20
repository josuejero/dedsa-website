import Link from 'next/link';
import leadershipSectionContent from '../../../content/ud-ydsa/leadershipSection.json';
import { LeadershipSectionContent } from '../../../types/content/ud-ydsa';

// Type assertion for imported JSON
const typedContent = leadershipSectionContent as LeadershipSectionContent;

export default function LeadershipSection() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">{typedContent.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {typedContent.leaders.map((member, index) => (
          <div key={index} className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-dsa-red text-white text-2xl font-bold">
                {member.imageInitials}
              </div>
            </div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href={typedContent.contactLinkHref}
          className="text-dsa-red hover:underline"
        >
          {typedContent.contactLinkText}
        </Link>
      </div>
    </div>
  );
}
