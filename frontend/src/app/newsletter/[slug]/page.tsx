import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { getClient } from '../../../lib/apollo-client';
import { GET_POST_BY_SLUG, GET_RELATED_POSTS } from './queries';
import { generateStaticParams } from './staticParams';
import ArticleHeader from './components/ArticleHeader';
import ArticleContent from './components/ArticleContent';
import ArticleFooter from './components/ArticleFooter';

export { generateStaticParams };

export async function generateMetadata(
  { params }: { params: { slug: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data } = await getClient().query({
    query: GET_POST_BY_SLUG,
    variables: { slug: params.slug },
  });

  const post = data?.post;

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }

  return {
    title: post.title,
    description: `${post.title} - Delaware DSA Newsletter article`,
  };
}

export default async function PostDetail({ params }: { params: { slug: string } }) {
  try {
    const { data } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { slug: params.slug },
    });

    if (!data.post) {
      return notFound();
    }

    const categoryIds = data.post.categories.nodes.map((cat: { id: string }) => cat.id);

    let relatedPosts: any[] = [];
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

    const post = {
      ...data.post,
      author,
    };

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
