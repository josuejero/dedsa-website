import React from 'react';

interface TimelineProps {
  foundingYear: number;
  yearsActive: number;
}

export default function Timeline({ foundingYear, yearsActive }: TimelineProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">Our History</h2>

      <div className="relative border-l-4 border-dsa-red pl-6 pb-2">
        {/* Timeline Items */}
        <TimelineItem
          year={foundingYear}
          content="Delaware DSA was founded as members from across the state came together to build a socialist presence in Delaware. Our chapter began with a small group of dedicated organizers committed to bringing democratic socialist politics to our communities."
        />

        <TimelineItem
          year={2022}
          content="We focused on building our membership and establishing our internal structures. The chapter developed its first campaigns around tenant organizing and healthcare justice, laying the groundwork for future victories."
        />

        <TimelineItem
          year={2023}
          content="Our chapter grew significantly and began building coalitions with other progressive organizations across the state. We expanded our work on housing justice and began developing our labor solidarity committee."
        />

        <TimelineItem
          year={2024}
          content="We celebrated several campaign victories and continued to expand our presence throughout the state. New committees were formed to address climate justice and electoral strategy as our membership grew."
        />

        <TimelineItem
          year={0}
          title="Today"
          content={`Now in our ${yearsActive}${getOrdinalSuffix(
            yearsActive,
          )} year, Delaware DSA continues to grow and fight for a more just, democratic, and socialist future for all Delawareans. We remain committed to building working class power and solidarity throughout the state.`}
        />
      </div>
    </div>
  );
}

interface TimelineItemProps {
  year: number;
  title?: string;
  content: string;
}

function TimelineItem({ year, title, content }: TimelineItemProps) {
  return (
    <div className="mb-8 relative">
      <div className="absolute -left-10 mt-2 w-6 h-6 rounded-full bg-dsa-red"></div>
      <h3 className="text-xl font-bold">{title || year}</h3>
      <p>{content}</p>
    </div>
  );
}

function getOrdinalSuffix(n: number): string {
  if (n > 3 && n < 21) return 'th';
  switch (n % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
