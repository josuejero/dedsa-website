import { getClient } from '../lib/apollo-client';
import { GET_RECENT_POSTS } from '../lib/graphql/queries';

// Import component sections
import ChapterStatsSection from '../components/home/ChapterStatsSection';
import GetInvolvedSection from '../components/home/GetInvolvedSection/index';
import HeroSection from '../components/home/HeroSection';
import JoinCTASection from '../components/home/JoinCTASection';
import LatestUpdatesSection from '../components/home/LatestUpdatesSection';
import MissionSection from '../components/home/MissionSection';
import StrategicPrioritiesSection from '../components/home/StrategicPrioritiesSection';

export const revalidate = 3600; // Revalidate once per hour

export default async function Home() {
  try {
    const { data } = await getClient().query({
      query: GET_RECENT_POSTS
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
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <>
        <HeroSection />
        <MissionSection />
        <StrategicPrioritiesSection />
        <div className="container mx-auto px-4 py-8">
          <p className="text-red-600">Error loading latest updates. Please try again later.</p>
        </div>
        <GetInvolvedSection />
        <ChapterStatsSection />
        <JoinCTASection />
      </>
    );
  }
}
