'use client';
import Image from 'next/image';
import leadershipCardContent from '../../content/leadership/leadershipCard.json';
import { LeadershipCardContent } from '../../types/content/leadership';

// Type assertion for imported JSON
const typedContent = leadershipCardContent as LeadershipCardContent;

interface LeadershipCardProps {
  title?: string;
  name?: string;
  bio?: string;
  email?: string;
  imageUrl?: string;
}

export default function LeadershipCard({
  title = typedContent.roleLabelDefault,
  name = typedContent.nameLabelDefault,
  bio = typedContent.bioLabelDefault,
  email = typedContent.emailLabelDefault,
  imageUrl,
}: LeadershipCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <h4 className="text-lg text-gray-700 mb-4">{name}</h4>

        {bio && (
          <div
            className="prose prose-sm mb-4"
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        )}

        {email && (
          <a href={`mailto:${email}`} className="text-dsa-red hover:underline">
            {email}
          </a>
        )}
      </div>
    </div>
  );
}
