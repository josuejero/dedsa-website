import AboutHero from '@/features/about/components/AboutHero';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

describe('AboutHero', () => {
  it('renders default mission statement', () => {
    render(<AboutHero />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('uses provided mission statement', () => {
    render(<AboutHero missionStatement="Custom" />);
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });
});
