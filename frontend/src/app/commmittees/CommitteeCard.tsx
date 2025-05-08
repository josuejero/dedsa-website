import React from 'react';

interface CommitteeCardProps {
  name: string;
  description: string;
  contact: string;
  meetingSchedule: string;
  members: number;
}

export default function CommitteeCard({
  name,
  description,
  contact,
  meetingSchedule,
  members,
}: CommitteeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-dsa-red text-white p-4">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <div className="p-6">
        <div className="prose mb-4" dangerouslySetInnerHTML={{ __html: description }} />

        <div className="space-y-2 text-sm">
          <p className="flex items-center">
            <svg
              className="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{meetingSchedule}</span>
          </p>

          <p className="flex items-center">
            <svg
              className="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{members} members</span>
          </p>

          <p className="flex items-center">
            <svg
              className="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a href={`mailto:${contact}`} className="text-dsa-red hover:underline">
              {contact}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
