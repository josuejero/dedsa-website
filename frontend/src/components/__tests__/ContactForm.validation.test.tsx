import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../../app/contact/ContactForm';

describe('ContactForm Component: Validation', () => {
  beforeEach(() => {
    render(<ContactForm />);
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
});
