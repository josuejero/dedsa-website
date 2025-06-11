'use client';

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Events Calendar</h1>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=your_calendar_id%40group.calendar.google.com&ctz=America%2FNew_York&mode=MONTH"
        style={{ border: 0 }}
        width="100%"
        height="600"
        frameBorder="0"
        scrolling="no"
        title="Delaware DSA Calendar"
      />
    </div>
  );
}
