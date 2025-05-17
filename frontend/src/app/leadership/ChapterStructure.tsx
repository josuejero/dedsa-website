// src/app/leadership/ChapterStructure.tsx
import chapterJson from '../../content/leadership/chapterStructure.json';
import { ChapterStructureContent } from '../../types/content/leadership';

const c = chapterJson as ChapterStructureContent;

export default function ChapterStructure() {
  return (
    <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{c.title}</h2>
      <p className="mb-4">{c.description}</p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          <strong>{c.structureItems.generalMembership.title}:</strong>{' '}
          {c.structureItems.generalMembership.description}
        </li>
        <li>
          <strong>{c.structureItems.steeringCommittee.title}:</strong>{' '}
          {c.structureItems.steeringCommittee.description}
        </li>
        <li>
          <strong>{c.structureItems.workingGroups.title}:</strong>{' '}
          {c.structureItems.workingGroups.description}
        </li>
      </ul>
      <p className="mb-4">{c.meetingsInfo}</p>
      <a
        href={c.bylawsLinkHref}
        className="inline-flex items-center text-dsa-red hover:underline"
      >
        {c.bylawsLinkText}
        <svg
          className="ml-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </div>
  );
}
