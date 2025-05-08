import React from 'react';
import { gql } from '@apollo/client';
import { getClient } from '../../lib/apollo-client';
import { Metadata } from 'next';
import EventCalendar from './EventCalendar';

// Define metadata for the page
export const metadata: Metadata = {
  title: 'Calendar',
  description:
    'Event calendar for Delaware DSA. Join us for meetings, actions, educational events, and social gatherings.',
};

// Define types for events
interface Event {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  meta: {
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventVirtualLink?: string;
  };
}

// GraphQL query to fetch events
// Note: This assumes you've set up a custom post type for events with ACF fields
const GET_EVENTS = gql`
  query GetEvents {
    events(first: 100, where: { orderby: { field: META, metaKey: "eventDate", order: ASC } }) {
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

export default async function Calendar({ searchParams }: { searchParams: { month?: string } }) {
  // Get the selected month from URL params
  const selectedMonth = searchParams.month || '';

  try {
    // Fetch events using Apollo Client
    // This is a placeholder query that assumes you've set up a custom post type for events
    const { data } = await getClient().query({
      query: GET_EVENTS,
    });

    let events: Event[] = (data?.events?.nodes as Event[]) || [];

    if (events.length === 0) {
      // Generate sample events for development purposes
      // Generate sample events for development purposes
      const today = new Date();
      const futureEvents: Event[] = [];
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
            eventLocation: i % 3 === 0 ? 'Virtual' : 'Delaware State University, Dover, DE',
            eventVirtualLink: i % 3 === 0 ? 'https://zoom.us/j/example' : undefined,
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
            Join us for meetings, actions, educational events, and social gatherings.
          </p>

          {/* Pass events to client component for month filtering and display */}
          <EventCalendar events={events} selectedMonth={selectedMonth} />

          {/* Add to Calendar Section */}
          <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Calendar</h2>
            <p className="mb-6">
              Stay up-to-date with all Delaware DSA events by subscribing to our calendar.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="btn bg-blue-500 text-white hover:bg-blue-600">
                Google Calendar
              </a>
              <a href="#" className="btn bg-gray-800 text-white hover:bg-gray-900">
                iCal / Outlook
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching events:', error);

    return (
      <div className="bg-gray-100 py-12">
        <div className="container-page">
          <h1 className="text-4xl font-bold mb-4">Events Calendar</h1>
          <p className="text-xl text-gray-600 mb-8">
            An error occurred while loading events. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
