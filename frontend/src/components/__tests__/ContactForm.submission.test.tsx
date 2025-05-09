import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactForm from '../../app/contact/ContactForm';

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true })
  })
) as jest.Mock;

describe('ContactForm Component: Submission', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<ContactForm />);
  });

  it('shows loading state during form submission', async () => {
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test message' } });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Sending.../i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sending.../i })).toBeDisabled();
    });
  });

  it('shows success message after successful submission', async () => {
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test message' } });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Thank You!/i)).toBeInTheDocument();
      expect(screen.getByText(/Your message has been sent successfully/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /Send Another Message/i })).toBeInTheDocument();
  });

  it('resets the form when clicking "Send Another Message"', async () => {
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test message' } });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Thank You!/i)).toBeInTheDocument();
    });

    const resetButton = screen.getByRole('button', { name: /Send Another Message/i });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
    });
  });

  it('handles form submission errors', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test message' } });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Failed to send message/i)).toBeInTheDocument();
    });
  });
});
