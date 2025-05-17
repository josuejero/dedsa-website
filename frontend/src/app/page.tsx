// src/app/ud-ydsa/page.tsx
import { gql } from '@apollo/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import { getClient } from '../../lib/apollo-client';
import CampaignsSection from './components/CampaignsSection';
import EventsSection from './components/EventsSection';
import HeroSection from './components/HeroSection';
import JoinSection from './components/JoinSection';
import LeadershipSection from './components/LeadershipSection';
import MeetingInfoSection from './components/MeetingInfoSection';
import { UdYdsaInfo } from './types';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'UD YDSA',
  description: 'University of Delaware YDSA chapter page.',
};

const Q = gql`
  query {
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

export default async function UdYdsa() {
  const { data } = await getClient()
    .query<{ page?: any }>({ query: Q, errorPolicy: 'all' })
    .catch((error: unknown) => {
      throw error;
    });

  if (!data.page) return notFound();

  const html =
    data.page.content ||
    `<p>The University of Delaware Young Democratic Socialists...</p>`;

  const raw = data.page.udYdsa ?? {};
  const info: UdYdsaInfo = {
    contactEmail: raw.contactEmail || 'udydsa@example.org',
    meetingLocation: raw.meetingLocation || 'Morris Library, Room 202, UD',
    meetingSchedule: raw.meetingSchedule || 'Wednesdays at 7 PM during term',
    socialMedia: raw.socialMedia || {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      facebook: 'https://facebook.com',
    },
    pageContent: html,
  };

  try {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container-page">
          <HeroSection udYdsaInfo={info} />
          <div
            className="bg-white p-8 rounded-lg shadow-md mb-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <MeetingInfoSection udYdsaInfo={info} />
          <CampaignsSection />
          <LeadershipSection />
          <EventsSection />
          <JoinSection udYdsaInfo={info} />
        </div>
      </section>
    );
  } catch (error: unknown) {
    console.error('Error loading UD YDSA page:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return (
      <ErrorDisplay
        title="Error"
        message="Could not load UD YDSA page."
        error={msg}
        actionLabel="Home"
        actionHref="/"
      />
    );
  }
}
