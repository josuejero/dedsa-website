import React from 'react';
import { Metadata } from 'next';
import { gql } from '@apollo/client';
import { getClient } from '../../lib/apollo-client';
import { UdYdsaInfo } from './types';

// Component imports
import HeroSection from './components/HeroSection';
import MeetingInfoSection from './components/MeetingInfoSection';
import CampaignsSection from './components/CampaignsSection';
import LeadershipSection from './components/LeadershipSection';
import EventsSection from './components/EventsSection';
import JoinSection from './components/JoinSection';

export const metadata: Metadata = {
  title: 'UD YDSA',
  description:
    'University of Delaware Young Democratic Socialists of America - Student chapter of DSA at UD.',
};

const GET_UD_YDSA_PAGE = gql`
  query GetUdYdsaPage {
    page(id: "ud-ydsa", idType: URI) {
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
  const { data } = await getClient().query({
    query: GET_UD_YDSA_PAGE,
  });

  const pageContent =
    data?.page?.content ||
    `
    <p>The University of Delaware Young Democratic Socialists of America (UD YDSA) is the student chapter of DSA at the University of Delaware. We organize students to build student power and fight for democratic socialist values on campus and beyond.</p>
    <p>As a chapter of YDSA, we work to make our university more democratic and to be a force for progressive change in the broader community. We collaborate closely with Delaware DSA on campaigns and events.</p>
    `;

  const udYdsaInfo: UdYdsaInfo = data?.page?.udYdsa || {
    contactEmail: 'udydsa@example.org',
    meetingLocation: 'Morris Library, Room 202, University of Delaware',
    meetingSchedule: 'Every Wednesday at 7:00 PM during the academic year',
    socialMedia: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      facebook: 'https://facebook.com',
    },
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        {/* Hero section with title and intro */}
        <HeroSection udYdsaInfo={udYdsaInfo} />

        {/* Main content and meeting info */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </div>

        {/* Meeting information and social links */}
        <MeetingInfoSection udYdsaInfo={udYdsaInfo} />

        {/* Current campaigns */}
        <CampaignsSection />

        {/* Chapter leadership */}
        <LeadershipSection />

        {/* Upcoming events */}
        <EventsSection />

        {/* Call to action */}
        <JoinSection udYdsaInfo={udYdsaInfo} />
      </div>
    </div>
  );
}
