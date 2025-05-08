

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header';


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));


jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return (
      <a href={href} data-testid="mock-link">
        {children}
      </a>
    );
  };
});


jest.mock('next/image', () => {
  return ({ src, alt }: { src: string; alt: string }) => {
    return <img src={src as string} alt={alt} data-testid="mock-image" />;
  };
});

describe('Header Component', () => {
  it('renders the logo and site name', () => {
    render(<Header />);

    
    const logoContainer = screen.getByRole('link', { name: /delaware dsa/i });
    expect(logoContainer).toBeInTheDocument();

    
    expect(screen.getByText('Delaware DSA')).toBeInTheDocument();
  });

  it('renders all navigation items on desktop', () => {
    render(<Header />);

    
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

    
    navItems.forEach((item) => {
      const link = screen.getByRole('link', { name: item });
      expect(link).toBeInTheDocument();
    });

    
    const joinButton = screen.getByRole('link', { name: 'Join Our Chapter' });
    expect(joinButton).toBeInTheDocument();
  });

  it('closes mobile menu when a navigation link is clicked', () => {
    
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

    
    const menuButton = screen.getByRole('button', {
      name: /open menu|close menu/i,
    });
    fireEvent.click(menuButton);

    
    expect(screen.getByRole('navigation')).toBeVisible();

    
    const newsletterLink = screen.getByRole('link', { name: 'Newsletter' });
    fireEvent.click(newsletterLink);

    
    expect(screen.queryByRole('navigation', { hidden: true })).not.toBeVisible();
  });

  it('applies active state to current page in navigation', () => {
    
    jest.doMock('next/navigation', () => ({
      useRouter: () => ({
        push: jest.fn(),
      }),
      usePathname: () => '/newsletter',
    }));

    
    render(<Header />);

    
    const newsletterLink = screen.getByRole('link', { name: 'Newsletter' });

    
    
    expect(newsletterLink.className).toContain('text-dsa-red');

    
    expect(newsletterLink).toHaveStyle({ color: 'var(--dsa-red)' });
  });

  it('renders header with correct accessibility attributes', () => {
    render(<Header />);

    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    
    const menuButton = screen.getByRole('button', {
      name: /open menu|close menu/i,
    });
    expect(menuButton).toHaveAttribute('aria-label');
  });
});
