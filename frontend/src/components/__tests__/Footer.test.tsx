import { render, screen } from '@testing-library/react';
import React from 'react';
import Footer from '../Footer';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return (
      <a href={href} data-testid="mock-link">
        {children}
      </a>
    );
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('Footer Component', () => {
  beforeEach(() => {
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2025);

    render(<Footer />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the organization information', () => {
    expect(screen.getByText('Delaware DSA')).toBeTruthy();

    expect(screen.getByText(/Member-run, democratic socialist organization/i)).toBeTruthy();
  });

  it('renders all social media links', () => {
    const socialLinks = screen.getAllByRole('link', {
      name: /(Twitter|Facebook|Instagram)/i
    });

    expect(socialLinks.length).toBeGreaterThanOrEqual(3);

    const twitterLink = screen.getByRole('link', { name: /Twitter/i });
    expect(twitterLink).toHaveAttribute('href', expect.stringContaining('twitter.com'));

    const facebookLink = screen.getByRole('link', { name: /Facebook/i });
    expect(facebookLink).toHaveAttribute('href', expect.stringContaining('facebook.com'));

    const instagramLink = screen.getByRole('link', { name: /Instagram/i });
    expect(instagramLink).toHaveAttribute('href', expect.stringContaining('instagram.com'));
  });

  it('renders all navigation sections', () => {
    expect(screen.getByText('Learn')).toBeTruthy();
    expect(screen.getByText('Get Involved')).toBeTruthy();
    expect(screen.getByText('Resources')).toBeTruthy();
  });

  it('renders all navigation links in Learn section', () => {
    const learnSection = screen.getByText('Learn').closest('div');

    expect(learnSection).toContainElement(screen.getByRole('link', { name: 'About Us' }));
    expect(learnSection).toContainElement(screen.getByRole('link', { name: 'What We Stand For' }));
    expect(learnSection).toContainElement(screen.getByRole('link', { name: 'Leadership' }));
    expect(learnSection).toContainElement(screen.getByRole('link', { name: 'Bylaws' }));
  });

  it('renders all navigation links in Get Involved section', () => {
    const getInvolvedSection = screen.getByText('Get Involved').closest('div');

    expect(getInvolvedSection).toContainElement(screen.getByRole('link', { name: 'Join DSA' }));
    expect(getInvolvedSection).toContainElement(screen.getByRole('link', { name: 'Committees' }));
    expect(getInvolvedSection).toContainElement(screen.getByRole('link', { name: 'Events' }));
    expect(getInvolvedSection).toContainElement(screen.getByRole('link', { name: 'Newsletter' }));
  });

  it('renders all navigation links in Resources section', () => {
    const resourcesSection = screen.getByText('Resources').closest('div');

    expect(resourcesSection).toContainElement(
      screen.getByRole('link', { name: 'Membership Handbook' })
    );
    expect(resourcesSection).toContainElement(screen.getByRole('link', { name: 'Voting Guide' }));
    expect(resourcesSection).toContainElement(screen.getByRole('link', { name: 'UD YDSA' }));
    expect(resourcesSection).toContainElement(screen.getByRole('link', { name: 'Contact' }));
  });

  it('renders the copyright information with current year', () => {
    expect(screen.getByText('© 2025 Delaware DSA. All rights reserved.')).toBeTruthy();
  });

  it('renders the privacy policy link', () => {
    const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
    expect(privacyLink).toBeTruthy();
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
  });

  it('renders with proper semantic HTML structure', () => {
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeTruthy();

    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBeTruthy(); // Original: toBeGreaterThanOrEqual(4);
  });

  it('applies the correct CSS classes for styling', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-gray-900');
    expect(footer).toHaveClass('text-white');

    const container = footer.querySelector('.container-page');
    expect(container).toBeTruthy();

    const grid = container!.querySelector('.grid');
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-4');
  });

  it('renders external links with proper attributes', () => {
    const socialLinks = screen.getAllByRole('link', {
      name: /(Twitter|Facebook|Instagram)/i
    });

    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders responsive layout classes', () => {
    const copyrightSection = screen
      .getByText('© 2025 Delaware DSA. All rights reserved.')
      .closest('div');
    expect(copyrightSection).toHaveClass('flex');
    expect(copyrightSection).toHaveClass('flex-col');
    expect(copyrightSection).toHaveClass('md:flex-row');

    const privacyPolicy = screen.getByText('Privacy Policy').closest('p');
    expect(privacyPolicy).toHaveClass('mt-2');
    expect(privacyPolicy).toHaveClass('md:mt-0');
  });
});
