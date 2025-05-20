// src/app/calendar/EventList.tsx
'use client';

import GenericCard from '../../components/shared/GenericCard';
import { CalendarEvent } from './types';

const ClockIcon = (
  <svg
    className="h-5 w-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PinIcon = (
  <svg
    className="h-5 w-5 mr-2 mt-0.5"
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
);

export default function EventList({
  eventsByDate,
}: {
  eventsByDate: Record<string, CalendarEvent[]>;
}) {
  const dates = Object.keys(eventsByDate).sort();
  const noMsg = 'No events scheduled for this month.';
  const backMsg = 'Please check back later or select a different month.';

  return (
    <div className="space-y-8">
      {dates.length > 0 ? (
        dates.map((dateKey) => (
          <GenericCard key={dateKey} hasShadow className="overflow-hidden p-0">
            <div className="bg-dsa-red text-white p-4">
              <h2 className="text-xl font-bold">
                {new Date(dateKey).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </h2>
            </div>

            <div className="divide-y">
              {eventsByDate[dateKey].map((evt) => (
                <div key={evt.id} className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{evt.title}</h3>
                  <div className="flex flex-wrap gap-y-2 text-gray-600 mb-4">
                    <div className="w-full sm:w-1/2 flex items-center">
                      {ClockIcon}
                      <span>{evt.meta.eventTime || 'Time TBA'}</span>
                    </div>
                    <div className="w-full sm:w-1/2 flex items-start">
                      {PinIcon}
                      <span>{evt.meta.eventLocation || 'Location TBA'}</span>
                    </div>
                  </div>
                  {evt.meta.eventVirtualLink && (
                    <div className="mb-4">
                      <a
                        href={evt.meta.eventVirtualLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Join Virtual Meeting
                      </a>
                    </div>
                  )}
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: evt.content }}
                  />
                </div>
              ))}
            </div>
          </GenericCard>
        ))
      ) : (
        <GenericCard className="text-center p-8">
          <p className="text-xl text-gray-600">{noMsg}</p>
          <p className="text-gray-500 mt-2">{backMsg}</p>
        </GenericCard>
      )}
    </div>
  );
}
