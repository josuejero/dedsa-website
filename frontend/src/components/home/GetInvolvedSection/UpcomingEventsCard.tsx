import Link from 'next/link';
import EventItem from './EventItem';
import { Event } from './types';

// Sample data - could be moved to a data file or fetched from an API
const EVENTS: Event[] = [
  {
    title: 'Newark Community Rent Meeting',
    date: 'May 23, 2025 • 6:00–8:00 PM',
    location: 'St. Thomas Episcopal Parish',
  },
  {
    title: 'Solidarity Fair',
    date: 'June 22, 2025 • 4:00–7:00 PM',
    location: 'Ellendale Fire Hall',
  },
  {
    title: 'New Member Orientation',
    date: 'June 8, 2025 • 2:00–3:30 PM',
    location: 'Route 9 Library & Virtual',
    isVirtual: true,
  },
  {
    title: 'Housing Justice Working Group',
    date: 'May 19, 2025 • 7:00–8:30 PM',
    location: 'Virtual',
    isVirtual: true,
  },
];

export default function UpcomingEventsCard() {
  return (
    <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center mb-6">
        <svg
          className="w-8 h-8 text-dsa-red mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-2xl font-bold">Upcoming Events</h3>
      </div>

      <div className="space-y-4">
        {EVENTS.map((event, index) => (
          <EventItem key={event.title} event={event} index={index} />
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/calendar"
          className="group inline-flex items-center btn btn-primary shadow-sm hover:shadow transition-all"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          VIEW ALL EVENTS
        </Link>
      </div>
    </div>
  );
}
