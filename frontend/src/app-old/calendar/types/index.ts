// Types for calendar components
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

export interface MonthOption {
  key: string;
  value: string;
}

export interface MonthSelectorProps {
  months: MonthOption[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export interface EventCalendarProps {
  events: CalendarEvent[];
  selectedMonth: string;
}

export interface EventListProps {
  eventsByDate: Record<string, CalendarEvent[]>;
}

export interface CalendarProps {
  searchParams: Promise<{ month?: string }>;
}

export interface EventsData {
  events?: {
    nodes: CalendarEvent[];
  };
}
