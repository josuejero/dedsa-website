import { ApolloError, gql } from '@apollo/client';
import Link from 'next/link';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import { getClient } from '../../lib/apollo-client';
import EventCalendar from './EventCalendar';
import { CalendarEvent, CalendarProps, EventsData } from './types';

const GET_EVENTS = gql`
  query GetEvents {
    events(
      first: 100
      where: { orderby: { field: META, metaKey: "eventDate", order: ASC } }
    ) {
      nodes {
        id
        title
        excerpt
        content
        date
        meta {
          eventDate
          eventTime
          eventLocation
          eventVirtualLink
        }
      }
    }
  }
`;

export default async function Calendar({
  params,
  searchParams,
}: CalendarProps) {
  await params;
  const { month } = await searchParams;

  const selectedMonth = month || '';
  let events: CalendarEvent[] = [];

  try {
    const { data } = await getClient().query<EventsData>({
      query: GET_EVENTS,
    });

    events = data?.events?.nodes || [];

    // If no real events, create sample data
    if (events.length === 0) {
      const today = new Date();
      const futureEvents: CalendarEvent[] = [];

      for (let i = 0; i < 10; i++) {
        const eventDate = new Date(today);
        eventDate.setDate(eventDate.getDate() + i * 3);

        futureEvents.push({
          id: `sample-${i}`,
          title: `Sample Event ${i + 1}`,
          excerpt: `This is a sample event ${i + 1}.`,
          content: `<p>This is a sample event description for event ${
            i + 1
          }. In a real implementation, this would be replaced with actual event data from WordPress.</p>`,
          date: today.toISOString(),
          meta: {
            eventDate: eventDate.toISOString(),
            eventTime: `${(i % 12) + 1}:00 ${i % 2 === 0 ? 'PM' : 'AM'}`,
            eventLocation:
              i % 3 === 0 ? 'Virtual' : 'Delaware State University, Dover, DE',
            eventVirtualLink: i % 3 === 0 ? 'https://example.com' : undefined,
          },
        });
      }

      events = futureEvents;
    }

    return (
      <div className="bg-gray-100 py-12">
        <div className="container-page">
          <h1 className="text-4xl font-bold mb-4">Events Calendar</h1>
          <p className="text-xl text-gray-600 mb-8">
            Join us for meetings, actions, educational events, and social
            gatherings.
          </p>

          {/* Main calendar component */}
          <EventCalendar events={events} selectedMonth={selectedMonth} />

          {/* Calendar subscription */}
          <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              Subscribe to Our Calendar
            </h2>
            <p className="mb-6">
              Stay up-to-date with all Delaware DSA events by subscribing to our
              calendar.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="btn bg-blue-500 text-white hover:bg-blue-600"
              >
                Google Calendar
              </a>
              <a
                href="#"
                className="btn bg-gray-800 text-white hover:bg-gray-900"
              >
                iCal / Outlook
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching events:', error);

    // Different error handling based on error type
    if (error instanceof ApolloError) {
      if (error.networkError) {
        return (
          <ErrorDisplay
            title="Network Error"
            message="We're having trouble connecting to our calendar server. Please check your internet connection and try again."
            error={error}
            actionLabel="Return to Home"
            actionHref="/"
          />
        );
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        return (
          <ErrorDisplay
            title="Calendar Data Error"
            message="There was a problem with the calendar data. Our team has been notified."
            error={error.graphQLErrors[0]}
            showDetails={process.env.NODE_ENV === 'development'}
            actionLabel="Return to Home"
            actionHref="/"
          />
        );
      }
    }

    // Fallback to a simplified calendar page with error message
    return (
      <div className="bg-gray-100 py-12">
        <div className="container-page">
          <h1 className="text-4xl font-bold mb-4">Events Calendar</h1>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div className="text-red-600 mb-4">
              <svg
                className="h-12 w-12 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-2xl font-bold mb-2">
                Unable to Load Calendar
              </h2>
              <p>
                We&apos;re experiencing technical difficulties loading our
                events. Please try again later.
              </p>
            </div>
            <Link href="/" className="btn btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
