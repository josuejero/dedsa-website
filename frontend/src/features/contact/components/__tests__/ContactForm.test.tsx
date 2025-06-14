import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

import type { ContactFormContent } from '@/core/types/pages/contact';

const content: ContactFormContent = {
  formFields: {
    name: { label: 'Name', required: true, placeholder: '' },
    email: { label: 'Email', required: true, placeholder: '' },
    subject: {
      label: 'Subject',
      required: false,
      placeholder: '',
      options: [],
    },
    message: { label: 'Message', required: true, placeholder: '', rows: 3 },
  },
  buttons: { submit: 'Send', sending: 'Sending...' },
  validation: { requiredFields: 'Required' },
  success: { title: '', message: '', buttonText: '' },
  error: { general: '', title: '' },
};

describe('ContactForm', () => {
  it('shows validation errors', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...content} />);
    await user.click(screen.getByRole('button'));
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
  });
});
