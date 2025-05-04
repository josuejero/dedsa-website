'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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

interface EventCalendarProps {
  events: Event[];
  selectedMonth: string;
}

export default function EventCalendar({ events, selectedMonth }: EventCalendarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedMonthState, setSelectedMonthState] = useState<string>(selectedMonth);

  // Get current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get unique months from events
  const months: { [key: string]: string } = {};
  events.forEach((event) => {
    const eventDate = new Date(event.meta.eventDate);
    const monthKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}`;
    const monthName = eventDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    months[monthKey] = monthName;
  });

  // Sort months
  const sortedMonths = Object.entries(months)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => ({ key, value }));

  // If no month is selected, default to current or nearest future month
  useEffect(() => {
    if (!selectedMonthState && sortedMonths.length > 0) {
      const currentMonthKey = `${currentYear}-${currentMonth}`;
      const futureMonths = sortedMonths.filter((m) => m.key >= currentMonthKey);
      const newMonth = futureMonths.length > 0 ? futureMonths[0].key : sortedMonths[0].key;
      setSelectedMonthState(newMonth);

      // Update URL
      router.push(`${pathname}?month=${newMonth}`);
    }
  }, [currentMonth, currentYear, pathname, router, selectedMonthState, sortedMonths]);

  // Handle month selection change
  const handleMonthChange = (month: string) => {
    setSelectedMonthState(month);
    router.push(`${pathname}?month=${month}`);
  };

  // Filter events by selected month
  const filteredEvents = selectedMonthState
    ? events.filter((event) => {
        const eventDate = new Date(event.meta.eventDate);
        const eventMonthKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}`;
        return eventMonthKey === selectedMonthState;
      })
    : events;

  // Group events by date
  const eventsByDate: { [key: string]: Event[] } = {};
  filteredEvents.forEach((event) => {
    const dateKey = new Date(event.meta.eventDate).toISOString().split('T')[0];
    if (!eventsByDate[dateKey]) {
      eventsByDate[dateKey] = [];
    }
    eventsByDate[dateKey].push(event);
  });

  // Sort dates
  const sortedDates = Object.keys(eventsByDate).sort();

  return (
    <>
      {/* Month selector */}
      <div className="mb-8">
        <label htmlFor="month-select" className="block text-lg font-medium mb-2">
          Select Month
        </label>
        <select
          id="month-select"
          className="w-full md:w-1/3 p-2 border rounded"
          value={selectedMonthState}
          onChange={(e) => handleMonthChange(e.target.value)}
        >
          {sortedMonths.map((month) => (
            <option key={month.key} value={month.key}>
              {month.value}
            </option>
          ))}
        </select>
      </div>

      {/* Events listing */}
      <div className="space-y-8">
        {sortedDates.length > 0 ? (
          sortedDates.map((dateKey) => (
            <div key={dateKey} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Date header */}
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

              {/* Events for this date */}
              <div className="divide-y">
                {eventsByDate[dateKey].map((event) => (
                  <div key={event.id} className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>

                    <div className="flex flex-wrap gap-y-2 text-gray-600 mb-4">
                      {/* Time */}
                      <div className="w-full sm:w-1/2 flex items-center">
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span>{event.meta.eventTime || 'Time TBA'}</span>
                      </div>

                      {/* Location */}
                      <div className="w-full sm:w-1/2 flex items-start">
                        <svg
                          className="h-5 w-5 mr-2 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        <span>{event.meta.eventLocation || 'Location TBA'}</span>
                      </div>
                    </div>

                    {/* Virtual meeting link if available */}
                    {event.meta.eventVirtualLink && (
                      <div className="mb-4">
                        <a
                          href={event.meta.eventVirtualLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            ></path>
                          </svg>
                          Join Virtual Meeting
                        </a>
                      </div>
                    )}

                    {/* Event description */}
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: event.content }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-xl text-gray-600">No events scheduled for this month.</p>
            <p className="text-gray-500 mt-2">
              Please check back later or select a different month.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
