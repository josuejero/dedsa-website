// src/app/ud-ydsa/page.tsx
'use client';

import { gql } from '@apollo/client';
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
export const revalidate = 300;
export const metadata: Metadata = {
  title: 'UD YDSA',
  description:
    'University of Delaware Young Democratic Socialists of America chapter page.',
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
  let data = await getClient()
    .query<{ page?: any }>({ query: Q, errorPolicy: 'all' })
    .then((r) => r.data)
    .catch((err) => {
      throw err;
    });

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
  } catch (err: any) {
    console.error(err);
    // ApolloError handling simplified
    const msg = err.networkError
      ? 'Network issue—please check connection.'
      : err.graphQLErrors?.length
        ? 'Data error—please try again later.'
        : 'Unexpected error—please try again.';
    return (
      <ErrorDisplay
        title="Oops!"
        message={msg}
        error={err}
        showDetails={process.env.NODE_ENV === 'development'}
        actionLabel="Home"
        actionHref="/"
      />
    );
  }
}
