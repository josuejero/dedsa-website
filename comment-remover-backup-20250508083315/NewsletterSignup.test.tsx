import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsletterSignup from '../NewsletterSignup';
import * as newsletterHook from '../../hooks/useNewsletterSubscription';

// Mock the custom hook
jest.mock('@/hooks/useNewsletterSubscription');

describe('NewsletterSignup Component', () => {
  // Helper function to setup hook mocks with different states
  const setupHookMock = (options = {}) => {
    const defaultMock = {
      email: '',
      setEmail: jest.fn(),
      status: 'idle',
      subscribe: jest.fn(),
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
      reset: jest.fn(),
    };

    // Override defaults with provided options
    const mockImplementation = {
      ...defaultMock,
      ...options,
    };

    // Apply mock to hook
    jest
      .spyOn(newsletterHook, 'useNewsletterSubscription')
      .mockImplementation(
        () =>
          mockImplementation as unknown as ReturnType<
            typeof newsletterHook.useNewsletterSubscription
          >,
      );

    return mockImplementation;
  };

  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
  });

  it('renders the banner variant by default', () => {
    setupHookMock();
    render(<NewsletterSignup />);

    // Check title and description
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByText(/subscribe to our newsletter/i)).toBeInTheDocument();

    // Check form elements
    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();

    // Check styling classes
    const container = screen.getByText('Stay Updated').closest('div');
    expect(container).toHaveClass('bg-dsa-red');
    expect(container).toHaveClass('text-white');
  });

  it('renders the sidebar variant when specified', () => {
    setupHookMock();
    render(<NewsletterSignup variant="sidebar" />);

    // Check sidebar specific styling
    const container = screen.getByText('Stay Updated').closest('div');
    expect(container).toHaveClass('bg-white');
    expect(container).not.toHaveClass('text-white');

    // Check input styling
    const input = screen.getByPlaceholderText('Your email address');
    expect(input).toHaveClass('w-full');
    expect(input).not.toHaveClass('sm:w-2/3');
  });

  it('renders the footer variant when specified', () => {
    setupHookMock();
    render(<NewsletterSignup variant="footer" />);

    // Check footer specific styling
    const container = screen.getByText('Stay Updated').closest('div');
    expect(container).toHaveClass('bg-gray-800');
    expect(container).toHaveClass('text-white');
  });

  it('allows custom title and description', () => {
    setupHookMock();
    const customTitle = 'Custom Newsletter Title';
    const customDescription = 'Custom newsletter description text.';

    render(<NewsletterSignup title={customTitle} description={customDescription} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customDescription)).toBeInTheDocument();
  });

  it('handles email input changes', () => {
    const mockSetEmail = jest.fn();
    setupHookMock({ setEmail: mockSetEmail });

    render(<NewsletterSignup />);

    // Get the input element
    const emailInput = screen.getByPlaceholderText('Your email address');

    // Simulate typing in the input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Check if setEmail was called with the correct value
    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('handles form submission', () => {
    const mockSubscribe = jest.fn((e) => e.preventDefault());
    setupHookMock({ subscribe: mockSubscribe });

    render(<NewsletterSignup />);

    // Get the form and submit button
    const form = screen.getByRole('button', { name: 'Subscribe' }).closest('form');

    // Submit the form
    fireEvent.submit(form!);

    // Check if subscribe function was called
    expect(mockSubscribe).toHaveBeenCalled();
  });

  it('displays loading state while submitting', () => {
    setupHookMock({ isSubmitting: true });

    render(<NewsletterSignup />);

    // Check if loading indicator is shown
    expect(screen.getByText('Subscribing...')).toBeInTheDocument();

    // Button should be disabled
    const submitButton = screen.getByRole('button', { name: 'Subscribing...' });
    expect(submitButton).toBeDisabled();
  });

  it('displays success message after successful submission', () => {
    setupHookMock({ isSuccess: true });

    render(<NewsletterSignup />);

    // Check if success message is shown
    expect(screen.getByText('Thank You!')).toBeInTheDocument();
    expect(screen.getByText(/successfully subscribed/i)).toBeInTheDocument();

    // Check for reset button
    expect(screen.getByRole('button', { name: /subscribe another email/i })).toBeInTheDocument();
  });

  it('calls reset function when clicking "Subscribe another email"', () => {
    const mockReset = jest.fn();
    setupHookMock({ isSuccess: true, reset: mockReset });

    render(<NewsletterSignup />);

    // Find and click the reset button
    const resetButton = screen.getByRole('button', { name: /subscribe another email/i });
    fireEvent.click(resetButton);

    // Check if reset was called
    expect(mockReset).toHaveBeenCalled();
  });

  it('displays error message when subscription fails', () => {
    const errorMessage = 'Failed to subscribe. Please try again.';
    setupHookMock({ isError: true, errorMessage });

    render(<NewsletterSignup />);

    // Check if error message is shown
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('bg-red-100');
  });

  it('applies responsive design classes correctly', () => {
    setupHookMock();

    render(<NewsletterSignup />);

    // Check form layout classes for responsiveness
    const form = screen.getByRole('button', { name: 'Subscribe' }).closest('form');
    expect(form).toHaveClass('flex');
    expect(form).toHaveClass('flex-col');
    expect(form).toHaveClass('sm:flex-row');

    // Check input responsive classes
    const input = screen.getByPlaceholderText('Your email address');
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('sm:w-2/3');

    // Check button responsive classes
    const button = screen.getByRole('button', { name: 'Subscribe' });
    expect(button).toHaveClass('mt-2');
    expect(button).toHaveClass('sm:mt-0');
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('sm:w-1/3');
  });
});
