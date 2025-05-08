import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../../app/contact/ContactForm';


global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  }),
) as jest.Mock;

describe('ContactForm Component', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();

    
    render(<ContactForm />);
  });

  it('renders the form with all required fields', () => {
    
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();

    
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('validates required fields on submission', async () => {
    
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    
    await waitFor(() => {
      
      expect(screen.getByText(/Please fill out all required fields/i)).toBeInTheDocument();
    });

    
    expect(screen.getByLabelText(/Name/i)).toBeInvalid();
    expect(screen.getByLabelText(/Email/i)).toBeInvalid();
    expect(screen.getByLabelText(/Message/i)).toBeInvalid();
  });

  it('handles input changes correctly', () => {
    
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const subjectSelect = screen.getByLabelText(/Subject/i);
    const messageInput = screen.getByLabelText(/Message/i);

    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectSelect, { target: { value: 'General Inquiry' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });

    
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(subjectSelect).toHaveValue('General Inquiry');
    expect(messageInput).toHaveValue('This is a test message.');
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

  it('validates email format', async () => {
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test message' } });

    
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    
    await waitFor(() => {
      expect(screen.getByLabelText(/Email/i)).toBeInvalid();
    });
  });

  it('has proper accessibility attributes on form elements', () => {
    

    
    expect(screen.getByLabelText(/Name/i)).toHaveAttribute('id', 'name');
    expect(screen.getByLabelText(/Email/i)).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText(/Subject/i)).toHaveAttribute('id', 'subject');
    expect(screen.getByLabelText(/Message/i)).toHaveAttribute('id', 'message');

    
    expect(screen.getByLabelText(/Name/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/Email/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/Message/i)).toHaveAttribute('required');

    
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('applies appropriate CSS classes for styling', () => {
    
    const form = screen.getByRole('form');
    expect(form).toHaveClass('space-y-4');

    
    const nameInput = screen.getByLabelText(/Name/i);
    expect(nameInput).toHaveClass('w-full');
    expect(nameInput).toHaveClass('rounded-md');
    expect(nameInput).toHaveClass('border-gray-300');

    
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    expect(submitButton).toHaveClass('w-full');
    expect(submitButton).toHaveClass('btn');
    expect(submitButton).toHaveClass('btn-primary');
  });
});
