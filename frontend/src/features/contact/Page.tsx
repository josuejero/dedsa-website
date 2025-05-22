import type { ContactPageContent, ContactFormContent } from '@/core/types/pages/contact';
type Props = ContactPageContent & { contactForm: ContactFormContent };
export default function ContactPage(props: Props) {
  // TODO: render the contact page using props.heading, props.sections, props.contactForm, etc.
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}
