import { getClient } from '../../../lib/apollo-client';
import { GET_ALL_POST_SLUGS } from './queries';

export async function generateStaticParams() {
  try {
    const { data } = await getClient().query({
      query: GET_ALL_POST_SLUGS,
    });

    return data.posts.nodes.map((post: { slug: string }) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}
