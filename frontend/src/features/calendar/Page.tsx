import type {
  CalendarPageContent,
  EventCalendarContent,
  MonthSelectorContent,
} from '@/core/types/pages/calendar';

type Props = CalendarPageContent & {
  eventCalendar: EventCalendarContent;
  monthSelectorData: MonthSelectorContent;
};

export default function CalendarPage({
  title,
  subtitle,
  eventCalendar,
  monthSelectorData,
}: Props) {
  // for now, you can just dump the props to verify
  return (
    <pre>
      {JSON.stringify(
        { title, subtitle, eventCalendar, monthSelectorData },
        null,
        2
      )}
    </pre>
  );
}
