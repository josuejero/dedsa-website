import ContactInfo from '@/features/contact/components/ContactInfo';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

const contactInfo = {
  email: 'test@example.com',
  phone: '555-1234',
  mailingAddress: '123 Main St',
};

const sections = {
  getInTouch: {
    title: 'Get In Touch',
    contactTypes: {
      email: { label: 'Email' },
      phone: { label: 'Phone' },
      mailingAddress: { label: 'Mailing Address' },
    },
  },
  sendMessage: { title: 'Send Message' },
  followUs: { title: 'Follow Us', socialLinks: [] },
} as unknown as import('@/core/types/pages/contact').ContactPageContent['sections'];

describe('ContactInfo', () => {
  it('renders contact information', () => {
    render(<ContactInfo contactInfo={contactInfo} sections={sections} />);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('555-1234')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
  });
});
