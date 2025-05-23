import type {
  ContactFormContent,
  ContactPageContent,
} from '@/core/types/pages/contact';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

type Props = ContactPageContent & { contactForm: ContactFormContent };

export default function ContactPage(props: Props) {
  const {
    heading,
    fallbackContent,
    fallbackContactInfo,
    sections,
    contactForm,
  } = props;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-8">{heading}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ContactInfo
              contactInfo={fallbackContactInfo}
              sections={sections}
            />
          </div>
          <div>
            <ContactForm {...contactForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
