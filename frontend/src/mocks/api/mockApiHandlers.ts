// src/mocks/api/mockApiHandlers.ts
import { mockData } from '../mockData';
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

export async function handleGraphQLRequest(req: any) {
  // Extract operation information
  const operationName = req.operationName || '';
  const variables = req.variables || {};

  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 300));

  console.log(`Mock API handling operation: ${operationName}`);

  switch (operationName) {
    case 'GetRecentPosts':
      return { data: { posts: mockData.posts } };

    case 'GetPostBySlug': {
      const { slug } = variables;
      const post =
        mockData.posts.nodes.find((p) => p.slug === slug) ||
        mockData.posts.nodes[0];
      return { data: { post } };
    }

    case 'GetPositionsPage':
      return {
        data: {
          page: {
            ...mockData.page,
            content: '<p>Mock positions page content</p>',
          },
          positions: mockData.positions,
        },
      };

    case 'GetUdYdsaPage':
      return {
        data: {
          page: {
            ...mockData.page,
            content:
              '<p>University of Delaware Young Democratic Socialists of America (UD YDSA) is the student chapter of DSA at the University of Delaware.</p>',
            udYdsa: {
              contactEmail: 'udydsa@example.org',
              meetingLocation:
                'Morris Library, Room 202, University of Delaware',
              meetingSchedule:
                'Every Wednesday at 7:00 PM during the academic year',
              socialMedia: {
                instagram: 'https://instagram.com',
                twitter: 'https://twitter.com',
                facebook: 'https://facebook.com',
              },
            },
          },
        },
      };

    case 'GetContactInfo':
      return {
        data: {
          page: {
            ...mockData.page,
            content:
              '<p>Delaware DSA welcomes your questions, comments, and involvement.</p>',
            contactInfo: {
              email: 'info@delawardsa.org',
              phone: '(302) 555-0123',
              mailingAddress:
                'Delaware DSA\nP.O. Box 12345\nWilmington, DE 19801',
            },
          },
        },
      };

    case 'GetJoinPage':
      return {
        data: {
          page: {
            ...mockData.page,
            content:
              '<p>Join us in building a more just and democratic society!</p>',
          },
        },
      };

    case 'GetLeadership':
      return {
        data: {
          page: {
            ...mockData.page,
            content:
              '<p>Delaware DSA is a member-led organization with a democratically elected leadership team.</p>',
          },
          leadership: mockData.leadership,
        },
      };

    case 'GetBylawsPage':
      return {
        data: {
          page: {
            ...mockData.page,
            content:
              '<p>The Delaware DSA chapter bylaws outline our governance structure.</p>',
            bylaws: mockData.bylaws,
          },
        },
      };

    case 'GetAboutPage':
      return {
        data: {
          page: {
            ...mockData.page,
            content:
              '<p>Delaware DSA is the Delaware state chapter of the Democratic Socialists of America.</p>',
            about: mockData.about,
          },
        },
      };

    case 'GetEvents':
      return {
        data: {
          events: mockData.events,
        },
      };

    case 'GetAllPostSlugs':
      return {
        data: {
          posts: {
            nodes: mockData.posts.nodes.map((post) => ({ slug: post.slug })),
          },
        },
      };

    case 'GetRelatedPosts':
      return {
        data: {
          posts: {
            nodes: mockData.posts.nodes.slice(1).map((post) => ({
              id: post.id,
              title: post.title,
              date: post.date,
              slug: post.slug,
            })),
          },
        },
      };

    default:
      // Generic fallback for any unhandled query
      return {
        data: {
          page: mockData.page,
          posts: mockData.posts,
          post: mockData.posts.nodes[0],
        },
      };
  }
}
