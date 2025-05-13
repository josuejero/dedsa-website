// src/mocks/mockData.ts
export const mockData = {
  posts: {
    nodes: [
      {
        id: 'mock-1',
        title: 'Mock Post Title 1',
        slug: 'mock-post-1',
        date: new Date().toISOString(),
        excerpt: '<p>This is a mock excerpt for the first post.</p>',
        content:
          '<p>This is mock content for the first post. It includes several paragraphs of text.</p><p>Here is a second paragraph of mock content.</p>',
        featuredImage: {
          node: {
            sourceUrl: '/images/placeholder.jpg',
            altText: 'Placeholder',
          },
        },
        author: { node: { name: 'Mock Author' } },
        categories: {
          nodes: [{ id: 'cat-1', name: 'Category', slug: 'category' }],
        },
      },
      {
        id: 'mock-2',
        title: 'Mock Post Title 2',
        slug: 'mock-post-2',
        date: new Date().toISOString(),
        excerpt: '<p>This is a mock excerpt for the second post.</p>',
        content:
          '<p>This is mock content for the second post. It also includes several paragraphs.</p><p>Here is a second paragraph.</p>',
        featuredImage: {
          node: {
            sourceUrl: '/images/placeholder.jpg',
            altText: 'Placeholder',
          },
        },
        author: { node: { name: 'Another Author' } },
        categories: {
          nodes: [
            { id: 'cat-2', name: 'Another Category', slug: 'another-category' },
          ],
        },
      },
      {
        id: 'mock-3',
        title: 'Mock Post Title 3',
        slug: 'mock-post-3',
        date: new Date().toISOString(),
        excerpt: '<p>This is a mock excerpt for the third post.</p>',
        content: '<p>This is mock content for the third post.</p>',
        featuredImage: {
          node: {
            sourceUrl: '/images/placeholder.jpg',
            altText: 'Placeholder',
          },
        },
        author: { node: { name: 'Third Author' } },
        categories: {
          nodes: [{ id: 'cat-1', name: 'Category', slug: 'category' }],
        },
      },
    ],
  },
  page: {
    id: 'mock-page-1',
    title: 'Mock Page',
    content:
      '<p>This is mock content for a static page. It includes several paragraphs.</p><p>This is a second paragraph of mock content.</p>',
    slug: 'mock-page',
  },
  positions: {
    nodes: [
      {
        id: 'pos-1',
        title: 'Economic Democracy',
        content:
          '<p>We believe the economy should be democratically owned and controlled to meet human needs.</p>',
        menuOrder: 1,
      },
      {
        id: 'pos-2',
        title: 'Social Justice',
        content:
          '<p>We fight for racial, gender, and economic justice for all people.</p>',
        menuOrder: 2,
      },
      {
        id: 'pos-3',
        title: 'Workers Rights',
        content:
          '<p>We support workers organizing for better wages, benefits, and working conditions.</p>',
        menuOrder: 3,
      },
    ],
  },
  leadership: {
    nodes: [
      {
        id: 'leader-1',
        title: 'Alex Johnson',
        content:
          '<p>Alex has been an active DSA member since 2019 and works to build coalitions across progressive organizations in Delaware.</p>',
        leadership: {
          role: 'Chapter Chair',
          email: 'chair@delawardsa.org',
          order: 1,
        },
        featuredImage: {
          node: {
            sourceUrl: '/images/placeholder.jpg',
          },
        },
      },
      {
        id: 'leader-2',
        title: 'Morgan Smith',
        content:
          '<p>Morgan focuses on organizing tenant unions and housing justice initiatives across New Castle County.</p>',
        leadership: {
          role: 'Vice Chair',
          email: 'vicechair@delawardsa.org',
          order: 2,
        },
        featuredImage: {
          node: {
            sourceUrl: '/images/placeholder.jpg',
          },
        },
      },
    ],
  },
  events: {
    nodes: [
      {
        id: 'event-1',
        title: 'General Meeting',
        excerpt: '<p>Monthly general meeting for all members.</p>',
        content:
          '<p>Join us for our monthly general meeting where we will discuss upcoming campaigns and chapter business.</p>',
        date: new Date().toISOString(),
        meta: {
          eventDate: new Date().toISOString(),
          eventTime: '7:00 PM',
          eventLocation: 'Community Center, 123 Main St, Wilmington, DE',
          eventVirtualLink: 'https://zoom.us/j/mock',
        },
      },
      {
        id: 'event-2',
        title: 'Housing Justice Working Group',
        excerpt: '<p>Weekly meeting of the Housing Justice Working Group.</p>',
        content:
          '<p>Our weekly meeting to coordinate tenant organizing and housing policy initiatives.</p>',
        date: new Date().toISOString(),
        meta: {
          eventDate: new Date(
            new Date().setDate(new Date().getDate() + 2)
          ).toISOString(),
          eventTime: '6:30 PM',
          eventLocation: 'Virtual',
          eventVirtualLink: 'https://zoom.us/j/mock2',
        },
      },
      {
        id: 'event-3',
        title: 'Community Rally',
        excerpt: '<p>Rally for tenant protections downtown.</p>',
        content:
          '<p>Join us as we rally for stronger tenant protections and rent control in Wilmington.</p>',
        date: new Date().toISOString(),
        meta: {
          eventDate: new Date(
            new Date().setDate(new Date().getDate() + 10)
          ).toISOString(),
          eventTime: '1:00 PM',
          eventLocation: 'City Hall Plaza, Wilmington, DE',
          eventVirtualLink: null,
        },
      },
    ],
  },
  about: {
    foundingYear: 2021,
    achievements: [
      'Successfully advocated for tenant protections in Wilmington',
      'Organized mutual aid networks during the COVID-19 pandemic',
      'Campaigned for Medicare for All in partnership with healthcare workers',
      'Supported labor organizing efforts across the state',
      'Built coalitions with community organizations fighting for racial justice',
    ],
    missionStatement:
      "Delaware DSA's mission is to build a democratic, multi-racial socialist movement in Delaware that fights for economic, racial, and social justice for all working people.",
  },
  bylaws: {
    pdfUrl: '/documents/delaware-dsa-bylaws.pdf',
    lastUpdated: new Date().toISOString().split('T')[0],
  },
};

export default mockData;
