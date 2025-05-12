import { gql } from '@apollo/client';

export const GET_HOME_CONTENT = gql`
  query GetHomeContent {
    acfOptions {
      homeContent {
        heroSection {
          title
          subtitle
          joinButton
          newsletterButton
        }
      }
    }
  }
`;

// Add more component queries for other pages
