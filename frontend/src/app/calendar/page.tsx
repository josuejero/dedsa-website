import { contentService } from '@/core/services/contentService';
import type {
  CalendarPageContent,
  CalendarSubscription,
  EventCalendarContent,
  MonthSelectorContent,
} from '@/core/types/pages/calendar';
import CalendarFeature from '@/features/calendar';

// src/app/calendar/page.tsx

interface CalendarContent {
  page: CalendarPageContent;
  eventCalendar: EventCalendarContent;
  monthSelectorData: MonthSelectorContent;
  subscription: CalendarSubscription;
}

export default function CalendarPage() {
  const data = contentService.getPageContent(
    'calendar'
  ) as unknown as CalendarContent; // ← cast via unknown
  const { page, eventCalendar, monthSelectorData, subscription } = data;

  return (
    <CalendarFeature
      {...page}
      eventCalendar={eventCalendar}
      monthSelectorData={monthSelectorData}
      subscription={subscription}
    />
  );
}
