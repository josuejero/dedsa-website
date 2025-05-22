import bylawsDocumentContent from '../../../content/bylaws/bylawsDocument.json';
import { BylawsDocumentContent } from '../../../types/content/bylaws';

// Type assertion for the imported JSON
const typedBylawsDocumentContent =
  bylawsDocumentContent as BylawsDocumentContent;

interface BylawsDocumentProps {
  bylawsPdf: string;
}

export default function BylawsDocument({ bylawsPdf }: BylawsDocumentProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">
        {typedBylawsDocumentContent.title}
      </h2>

      <div className="aspect-[8.5/11] w-full bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src={bylawsPdf}
          className="w-full h-full"
          title="Delaware DSA Bylaws"
        />
      </div>

      <div className="mt-4 text-center text-gray-600 text-sm">
        {typedBylawsDocumentContent.fallbackMessage}{' '}
        <a href={bylawsPdf} download className="text-dsa-red hover:underline">
          {typedBylawsDocumentContent.downloadLinkText}
        </a>
        .
      </div>
    </div>
  );
}
