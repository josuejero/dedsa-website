import { gql } from '@apollo/client';
import { Metadata } from 'next';
import { getClient } from '../../lib/apollo-client';
import LeadershipCard from './LeadershipCard';

export const metadata: Metadata = {
  title: 'Leadership & Structure',
  description: 'Learn about the leadership and organizational structure of Delaware DSA.',
};

interface LeadershipRole {
  id: string;
  title: string;
  name: string;
  bio: string;
  email: string;
  imageUrl?: string;
  order: number;
}

interface LeadershipNode {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  leadership: {
    role: string;
    email: string;
    order: number;
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
}

// frontend/src/app/leadership/page.tsx
const GET_LEADERSHIP = gql`
  query GetLeadership {
    page(id: "leadership", idType: URI) {
      content
    }
    leadership(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        excerpt
        content
        leadership {
          role
          email
          order
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export default async function Leadership() {
  const { data } = await getClient().query({
    query: GET_LEADERSHIP,
  });

  const pageContent =
    data?.page?.content ||
    `
    <p>Delaware DSA is a member-led organization with a democratically elected leadership team. Our chapter is structured to ensure accountability, transparency, and member involvement at every level.</p>
    <p>Our elected officers serve two-year terms and are responsible for implementing the decisions and priorities established by our membership.</p>
  `;

  let leadershipTeam: LeadershipRole[] =
    data?.leadership?.nodes?.map((node: LeadershipNode) => ({
      id: node.id,
      title: node.leadership.role,
      name: node.title,
      bio: node.content,
      email: node.leadership.email,
      imageUrl: node.featuredImage?.node?.sourceUrl,
      order: node.leadership.order,
    })) || [];

  if (leadershipTeam.length === 0) {
    leadershipTeam = [
      {
        id: 'chair',
        title: 'Chapter Chair',
        name: 'Alex Johnson',
        bio: '<p>Alex has been an active DSA member since 2019 and works to build coalitions across progressive organizations in Delaware.</p>',
        email: `chair@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`, // Changed to backticks
        order: 1,
      },
      {
        id: 'vice-chair',
        title: 'Vice Chair',
        name: 'Morgan Smith',
        bio: '<p>Morgan focuses on organizing tenant unions and housing justice initiatives across New Castle County.</p>',
        email: `vicechair@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`, // Changed to backticks
        order: 2,
      },
      {
        id: 'secretary',
        title: 'Secretary',
        name: 'Jamie Williams',
        bio: '<p>Jamie maintains chapter records and communications, ensuring organizational transparency and member involvement.</p>',
        email: `secretary@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`, // Changed to backticks
        order: 3,
      },
      {
        id: 'treasurer',
        title: 'Treasurer',
        name: 'Taylor Reed',
        bio: '<p>Taylor oversees chapter finances, budget planning, and ensures compliance with financial regulations.</p>',
        email: `treasurer@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`, // Changed to backticks
        order: 4,
      },
      {
        id: 'at-large-1',
        title: 'At-Large Member',
        name: 'Jordan Chen',
        bio: '<p>Jordan leads our Medicare for All campaign and represents healthcare workers within the chapter.</p>',
        email: `atlarge1@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`, // Changed to backticks
        order: 5,
      },
      {
        id: 'at-large-2',
        title: 'At-Large Member',
        name: 'Casey Wilson',
        bio: '<p>Casey coordinates outreach to labor unions and workplace organizing throughout the state.</p>',
        email: `atlarge2@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`, // Changed to backticks
        order: 6,
      },
    ];
  }

  leadershipTeam.sort((a, b) => a.order - b.order);

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-4">Leadership & Structure</h1>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </div>

        <h2 className="text-3xl font-bold mb-6">Chapter Leadership</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadershipTeam.map((leader) => (
            <LeadershipCard
              key={leader.id}
              title={leader.title}
              name={leader.name}
              bio={leader.bio}
              email={leader.email}
              imageUrl={leader.imageUrl}
            />
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Chapter Structure</h2>

          <p className="mb-4">Our chapter operates with the following organizational structure:</p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              <strong>General Membership:</strong> All dues-paying members have voting rights at
              general meetings
            </li>
            <li>
              <strong>Steering Committee:</strong> Elected officers who coordinate chapter
              activities
            </li>
            <li>
              <strong>Working Groups & Committees:</strong> Focus on specific campaigns and chapter
              operations
            </li>
          </ul>

          <p className="mb-4">
            We hold general membership meetings monthly and steering committee meetings bi-weekly.
            All meetings are open to members, and meeting minutes are made available to ensure
            transparency.
          </p>

          <div className="mt-6">
            <a href="/bylaws" className="inline-flex items-center text-dsa-red hover:underline">
              <span>Read our chapter bylaws</span>
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
