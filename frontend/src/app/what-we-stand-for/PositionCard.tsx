// ./frontend/src/app/what-we-stand-for/PositionCard.tsx
import React from 'react';
import { Position } from './types';

interface PositionCardProps {
  position: Position;
}

/**
 * Renders an individual position card with title and content
 * Content is rendered as HTML from WordPress
 */
export default function PositionCard({ position }: PositionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">{position.title}</h2>
      </div>
      <div className="p-6">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: position.content }} />
      </div>
    </div>
  );
}
