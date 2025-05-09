import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ContactForm from '../../app/contact/ContactForm';

describe('ContactForm Component: Rendering', () => {
  beforeEach(() => {
    render(<ContactForm />);
  });

  it('renders the form with all required fields', () => {
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
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
