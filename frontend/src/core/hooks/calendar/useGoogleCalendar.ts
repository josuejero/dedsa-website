'use client';

import useSWR from 'swr';

export interface Event {
  title: string;
  date: string;
  location: string;
  isVirtual?: boolean;
}

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
}

interface UseGoogleCalendarResult {
  events: Event[];
  isLoading: boolean;
  isError: boolean;
}

const fetcher = async (url: string): Promise<GoogleCalendarEvent[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }
  return res.json();
};

export function useGoogleCalendar(): UseGoogleCalendarResult {
  const { data, error, isLoading } = useSWR<GoogleCalendarEvent[]>(
    '/api/events',
    fetcher
  );

  const events: Event[] = (data || [])
    .filter((e) => e && e.summary && (e.start?.dateTime || e.start?.date))
    .map((e) => {
      const startDateTime = e.start.dateTime || e.start.date!;
      const eventDate = new Date(startDateTime);

      return {
        title: e.summary || 'Untitled Event',
        date: eventDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          ...(e.start.dateTime && {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
        }),
        location: e.location || 'Location TBD',
        isVirtual: !!e.location
          ?.toLowerCase()
          .match(/zoom|jitsi|meet|virtual/i),
      };
    });

  return {
    events,
    isLoading,
    isError: !!error,
  };
}
