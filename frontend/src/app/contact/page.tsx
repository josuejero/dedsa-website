import { ApolloError, gql } from '@apollo/client';
import { Metadata } from 'next';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import { getClient } from '../../lib/apollo-client';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Delaware DSA. Contact information and online form.',
};

interface ContactPageData {
  page?: {
    content?: string | null;
    contactInfo?: {
      email: string;
      phone: string;
      mailingAddress: string;
    } | null;
  } | null;
}

const GET_CONTACT_INFO = gql`
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

export default async function Contact() {
  let data: ContactPageData = { page: null };

  try {
    const result = await getClient().query<ContactPageData>({
      query: GET_CONTACT_INFO,
    });
    data = result.data;
  } catch (error) {
    console.error('Error loading contact page:', error);

    // Different error handling based on error type
    if (error instanceof ApolloError) {
      if (error.networkError) {
        return (
          <ErrorDisplay
            title="Network Error"
            message="We're having trouble connecting to our servers. Please check your internet connection and try again."
            error={error}
            actionLabel="Return to Home"
            actionHref="/"
          />
        );
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        return (
          <ErrorDisplay
            title="Data Error"
            message="There was a problem loading the contact page data. Our team has been notified."
            error={error.graphQLErrors[0]}
            showDetails={process.env.NODE_ENV === 'development'}
            actionLabel="Return to Home"
            actionHref="/"
          />
        );
      }
    }

    // Generic error fallback
    return (
      <ErrorDisplay
        title="Error Loading Contact Page"
        message="We're having trouble loading this page. Please try again later."
        error={error}
        showDetails={process.env.NODE_ENV === 'development'}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }

  const contactInfo = data?.page?.contactInfo ?? {
    email: `info@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
    phone: '(302) 555-0123',
    mailingAddress: 'Delaware DSA\nP.O. Box 12345\nWilmington, DE 19801',
  };

  const pageContent =
    data?.page?.content ??
    `
    <p>Delaware DSA welcomes your questions, comments, and involvement. Please use the form below to get in touch, or contact us directly using the information provided.</p>
  `;

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
            {/* Contact information */}
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

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://twitter.com/delawaredsa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-dsa-red"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    </svg>
                  </a>

                  <a
                    href="https://facebook.com/delawaredsa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-dsa-red"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>

                  <a
                    href="https://instagram.com/delawaredsa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-dsa-red"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 3.807-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-3.807-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
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
