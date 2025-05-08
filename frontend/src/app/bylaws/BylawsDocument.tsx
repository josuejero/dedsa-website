import React from 'react';

interface BylawsDocumentProps {
  bylawsPdf: string;
}

export default function BylawsDocument({ bylawsPdf }: BylawsDocumentProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Bylaws Document</h2>

      <div className="aspect-[8.5/11] w-full bg-gray-100 rounded-lg overflow-hidden">
        <iframe src={bylawsPdf} className="w-full h-full" title="Delaware DSA Bylaws" />
      </div>

      <div className="mt-4 text-center text-gray-600 text-sm">
        If the document doesn&apos;t load properly, you can{' '}
        <a href={bylawsPdf} download className="text-dsa-red hover:underline">
          download the PDF directly
        </a>
        .
      </div>
    </div>
  );
}
