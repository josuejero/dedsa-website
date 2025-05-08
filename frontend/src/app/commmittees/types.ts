import { gql } from '@apollo/client';

export interface Committee {
  id: string;
  name: string;
  description: string;
  contact: string;
  meetingSchedule: string;
  members: number;
}

export const GET_COMMITTEES = gql`
  query GetCommittees {
    page(id: "committees", idType: URI) {
      content
    }
    committees(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        content
        excerpt
        committee {
          contactEmail
          meetingSchedule
          memberCount
        }
      }
    }
  }
`;
