// src/app/contact/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import { MailIcon, MapPinIcon, PhoneIcon } from '../../components/ui/Icons';
import pageJson from '../../content/contact/page.json';
import { ContactPageContent } from '../../types/content/contact';
import ContactForm from './ContactForm';

export const dynamic = 'force-dynamic';
export const revalidate = 300;
export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Delaware DSA.',
};

const c = pageJson as ContactPageContent;
const Q = `query{page(id:"contact",idType:URI){content,contactInfo{email,phone,mailingAddress}}}`;

export default async function ContactPage() {
  let data;
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '/api/contact',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'force-cache',
        body: JSON.stringify({ query: Q }),
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = (await res.json()).data;
    if (!data.page?.content) return notFound();
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return (
      <ErrorDisplay
        title={c.error.title}
        message={msg}
        actionLabel={c.error.actionLabel}
        actionHref="/"
      />
    );
  }

  const html = data.page.content;
  const info = data.page.contactInfo ?? c.fallbackContactInfo;

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-4">{c.heading}</h1>
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <section>
              <h2 className="text-2xl font-bold mb-4">
                {c.sections.getInTouch.title}
              </h2>
              <ul className="space-y-4">
                {(['email', 'phone', 'mailingAddress'] as const).map((k) => {
                  const Label = c.sections.getInTouch.contactTypes[k].label;
                  const val = info[k];
                  const href =
                    k === 'email'
                      ? `mailto:${val}`
                      : k === 'phone'
                        ? `tel:${val.replace(/\D/g, '')}`
                        : undefined;
                  return (
                    <li key={k} className="flex items-start">
                      {k === 'email' ? (
                        <MailIcon className="h-6 w-6 text-dsa-red mt-1 mr-3" />
                      ) : k === 'phone' ? (
                        <PhoneIcon className="h-6 w-6 text-dsa-red mt-1 mr-3" />
                      ) : (
                        <MapPinIcon className="h-6 w-6 text-dsa-red mt-1 mr-3" />
                      )}
                      <div>
                        <p className="font-medium">{Label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="text-dsa-red hover:underline"
                          >
                            {val}
                          </a>
                        ) : (
                          <p className="whitespace-pre-line">{val}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">
                  {c.sections.followUs.title}
                </h3>
                <div className="flex space-x-4">
                  {c.sections.followUs.socialLinks.map((l) => (
                    <a
                      key={l.name}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-dsa-red"
                    >
                      <span className="sr-only">{l.name}</span>
                      {/* inline SVG icons */}
                      {/* ... */}
                    </a>
                  ))}
                </div>
              </div>
            </section>
            {/* Contact Form */}
            <section>
              <h2 className="text-2xl font-bold mb-4">
                {c.sections.sendMessage.title}
              </h2>
              <ContactForm />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
