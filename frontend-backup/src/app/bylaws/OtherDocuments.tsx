import otherDocumentsContent from '../../content/bylaws/otherDocuments.json';
import { OtherDocumentsContent } from '../../types/content/bylaws';

// Type assertion for the imported JSON
const typedOtherDocumentsContent =
  otherDocumentsContent as OtherDocumentsContent;

export default function OtherDocuments() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {typedOtherDocumentsContent.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {typedOtherDocumentsContent.documents.map((document, index) => (
          <a
            key={index}
            href={document.href}
            target={document.href.startsWith('http') ? '_blank' : undefined}
            rel={
              document.href.startsWith('http')
                ? 'noopener noreferrer'
                : undefined
            }
            className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors block"
          >
            <svg
              className="h-12 w-12 text-dsa-red mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={document.icon}
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">{document.title}</h3>
            <p>{document.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
