import React from 'react';
import { gql } from '@apollo/client';
import { getClient } from '../lib/apollo-client';

// Import component sections
import HeroSection from '../components/home/HeroSection';
import MissionSection from '../components/home/MissionSection';
import StrategicPrioritiesSection from '../components/home/StrategicPrioritiesSection';
import LatestUpdatesSection from '../components/home/LatestUpdatesSection';
import GetInvolvedSection from '../components/home/GetInvolvedSection/index';
import ChapterStatsSection from '../components/home/ChapterStatsSection';
import JoinCTASection from '../components/home/JoinCTASection';

const GET_RECENT_POSTS = gql`
  query GetRecentPosts {
    posts(first: 3) {
      nodes {
        id
        title
        date
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

export const revalidate = 3600;

export default async function Home() {
  const { data } = await getClient().query({
    query: GET_RECENT_POSTS,
  });

  const posts = data?.posts?.nodes || [];

  return (
    <>
      <HeroSection />
      <MissionSection />
      <StrategicPrioritiesSection />
      <LatestUpdatesSection posts={posts} />
      <GetInvolvedSection />
      <ChapterStatsSection />
      <JoinCTASection />
    </>
  );
}
