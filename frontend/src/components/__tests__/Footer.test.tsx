import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return (
      <a href={href} data-testid="mock-link">
        {children}
      </a>
    );
  };
});

describe('Footer Component', () => {
  beforeEach(() => {
    // Mock current year to ensure consistent tests
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2025);

    // Render component
    render(<Footer />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the organization information', () => {
    // Check for organization name
    expect(screen.getByText('Delaware DSA')).toBeInTheDocument();

    // Check for organization description
    expect(screen.getByText(/Member-run, democratic socialist organization/i)).toBeInTheDocument();
  });

  it('renders all social media links', () => {
    // Get all social links (Twitter, Facebook, Instagram)
    const socialLinks = screen.getAllByRole('link', {
      name: /(Twitter|Facebook|Instagram)/i,
    });

    // Should have at least 3 social links
    expect(socialLinks.length).toBeGreaterThanOrEqual(3);

    // Check each link has appropriate href
    const twitterLink = screen.getByRole('link', { name: /Twitter/i });
    expect(twitterLink).toHaveAttribute('href', expect.stringContaining('twitter.com'));

    const facebookLink = screen.getByRole('link', { name: /Facebook/i });
    expect(facebookLink).toHaveAttribute('href', expect.stringContaining('facebook.com'));

    const instagramLink = screen.getByRole('link', { name: /Instagram/i });
    expect(instagramLink).toHaveAttribute('href', expect.stringContaining('instagram.com'));
  });

  it('renders all navigation sections', () => {
    // Should have three sections: Learn, Get Involved, Resources
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Get Involved')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('renders all navigation links in Learn section', () => {
    // Find the Learn section
    const learnSection = screen.getByText('Learn').closest('div');

    // Check expected links in the Learn section
    expect(learnSection).toContainElement(screen.getByRole('link', { name: 'About Us' }));
    expect(learnSection).toContainElement(screen.getByRole('link', { name: 'What We Stand For' }));
    expect(learnSection).toContainElement(screen.getByRole('link', { name: 'Leadership' }));
    expect(learnSection).toContainElement(screen.getByRole('link', { name: 'Bylaws' }));
  });

  it('renders all navigation links in Get Involved section', () => {
    // Find the Get Involved section
    const getInvolvedSection = screen.getByText('Get Involved').closest('div');

    // Check expected links in the Get Involved section
    expect(getInvolvedSection).toContainElement(screen.getByRole('link', { name: 'Join DSA' }));
    expect(getInvolvedSection).toContainElement(screen.getByRole('link', { name: 'Committees' }));
    expect(getInvolvedSection).toContainElement(screen.getByRole('link', { name: 'Events' }));
    expect(getInvolvedSection).toContainElement(screen.getByRole('link', { name: 'Newsletter' }));
  });

  it('renders all navigation links in Resources section', () => {
    // Find the Resources section
    const resourcesSection = screen.getByText('Resources').closest('div');

    // Check expected links in the Resources section
    expect(resourcesSection).toContainElement(
      screen.getByRole('link', { name: 'Membership Handbook' }),
    );
    expect(resourcesSection).toContainElement(screen.getByRole('link', { name: 'Voting Guide' }));
    expect(resourcesSection).toContainElement(screen.getByRole('link', { name: 'UD YDSA' }));
    expect(resourcesSection).toContainElement(screen.getByRole('link', { name: 'Contact' }));
  });

  it('renders the copyright information with current year', () => {
    // Check for copyright text with the correct year
    expect(screen.getByText('© 2025 Delaware DSA. All rights reserved.')).toBeInTheDocument();
  });

  it('renders the privacy policy link', () => {
    // Check for privacy policy link
    const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
  });

  it('renders with proper semantic HTML structure', () => {
    // Check that component uses <footer> element
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();

    // Check for proper heading structure
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBeGreaterThanOrEqual(4); // At least 4 h3 headings
  });

  it('applies the correct CSS classes for styling', () => {
    // Check footer background color
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-gray-900');
    expect(footer).toHaveClass('text-white');

    // Check container class
    const container = footer.querySelector('.container-page');
    expect(container).toBeInTheDocument();

    // Check grid layout
    const grid = container!.querySelector('.grid');
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-4');
  });

  it('renders external links with proper attributes', () => {
    // Get all social links
    const socialLinks = screen.getAllByRole('link', {
      name: /(Twitter|Facebook|Instagram)/i,
    });

    // Each social link should have target="_blank" and rel="noopener noreferrer"
    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders responsive layout classes', () => {
    // Check responsive classes on copyright section
    const copyrightSection = screen
      .getByText('© 2025 Delaware DSA. All rights reserved.')
      .closest('div');
    expect(copyrightSection).toHaveClass('flex');
    expect(copyrightSection).toHaveClass('flex-col');
    expect(copyrightSection).toHaveClass('md:flex-row');

    // Check margin classes for mobile vs desktop
    const privacyPolicy = screen.getByText('Privacy Policy').closest('p');
    expect(privacyPolicy).toHaveClass('mt-2');
    expect(privacyPolicy).toHaveClass('md:mt-0');
  });
});
