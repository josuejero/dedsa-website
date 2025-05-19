// Use server component instead of client component
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import { fetchGraphQL } from '../../utils/graphql/fetcher';
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

interface UdYdsaData {
  page?: {
    content?: string;
    udYdsa?: {
      contactEmail?: string;
      meetingLocation?: string;
      meetingSchedule?: string;
      socialMedia?: {
        instagram?: string;
        twitter?: string;
        facebook?: string;
      };
    };
  };
}

export default async function UdYdsa() {
  try {
    const query = `
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

    const response = await fetchGraphQL<UdYdsaData>(query);
    const data = response.data || {};

    if (!data.page) return notFound();

    const html =
      data.page.content ||
      `
      <p>The University of Delaware Young Democratic Socialists of America (UD YDSA) is the student chapter of DSA at UD. We organize students to build student power and fight for democratic socialist values on campus and beyond.</p>
      <p>As a chapter of YDSA, we work to make our university more democratic and to be a force for progressive change in the broader community. We collaborate closely with Delaware DSA on campaigns and events.</p>
    `;

    const raw = data.page.udYdsa ?? {};
    const info: UdYdsaInfo = {
      contactEmail: raw.contactEmail || 'udydsa@example.org',
      meetingLocation: raw.meetingLocation || 'Morris Library, Room 202, UD',
      meetingSchedule: raw.meetingSchedule || 'Wednesdays at 7 PM during term',
      socialMedia: {
        instagram: raw.socialMedia?.instagram || 'https://instagram.com',
        twitter: raw.socialMedia?.twitter || 'https://twitter.com',
        facebook: raw.socialMedia?.facebook || 'https://facebook.com',
      },
      pageContent: html,
    };

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
  } catch (error) {
    console.error('Error loading UD YDSA page:', error);
    const message = error instanceof Error ? error.message : String(error);
    return (
      <ErrorDisplay
        title="Error"
        message="Could not load UD YDSA page."
        error={message}
        actionLabel="Home"
        actionHref="/"
      />
    );
  }
}
