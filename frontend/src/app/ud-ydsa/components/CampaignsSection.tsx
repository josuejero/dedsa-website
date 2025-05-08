import React from 'react';
import Link from 'next/link';
import { Campaign } from '../types';

const campaigns: Campaign[] = [
  {
    title: 'Cost of Living Crisis',
    description:
      'Fighting for affordable housing, meal plan reform, and cost of attendance reductions to make education accessible for all students.',
  },
  {
    title: 'Labor Solidarity',
    description:
      'Supporting campus workers through solidarity actions and advocating for fair wages and working conditions for all university employees.',
  },
  {
    title: 'Climate Justice',
    description:
      'Pressuring the university to divest from fossil fuels and implement sustainable practices across campus operations.',
  },
];

export default function CampaignsSection() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">Current Campaigns</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
            <p className="mb-4">{campaign.description}</p>
            <Link href="/calendar?tag=ud-ydsa" className="text-dsa-red hover:underline">
              Join the campaign →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
