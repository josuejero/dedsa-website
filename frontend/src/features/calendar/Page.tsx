// File: frontend/src/features/calendar/Page.tsx
'use client';

import type {
  CalendarPageContent,
  CalendarSubscription,
  EventCalendarContent,
  MonthSelectorContent,
} from '@/core/types/pages/calendar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export interface CalendarFeatureProps extends CalendarPageContent {
  /** The structured data for the full calendar view */
  eventCalendar: EventCalendarContent;
  /** Data for rendering the month selector dropdown */
  monthSelectorData: MonthSelectorContent;
  /** Subscription info for users to subscribe to calendar feeds */
  subscription: CalendarSubscription;
}

export default function CalendarFeature({
  /* fields from CalendarPageContent, e.g.: */
  title,
  description,
  /* …other CalendarPageContent props… */

  /* the newly added props: */
  eventCalendar,
  monthSelectorData,
  subscription,
}: CalendarFeatureProps) {
  const [showEmbed, setShowEmbed] = useState(true);
  const { googleCalendarEmbedUrl, iCalUrl, googleCalendarUrl } = subscription;

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

              {showEmbed ? (
                <iframe
                  src={googleCalendarEmbedUrl}
                  style={{ border: 0 }}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  className="rounded w-full"
                  title="Delaware DSA Calendar"
                />
              ) : (
                <div className="text-center py-20">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Calendar Hidden
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Click &quot;Show Calendar&quot; to view our events.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                  href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(subscription.googleCalendarEmbedUrl.split('?cid=')[1])}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  Subscribe to Google Calendar
                </a>
                <a
                  href={`https://outlook.live.com/calendar/0/addcalendar?url=${encodeURIComponent(iCalUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full flex items-center justify-center"
                >
                  Add to Outlook
                </a>
                <a
                  href={iCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full flex items-center justify-center"
                >
                  iCal/Apple Calendar
                </a>
              </div>
            </div>

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
