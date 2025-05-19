// services/content.ts

// Import each JSON slice from the consolidated directory:

// Home page sections
import homeJson from '../content/consolidated/home.json';
// Join page sections
import joinJson from '../content/consolidated/join.json';
// About page sections
import aboutJson from '../content/consolidated/about.json';
// Calendar page sections
import calendarJson from '../content/consolidated/calendar/page.json';
import eventCalendarJson from '../content/consolidated/calendar/eventCalendar.json';
import monthSelectorJson from '../content/consolidated/calendar/monthSelector.json';

// Export aggregated objects for each page:
export const homeContent = homeJson;
export const joinContent = joinJson;
export const aboutContent = aboutJson;
export const calendarContent = {
  page: calendarJson.page,
  eventCalendar: eventCalendarJson.eventCalendar,
  monthSelector: monthSelectorJson.monthSelectorData
};
