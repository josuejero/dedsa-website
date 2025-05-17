import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import pageJson from '../../content/leadership/page.json';
import {
  LeadershipPageContent,
  LeadershipPageData,
  LeadershipRole,
} from '../../types/content/leadership';
import ChapterStructure from './ChapterStructure';
import LeadershipCard from './LeadershipCard';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Leadership & Structure',
  description:
    'Learn about the leadership and organizational structure of Delaware DSA.',
};

// Inline cast
const c = pageJson as LeadershipPageContent;

const Q = `
  query {
    page(id:"leadership",idType:URI){content}
    leadership(first:100,where:{orderby:{field:MENU_ORDER,order:ASC}}){
      nodes{id,title,content,leadership{role,email,order},featuredImage{node{sourceUrl}}}
    }
  }
`;

export default async function LeadershipPage() {
  const url =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'http://delaware-dsa-backend.local/graphql';
  let data: LeadershipPageData;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      body: JSON.stringify({ query: Q }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const j = await res.json();
    data = (j.data ?? {}) as LeadershipPageData;
  } catch (e: any) {
    return (
      <ErrorDisplay
        title="Error Loading Leadership Page"
        message="We're having trouble loading this page. Please try again later."
        error={String(e.message || e)}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }

  if (!data.page && !data.leadership) return notFound();
  const html = data.page?.content ?? c.fallbackContent;

  let team: LeadershipRole[] =
    data.leadership?.nodes.map((n) => ({
      id: n.id,
      title: n.leadership.role,
      name: n.title,
      bio: n.content,
      email: n.leadership.email,
      imageUrl: n.featuredImage?.node.sourceUrl,
      order: n.leadership.order,
    })) || [];

  if (team.length === 0) {
    const env = (k: string) => `${k}@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`;
    team = [
      {
        id: 'chair',
        title: 'Chapter Chair',
        name: 'Alex Johnson',
        bio: '<p>Alex has been an active DSA member since 2019…</p>',
        email: env('chair'),
        order: 1,
      },
      {
        id: 'vice-chair',
        title: 'Vice Chair',
        name: 'Morgan Smith',
        bio: '<p>Morgan focuses on organizing tenant unions…</p>',
        email: env('vicechair'),
        order: 2,
      },
      {
        id: 'secretary',
        title: 'Secretary',
        name: 'Jamie Williams',
        bio: '<p>Jamie maintains chapter records…</p>',
        email: env('secretary'),
        order: 3,
      },
      {
        id: 'treasurer',
        title: 'Treasurer',
        name: 'Taylor Reed',
        bio: '<p>Taylor oversees chapter finances…</p>',
        email: env('treasurer'),
        order: 4,
      },
      {
        id: 'at-large-1',
        title: 'At-Large Member',
        name: 'Jordan Chen',
        bio: '<p>Jordan leads our Medicare for All campaign…</p>',
        email: env('atlarge1'),
        order: 5,
      },
      {
        id: 'at-large-2',
        title: 'At-Large Member',
        name: 'Casey Wilson',
        bio: '<p>Casey coordinates outreach to labor unions…</p>',
        email: env('atlarge2'),
        order: 6,
      },
    ];
  }

  team.sort((a, b) => a.order - b.order);

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-4">{c.title}</h1>
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <h2 className="text-3xl font-bold mb-6">Chapter Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((l) => (
            <LeadershipCard
              key={l.id}
              title={l.title}
              name={l.name}
              bio={l.bio}
              email={l.email}
              imageUrl={l.imageUrl}
            />
          ))}
        </div>
        <ChapterStructure />
      </div>
    </div>
  );
}
