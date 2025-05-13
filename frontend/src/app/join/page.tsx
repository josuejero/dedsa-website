// Opt out of static generation so we don’t crash at build time
export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import FAQ from './FAQ';
import JoinHero from './JoinHero';
import MembershipOptions from './MembershipOptions';
import Testimonials from './Testimonials';
import WhyJoinDSA from './WhyJoinDSA';

export const metadata: Metadata = {
  title: 'Join Delaware DSA',
  description:
    'Become a member of the Delaware chapter of the Democratic Socialists of America.',
};

// ISR: revalidate every 5 minutes (ignored when dynamic = 'force-dynamic')
export const revalidate = 300;

// Use SLUG instead of URI so WPGraphQL finds the page by its slug
const GET_JOIN_PAGE = `
  query GetJoinPage {
    page(id: "join", idType: SLUG) {
      content
    }
  }
`;

interface PageData {
  page?: {
    content?: string | null;
  } | null;
}

export default async function JoinPage() {
  const endpoint =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'http://delaware-dsa-backend.local/graphql';

  // Fallback if the query fails
  let pageContent = `
    <p>Join us in building a more just and democratic society! Delaware DSA is a chapter of the Democratic Socialists of America, the largest socialist organization in the United States.</p>
    <p>By becoming a member, you'll be part of a growing movement fighting for economic justice, healthcare for all, housing as a human right, and genuine democracy in our workplaces and communities.</p>
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // build-time fetch gets cached; dynamic = 'force-dynamic' makes this run per-request
      cache: 'force-cache',
      body: JSON.stringify({ query: GET_JOIN_PAGE }),
    });

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }

    const json = await res.json();
    const data = (json.data ?? {}) as PageData;

    if (data.page?.content) {
      pageContent = data.page.content;
    }
  } catch (err: unknown) {
    console.error('Join page fetch error:', err);
    // We’ll just show the fallback content
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        <JoinHero />
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </div>
        <MembershipOptions />
        <WhyJoinDSA />
        <Testimonials />
        <FAQ />
      </div>
    </div>
  );
}
