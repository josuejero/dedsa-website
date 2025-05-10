import { gql } from '@apollo/client';

// Simple query to fetch recent posts
export const GET_RECENT_POSTS = gql`
  query GetRecentPosts {
    posts(first: 3) {
      nodes {
        id
        title
        date
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

// Query for a single post by slug
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      slug
    }
  }
`;

// add a query for related posts
export const GET_RELATED_POSTS = gql`
  query GetRelatedPosts($categoryIds: [ID!]!, $currentPostId: ID!) {
    posts(
      first: 3
      where: {
        categoryIn: $categoryIds
        notIn: [$currentPostId]
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        id
        title
        date
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

// Query to fetch all post slugs for static generation
export const GET_ALL_POST_SLUGS = gql`
  query GetAllPostSlugs {
    posts {
      nodes {
        slug
      }
    }
  }
`;
