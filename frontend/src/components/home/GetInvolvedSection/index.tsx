import CommitteesCard from './CommitteesCard';
import UpcomingEventsCard from './UpcomingEventsCard';

export default function GetInvolvedSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Get Involved</h2>
          <div className="w-24 h-1 bg-dsa-red mx-auto mb-4 rounded"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our campaigns, attend events, and become part of our democratic
            community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UpcomingEventsCard />
          <CommitteesCard />
        </div>
      </div>
    </section>
  );
}
