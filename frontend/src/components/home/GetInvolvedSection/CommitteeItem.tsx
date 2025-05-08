// frontend/src/components/home/GetInvolvedSection/CommitteeItem.tsx

import React from 'react';
import { Committee } from './types';

interface CommitteeItemProps {
  committee: Committee;
}

export default function CommitteeItem({ committee }: CommitteeItemProps) {
  return (
    <div className="group p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors duration-200">
      <h4 className="font-bold group-hover:text-dsa-red transition-colors flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-dsa-red"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={committee.icon} />
        </svg>
        {committee.title}
      </h4>
      <p className="text-sm mt-2 pl-7">{committee.description}</p>
    </div>
  );
}
