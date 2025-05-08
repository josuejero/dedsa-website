import React from 'react';

export default function NationalInfo() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">About the National DSA</h2>
          <p className="mb-4">
            Delaware DSA is a chapter of the Democratic Socialists of America, the largest socialist
            organization in the United States. Learn more about the national organization, its
            history, and its work.
          </p>
          <a
            href="https://www.dsausa.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dsa-red hover:underline inline-flex items-center"
          >
            Visit the DSA National Website
            <svg className="h-5 w-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
        <div className="md:w-1/3 mt-6 md:mt-0 md:pl-8 flex justify-center">
          <div className="w-32 h-32 bg-dsa-red rounded-full flex items-center justify-center text-white font-bold text-2xl">
            DSA
          </div>
        </div>
      </div>
    </div>
  );
}
