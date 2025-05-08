import React from 'react';
import { Metadata } from 'next';
import { getClient } from '../../lib/apollo-client';
import { GET_JOIN_PAGE } from './queries';
import JoinHero from './JoinHero';
import MembershipOptions from './MembershipOptions';
import WhyJoinDSA from './WhyJoinDSA';
import Testimonials from './Testimonials';
import FAQ from './FAQ';

export const metadata: Metadata = {
  title: 'Join Delaware DSA',
  description: 'Become a member of the Delaware chapter of the Democratic Socialists of America.',
};

export default async function JoinPage() {
  const { data } = await getClient().query({
    query: GET_JOIN_PAGE,
  });

  const pageContent =
    data?.page?.content ||
    `<p>Join us in building a more just and democratic society! Delaware DSA is a chapter of the Democratic Socialists of America, the largest socialist organization in the United States.</p>
     <p>By becoming a member, you'll be part of a growing movement fighting for economic justice, healthcare for all, housing as a human right, and genuine democracy in our workplaces and communities.</p>`;

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
