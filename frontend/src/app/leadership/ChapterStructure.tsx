import chapterStructureContent from '../../content/leadership/chapterStructure.json';
import { ChapterStructureContent } from '../../types/content/leadership';

// Type assertion for imported JSON
const typedContent = chapterStructureContent as ChapterStructureContent;

export default function ChapterStructure() {
  return (
    <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{typedContent.title}</h2>
      <p className="mb-4">{typedContent.description}</p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          <strong>
            {typedContent.structureItems.generalMembership.title}:
          </strong>{' '}
          {typedContent.structureItems.generalMembership.description}
        </li>
        <li>
          <strong>
            {typedContent.structureItems.steeringCommittee.title}:
          </strong>{' '}
          {typedContent.structureItems.steeringCommittee.description}
        </li>
        <li>
          <strong>{typedContent.structureItems.workingGroups.title}:</strong>{' '}
          {typedContent.structureItems.workingGroups.description}
        </li>
      </ul>
      <p className="mb-4">{typedContent.meetingsInfo}</p>
      <div className="mt-6">
        <a
          href={typedContent.bylawsLinkHref}
          className="inline-flex items-center text-dsa-red hover:underline"
        >
          <span>{typedContent.bylawsLinkText}</span>
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
    </div>
  );
}
