'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EventList from './EventList';
import MonthSelector from './MonthSelector';
import { CalendarEvent, EventCalendarProps } from './types';

export default function EventCalendar({
  events,
  selectedMonth,
}: EventCalendarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedMonthState, setSelectedMonthState] =
    useState<string>(selectedMonth);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generate month options from events
  const months: { [key: string]: string } = {};
  events.forEach((calendarEvent) => {
    const eventDate = new Date(calendarEvent.meta.eventDate);
    const monthKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}`;
    const monthName = eventDate.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
    months[monthKey] = monthName;
  });

  const sortedMonths = Object.entries(months)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => ({ key, value }));

  // Set default month if none selected
  useEffect(() => {
    if (!selectedMonthState && sortedMonths.length > 0) {
      const currentMonthKey = `${currentYear}-${currentMonth}`;
      const futureMonths = sortedMonths.filter((m) => m.key >= currentMonthKey);
      const newMonth =
        futureMonths.length > 0 ? futureMonths[0].key : sortedMonths[0].key;
      setSelectedMonthState(newMonth);

      router.push(`${pathname}?month=${newMonth}`);
    }
  }, [
    currentMonth,
    currentYear,
    pathname,
    router,
    selectedMonthState,
    sortedMonths,
  ]);

  // Handle month change
  const handleMonthChange = (month: string) => {
    setSelectedMonthState(month);
    router.push(`${pathname}?month=${month}`);
  };

  // Filter events by selected month
  const filteredEvents = selectedMonthState
    ? events.filter((calendarEvent) => {
        const eventDate = new Date(calendarEvent.meta.eventDate);
        const eventMonthKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}`;
        return eventMonthKey === selectedMonthState;
      })
    : events;

  // Group events by date
  const eventsByDate: { [key: string]: CalendarEvent[] } = {};
  filteredEvents.forEach((calendarEvent) => {
    const dateKey = new Date(calendarEvent.meta.eventDate)
      .toISOString()
      .split('T')[0];
    if (!eventsByDate[dateKey]) {
      eventsByDate[dateKey] = [];
    }
    eventsByDate[dateKey].push(calendarEvent);
  });

  return (
    <>
      <MonthSelector
        months={sortedMonths}
        selectedMonth={selectedMonthState}
        onMonthChange={handleMonthChange}
      />
      <EventList eventsByDate={eventsByDate} />
    </>
  );
}
