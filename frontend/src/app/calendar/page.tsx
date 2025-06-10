// src/app/calendar/page.tsx

import { contentService } from '@/core/services/contentService';
import type {
  CalendarPageContent,
  CalendarSubscription,
  EventCalendarContent,
  MonthSelectorContent,
} from '@/core/types/pages/calendar';
import CalendarFeature from '@/features/calendar';
import { Metadata } from 'next';

interface CalendarContent {
  page: CalendarPageContent;
  eventCalendar: EventCalendarContent;
  monthSelectorData: MonthSelectorContent;
  subscription: CalendarSubscription;
}

// Generate metadata for SEO
export const metadata: Metadata = {
  title: 'Events Calendar | Delaware DSA',
  description:
    'Join us for meetings, actions, educational events, and social gatherings. View our calendar and subscribe to stay updated on Delaware DSA events.',
  openGraph: {
    title: 'Events Calendar | Delaware DSA',
    description:
      'Join us for meetings, actions, educational events, and social gatherings.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Events Calendar | Delaware DSA',
    description:
      'Join us for meetings, actions, educational events, and social gatherings.',
  },
};

export default function CalendarPage() {
  const data = contentService.getPageContent(
    'calendar'
  ) as unknown as CalendarContent;
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
