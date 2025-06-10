// src/app/calendar/page.tsx

import { contentService } from '@/core/services/contentService';
import type {
  CalendarPageContent,
  CalendarSubscription,
  EventCalendarContent,
  MonthSelectorContent,
} from '@/core/types/pages/calendar';
import CalendarFeature from '@/features/calendar';

interface CalendarContent {
  page: CalendarPageContent;
  eventCalendar: EventCalendarContent;
  monthSelectorData: MonthSelectorContent;
  subscription: CalendarSubscription;
}

export default function CalendarPage() {
  const data = contentService.getPageContent(
    'calendar'
  ) as unknown as CalendarContent;
  const { page, eventCalendar, monthSelectorData, subscription } = data;

  // 👇 Temporary workaround: TS2322 will go away once you add these three props
  //    to CalendarFeatureProps in your CalendarFeature component.
  return (
    // @ts-expect-error extend CalendarFeatureProps to include eventCalendar, monthSelectorData, subscription
    <CalendarFeature
      {...page}
      eventCalendar={eventCalendar}
      monthSelectorData={monthSelectorData}
      subscription={subscription}
    />
  );
}
