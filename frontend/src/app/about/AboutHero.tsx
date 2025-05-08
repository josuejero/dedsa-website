import React from 'react';

interface AboutHeroProps {
  missionStatement: string;
}

export default function AboutHero({ missionStatement }: AboutHeroProps) {
  return (
    <div className="bg-dsa-red text-white p-8 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
      <p className="text-xl italic">&quot;{missionStatement}&quot;</p>
    </div>
  );
}
