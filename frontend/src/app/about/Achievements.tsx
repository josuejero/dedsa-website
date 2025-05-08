import React from 'react';

interface AchievementsProps {
  achievements: string[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">What We&apos;ve Accomplished</h2>

      <div className="space-y-4">
        {achievements.map((achievement: string, index: number) => (
          <div key={index} className="flex items-start">
            <svg
              className="h-6 w-6 text-dsa-red mt-1 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p>{achievement}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
