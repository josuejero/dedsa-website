import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import pageContent from '../../content/leadership/page.json';
import { LeadershipPageContent } from '../../types/content/leadership';
import ChapterStructure from './ChapterStructure';
import LeadershipCard from './LeadershipCard';

// Type assertion for imported JSON
const typedContent = pageContent as LeadershipPageContent;

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Leadership & Structure',
  description:
    'Learn about the leadership and organizational structure of Delaware DSA.',
};

// ISR: revalidate every 5 minutes
export const revalidate = 300;

// Inline GraphQL query string
const GET_LEADERSHIP = `
  query GetLeadership {
    page(id: "leadership", idType: URI) {
      content
    }
    leadership(
      first: 100
      where: { orderby: { field: MENU_ORDER, order: ASC } }
    ) {
      nodes {
        id
        title
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

interface LeadershipRole {
  id: string;
  title: string;
  name: string;
  bio: string;
  email: string;
  imageUrl?: string;
  order: number;
}

interface LeadershipPageData {
  page?: { content?: string | null } | null;
  leadership?: {
    nodes: Array<{
      id: string;
      title: string;
      content: string;
      leadership: { role: string; email: string; order: number };
      featuredImage?: { node: { sourceUrl: string } };
    }>;
  };
}

export default async function LeadershipPage() {
  const endpoint =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'http://delaware-dsa-backend.local/graphql';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      body: JSON.stringify({ query: GET_LEADERSHIP }),
    });
    if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);

    const json = await res.json();
    const data = (json.data ?? {}) as LeadershipPageData;

    // 404 if neither page nor leadership data
    if (!data.page && !data.leadership) return notFound();

    const pageContentHtml = data.page?.content ?? typedContent.fallbackContent;

    let leadershipTeam: LeadershipRole[] =
      data.leadership?.nodes.map((node) => ({
        id: node.id,
        title: node.leadership.role,
        name: node.title,
        bio: node.content,
        email: node.leadership.email,
        imageUrl: node.featuredImage?.node.sourceUrl,
        order: node.leadership.order,
      })) ?? [];

    if (leadershipTeam.length === 0) {
      leadershipTeam = [
        {
          id: 'chair',
          title: 'Chapter Chair',
          name: 'Alex Johnson',
          bio: '<p>Alex has been an active DSA member since 2019 and works to build coalitions across progressive organizations in Delaware.</p>',
          email: `chair@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
          imageUrl: undefined,
          order: 1,
        },
        {
          id: 'vice-chair',
          title: 'Vice Chair',
          name: 'Morgan Smith',
          bio: '<p>Morgan focuses on organizing tenant unions and housing justice initiatives across New Castle County.</p>',
          email: `vicechair@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
          imageUrl: undefined,
          order: 2,
        },
        {
          id: 'secretary',
          title: 'Secretary',
          name: 'Jamie Williams',
          bio: '<p>Jamie maintains chapter records and communications, ensuring organizational transparency and member involvement.</p>',
          email: `secretary@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
          imageUrl: undefined,
          order: 3,
        },
        {
          id: 'treasurer',
          title: 'Treasurer',
          name: 'Taylor Reed',
          bio: '<p>Taylor oversees chapter finances, budget planning, and ensures compliance with financial regulations.</p>',
          email: `treasurer@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
          imageUrl: undefined,
          order: 4,
        },
        {
          id: 'at-large-1',
          title: 'At-Large Member',
          name: 'Jordan Chen',
          bio: '<p>Jordan leads our Medicare for All campaign and represents healthcare workers within the chapter.</p>',
          email: `atlarge1@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
          imageUrl: undefined,
          order: 5,
        },
        {
          id: 'at-large-2',
          title: 'At-Large Member',
          name: 'Casey Wilson',
          bio: '<p>Casey coordinates outreach to labor unions and workplace organizing throughout the state.</p>',
          email: `atlarge2@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
          imageUrl: undefined,
          order: 6,
        },
      ];
    }

    leadershipTeam.sort((a, b) => a.order - b.order);

    return (
      <div className="bg-gray-100 py-12">
        <div className="container-page">
          <h1 className="text-4xl font-bold mb-4">{typedContent.title}</h1>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pageContentHtml }}
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
          <ChapterStructure />
        </div>
      </div>
    );
  } catch (err: unknown) {
    console.error('Error loading leadership page:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return (
      <ErrorDisplay
        title="Error Loading Leadership Page"
        message="We're having trouble loading this page. Please try again later."
        error={errorMessage}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }
}
