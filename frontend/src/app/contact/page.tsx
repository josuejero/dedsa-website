import { contentService } from '@/core/services/contentService';
import type {
  ContactFormContent,
  ContactPageContent,
} from '@/core/types/pages/contact';
import ContactFeature from '@/features/contact';

export default function ContactPage() {
  const data = contentService.getPageContent(
    'contact'
  ) as ContactPageContent & {
    contactForm: ContactFormContent;
  };
  return <ContactFeature {...data} {...data.contactForm} />;
}
