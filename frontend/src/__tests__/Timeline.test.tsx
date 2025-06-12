import Timeline from '@/features/about/components/Timeline';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

describe('Timeline', () => {
  it('shows provided years', () => {
    render(<Timeline foundingYear={2000} yearsActive={5} />);
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
