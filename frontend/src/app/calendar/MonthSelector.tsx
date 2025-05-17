'use client';

import { MonthSelectorProps } from './types';

// Import from consolidated directory
const monthSelectorData = {
  label: "Select Month"
};

export default function MonthSelector({
  months,
  selectedMonth,
  onMonthChange,
}: MonthSelectorProps) {
  return (
    <div className="mb-8">
      <label htmlFor="month-select" className="block text-lg font-medium mb-2">
        {monthSelectorData.label}
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
