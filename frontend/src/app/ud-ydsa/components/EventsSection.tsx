import React from 'react';
import Link from 'next/link';
import { Event } from '../types';

const upcomingEvents: Event[] = [
  {
    date: 'April 10, 2025',
    time: '7:00 PM',
    title: 'General Meeting',
    location: 'Morris Library, Room 202',
    href: '/calendar/event-id',
  },
  {
    date: 'April 15, 2025',
    time: '5:30 PM',
    title: 'Cost of Living Campaign Meeting',
    location: 'Trabant Student Center, Room 109',
    href: '/calendar/event-id',
  },
  {
    date: 'April 22, 2025',
    time: '12:00 PM',
    title: 'Earth Day Rally',
    location: 'The Green, University of Delaware',
    href: '/calendar/event-id',
  },
];

export default function EventsSection() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <Link href="/calendar?tag=ud-ydsa" className="text-dsa-red hover:underline">
          View all events →
        </Link>
      </div>

      <div className="border border-gray-200 rounded-lg divide-y">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="p-4 flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/4">
              <p className="font-bold">{event.date}</p>
              <p>{event.time}</p>
            </div>
            <div className="md:w-1/2 mt-2 md:mt-0">
              <h3 className="font-bold">{event.title}</h3>
              <p>{event.location}</p>
            </div>
            <div className="md:w-1/4 mt-2 md:mt-0 md:text-right">
              <Link href={event.href} className="btn btn-primary inline-block">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
