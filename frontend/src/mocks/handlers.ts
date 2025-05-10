interface PostsData {
  nodes: Array<{ title: string; content: string; slug: string }>;
}

interface PageData {
  title: string;
  content: string;
  slug: string;
}

interface PositionsData {
  nodes: Array<{ title: string; description: string }>;
}

interface LeadershipData {
  nodes: Array<{ name: string; role: string }>;
}

interface Handler {
  operationName: string;
  data: PostsData | PageData | PositionsData | LeadershipData;
}

export const handlers: Handler[] = [
  {
    operationName: 'posts',
    data: {
      nodes: [
        {
          title: 'Placeholder Post',
          content: 'Content will be loaded at runtime',
          slug: 'placeholder'
        }
      ]
    }
  },
  {
    operationName: 'page',
    data: {
      title: 'Placeholder Page',
      content: 'Content will be loaded at runtime',
      slug: 'placeholder'
    }
  },
  {
    operationName: 'positions',
    data: {
      nodes: [
        {
          title: 'Placeholder Position',
          description: 'Position details will be loaded at runtime'
        }
      ]
    }
  },
  {
    operationName: 'leadership',
    data: {
      nodes: [
        {
          name: 'Placeholder Leader',
          role: 'Role will be loaded at runtime'
        }
      ]
    }
  }
];
