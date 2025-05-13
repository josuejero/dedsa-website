// src/app/about/page.tsx

// 1. Force this page to render at request-time rather than at build-time
export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import AboutHero from './AboutHero';
import Achievements from './Achievements';
import DemocraticSocialism from './DemocraticSocialism';
import GetInvolved from './GetInvolved';
import NationalInfo from './NationalInfo';
import Timeline from './Timeline';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about the history, mission, and values of the Delaware chapter of the Democratic Socialists of America.',
};

// ISR: revalidate every 5 minutes (ignored when dynamic = 'force-dynamic')
export const revalidate = 300;

// 2. Use SLUG instead of URI so WPGraphQL finds the page by its slug
const GET_ABOUT_PAGE = `
  query GetAboutPage {
    page(id: "about", idType: SLUG) {
      content
      about {
        foundingYear
        achievements
        missionStatement
      }
    }
  }
`;

interface AboutPageData {
  page?: {
    content?: string | null;
    about?: {
      foundingYear?: number | null;
      achievements?: string[] | null;
      missionStatement?: string | null;
    } | null;
  } | null;
}

export default async function AboutPage() {
  const endpoint =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'http://delaware-dsa-backend.local/graphql';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      body: JSON.stringify({ query: GET_ABOUT_PAGE }),
    });
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }

    const { data } = (await res.json()) as { data: AboutPageData };
    if (!data?.page) return notFound();

    const pageContent =
      data.page.content ??
      `
      <p>Delaware DSA is the Delaware state chapter of the Democratic Socialists of America (DSA), the largest socialist organization in the United States.</p>
      <p>Our chapter brings together democratic socialists of all backgrounds to organize and fight for a political and economic system that puts people before profits. We believe that both the economy and society should be run democratically to meet human needs.</p>
    `;

    const aboutInfo = data.page.about ?? {
      foundingYear: 2021,
      missionStatement:
        "Delaware DSA's mission is to build a democratic, multi-racial socialist movement in Delaware that fights for economic, racial, and social justice for all working people.",
      achievements: [
        'Successfully advocated for tenant protections in Wilmington',
        'Organized mutual aid networks during the COVID-19 pandemic',
        'Campaigned for Medicare for All in partnership with healthcare workers',
        'Supported labor organizing efforts across the state',
        'Built coalitions with community organizations fighting for racial justice',
      ],
    };

    const currentYear = new Date().getFullYear();
    const yearsActive = currentYear - (aboutInfo.foundingYear || 2021);

    return (
      <div className="bg-gray-100 py-12">
        <div className="container-page">
          <h1 className="text-4xl font-bold mb-4">About Delaware DSA</h1>

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          </div>

          <AboutHero
            missionStatement={aboutInfo.missionStatement || undefined}
          />
          <Timeline
            foundingYear={aboutInfo.foundingYear || undefined}
            yearsActive={yearsActive}
          />
          <Achievements achievements={aboutInfo.achievements || undefined} />
          <DemocraticSocialism />
          <GetInvolved />
          <NationalInfo />
        </div>
      </div>
    );
  } catch (err: unknown) {
    console.error('About page fetch error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    return (
      <ErrorDisplay
        title="Error Loading About Page"
        message={msg}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }
}
