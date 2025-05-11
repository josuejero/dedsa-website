// ./frontend/src/app/what-we-stand-for/queries.ts
import { gql } from '@apollo/client';

/**
 * GraphQL query to fetch positions page content and position items
 * Returns both the main page content and all position items ordered by menu order
 */
export const GET_POSITIONS_PAGE = gql`
  query GetPositionsPage {
    page(id: "what-we-stand-for", idType: URI) {
      id
      content
    }
    positions(
      first: 100
      where: { orderby: { field: MENU_ORDER, order: ASC } }
    ) {
      nodes {
        id
        title
        content
        menuOrder
      }
    }
  }
`;
