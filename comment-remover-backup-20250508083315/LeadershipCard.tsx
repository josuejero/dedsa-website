'use client';

import { useState } from 'react';
import React from 'react';

interface LeadershipCardProps {
  title: string;
  name: string;
  bio: string;
  email: string;
  imageUrl?: string;
}

export default function LeadershipCard({ title, name, bio, email, imageUrl }: LeadershipCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        {/* Header with image if available */}
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-dsa-red text-white text-lg font-bold">
                {name.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-600">{title}</p>
          </div>
        </div>

        {/* Bio - expanded or truncated */}
        <div className="mb-4">
          {isExpanded ? (
            <div className="prose" dangerouslySetInnerHTML={{ __html: bio }} />
          ) : (
            <div className="prose line-clamp-3" dangerouslySetInnerHTML={{ __html: bio }} />
          )}

          {/* Expand/collapse button */}
          {bio.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-dsa-red font-medium hover:underline mt-2"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Contact */}
        <div>
          <a href={`mailto:${email}`} className="text-dsa-red hover:underline flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
