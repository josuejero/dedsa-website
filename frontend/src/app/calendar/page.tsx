'use client';

import { useGoogleCalendar } from '@/core/hooks/calendar/useGoogleCalendar';
import { contentService } from '@/core/services/contentService';
import type {
  CalendarPageContent,
  CalendarSubscription,
  EventCalendarContent,
  MonthSelectorContent,
} from '@/core/types/pages/calendar';
import CalendarFeature from '@/features/calendar';

export default function CalendarPage() {
  // static text & embed‐URL config
  const cfg = contentService.getPageContent('calendar') as {
    page: CalendarPageContent;
    eventCalendar: Omit<EventCalendarContent, 'events' | 'isLoading' | 'error'>;
    monthSelector: MonthSelectorContent;
    subscription: CalendarSubscription;
  };

  // live events hook
  const { events, isLoading, isError } = useGoogleCalendar();

  // merge static + dynamic into the shape CalendarFeature expects
  const eventCalendar: EventCalendarContent = {
    ...cfg.eventCalendar,
    events: events.map((event) => ({
      ...event,
      id: event.title,
      startDate: new Date(event.date).toISOString(),
      slug: event.title.toLowerCase().replace(/\s+/g, '-'),
    })),
    isLoading,
    error: isError ? new Error('Failed to load calendar events') : undefined,
  };

  return (
    <CalendarFeature
      {...cfg.page}
      eventCalendar={eventCalendar}
      monthSelectorData={cfg.monthSelector}
      subscription={cfg.subscription}
    />
  );
}
