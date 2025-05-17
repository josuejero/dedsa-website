// types/calendar.ts
export interface CalendarEvent {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  meta: {
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventVirtualLink?: string;
  };
}
