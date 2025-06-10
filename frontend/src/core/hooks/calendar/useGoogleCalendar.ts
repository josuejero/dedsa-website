// frontend/src/core/hooks/calendar/useGoogleCalendar.ts
'use client';

import type { CalendarEvent } from '@/core/types/pages/calendar';
import { useEffect, useState } from 'react';

// Define the shape of the Google Calendar API event
interface GoogleCalendarApiEvent {
  id: string;
  summary?: string;
  description?: string;
  start: { date?: string; dateTime?: string };
  end: { dateTime?: string };
  location?: string;
}

const CALENDAR_ID =
  'f17d4d4d1756675b31bf0c7cc145c8e2b0fd967d93c55e23c40a0fe15fe4fd8d@group.calendar.google.com';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;

export function useGoogleCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!API_KEY) {
        console.warn('Google Calendar API key not found. Using mock data.');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const now = new Date().toISOString();
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          CALENDAR_ID
        )}/events?key=${API_KEY}&timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=50`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: { items: GoogleCalendarApiEvent[] } = await response.json();

        const calendarEvents: CalendarEvent[] = data.items.map((item) => ({
          id: item.id,
          title: item.summary ?? 'Untitled Event',
          description: item.description ?? '',
          // always produce a string for startDate
          startDate:
            item.start.date ?? item.start.dateTime?.split('T')[0] ?? '',
          startTime: item.start.dateTime
            ? new Date(item.start.dateTime).toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
              })
            : undefined,
          endTime: item.end.dateTime
            ? new Date(item.end.dateTime).toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
              })
            : undefined,
          location: item.location ?? '',
          isVirtual:
            item.location?.includes('zoom') ||
            item.location?.includes('meet.google.com') ||
            false,
          virtualLink: extractVirtualLink(item.description ?? ''),
          category: categorizeEvent(item.summary ?? ''),
          slug: generateSlug(item.summary ?? '', item.id),
          isAllDay: !item.start.dateTime,
          tags: extractTags(item.description ?? ''),
        }));

        setEvents(calendarEvents);
      } catch (err) {
        console.error('Error fetching calendar events:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
}

// Helper functions
function extractVirtualLink(description: string): string | undefined {
  const urlRegex = /(https?:\/\/[^"]+)/g;
  const urls = description.match(urlRegex);
  return urls?.find(
    (url) => url.includes('zoom') || url.includes('meet.google.com')
  );
}

function categorizeEvent(
  title: string
): 'meeting' | 'action' | 'social' | 'education' | 'other' {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('meeting')) return 'meeting';
  if (
    titleLower.includes('rally') ||
    titleLower.includes('action') ||
    titleLower.includes('protest')
  )
    return 'action';
  if (
    titleLower.includes('social') ||
    titleLower.includes('party') ||
    titleLower.includes('celebration')
  )
    return 'social';
  if (
    titleLower.includes('education') ||
    titleLower.includes('workshop') ||
    titleLower.includes('training')
  )
    return 'education';
  return 'other';
}

function generateSlug(title: string, id: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  return `${slug}-${id.slice(-8)}`;
}

function extractTags(description: string): string[] {
  const tagRegex = /#(\w+)/g;
  const matches = description.match(tagRegex);
  return matches?.map((tag) => tag.slice(1)) || [];
}
