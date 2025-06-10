'use client';

import useSWR from 'swr';

export interface Event {
  title: string;
  date: string;
  location: string;
  isVirtual?: boolean;
  startDate: string;
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

export function useGoogleCalendar(): {
  events: Event[];
  isLoading: boolean;
  isError: boolean;
} {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json() as Promise<GoogleCalendarEvent[]>;
  };
  const { data, error, isLoading } = useSWR('/api/events', fetcher);
  const events: Event[] = (data || [])
    .filter((e) => e?.summary && (e.start.dateTime || e.start.date))
    .map((e) => {
      const iso = e.start.dateTime || e.start.date!;
      const dt = new Date(iso);
      return {
        title: e.summary,
        date: dt.toLocaleString('en-US', {
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
        startDate: iso, // raw ISO for calendar plotting :contentReference[oaicite:6]{index=6}
        location: e.location || 'Location TBD',
        isVirtual: !!e.location?.match(/zoom|jitsi|meet|virtual/i),
      };
    });
  return {
    events,
    isLoading,
    isError: !!error, // SWR error handling can retry, surface to UI :contentReference[oaicite:7]{index=7}
  };
}
