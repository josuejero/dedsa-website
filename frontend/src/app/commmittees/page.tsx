import { Metadata } from 'next';
import CommitteeCard from './CommitteeCard';
import HowToGetInvolved from './HowToGetInvolved';
import StartNewCommittee from './StartNewCommittee';
import { Committee } from './types';

interface CommitteeNode {
  id: string;
  title: string;
  content: string;
  committee?: {
    contactEmail?: string;
    meetingSchedule?: string;
    memberCount?: number;
  };
}

export const metadata: Metadata = {
  title: 'Committees & Working Groups',
  description: "Learn about Delaware DSA's committees and working groups and how to get involved.",
};

export default async function Committees() {
  const data: { page?: { content: string }; committees?: { nodes: CommitteeNode[] } } = {};
  const pageContent =
    data?.page?.content ||
    `
    <p>Delaware DSA's work happens through our committees and working groups. These are where members come together to organize around specific issues, campaigns, and chapter operations.</p>
    <p>We encourage all members to join at least one committee or working group. This is the best way to get involved and make meaningful contributions to our chapter's work.</p>
  `;

  let committees: Committee[] =
    data?.committees?.nodes?.map((node: CommitteeNode) => ({
      id: node.id,
      name: node.title,
      description: node.content,
      contact: node.committee?.contactEmail || '',
      meetingSchedule: node.committee?.meetingSchedule || '',
      members: node.committee?.memberCount || 0,
    })) || [];

  // Fallback data if no committees are returned from the API
  if (committees.length === 0) {
    committees = [
      {
        id: 'mutual-aid',
        name: 'Mutual Aid',
        description:
          '<p>Our Mutual Aid Committee works to build community resilience through direct support and solidarity. Projects include community fridges, housing assistance, and skill-sharing programs.</p>',
        contact: `mutualaid@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`, // Changed to backticks
        meetingSchedule: 'First Monday of each month at 7:00 PM',
        members: 12,
      },
      // ... Other fallback committees would be included here
    ];
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-4">Committees & Working Groups</h1>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {committees.map((committee) => (
            <CommitteeCard
              key={committee.id}
              name={committee.name}
              description={committee.description}
              contact={committee.contact}
              meetingSchedule={committee.meetingSchedule}
              members={committee.members}
            />
          ))}
        </div>

        <HowToGetInvolved />
        <StartNewCommittee />
      </div>
    </div>
  );
}
