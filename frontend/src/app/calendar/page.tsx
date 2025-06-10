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

  // Debug logging
  console.log('Calendar Page Debug:', { events, isLoading, isError });

  // merge static + dynamic into the shape CalendarFeature expects
  const eventCalendar: EventCalendarContent = {
    ...cfg.eventCalendar,
    events: events.map((event, index) => ({
      id: `event-${index}`,
      title: event.title,
      startDate: event.startDate, // use raw ISO for proper date placement :contentReference[oaicite:9]{index=9}
      slug: encodeURIComponent(event.title.toLowerCase().replace(/\s+/g, '-')), // safe URL encoding :contentReference[oaicite:10]{index=10}
      description: `Event: ${event.title}`,
      location: event.location,
      isVirtual: event.isVirtual,
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
