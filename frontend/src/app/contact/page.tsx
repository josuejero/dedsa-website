// app/contact/page.tsx
'use client';

import { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import pageContent from '../../content/contact/page.json';
import { ContactPageContent } from '../../types/content/contact';
export const dynamic = 'force-dynamic';
export const revalidate = 300; // ISR: 5 minutes

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Delaware DSA. Contact information and online form.',
};

const content = pageContent as ContactPageContent;

// ---- Data fetching (server) ----
const QUERY = `
  query GetContactInfo {
    page(id: "contact", idType: URI) {
      content
      contactInfo { email phone mailingAddress }
    }
  }
`;

interface ContactInfo {
  email: string;
  phone: string;
  mailingAddress: string;
}

interface ContactPageData {
  page?: {
    content?: string | null;
    contactInfo?: ContactInfo | null;
  } | null;
}

async function fetchPageData(): Promise<ContactPageData> {
  const endpoint =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'http://delaware-dsa-backend.local/graphql';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'force-cache',
    body: JSON.stringify({ query: QUERY }),
  });
  if (!res.ok) throw new Error(`GraphQL error: ${res.status}`);
  const { data } = await res.json();
  return data as ContactPageData;
}

// ---- Dynamic import of the form (client only) ----
const ContactForm = dynamicImport(() => import('./ContactForm'), {
  ssr: false,
  loading: () => <p>Loading form…</p>,
});

// ---- SVG Icons (client) ----
const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (
  <svg {...p} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (
  <svg {...p} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0
         01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1
         1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0
         01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);
const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (
  <svg {...p} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827
         0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// ---- Client component rendering the page ----
export default async function ContactPage() {
  let data: ContactPageData;
  try {
    data = await fetchPageData();
    if (!data.page) throw new Error('Page not found');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return (
      <ErrorDisplay
        title={content.error.title}
        message={msg}
        actionLabel={content.error.actionLabel}
        actionHref="/"
      />
    );
  }

  const html = data.page.content;
  const info = data.page.contactInfo ?? content.fallbackContactInfo;

  if (!html) {
    return notFound();
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-4">{content.heading}</h1>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <section>
              <h2 className="text-2xl font-bold mb-4">
                {content.sections.getInTouch.title}
              </h2>
              <ul className="space-y-4">
                {(['email', 'phone', 'mailingAddress'] as const).map((key) => {
                  const Icon =
                    key === 'email'
                      ? MailIcon
                      : key === 'phone'
                        ? PhoneIcon
                        : MapPinIcon;
                  // @ts-ignore
                  const value: string = info[key];
                  const label =
                    // @ts-ignore
                    content.sections.getInTouch.contactTypes[key].label;
                  const href =
                    key === 'email'
                      ? `mailto:${value}`
                      : key === 'phone'
                        ? `tel:${value.replace(/\D/g, '')}`
                        : undefined;

                  return (
                    <li key={key} className="flex items-start">
                      <Icon className="h-6 w-6 text-dsa-red mt-1 mr-3" />
                      <div>
                        <p className="font-medium">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="text-dsa-red hover:underline"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="whitespace-pre-line">{value}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">
                  {content.sections.followUs.title}
                </h3>
                <div className="flex space-x-4">
                  {content.sections.followUs.socialLinks.map((link) => {
                    // inline simple SVGs for social icons
                    const svg =
                      link.name === 'Twitter' ? (
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57..." />
                        </svg>
                      ) : link.name === 'Facebook' ? (
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12c0-5.523..." />
                        </svg>
                      ) : (
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.315 2..." />
                        </svg>
                      );

                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-dsa-red"
                      >
                        <span className="sr-only">{link.name}</span>
                        {svg}
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Contact Form */}
            <section>
              <h2 className="text-2xl font-bold mb-4">
                {content.sections.sendMessage.title}
              </h2>
              <ContactForm />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
