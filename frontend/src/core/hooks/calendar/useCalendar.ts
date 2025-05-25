'use client';

import type {
  CalendarEvent,
  CalendarFilters,
  CalendarViewType,
} from '@/core/types/pages/calendar';
import { useEffect, useMemo, useState } from 'react';

export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<CalendarViewType['type']>('month');
  const [filters, setFilters] = useState<CalendarFilters>({
    categories: [],
    committees: [],
    searchTerm: '',
  });

  // Mock events data - replace with API call
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockEvents: CalendarEvent[] = [
          {
            id: '1',
            title: 'General Membership Meeting',
            description:
              'Monthly general membership meeting to discuss chapter business and upcoming campaigns.',
            startDate: '2025-05-26',
            startTime: '19:00',
            endTime: '21:00',
            location: 'Zoom',
            isVirtual: true,
            virtualLink: 'https://zoom.us/j/123456789',
            category: 'meeting',
            committee: 'General',
            slug: 'general-membership-meeting-may-2025',
            registrationRequired: false,
            tags: ['membership', 'monthly'],
          },
          {
            id: '2',
            title: 'Housing Justice Working Group Meeting',
            description:
              'Planning meeting for upcoming tenant rights campaign.',
            startDate: '2025-05-28',
            startTime: '18:30',
            endTime: '20:00',
            location: 'Community Center',
            isVirtual: false,
            category: 'meeting',
            committee: 'Housing Justice',
            slug: 'housing-justice-meeting-may-2025',
            registrationRequired: false,
            tags: ['housing', 'working-group'],
          },
          {
            id: '3',
            title: 'Medicare for All Rally',
            description:
              'Join us as we advocate for healthcare as a human right.',
            startDate: '2025-06-02',
            startTime: '12:00',
            endTime: '15:00',
            location: 'Legislative Hall, Dover',
            isVirtual: false,
            category: 'action',
            slug: 'medicare-for-all-rally-june-2025',
            registrationRequired: true,
            registrationLink: '/events/medicare-for-all-rally/register',
            tags: ['healthcare', 'rally', 'dover'],
          },
        ];

        setEvents(mockEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(event.category || '')
      ) {
        return false;
      }

      // Committee filter
      if (
        filters.committees.length > 0 &&
        !filters.committees.includes(event.committee || '')
      ) {
        return false;
      }

      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          event.title.toLowerCase().includes(searchLower) ||
          event.description?.toLowerCase().includes(searchLower) ||
          event.location?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [events, filters]);

  // Get events for current view
  const viewEvents = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    return filteredEvents.filter((event) => {
      const eventDate = new Date(event.startDate);

      switch (viewType) {
        case 'month':
          return eventDate >= startOfMonth && eventDate <= endOfMonth;
        case 'week':
          const startOfWeek = new Date(currentDate);
          startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        case 'day':
          return eventDate.toDateString() === currentDate.toDateString();
        case 'list':
          return eventDate >= now;
        default:
          return true;
      }
    });
  }, [filteredEvents, currentDate, viewType]);

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      switch (viewType) {
        case 'month':
          newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
          break;
        case 'week':
          newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
          break;
        case 'day':
          newDate.setDate(prev.getDate() + (direction === 'next' ? 1 : -1));
          break;
      }
      return newDate;
    });
  };

  const setToday = () => {
    setCurrentDate(new Date());
  };

  return {
    events: viewEvents,
    allEvents: events,
    loading,
    error,
    currentDate,
    viewType,
    filters,
    setViewType,
    setFilters,
    navigateDate,
    setToday,
    setCurrentDate,
  };
}
