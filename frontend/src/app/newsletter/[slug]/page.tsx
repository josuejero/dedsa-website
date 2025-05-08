import React from 'react';
import Link from 'next/link';
import { getClient } from '../../../lib/apollo-client';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { gql } from '@apollo/client';

// Types for our post data
interface Author {
  id: string;
  name: string;
  slug: string;
  avatar: {
    url: string;
  } | null;
}

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  slug: string;
  categories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    } | null;
  } | null;
  author: Author;
}
export async function generateMetadata(
  { params }: { params: { slug: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  // Fetch post data
  const { data } = await getClient().query({
    query: GET_POST_BY_SLUG,
    variables: { slug: params.slug },
  });

  const post = data?.post;

  // If post not found, return default metadata
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

// GraphQL query to fetch a single post by slug
const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      slug
      categories {
        nodes {
          id
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          id
          name
          slug
          avatar {
            url
          }
        }
      }
    }
  }
`;

// GraphQL query to fetch related posts (posts in the same category)
const GET_RELATED_POSTS = gql`
  query GetRelatedPosts($categoryIds: [ID], $currentPostId: ID!) {
    posts(first: 3, where: { categoryIn: $categoryIds, notIn: [$currentPostId] }) {
      nodes {
        id
        title
        slug
        date
      }
    }
  }
`;

// GraphQL query to fetch all post slugs for static generation
export async function generateStaticParams() {
  const GET_ALL_POST_SLUGS = gql`
    query GetAllPostSlugs {
      posts(first: 100) {
        nodes {
          slug
        }
      }
    }
  `;

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

export default async function PostDetail({ params }: { params: { slug: string } }) {
  try {
    // Fetch the post data
    const { data } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { slug: params.slug },
    });

    // If no post found, return 404
    if (!data.post) {
      return notFound();
    }

    // Get category IDs for related posts
    const categoryIds = data.post.categories.nodes.map((cat: { id: string }) => cat.id);

    // Fetch related posts if we have categories
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

    // For PublishPress Authors compatibility
    const author = data.post.author?.node || {
      id: 'default',
      name: 'Delaware DSA',
      slug: 'delaware-dsa',
      avatar: null,
    };

    const post: Post = {
      ...data.post,
      author,
    };

    // Format the post date
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <article className="bg-gray-100 py-12">
        <div className="container-page">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <ol className="flex text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-dsa-red">
                  Home
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-dsa-red">
                  Newsletter
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium truncate">{post.title}</li>
            </ol>
          </nav>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Featured image */}
            {post.featuredImage?.node && (
              <div className="w-full h-96">
                <img
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Post header */}
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

              <div className="flex items-center mb-6">
                {/* Author avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                  {post.author?.avatar?.url ? (
                    <img
                      src={post.author.avatar.url}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-dsa-red text-white font-bold">
                      {post.author?.name?.charAt(0) || 'D'}
                    </div>
                  )}
                </div>

                <div className="ml-3">
                  <p className="font-medium">{post.author?.name || 'Delaware DSA'}</p>
                  <p className="text-sm text-gray-500">{formattedDate}</p>
                </div>
              </div>

              {/* Categories */}
              {post.categories.nodes.length > 0 && (
                <div className="flex flex-wrap mb-8">
                  {post.categories.nodes.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/newsletter?category=${cat.slug}`}
                      className="mr-2 mb-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Post content */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Social sharing */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-bold mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      post.title,
                    )}&url=${encodeURIComponent(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter/${post.slug}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter/${post.slug}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      `Delaware DSA: ${post.title}`,
                    )}&body=${encodeURIComponent(
                      `Check out this article from Delaware DSA: ${process.env.NEXT_PUBLIC_BASE_URL}/newsletter/${post.slug}`,
                    )}`}
                    className="p-2 bg-gray-400 text-white rounded-full hover:bg-gray-500"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost: any) => (
                  <Link key={relatedPost.id} href={`/newsletter/${relatedPost.slug}`}>
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-bold mb-2">{relatedPost.title}</h3>
                      <p className="text-gray-500 text-sm">
                        {new Date(relatedPost.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back button */}
          <div className="mt-8">
            <Link
              href="/newsletter"
              className="inline-flex items-center text-dsa-red hover:underline"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Back to Newsletter
            </Link>
          </div>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return notFound();
  }
}
