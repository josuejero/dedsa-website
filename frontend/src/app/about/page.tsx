import React from 'react';
import { Metadata } from 'next';
import { gql } from '@apollo/client';
import { getClient } from '../../lib/apollo-client';
import AboutHero from './AboutHero';
import Timeline from './Timeline';
import Achievements from './Achievements';
import DemocraticSocialism from './DemocraticSocialism';
import GetInvolved from './GetInvolved';
import NationalInfo from './NationalInfo';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about the history, mission, and values of the Delaware chapter of the Democratic Socialists of America.',
};

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
  const { data } = await getClient().query({
    query: GET_ABOUT_PAGE,
  });

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
  const yearsActive = currentYear - aboutInfo.foundingYear;

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

        <AboutHero missionStatement={aboutInfo.missionStatement} />
        <Timeline foundingYear={aboutInfo.foundingYear} yearsActive={yearsActive} />
        <Achievements achievements={aboutInfo.achievements} />
        <DemocraticSocialism />
        <GetInvolved />
        <NationalInfo />
      </div>
    </div>
  );
}
