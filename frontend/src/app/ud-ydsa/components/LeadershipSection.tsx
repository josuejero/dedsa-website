import React from 'react';
import Link from 'next/link';
import { LeadershipMember } from '../types';

const leadershipMembers: LeadershipMember[] = [
  {
    name: 'Jordan Lee',
    role: 'Co-Chair',
    imageInitials: 'JL',
  },
  {
    name: 'Avery Rodriguez',
    role: 'Co-Chair',
    imageInitials: 'AR',
  },
  {
    name: 'Taylor Park',
    role: 'Secretary-Treasurer',
    imageInitials: 'TP',
  },
];

export default function LeadershipSection() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">Chapter Leadership</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leadershipMembers.map((member, index) => (
          <div key={index} className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-dsa-red text-white text-2xl font-bold">
                {member.imageInitials}
              </div>
            </div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/contact?subject=UD%20YDSA%20Leadership"
          className="text-dsa-red hover:underline"
        >
          Contact the leadership team →
        </Link>
      </div>
    </div>
  );
}
