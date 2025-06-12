import GenericSection from '@/core/components/shared/GenericSection';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

it('renders heading and children', () => {
  render(
    <GenericSection heading="Test Heading">
      <p>Child content</p>
    </GenericSection>
  );

  expect(
    screen.getByRole('heading', { name: 'Test Heading' })
  ).toBeInTheDocument();
  expect(screen.getByText('Child content')).toBeInTheDocument();
});
