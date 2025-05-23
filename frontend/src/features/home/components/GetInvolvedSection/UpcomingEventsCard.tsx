import Link from 'next/link';
import upcomingEventsContent from '@/core/content/pages/home.json';
import { UpcomingEventsCardContent } from '@/core/types/pages/home';
import EventItem from './EventItem';

// Type assertion for the imported JSON
const typedUpcomingEventsContent =
  upcomingEventsContent.upcomingEventsCard as UpcomingEventsCardContent;

export default function UpcomingEventsCard() {
  return (
    <div className="group bg-white  p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
        <h3 className="text-2xl font-bold">
          {typedUpcomingEventsContent.heading}
        </h3>
      </div>

      <div className="space-y-4">
        {typedUpcomingEventsContent.events.map((event, index) => (
          <EventItem key={event.title} event={event} index={index} />
        ))}
      </div>

      <div className="mt-8">
        <Link
          href={typedUpcomingEventsContent.buttonHref}
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
          {typedUpcomingEventsContent.buttonText}
        </Link>
      </div>
    </div>
  );
}
