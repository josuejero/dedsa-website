'use client';

import type { CalendarEvent } from '@/core/types/pages/calendar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageProps {
  params: { slug: string };
}

export default function EventDetailPage({ params }: PageProps) {
  const [event, setEvent] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock event loading - replace with actual API call
    const loadEvent = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock event data
        const mockEvent: CalendarEvent = {
          id: '1',
          title: 'General Membership Meeting',
          description:
            "Our monthly general membership meeting where we discuss chapter business, upcoming campaigns, and make important decisions democratically. All members are welcome and encouraged to attend. We'll cover updates from our working groups, vote on new resolutions, and plan upcoming actions.",
          startDate: '2025-05-26',
          startTime: '19:00',
          endTime: '21:00',
          location: 'Zoom',
          isVirtual: true,
          virtualLink: 'https://zoom.us/j/123456789',
          category: 'meeting',
          committee: 'General',
          slug: 'general-membership-meeting-may-2025',
          registrationRequired: false,
          tags: ['membership', 'monthly', 'democratic', 'planning'],
        };

        if (mockEvent.slug === params.slug) {
          setEvent(mockEvent);
        } else {
          notFound();
        }
      } catch (err) {
        console.error('Error loading event:', err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container-page">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    notFound();
    return null;
  }

  const formatDateTime = () => {
    const date = new Date(event.startDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    if (event.startTime) {
      const startTime = new Date(
        `2000-01-01T${event.startTime}`
      ).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      if (event.endTime) {
        const endTime = new Date(
          `2000-01-01T${event.endTime}`
        ).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        return `${date} • ${startTime} - ${endTime}`;
      }

      return `${date} • ${startTime}`;
    }

    return date;
  };

  const generateGoogleCalendarUrl = () => {
    const startDateTime = new Date(
      `${event.startDate}T${event.startTime || '00:00'}`
    );
    const endDateTime = event.endTime
      ? new Date(`${event.startDate}T${event.endTime}`)
      : new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${startDateTime.toISOString().replace(/[-:]/g, '').slice(0, -5)}Z/${endDateTime.toISOString().replace(/[-:]/g, '').slice(0, -5)}Z`,
      details: event.description || '',
      location: event.location || '',
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Header */}
          <div className="bg-dsa-red text-white p-8">
            <Link
              href="/calendar"
              className="inline-flex items-center text-white hover:text-gray-200 mb-4"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Calendar
            </Link>

            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
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
                <span>{formatDateTime()}</span>
              </div>

              {event.location && (
                <div className="flex items-center gap-2">
                  {event.isVirtual ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                  )}
                  <span>{event.location}</span>
                  {event.isVirtual && (
                    <span className="bg-white/20 px-2 py-1 rounded text-sm">
                      Virtual
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Virtual link */}
                {event.isVirtual && event.virtualLink && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-2 text-blue-900">
                      Join Virtual Event
                    </h3>
                    <p className="text-blue-700 mb-4">
                      This is a virtual event. Click the link below to join:
                    </p>
                    <a
                      href={event.virtualLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary inline-flex items-center"
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Join Meeting
                    </a>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick actions */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a
                      href={generateGoogleCalendarUrl()}
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
                      Add to Calendar
                    </a>

                    {event.registrationRequired && event.registrationLink && (
                      <a
                        href={event.registrationLink}
                        className="btn btn-primary w-full"
                      >
                        Register for Event
                      </a>
                    )}
                  </div>
                </div>

                {/* Event details */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Category
                      </label>
                      <p className="capitalize">{event.category}</p>
                    </div>

                    {event.committee && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Committee
                        </label>
                        <p>{event.committee}</p>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Registration
                      </label>
                      <p>
                        {event.registrationRequired
                          ? 'Required'
                          : 'Not Required'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
