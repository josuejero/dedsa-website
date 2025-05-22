import { contentService } from '@/core/services/contentService';
import type {
  ContactFormContent,
  ContactPageContent,
} from '@/core/types/pages/contact';
import ContactFeature from '@/features/contact';

export default function ContactPage() {
  const pageData = contentService.getPageContent(
    'contact'
  ) as ContactPageContent & {
    contactForm: ContactFormContent;
  };

  // Destructure to avoid property conflicts
  const { contactForm, ...pageContent } = pageData;

  return <ContactFeature {...pageContent} contactForm={contactForm} />;
}
