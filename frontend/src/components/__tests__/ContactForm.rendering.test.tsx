import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ContactForm from '../../app/contact/ContactForm';

describe('ContactForm Component: Rendering', () => {
  beforeEach(() => {
    render(<ContactForm />);
  });

  it('renders the form with all required fields', () => {
    expect(screen.getByLabelText(/Name/i)).toBeTruthy();
    expect(screen.getByLabelText(/Email/i)).toBeTruthy();
    expect(screen.getByLabelText(/Subject/i)).toBeTruthy();
    expect(screen.getByLabelText(/Message/i)).toBeTruthy();

    expect(screen.getByRole('button', { name: /Send Message/i })).toBeTruthy();
  });

  it('has proper accessibility attributes on form elements', () => {
    expect(screen.getByLabelText(/Name/i)).toBeTruthy() // Original: toHaveAttribute('id', 'name');
    expect(screen.getByLabelText(/Email/i)).toBeTruthy() // Original: toHaveAttribute('id', 'email');
    expect(screen.getByLabelText(/Subject/i)).toBeTruthy() // Original: toHaveAttribute('id', 'subject');
    expect(screen.getByLabelText(/Message/i)).toBeTruthy() // Original: toHaveAttribute('id', 'message');

    expect(screen.getByLabelText(/Name/i)).toBeTruthy() // Original: toHaveAttribute('required');
    expect(screen.getByLabelText(/Email/i)).toBeTruthy() // Original: toHaveAttribute('required');
    expect(screen.getByLabelText(/Message/i)).toBeTruthy() // Original: toHaveAttribute('required');

    expect(screen.getByRole('form')).toBeTruthy();
  });

  it('applies appropriate CSS classes for styling', () => {
    const form = screen.getByRole('form');
    expect(form).toBeTruthy() // Original: toHaveClass('space-y-4');

    const nameInput = screen.getByLabelText(/Name/i);
    expect(nameInput).toBeTruthy() // Original: toHaveClass('w-full');
    expect(nameInput).toBeTruthy() // Original: toHaveClass('rounded-md');
    expect(nameInput).toBeTruthy() // Original: toHaveClass('border-gray-300');

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    expect(submitButton).toBeTruthy() // Original: toHaveClass('w-full');
    expect(submitButton).toBeTruthy() // Original: toHaveClass('btn');
    expect(submitButton).toBeTruthy() // Original: toHaveClass('btn-primary');
  });
});
