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

// Define the actual calendar JSON structure
interface CalendarData {
  page: {
    title: string;
    subtitle: string;
    errorTitle: string;
    errorMessage: string;
    errorActionLabel: string;
    subscribeTitle: string;
    subscribeText: string;
    googleCalendarButtonText: string;
    iCalOutlookButtonText: string;
  };
  eventCalendar: {
    noEventsMessage: string;
    checkBackMessage: string;
    loadingMessage: string;
    errorLoadingMessage: string;
  };
  monthSelector: {
    label: string;
    previousMonth: string;
    nextMonth: string;
  };
  subscription: {
    calendarId: string;
    googleCalendarEmbedUrl: string;
    googleCalendarUrl: string;
    iCalUrl: string;
    subscriptionInstructions: string;
  };
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
  // Type assertion to ensure we get the calendar data structure
  const calendarData = contentService.getPageContent(
    'calendar'
  ) as CalendarData;

  // Map the JSON structure to the expected interfaces with fallbacks
  const pageContent: CalendarPageContent = {
    title: calendarData?.page?.title || 'Events Calendar',
    subtitle:
      calendarData?.page?.subtitle ||
      'Join us for meetings, actions, educational events, and social gatherings.',
    errorTitle: calendarData?.page?.errorTitle || 'Unable to Load Calendar',
    errorMessage:
      calendarData?.page?.errorMessage ||
      "We're experiencing technical difficulties loading events. Please try again later.",
    errorActionLabel: calendarData?.page?.errorActionLabel || 'Return to Home',
    subscribeTitle:
      calendarData?.page?.subscribeTitle || 'Subscribe to Our Calendar',
    subscribeText:
      calendarData?.page?.subscribeText ||
      'Stay up-to-date with all Delaware DSA events by subscribing to our calendar.',
    googleCalendarButtonText:
      calendarData?.page?.googleCalendarButtonText || 'Add to Google Calendar',
    iCalOutlookButtonText:
      calendarData?.page?.iCalOutlookButtonText || 'Subscribe to iCal/Outlook',
  };

  const eventCalendar: EventCalendarContent = {
    noEventsMessage:
      calendarData?.eventCalendar?.noEventsMessage ||
      'No events scheduled for this month.',
    checkBackMessage:
      calendarData?.eventCalendar?.checkBackMessage ||
      'Please check back later or select a different month.',
  };

  const monthSelectorData: MonthSelectorContent = {
    label: calendarData?.monthSelector?.label || 'Select Month',
  };

  const subscription: CalendarSubscription = {
    calendarId:
      calendarData?.subscription?.calendarId ||
      'f17d4d4d1756675b31bf0c7cc145c8e2b0fd967d93c55e23c40a0fe15fe4fd8d@group.calendar.google.com',
    googleCalendarEmbedUrl:
      calendarData?.subscription?.googleCalendarEmbedUrl ||
      'https://calendar.google.com/calendar/embed?src=f17d4d4d1756675b31bf0c7cc145c8e2b0fd967d93c55e23c40a0fe15fe4fd8d%40group.calendar.google.com&ctz=America%2FNew_York',
    googleCalendarUrl:
      calendarData?.subscription?.googleCalendarUrl ||
      'https://calendar.google.com/calendar/u/0?cid=f17d4d4d1756675b31bf0c7cc145c8e2b0fd967d93c55e23c40a0fe15fe4fd8d@group.calendar.google.com',
    iCalUrl:
      calendarData?.subscription?.iCalUrl ||
      'https://calendar.google.com/calendar/ical/f17d4d4d1756675b31bf0c7cc145c8e2b0fd967d93c55e23c40a0fe15fe4fd8d%40group.calendar.google.com/public/basic.ics',
    subscriptionInstructions:
      calendarData?.subscription?.subscriptionInstructions ||
      'Subscribe to receive automatic updates about Delaware DSA events in your preferred calendar app.',
  };

  return (
    <CalendarFeature
      {...pageContent}
      eventCalendar={eventCalendar}
      monthSelectorData={monthSelectorData}
      subscription={subscription}
    />
  );
}
