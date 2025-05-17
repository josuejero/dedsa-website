'use client';

import { monthSelectorData } from '../../content/consolidated/calendar/monthSelector.json';
import { MonthSelectorContent } from '../../types/content/calendar';
import { MonthSelectorProps } from './types';

// Type assertion for imported JSON
const typedContent = monthSelector as MonthSelectorContent;

export default function MonthSelector({
  months,
  selectedMonth,
  onMonthChange,
}: MonthSelectorProps) {
  return (
    <div className="mb-8">
      <label htmlFor="month-select" className="block text-lg font-medium mb-2">
        {typedContent.label}
      </label>
      <select
        id="month-select"
        className="w-full md:w-1/3 p-2 border rounded"
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
      >
        {months.map((month) => (
          <option key={month.key} value={month.key}>
            {month.value}
          </option>
        ))}
      </select>
    </div>
  );
}
