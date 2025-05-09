import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getClient } from '../../../lib/apollo-client';
import ArticleContent from './components/ArticleContent';
import ArticleFooter from './components/ArticleFooter';
import ArticleHeader from './components/ArticleHeader';
import { GET_POST_BY_SLUG, GET_RELATED_POSTS } from './queries';
import { generateStaticParams } from './staticParams';

export { generateStaticParams };

type Params = { slug: string };

// Fixed: Remove Promise wrapper from params
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = params; // No need to await params

  const { data } = await getClient().query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });

  if (!data.post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }

  return {
    title: data.post.title,
    description: `${data.post.title} - Delaware DSA Newsletter article`,
  };
}

// Fixed: Remove Promise wrapper from params
export default async function PostDetail({ params }: { params: Params }) {
  const { slug } = params; // No need to await params

  try {
    const { data } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });

    if (!data.post) return notFound();

    const categoryIds = data.post.categories.nodes.map((cat: { id: string }) => cat.id);
    let relatedPosts = [];

    if (categoryIds.length > 0) {
      const relatedResult = await getClient().query({
        query: GET_RELATED_POSTS,
        variables: {
          categoryIds,
          currentPostId: data.post.id,
        },
      });
      relatedPosts = relatedResult.data.posts.nodes;
    }

    const author = data.post.author?.node || {
      id: 'default',
      name: 'Delaware DSA',
      slug: 'delaware-dsa',
      avatar: null,
    };

    const post = { ...data.post, author };

    return (
      <article className="bg-gray-100 py-12">
        <div className="container-page">
          <ArticleHeader post={post} />
          <ArticleContent post={post} />
          <ArticleFooter post={post} relatedPosts={relatedPosts} />
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return notFound();
  }
}
