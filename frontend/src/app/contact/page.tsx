import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Delaware DSA. Contact information and online form.',
};

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

// Inline GraphQL query for contact info
const GET_CONTACT_INFO = `
  query GetContactInfo {
    page(id: "contact", idType: URI) {
      content
      contactInfo {
        email
        phone
        mailingAddress
      }
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

export default async function ContactPage() {
  const endpoint =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'http://delaware-dsa-backend.local/graphql';

  // Default fallback values
  let pageContent = `
    <p>
      Delaware DSA welcomes your questions, comments, and involvement. Please use the form below to get in touch, or contact us directly using the information provided.
    </p>
  `;
  let contactInfo: ContactInfo = {
    email: `info@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
    phone: '(302) 555-0123',
    mailingAddress: 'Delaware DSA\nP.O. Box 12345\nWilmington, DE 19801',
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      body: JSON.stringify({ query: GET_CONTACT_INFO }),
    });
    if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);

    const json = await res.json();
    const data = (json.data ?? {}) as ContactPageData;

    // Show 404 if no page data
    if (!data.page) {
      return notFound();
    }

    if (data.page.content) {
      pageContent = data.page.content;
    }
    if (data.page.contactInfo) {
      contactInfo = data.page.contactInfo;
    }
  } catch (err: unknown) {
    console.error('Error loading contact page:', err);
    const msg = err instanceof Error ? err.message : String(err);
    return (
      <ErrorDisplay
        title="Error Loading Contact Page"
        message={msg}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }

  // Render client-side component with fetched data
  return <ContactClient pageContent={pageContent} contactInfo={contactInfo} />;
}

// Client-side rendering of form and details
function ContactClient({
  pageContent,
  contactInfo,
}: {
  pageContent: string;
  contactInfo: ContactInfo;
}) {
  'use client';

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info Details */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-dsa-red mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-dsa-red hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-dsa-red mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href={`tel:${contactInfo.phone.replace(/[^0-9]/g, '')}`}
                      className="text-dsa-red hover:underline"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-dsa-red mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">Mailing Address</p>
                    <p className="whitespace-pre-line">
                      {contactInfo.mailingAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
