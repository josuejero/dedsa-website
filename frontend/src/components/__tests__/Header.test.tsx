/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Header';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

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

// Mock Next.js Image component
jest.mock('next/image', () => {
  return ({ src, alt }: { src: string; alt: string }) => {
    return <img src={src as string} alt={alt} data-testid="mock-image" />;
  };
});

describe('Header Component', () => {
  it('renders the logo and site name', () => {
    render(<Header />);

    // Check for logo container
    const logoContainer = screen.getByRole('link', { name: /delaware dsa/i });
    expect(logoContainer).toBeInTheDocument();

    // Check for site name text
    expect(screen.getByText('Delaware DSA')).toBeInTheDocument();
  });

  it('renders all navigation items on desktop', () => {
    render(<Header />);

    // Array of expected navigation items
    const navItems = [
      'Home',
      'Newsletter',
      'What We Stand For',
      'Calendar',
      'Leadership & Structure',
      'Committees & Working Groups',
      'Bylaws',
      'Contact',
      'UD YDSA',
    ];

    // Check each nav item is present
    navItems.forEach((item) => {
      const link = screen.getByRole('link', { name: item });
      expect(link).toBeInTheDocument();
    });

    // Check Join button
    const joinButton = screen.getByRole('link', { name: 'Join Our Chapter' });
    expect(joinButton).toBeInTheDocument();
  });

  it('closes mobile menu when a navigation link is clicked', () => {
    // Mock window.matchMedia for mobile viewport
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 768px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<Header />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', {
      name: /open menu|close menu/i,
    });
    fireEvent.click(menuButton);

    // Mobile navigation should be visible
    expect(screen.getByRole('navigation')).toBeVisible();

    // Click a navigation link
    const newsletterLink = screen.getByRole('link', { name: 'Newsletter' });
    fireEvent.click(newsletterLink);

    // Mobile navigation should be hidden after clicking a link
    expect(screen.queryByRole('navigation', { hidden: true })).not.toBeVisible();
  });

  it('applies active state to current page in navigation', () => {
    // Mock Next.js router with current path
    jest.doMock('next/navigation', () => ({
      useRouter: () => ({
        push: jest.fn(),
      }),
      usePathname: () => '/newsletter',
    }));

    // Re-render with updated mock
    render(<Header />);

    // Check if Newsletter link has active class (implementation may vary)
    const newsletterLink = screen.getByRole('link', { name: 'Newsletter' });

    // This test needs to be adapted to your actual active state implementation
    // For example, if active links have a specific class:
    expect(newsletterLink.className).toContain('text-dsa-red');

    // Or if active links have a specific style:
    expect(newsletterLink).toHaveStyle({ color: 'var(--dsa-red)' });
  });

  it('renders header with correct accessibility attributes', () => {
    render(<Header />);

    // Header should have appropriate role
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Navigation should have appropriate role
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    // Mobile menu button should have aria-label
    const menuButton = screen.getByRole('button', {
      name: /open menu|close menu/i,
    });
    expect(menuButton).toHaveAttribute('aria-label');
  });
});
