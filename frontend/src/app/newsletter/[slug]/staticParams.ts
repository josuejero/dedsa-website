import { getClient } from '../../../lib/apollo-client';
import { GET_ALL_POST_SLUGS } from './queries';

export async function generateStaticParams() {
  try {
    const { data } = await getClient().query({
      query: GET_ALL_POST_SLUGS
    });

    // Make sure we have valid slug data
    if (!data?.posts?.nodes || !Array.isArray(data.posts.nodes)) {
      return [{ slug: 'placeholder' }];
    }

    return data.posts.nodes.map((post: { slug: string }) => ({
      slug: post.slug || 'placeholder'
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return a fallback to prevent build failure
    return [{ slug: 'placeholder' }];
  }
}
