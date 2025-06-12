import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';

import { ComponentPropsWithoutRef } from 'react';

jest.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: ComponentPropsWithoutRef<'section'>) => (
      <section {...props}>{children}</section>
    ),
    div: ({ children, ...props }: ComponentPropsWithoutRef<'div'>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
      <h1 {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
      <h2 {...props}>{children}</h2>
    ),
    p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
      <p {...props}>{children}</p>
    ),
    span: ({ children, ...props }: ComponentPropsWithoutRef<'span'>) => (
      <span {...props}>{children}</span>
    ),
  },
}));

describe('HeroSection', () => {
  it('renders main heading and subheading', () => {
    render(<HeroSection />);
    expect(screen.getByText('Delaware DSA')).toBeInTheDocument();
    expect(screen.getByText('Building Power for Working People')).toBeInTheDocument();
  });

  it('renders tagline and description', () => {
    render(<HeroSection />);
    expect(screen.getByText('Member-run, progressive activism since 2021')).toBeInTheDocument();
    expect(screen.getByText(/We're building a democratic/)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<HeroSection />);
    expect(screen.getByText('Join Our Chapter')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('has correct link destinations', () => {
    render(<HeroSection />);
    const joinLink = screen.getByText('Join Our Chapter').closest('a');
    const learnLink = screen.getByText('Learn More');

    expect(joinLink).toHaveAttribute('href', '/join');
    expect(learnLink).toHaveAttribute('href', '/about');
  });
});
