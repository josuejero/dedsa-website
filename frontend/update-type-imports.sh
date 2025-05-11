#!/bin/bash

# Update Calendar components
sed -i '' 's/interface CalendarEvent/import { CalendarEvent } from ".\/types";/g' src/app/calendar/EventCalendar.tsx
sed -i '' 's/interface EventCalendarProps/import { EventCalendarProps } from ".\/types";/g' src/app/calendar/EventCalendar.tsx

sed -i '' 's/interface CalendarEvent/import { CalendarEvent, EventListProps } from ".\/types";/g' src/app/calendar/EventList.tsx
sed -i '' 's/interface EventListProps/\/\/ EventListProps imported above/g' src/app/calendar/EventList.tsx

sed -i '' 's/interface Month/import { Month, MonthSelectorProps } from ".\/types";/g' src/app/calendar/MonthSelector.tsx
sed -i '' 's/interface MonthSelectorProps/\/\/ MonthSelectorProps imported above/g' src/app/calendar/MonthSelector.tsx

# Update Component types
sed -i '' 's/interface ErrorDisplayProps/import { ErrorDisplayProps } from ".\/types";/g' src/components/errors/ErrorDisplay.tsx

sed -i '' 's/interface LoadingProps/import { LoadingProps } from "..\/types";/g' src/components/Loading.tsx

sed -i '' 's/interface Post/import { Post, LatestUpdatesSectionProps } from "..\/types";/g' src/components/home/LatestUpdatesSection.tsx
sed -i '' 's/interface LatestUpdatesSectionProps/\/\/ LatestUpdatesSectionProps imported above/g' src/components/home/LatestUpdatesSection.tsx

# Run the script
echo "Type imports updated!"