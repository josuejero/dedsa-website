import { gql } from '@apollo/client';

export const GET_POSTS_AND_CATEGORIES = gql`
  query GetPostsAndCategories {
    posts(first: 20) {
      nodes {
        id
        title
        date
        slug
        excerpt
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
      }
    }
    categories {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;
