import { Metadata } from 'next';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Committees & Working Groups',
  description: "Learn about Delaware DSA's committees and working groups and how to get involved.",
};

interface Committee {
  id: string;
  name: string;
  description: string;
  contact: string;
  meetingSchedule: string;
  members: number;
}

const GET_COMMITTEES = gql`
  query GetCommittees {
    page(id: "committees", idType: URI) {
      content
    }
    committees(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        content
        excerpt
        committee {
          contactEmail
          meetingSchedule
          memberCount
        }
      }
    }
  }
`;

export default async function Committees() {
  const { data } = await getClient().query({
    query: GET_COMMITTEES,
  });

  const pageContent =
    data?.page?.content ||
    `
    <p>Delaware DSA's work happens through our committees and working groups. These are where members come together to organize around specific issues, campaigns, and chapter operations.</p>
    <p>We encourage all members to join at least one committee or working group. This is the best way to get involved and make meaningful contributions to our chapter's work.</p>
  `;

  // Default committees if query returns no results
  let committees: Committee[] =
    data?.committees?.nodes?.map((node: any) => ({
      id: node.id,
      name: node.title,
      description: node.content,
      contact: node.committee?.contactEmail || '',
      meetingSchedule: node.committee?.meetingSchedule || '',
      members: node.committee?.memberCount || 0,
    })) || [];

  if (committees.length === 0) {
    committees = [
      {
        id: 'mutual-aid',
        name: 'Mutual Aid',
        description:
          '<p>Our Mutual Aid Committee works to build community resilience through direct support and solidarity. Projects include community fridges, housing assistance, and skill-sharing programs.</p>',
        contact: 'mutualaid@delawaredsaexample.org',
        meetingSchedule: 'First Monday of each month at 7:00 PM',
        members: 12,
      },
      {
        id: 'housing-justice',
        name: 'Housing Justice',
        description:
          '<p>The Housing Justice Committee fights for affordable housing, tenant rights, and an end to houselessness. We organize tenant unions, advocate for rent control, and work to build community land trusts.</p>',
        contact: 'housing@delawaredsaexample.org',
        meetingSchedule: 'Every other Wednesday at 6:30 PM',
        members: 15,
      },
      {
        id: 'healthcare',
        name: 'Healthcare',
        description:
          '<p>Our Healthcare Committee advocates for Medicare for All and fights for equitable healthcare access for all Delaware residents. We work with healthcare workers, patients, and community organizations.</p>',
        contact: 'healthcare@delawaredsaexample.org',
        meetingSchedule: 'Third Tuesday of each month at 7:00 PM',
        members: 10,
      },
      {
        id: 'labor',
        name: 'Labor',
        description:
          '<p>The Labor Committee supports worker organizing, builds connections with local unions, and fights for worker power. We provide solidarity to strikes and organizing campaigns across the state.</p>',
        contact: 'labor@delawaredsaexample.org',
        meetingSchedule: 'Every other Thursday at 6:00 PM',
        members: 14,
      },
      {
        id: 'electoral',
        name: 'Electoral',
        description:
          '<p>The Electoral Committee develops strategy for engaging with electoral politics. We research candidates, develop endorsement processes, and mobilize for campaigns that advance democratic socialist policies.</p>',
        contact: 'electoral@delawaredsaexample.org',
        meetingSchedule: 'Second Sunday of each month at 4:00 PM',
        members: 8,
      },
      {
        id: 'communications',
        name: 'Communications',
        description:
          "<p>The Communications Committee handles our chapter's public-facing presence, including social media, website, press releases, and the newsletter. We work to amplify our chapter's work and socialist message.</p>",
        contact: 'communications@delawaredsaexample.org',
        meetingSchedule: 'Weekly on Wednesdays at 7:30 PM',
        members: 9,
      },
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
            <div key={committee.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-dsa-red text-white p-4">
                <h2 className="text-xl font-bold">{committee.name}</h2>
              </div>
              <div className="p-6">
                <div
                  className="prose mb-4"
                  dangerouslySetInnerHTML={{ __html: committee.description }}
                />

                <div className="space-y-2 text-sm">
                  <p className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{committee.meetingSchedule}</span>
                  </p>

                  <p className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2 text-gray-500"
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
                    <span>{committee.members} members</span>
                  </p>

                  <p className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${committee.contact}`}
                      className="text-dsa-red hover:underline"
                    >
                      {committee.contact}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Getting Involved Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">How to Get Involved</h2>

          <p className="mb-4">Getting involved with a committee or working group is easy:</p>

          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>Attend one of our general meetings to learn more about active committees</li>
            <li>Reach out directly to the committee contact listed above</li>
            <li>Check our calendar for upcoming committee meetings</li>
            <li>Join our Slack workspace to connect with committee channels</li>
          </ol>

          <p className="mb-6">
            All committees are open to any DSA member. Not a member yet? Join today!
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/join" className="btn btn-primary">
              Join Delaware DSA
            </Link>
            <Link href="/calendar" className="btn btn-secondary">
              View Calendar
            </Link>
          </div>
        </div>

        {/* Starting a New Committee */}
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
            Submit your proposal to the Steering Committee, who will review it and potentially bring
            it to a general membership meeting for discussion and approval.
          </p>

          <Link href="/contact" className="btn btn-primary">
            Contact the Steering Committee
          </Link>
        </div>
      </div>
    </div>
  );
}
