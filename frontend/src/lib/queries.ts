import { gql } from '@apollo/client';

export const GET_RECENT_POSTS = gql`
  query GetRecentPosts($first: Int = 3) {
    posts(first: $first) {
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

export const GET_POST_BY_SLUG = gql`
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

export const GET_LEADERSHIP = gql`
  query GetLeadership {
    page(id: "leadership", idType: URI) {
      content
    }
    leadership(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        excerpt
        content
        leadership {
          role
          email
          order
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const GET_POSITIONS_PAGE = gql`
  query GetPositionsPage {
    page(id: "what-we-stand-for", idType: URI) {
      content
    }
    positions(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        content
        menuOrder
      }
    }
  }
`;
