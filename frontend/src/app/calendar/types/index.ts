// frontend/src/app/calendar/types/index.ts

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

export interface Month {
  key: string;
  value: string;
}

export interface MonthSelectorProps {
  months: Month[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export interface EventCalendarProps {
  events: CalendarEvent[];
  selectedMonth: string;
}

export interface EventListProps {
  eventsByDate: { [key: string]: CalendarEvent[] };
}

export interface CalendarProps {
  params: Promise<Record<never, never>>;
  searchParams: Promise<{ month?: string }>;
}

export interface EventsData {
  events?: {
    nodes: CalendarEvent[];
  };
}
