// src/app/calendar/page.tsx
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import GenericCard from '../../components/shared/GenericCard';
import GenericSection from '../../components/shared/GenericSection';
import EventCalendar from './EventCalendar';
import { CalendarEvent, CalendarProps, EventsData } from './types';

// Import page content from consolidated file

export const dynamic = 'force-dynamic';

export const revalidate = 300;

// Inline GraphQL query string (no `gql` tag)
const GET_EVENTS_QUERY = `
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

export default async function CalendarPage({ searchParams }: CalendarProps) {
  const endpoint =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'http://delaware-dsa-backend.local/graphql';

  const { month } = await searchParams;
  const selectedMonth = month || '';
  let events: CalendarEvent[] = [];

  // State for content
  const pageContent = {
    title: 'Events Calendar',
    subtitle:
      'Join us for meetings, actions, educational events, and social gatherings.',
    errorTitle: 'Unable to Load Calendar',
    errorMessage:
      "We're experiencing technical difficulties loading events. Please try again later.",
    errorActionLabel: 'Return to Home',
    subscribeTitle: 'Subscribe to Our Calendar',
    subscribeText:
      'Stay up-to-date with all Delaware DSA events by subscribing to our calendar.',
    googleCalendarButtonText: 'Google Calendar',
    iCalOutlookButtonText: 'iCal / Outlook',
  };

  // Dynamic import once we move to SSR implementation
  try {
    // dynamically load content from JSON file when moved to SSR implementation
  } catch (error) {
    console.error('Error loading calendar content:', error);
  }

  try {
    // dynamically load content from JSON file when moved to SSR implementation
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      body: JSON.stringify({ query: GET_EVENTS_QUERY }),
    });

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }

    const json = await res.json();
    const data = (json.data ?? {}) as EventsData;
    events = data.events?.nodes || [];

    // Fallback: generate sample events if none exist
    if (events.length === 0) {
      const today = new Date();
      events = Array.from({ length: 10 }, (_, i) => {
        const eventDate = new Date(today);
        eventDate.setDate(today.getDate() + i * 3);
        return {
          id: `sample-${i}`,
          title: `Sample Event ${i + 1}`,
          excerpt: `This is a sample event ${i + 1}.`,
          content: `<p>This is a sample event description for event ${
            i + 1
          }.</p>`,
          date: today.toISOString(),
          meta: {
            eventDate: eventDate.toISOString(),
            eventTime: `${(i % 12) + 1}:00 ${i % 2 === 0 ? 'PM' : 'AM'}`,
            eventLocation:
              i % 3 === 0 ? 'Virtual' : 'Delaware State University, Dover, DE',
            eventVirtualLink: i % 3 === 0 ? 'https://example.com' : undefined,
          },
        };
      });
    }

    return (
      <GenericSection
        heading={pageContent.title}
        subheading={pageContent.subtitle}
        background="gray"
      >
        <EventCalendar events={events} selectedMonth={selectedMonth} />

        <GenericCard title={pageContent.subscribeTitle} className="mt-12">
          <p className="mb-6">{pageContent.subscribeText}</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="btn bg-blue-500 text-white hover:bg-blue-600"
            >
              {pageContent.googleCalendarButtonText}
            </a>

            <a
              href="#"
              className="btn bg-gray-800 text-white hover:bg-gray-900"
            >
              {pageContent.iCalOutlookButtonText}
            </a>
          </div>
        </GenericCard>
      </GenericSection>
    );
  } catch (err: unknown) {
    console.error('Calendar fetch error:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);

    return (
      <ErrorDisplay
        title={pageContent.errorTitle}
        message={pageContent.errorMessage}
        error={errorMessage}
        actionLabel={pageContent.errorActionLabel}
        actionHref="/"
      />
    );
  }
}
