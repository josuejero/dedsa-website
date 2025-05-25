'use client';

import type {
  CalendarPageContent,
  CalendarSubscription,
  EventCalendarContent,
  MonthSelectorContent,
} from '@/core/types/pages/calendar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface CalendarFeatureProps extends CalendarPageContent {
  eventCalendar: EventCalendarContent;
  monthSelectorData: MonthSelectorContent;
  subscription: CalendarSubscription;
}

export default function CalendarFeature({
  title,
  subtitle,

  eventCalendar,
  monthSelectorData,
  subscription,
}: CalendarFeatureProps) {
  const [showEmbed, setShowEmbed] = useState(true);
  const calendarEmbedUrl = subscription.googleCalendarEmbedUrl;
  const iCalUrl = subscription.iCalUrl;
  const googleCalendarUrl = subscription.googleCalendarUrl;

  useEffect(() => {
    const onCSP = (e: SecurityPolicyViolationEvent) => {
      console.error(
        '[CSP Violation]',
        'Directive=',
        e.effectiveDirective,
        'Blocked URI=',
        e.blockedURI,
        'Policy=',
        e.originalPolicy
      );
    };
    document.addEventListener('securitypolicyviolation', onCSP);
    return () => document.removeEventListener('securitypolicyviolation', onCSP);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Events Calendar</h1>
          <p className="text-xl text-gray-600">
            Join us for meetings, actions, educational events, and social
            gatherings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Calendar Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Delaware DSA Calendar</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEmbed(!showEmbed)}
                    className={`px-4 py-2 rounded transition-colors ${
                      showEmbed
                        ? 'bg-dsa-red text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {showEmbed ? 'Hide Calendar' : 'Show Calendar'}
                  </button>
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Open in Google Calendar
                  </a>
                </div>
              </div>

              {showEmbed && (
                <div className="w-full">
                  <iframe
                    src={calendarEmbedUrl}
                    style={{ border: 0 }}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                    className="rounded w-full"
                    title="Delaware DSA Calendar"
                  />
                </div>
              )}

              {!showEmbed && (
                <div className="text-center py-20">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Calendar Hidden
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Click "Show Calendar" to view our events.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscribe Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                Subscribe to Our Calendar
              </h3>
              <p className="text-gray-600 mb-4">
                Stay up-to-date with all Delaware DSA events by subscribing to
                our calendar.
              </p>

              <div className="space-y-3">
                <a
                  href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent('f17d4d4d1756675b31bf0c7cc145c8e2b0fd967d93c55e23c40a0fe15fe4fd8d@group.calendar.google.com')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.5 3h-3.09V1.5c0-.413-.337-.75-.75-.75s-.75.337-.75.75V3H9.09V1.5c0-.413-.337-.75-.75-.75s-.75.337-.75.75V3H4.5C3.122 3 2 4.122 2 5.5v13C2 19.878 3.122 21 4.5 21h15c1.378 0 2.5-1.122 2.5-2.5v-13C22 4.122 20.878 3 19.5 3zM20 18.5c0 .275-.225.5-.5.5h-15c-.275 0-.5-.225-.5-.5V8h16v10.5zM20 6H4V5.5c0-.275.225-.5.5-.5h3.09v1c0 .413.337.75.75.75s.75-.337.75-.75V5h5.82v1c0 .413.337.75.75.75s.75-.337.75-.75V5h3.09c.275 0 .5.225.5.5V6z" />
                  </svg>
                  Subscribe to Google Calendar
                </a>

                <a
                  href={`https://outlook.live.com/calendar/0/addcalendar?url=${encodeURIComponent(iCalUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7 3C5.346 3 4 4.346 4 6v12c0 1.654 1.346 3 3 3h10c1.654 0 3-1.346 3-3V6c0-1.654-1.346-3-3-3H7zm0 2h10c.551 0 1 .449 1 1v1H6V6c0-.551.449-1 1-1zM6 9h12v9c0 .551-.449 1-1 1H7c-.551 0-1-.449-1-1V9z" />
                  </svg>
                  Add to Outlook
                </a>

                <a
                  href={iCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full flex items-center justify-center"
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  iCal/Apple Calendar
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/join"
                  className="block text-dsa-red hover:underline"
                >
                  Join Delaware DSA →
                </Link>
                <Link
                  href="/committees"
                  className="block text-dsa-red hover:underline"
                >
                  View Committees →
                </Link>
                <Link
                  href="/contact"
                  className="block text-dsa-red hover:underline"
                >
                  Contact Us →
                </Link>
              </div>
            </div>

            {/* Meeting Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                Meeting Information
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>General Meetings:</strong>
                  <p className="text-gray-600">
                    Fourth Monday of each month, 7:00 PM
                  </p>
                </div>
                <div>
                  <strong>Location:</strong>
                  <p className="text-gray-600">Usually virtual via Zoom</p>
                </div>
                <div>
                  <strong>Contact:</strong>
                  <p className="text-gray-600">
                    <a
                      href="mailto:info@delawardsa.org"
                      className="text-dsa-red hover:underline"
                    >
                      info@delawardsa.org
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
