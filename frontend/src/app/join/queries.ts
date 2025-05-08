import { gql } from '@apollo/client';

export const GET_JOIN_PAGE = gql`
  query GetJoinPage {
    page(id: "join", idType: URI) {
      content
    }
  }
`;
