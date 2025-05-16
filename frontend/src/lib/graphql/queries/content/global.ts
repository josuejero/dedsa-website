import { gql } from '@apollo/client';

export const GET_GLOBAL_CONTENT = gql`
  query GetGlobalContent {
    acfOptions {
      globalContent {
        siteName
        tagline
        joinButtonText
        contactInfo {
          email
          phone
          mailingAddress
        }
        socialLinks {
          twitter
          facebook
          instagram
        }
      }
    }
  }
`;

export const GET_HOME_CONTENT = gql`
  query GetHomeContent {
    acfOptions {
      homeContent {
        heroTitle
        heroSubtitle
        heroDescription
      }
    }
  }
`;
