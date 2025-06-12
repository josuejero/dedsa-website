import GenericCard from '@/core/components/shared/GenericCard';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('GenericCard', () => {
  it('renders title and children', () => {
    render(
      <GenericCard title="Title">
        <span>Body</span>
      </GenericCard>
    );
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <GenericCard onClick={handleClick} isHoverable>
        Click me
      </GenericCard>
    );
    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
