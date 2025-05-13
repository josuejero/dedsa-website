import { ApolloError } from '@apollo/client';
import ErrorDisplay from '../components/errors/ErrorDisplay';
import { getClient } from '../lib/apollo-client';
import { GET_RECENT_POSTS } from '../lib/graphql/queries';
export const dynamic = 'force-dynamic';

// Import component sections
import ChapterStatsSection from '../components/home/ChapterStatsSection';
import GetInvolvedSection from '../components/home/GetInvolvedSection/index';
import HeroSection from '../components/home/HeroSection';
import JoinCTASection from '../components/home/JoinCTASection';
import LatestUpdatesSection from '../components/home/LatestUpdatesSection';
import MissionSection from '../components/home/MissionSection';
import StrategicPrioritiesSection from '../components/home/StrategicPrioritiesSection';

export const revalidate = 3600; // Revalidate once per hour

// Define the expected types from the GraphQL query
interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText: string;
    };
  };
  author?: {
    node?: {
      name: string;
    };
  };
}

interface QueryData {
  posts?: {
    nodes: Post[];
  };
}

export default async function Home() {
  // Initialize data with default values
  let data: QueryData = { posts: { nodes: [] } };

  try {
    const result = await getClient().query<QueryData>({
      query: GET_RECENT_POSTS,
    });
    data = result.data;
  } catch (error) {
    console.error('Error fetching posts:', error);

    // Different error handling based on error type
    if (error instanceof ApolloError) {
      if (error.networkError) {
        return (
          <ErrorDisplay
            title="Network Error"
            message="We're having trouble connecting to our servers. Please check your internet connection and try again."
            error={error}
          />
        );
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        return (
          <ErrorDisplay
            title="Data Error"
            message="There was a problem with the data. Our team has been notified."
            error={error.graphQLErrors[0]}
            showDetails={process.env.NODE_ENV === 'development'}
          />
        );
      }
    }

    // Generic error fallback
    return (
      <ErrorDisplay
        error={error}
        showDetails={process.env.NODE_ENV === 'development'}
      />
    );
  }

  // Use optional chaining and nullish coalescing for safe data access
  const posts = data?.posts?.nodes ?? [];

  return (
    <main className="pt-0 overflow-hidden">
      <HeroSection />
      <MissionSection />
      <StrategicPrioritiesSection />
      <LatestUpdatesSection posts={posts} />
      <GetInvolvedSection />
      <ChapterStatsSection />
      <JoinCTASection />
    </main>
  );
}
