'use client';

import type { CalendarEvent } from '@/core/types/pages/calendar';
import useSWR from 'swr';

interface UseGoogleCalendarResult {
  events: CalendarEvent[];
  isLoading: boolean;
  error?: Error;
}

type Raw = {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  location?: string;
};

export function useGoogleCalendar() {
  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      return res.json() as Promise<Raw[]>;
    });

  const { data, error } = useSWR('/api/events', fetcher);

  // Add safety checks and better error handling
  const events = (data || [])
    .filter((e) => e && e.summary && (e.start?.dateTime || e.start?.date))
    .map((e) => {
      const dt = e.start.dateTime ?? e.start.date!;
      return {
        title: e.summary || 'Untitled Event',
        date: new Date(dt).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: e.start.dateTime ? 'numeric' : undefined,
          minute: e.start.dateTime ? '2-digit' : undefined,
        }),
        location: e.location || 'TBD',
        isVirtual: !!e.location?.toLowerCase().match(/zoom|jitsi|meet/),
      };
    });

  return {
    events: events || [],
    isLoading: !data && !error,
    isError: !!error,
  };
}
