// src/app/newsletter/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getClient } from '../../../lib/apollo-client';
import ArticleContent from './components/ArticleContent';
import ArticleFooter from './components/ArticleFooter';
import ArticleHeader from './components/ArticleHeader';
import { GET_POST_BY_SLUG, GET_RELATED_POSTS } from './queries';
import { generateStaticParams } from './staticParams';

interface PageParams {
  slug: string;
}

export { generateStaticParams };

export async function generateMetadata({
  params
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { slug }
    });

    if (!data.post) {
      return {
        title: 'Post Not Found',
        description: 'The requested post could not be found.'
      };
    }

    return {
      title: data.post.title,
      description: `${data.post.title} - Delaware DSA Newsletter article`
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Delaware DSA Newsletter',
      description: 'Latest news from Delaware DSA'
    };
  }
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;

  try {
    const { data } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { slug }
    });

    if (!data.post) {
      return notFound();
    }

    const categoryIds = data.post.categories.nodes.map((cat: { id: string }) => cat.id);

    let relatedPosts: (typeof data.post)[] = [];
    if (categoryIds.length > 0) {
      const relatedResult = await getClient().query({
        query: GET_RELATED_POSTS,
        variables: {
          categoryIds,
          currentPostId: data.post.id
        }
      });
      relatedPosts = relatedResult.data.posts.nodes;
    }

    const author = data.post.author?.node || {
      id: 'default',
      name: 'Delaware DSA',
      slug: 'delaware-dsa',
      avatar: null
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
