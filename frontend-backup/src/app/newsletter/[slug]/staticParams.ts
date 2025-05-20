import { getAllPostSlugs } from '../../../lib/graphql';

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();

    return slugs.map((post) => ({
      slug: post.slug || 'placeholder',
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ slug: 'placeholder' }];
  }
}
