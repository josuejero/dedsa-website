import NewsletterPage from '@/features/newsletter/Page';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

const props = {
  title: 'Newsletters',
  noPostsMessage: 'No posts',
  errorTitle: 'Error',
  errorMessage: 'Failed to load',
  errorActionLabel: 'Back',
};

describe('NewsletterPage', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows loading state', () => {
    (globalThis.fetch as any) = jest
      .fn()
      .mockResolvedValue({ json: async () => [] });
    render(<NewsletterPage {...props} />);
    expect(screen.getByText('Loading newsletters...')).toBeInTheDocument();
  });

  it('renders newsletters after fetch', async () => {
    (globalThis.fetch as any) = jest
      .fn()
      .mockResolvedValue({
        json: async () => [
          {
            id: '1',
            title: 'Post',
            date: '2024-01-01',
            slug: 'post',
            excerpt: 'excerpt',
          },
        ],
      });
    render(<NewsletterPage {...props} />);
    await screen.findByText('Post');
    expect(screen.getByText('Post')).toBeInTheDocument();
  });

  it('handles fetch error', async () => {
    (globalThis.fetch as any) = jest.fn().mockRejectedValue(new Error('fail'));
    render(<NewsletterPage {...props} />);
    await screen.findByText('Failed to load');
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });
});
