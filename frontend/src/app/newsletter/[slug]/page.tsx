// src/app/newsletter/[slug]/page.tsx
import { ApolloError } from '@apollo/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../../components/errors/ErrorDisplay';
import newsletterPageContent from '../../../content/newsletter/page.json';
import { getClient } from '../../../lib/apollo-client';
import {
  GET_POST_BY_SLUG,
  GET_RELATED_POSTS,
} from '../../../lib/graphql/queries';
import { NewsletterPageContent } from '../../../types/content/newsletter';
import ArticleContent from './components/ArticleContent';
import ArticleFooter from './components/ArticleFooter';
import ArticleHeader from './components/ArticleHeader';
import { generateStaticParams } from './staticParams';
import { Author, Post, RelatedPost } from './types';

// Type assertion for imported JSON
const typedContent = newsletterPageContent as NewsletterPageContent;

export const dynamic = 'force-dynamic';

interface PageParams {
  slug: string;
}

export { generateStaticParams };

interface PostData {
  post?: Post | null;
}

interface RelatedPostsData {
  posts?: {
    nodes: RelatedPost[];
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await getClient().query<PostData>({
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Delaware DSA Newsletter',
      description: 'Latest news from Delaware DSA',
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  let post: Post | null = null;
  let relatedPosts: RelatedPost[] = [];

  try {
    // Fetch the post
    const { data } = await getClient().query<PostData>({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });

    if (!data.post) {
      return notFound();
    }

    post = data.post;

    // Only fetch related posts if we have categories
    const categoryIds = post.categories?.nodes?.map((cat) => cat.id) || [];

    if (categoryIds.length > 0) {
      try {
        const relatedResult = await getClient().query<RelatedPostsData>({
          query: GET_RELATED_POSTS,
          variables: {
            categoryIds,
            currentPostId: post.id,
          },
        });
        relatedPosts = relatedResult.data?.posts?.nodes || [];
      } catch (relatedError) {
        console.error('Error fetching related posts:', relatedError);
      }
    }

    // Ensure post has author information (use author directly, not author.node)
    const author: Author = post.author ?? {
      id: 'default',
      name: 'Delaware DSA',
      slug: 'delaware-dsa',
      avatar: null,
    };

    // Merge the author back onto post
    post = { ...post, author };

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

    if (error instanceof ApolloError) {
      if (error.networkError) {
        return (
          <ErrorDisplay
            title={typedContent.errorTitle}
            message={typedContent.errorMessage}
            error={error}
            actionLabel={typedContent.errorActionLabel}
            actionHref="/"
          />
        );
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        return (
          <ErrorDisplay
            title={typedContent.errorTitle}
            message={typedContent.errorMessage}
            error={error.graphQLErrors[0]}
            showDetails={process.env.NODE_ENV === 'development'}
            actionLabel={typedContent.errorActionLabel}
            actionHref="/"
          />
        );
      }
    }

    return notFound();
  }
}
