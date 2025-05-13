import { Event } from './types';

interface EventItemProps {
  event: Event;
  index: number;
}

export default function EventItem({ event, index }: EventItemProps) {
  return (
    <div
      className="border-l-4 border-dsa-red pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-x-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h4 className="font-bold">{event.title}</h4>
      <p className="text-sm text-gray-600 flex items-center">
        <svg
          className="w-4 h-4 mr-1 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {event.date}
      </p>
      <p className="text-sm flex items-center mt-1">
        <svg
          className="w-4 h-4 mr-1 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {event.isVirtual ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          )}
        </svg>
        {event.location}
      </p>
    </div>
  );
}
