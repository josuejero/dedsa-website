// src/app/calendar/page.tsx
import { Metadata } from 'next';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import pageContent from '../../content/calendar/page.json';
import { CalendarPageContent } from '../../types/content/calendar';
import EventCalendar from './EventCalendar';
import { CalendarEvent, CalendarProps, EventsData } from './types';

// Type assertion for imported JSON
const typedContent = pageContent as CalendarPageContent;

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: typedContent.title,
  description: typedContent.subtitle,
};

// ISR: Revalidate this page every 5 minutes
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

  try {
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
      <div className="bg-gray-100 py-12">
        <div className="container-page">
          <h1 className="text-4xl font-bold mb-4">{typedContent.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{typedContent.subtitle}</p>

          <EventCalendar events={events} selectedMonth={selectedMonth} />

          <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {typedContent.subscribeTitle}
            </h2>
            <p className="mb-6">{typedContent.subscribeText}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="btn bg-blue-500 text-white hover:bg-blue-600"
              >
                {typedContent.googleCalendarButtonText}
              </a>
              <a
                href="#"
                className="btn bg-gray-800 text-white hover:bg-gray-900"
              >
                {typedContent.iCalOutlookButtonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err: unknown) {
    console.error('Calendar fetch error:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);

    return (
      <ErrorDisplay
        title={typedContent.errorTitle}
        message={typedContent.errorMessage}
        error={errorMessage}
        actionLabel={typedContent.errorActionLabel}
        actionHref="/"
      />
    );
  }
}
