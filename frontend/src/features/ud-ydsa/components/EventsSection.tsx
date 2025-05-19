import Link from 'next/link';
import eventsSectionContent from '../../../content/ud-ydsa/eventsSection.json';
import { EventsSectionContent } from '../../../types/content/ud-ydsa';

// Type assertion for imported JSON
const typedContent = eventsSectionContent as EventsSectionContent;

export default function EventsSection() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{typedContent.title}</h2>
        <Link
          href={typedContent.viewAllLinkHref}
          className="text-dsa-red hover:underline"
        >
          {typedContent.viewAllLinkText}
        </Link>
      </div>

      <div className="border border-gray-200 rounded-lg divide-y">
        {typedContent.upcomingEvents.map((event, index) => (
          <div
            key={index}
            className="p-4 flex flex-col md:flex-row md:items-center"
          >
            <div className="md:w-1/4">
              <p className="font-bold">{event.date}</p>
              <p>{event.time}</p>
            </div>
            <div className="md:w-1/2 mt-2 md:mt-0">
              <h3 className="font-bold">{event.title}</h3>
              <p>{event.location}</p>
            </div>
            <div className="md:w-1/4 mt-2 md:mt-0 md:text-right">
              <Link href={event.href} className="btn btn-primary inline-block">
                {typedContent.detailsButtonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
