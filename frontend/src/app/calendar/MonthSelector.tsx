'use client';

import { useRouter, usePathname } from 'next/navigation';

interface Month {
  key: string;
  value: string;
}

interface MonthSelectorProps {
  months: Month[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export default function MonthSelector({
  months,
  selectedMonth,
  onMonthChange,
}: MonthSelectorProps) {
  return (
    <div className="mb-8">
      <label htmlFor="month-select" className="block text-lg font-medium mb-2">
        Select Month
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
