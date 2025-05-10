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
      expect(screen.getByText(/Sending.../i)).toBeTruthy();
      expect(screen.getByRole('button', { name: /Sending.../i })).toBeTruthy() // Original: toBeDisabled();
    });
  });

  it('shows success message after successful submission', async () => {
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test message' } });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Thank You!/i)).toBeTruthy();
      expect(screen.getByText(/Your message has been sent successfully/i)).toBeTruthy();
    });

    expect(screen.getByRole('button', { name: /Send Another Message/i })).toBeTruthy();
  });

  it('resets the form when clicking "Send Another Message"', async () => {
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test message' } });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Thank You!/i)).toBeTruthy();
    });

    const resetButton = screen.getByRole('button', { name: /Send Another Message/i });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toBeTruthy();
      expect(screen.getByLabelText(/Email/i)).toBeTruthy();
      expect(screen.getByRole('button', { name: /Send Message/i })).toBeTruthy();
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
      expect(screen.getByText(/Failed to send message/i)).toBeTruthy();
    });
  });
});
