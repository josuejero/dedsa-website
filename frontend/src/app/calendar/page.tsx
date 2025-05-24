import { contentService } from '@/core/services/contentService';
import type {
  CalendarPageContent,
  EventCalendarContent,
  MonthSelectorContent,
} from '@/core/types/pages/calendar';
import CalendarFeature from '@/features/calendar';

export default function CalendarPage() {
  const data = contentService.getPageContent(
    'calendar'
  ) as unknown as CalendarPageContent & {
    eventCalendar: EventCalendarContent;
    monthSelectorData: MonthSelectorContent;
  };
  return <CalendarFeature {...data} />;
}
