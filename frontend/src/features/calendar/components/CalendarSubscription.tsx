'use client';

import { useState } from 'react';

interface CalendarSubscriptionProps {
  googleCalendarUrl: string;
  iCalUrl: string;
  embedUrl: string;
}

export default function CalendarSubscription({
  googleCalendarUrl,
  iCalUrl,
  embedUrl,
}: CalendarSubscriptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState('');
  const [showEmbed, setShowEmbed] = useState(false);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generateGoogleCalendarAddUrl = () => {
    // Extract calendar ID from iCal URL for subscription
    const calendarId =
      'f17d4d4d1756675b31bf0c7cc145c8e2b0fd967d93c55e23c40a0fe15fe4fd8d@group.calendar.google.com';
    return `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(calendarId)}`;
  };

  const generateOutlookUrl = () => {
    const baseUrl = 'https://outlook.live.com/calendar/0/addcalendar';
    return `${baseUrl}?url=${encodeURIComponent(iCalUrl)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Subscribe to Our Calendar</h3>
        <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary">
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
          Subscribe
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        Stay up-to-date with all Delaware DSA events by subscribing to our
        calendar.
      </p>

      {isOpen && (
        <div className="space-y-4 border-t pt-4">
          {/* Google Calendar */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.5 3h-3.09V1.5c0-.413-.337-.75-.75-.75s-.75.337-.75.75V3H9.09V1.5c0-.413-.337-.75-.75-.75s-.75.337-.75.75V3H4.5C3.122 3 2 4.122 2 5.5v13C2 19.878 3.122 21 4.5 21h15c1.378 0 2.5-1.122 2.5-2.5v-13C22 4.122 20.878 3 19.5 3zM20 18.5c0 .275-.225.5-.5.5h-15c-.275 0-.5-.225-.5-.5V8h16v10.5zM20 6H4V5.5c0-.275.225-.5.5-.5h3.09v1c0 .413.337.75.75.75s.75-.337.75-.75V5h5.82v1c0 .413.337.75.75.75s.75-.337.75-.75V5h3.09c.275 0 .5.225.5.5V6z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Google Calendar</h4>
                <p className="text-sm text-gray-600">
                  Subscribe to our calendar
                </p>
              </div>
            </div>
            <a
              href={generateGoogleCalendarAddUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Subscribe
            </a>
          </div>

          {/* Outlook */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-800"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 3C5.346 3 4 4.346 4 6v12c0 1.654 1.346 3 3 3h10c1.654 0 3-1.346 3-3V6c0-1.654-1.346-3-3-3H7zm0 2h10c.551 0 1 .449 1 1v1H6V6c0-.551.449-1 1-1zM6 9h12v9c0 .551-.449 1-1 1H7c-.551 0-1-.449-1-1V9z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Outlook</h4>
                <p className="text-sm text-gray-600">Add to Outlook Calendar</p>
              </div>
            </div>
            <a
              href={generateOutlookUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Add to Outlook
            </a>
          </div>

          {/* Apple Calendar */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.5 3h-3.09V1.5c0-.413-.337-.75-.75-.75s-.75.337-.75.75V3H9.09V1.5c0-.413-.337-.75-.75-.75s-.75.337-.75.75V3H4.5C3.122 3 2 4.122 2 5.5v13C2 19.878 3.122 21 4.5 21h15c1.378 0 2.5-1.122 2.5-2.5v-13C22 4.122 20.878 3 19.5 3zM20 18.5c0 .275-.225.5-.5.5h-15c-.275 0-.5-.225-.5-.5V8h16v10.5zM20 6H4V5.5c0-.275.225-.5.5-.5h3.09v1c0 .413.337.75.75.75s.75-.337.75-.75V5h5.82v1c0 .413.337.75.75.75s.75-.337.75-.75V5h3.09c.275 0 .5.225.5.5V6z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Apple Calendar</h4>
                <p className="text-sm text-gray-600">
                  Add to Apple Calendar/iCal
                </p>
              </div>
            </div>
            <a
              href={iCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Add to Apple
            </a>
          </div>

          {/* iCal/Manual */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Manual Subscription (iCal URL)</h4>
            <p className="text-sm text-gray-600 mb-3">
              Copy this URL to add to any calendar app that supports iCal
              subscriptions:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={iCalUrl}
                readOnly
                className="flex-1 p-2 border rounded text-sm bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(iCalUrl, 'ical')}
                className={`px-3 py-2 text-sm rounded transition-colors ${
                  copied === 'ical'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {copied === 'ical' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Embedded Calendar */}
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">View Calendar</h4>
              <button
                onClick={() => setShowEmbed(!showEmbed)}
                className="text-sm text-dsa-red hover:underline"
              >
                {showEmbed ? 'Hide' : 'Show'} Calendar
              </button>
            </div>
            <div className="flex gap-2 mb-3">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex-1"
              >
                Open in Google Calendar
              </a>
            </div>

            {showEmbed && (
              <div className="mt-4">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  className="rounded w-full"
                  title="Delaware DSA Calendar"
                  onLoad={() => console.log('[CalendarPage] iframe loaded')}
                  onError={(err) =>
                    console.error('[CalendarPage] iframe load error', err)
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect } from 'react';

useEffect(() => {
  const handler = (e: SecurityPolicyViolationEvent) => {
    console.error(
      'CSP Violation:',
      'Directive=',
      e.effectiveDirective,
      'Blocked URI=',
      e.blockedURI,
      'Policy=',
      e.originalPolicy
    );
  };
  document.addEventListener('securitypolicyviolation', handler);
  return () => {
    document.removeEventListener('securitypolicyviolation', handler);
  };
}, []);
