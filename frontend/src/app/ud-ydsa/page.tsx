// src/app/ud-ydsa/page.tsx

import { ApolloError, gql } from '@apollo/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import { getClient } from '../../lib/apollo-client';
import { UdYdsaInfo } from './types';

import CampaignsSection from './components/CampaignsSection';
import EventsSection from './components/EventsSection';
import HeroSection from './components/HeroSection';
import JoinSection from './components/JoinSection';
import LeadershipSection from './components/LeadershipSection';
import MeetingInfoSection from './components/MeetingInfoSection';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'UD YDSA',
  description:
    'University of Delaware Young Democratic Socialists of America - Student chapter of DSA at UD.',
};

const GET_UD_YDSA_PAGE = gql`
  query GetUdYdsaPage {
    page(id: "ud-ydsa", idType: SLUG) {
      content
      udYdsa {
        contactEmail
        meetingLocation
        meetingSchedule
        socialMedia {
          instagram
          twitter
          facebook
        }
      }
    }
  }
`;

interface UdYdsaData {
  page?: {
    content: string;
    udYdsa?: {
      contactEmail: string;
      meetingLocation: string;
      meetingSchedule: string;
      socialMedia: {
        instagram: string;
        twitter: string;
        facebook: string;
      };
    };
  } | null;
}

export default async function UdYdsa() {
  let data: UdYdsaData = { page: null };

  try {
    const result = await getClient().query<UdYdsaData>({
      query: GET_UD_YDSA_PAGE,
      errorPolicy: 'all',
    });
    data = result.data;

    if (!data.page) {
      return notFound();
    }

    // 1) Always have pageContent (CMS or fallback)
    const pageContent =
      data.page.content ||
      `<p>The University of Delaware Young Democratic Socialists of America (UD YDSA) is the student chapter of DSA at the University of Delaware. We organize students to build student power and fight for democratic socialist values on campus and beyond.</p>
       <p>As a chapter of YDSA, we work to make our university more democratic and to be a force for progressive change in the broader community. We collaborate closely with Delaware DSA on campaigns and events.</p>`;

    // 2) Merge CMS fields with defaults, including pageContent
    const raw = data.page.udYdsa;
    const udYdsaInfo: UdYdsaInfo = {
      contactEmail: raw?.contactEmail ?? 'udydsa@example.org',
      meetingLocation:
        raw?.meetingLocation ??
        'Morris Library, Room 202, University of Delaware',
      meetingSchedule:
        raw?.meetingSchedule ??
        'Every Wednesday at 7:00 PM during the academic year',
      socialMedia: raw?.socialMedia ?? {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        facebook: 'https://facebook.com',
      },
      pageContent,
    };

    return (
      <section className="bg-gray-100 py-12">
        <div className="container-page">
          <HeroSection udYdsaInfo={udYdsaInfo} />

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          </div>

          <MeetingInfoSection udYdsaInfo={udYdsaInfo} />
          <CampaignsSection />
          <LeadershipSection />
          <EventsSection />
          <JoinSection udYdsaInfo={udYdsaInfo} />
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading UD YDSA page:', error);

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
      }
      if (error.graphQLErrors?.length) {
        return (
          <ErrorDisplay
            title="Data Error"
            message="There was a problem loading the UD YDSA page data. Our team has been notified."
            error={error.graphQLErrors[0]}
            showDetails={process.env.NODE_ENV === 'development'}
            actionLabel="Return to Home"
            actionHref="/"
          />
        );
      }
    }

    return (
      <ErrorDisplay
        title="Error Loading UD YDSA Page"
        message="We're having trouble loading this page. Please try again later."
        error={error}
        showDetails={process.env.NODE_ENV === 'development'}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }
}
