// frontend/src/components/home/GetInvolvedSection/index.tsx

import React from 'react';
import UpcomingEventsCard from './UpcomingEventsCard';
import CommitteesCard from './CommitteesCard';

export default function GetInvolvedSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container-page">
        <h2 className="text-3xl font-bold mb-2 text-center">Get Involved</h2>
        <div className="w-24 h-1 bg-dsa-red mx-auto mb-12 rounded"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UpcomingEventsCard />
          <CommitteesCard />
        </div>
      </div>
    </section>
  );
}
