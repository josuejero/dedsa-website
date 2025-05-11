import { ApolloError, gql } from '@apollo/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import { getClient } from '../../lib/apollo-client';
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

const GET_ABOUT_PAGE = gql`
  query GetAboutPage {
    page(id: "about", idType: URI) {
      content
      about {
        foundingYear
        achievements
        missionStatement
      }
    }
  }
`;

export default async function About() {
  let data: AboutPageData = { page: null };

  try {
    const result = await getClient().query<AboutPageData>({
      query: GET_ABOUT_PAGE,
      errorPolicy: 'all',
    });
    data = result.data;

    // Render 404 if page doesn't exist
    if (!data?.page) {
      return notFound();
    }

    const pageContent =
      data?.page?.content ||
      `
      <p>Delaware DSA is the Delaware state chapter of the Democratic Socialists of America (DSA), the largest socialist organization in the United States.</p>
      <p>Our chapter brings together democratic socialists of all backgrounds to organize and fight for a political and economic system that puts people before profits. We believe that both the economy and society should be run democratically to meet human needs.</p>
      `;

    const aboutInfo = data?.page?.about || {
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

          {/* Introduction */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          </div>

          <AboutHero
            missionStatement={aboutInfo.missionStatement ?? undefined}
          />
          <Timeline
            foundingYear={aboutInfo.foundingYear ?? undefined}
            yearsActive={yearsActive}
          />
          <Achievements achievements={aboutInfo.achievements ?? undefined} />
          <DemocraticSocialism />
          <GetInvolved />
          <NationalInfo />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading about page:', error);

    // Different error handling based on error type
    if (error instanceof ApolloError) {
      if (error.networkError) {
        return (
          <ErrorDisplay
            title="Network Error"
            message="We're having trouble connecting to our servers. Please check your internet connection and try again."
            error={error}
            actionLabel="Return to Home"
            actionHref="/"
          />
        );
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        return (
          <ErrorDisplay
            title="Data Error"
            message="There was a problem loading the about page data. Our team has been notified."
            error={error.graphQLErrors[0]}
            showDetails={process.env.NODE_ENV === 'development'}
            actionLabel="Return to Home"
            actionHref="/"
          />
        );
      }
    }

    // Generic error fallback
    return (
      <ErrorDisplay
        title="Error Loading About Page"
        message="We're having trouble loading this page. Please try again later."
        error={error}
        showDetails={process.env.NODE_ENV === 'development'}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }
}
