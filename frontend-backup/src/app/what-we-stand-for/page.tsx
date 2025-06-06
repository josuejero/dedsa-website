// src/app/what-we-stand-for/page.tsx
import { Metadata } from 'next';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import pageJson from '../../content/what-we-stand-for/page.json';
import { fetchGraphQL } from '../../utils/graphql/fetcher';
import PositionCard from './PositionCard';
import { Position } from './types';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'What We Stand For',
  description: 'Delaware DSA positions and values.',
};

interface WhatWeStandForContent {
  hero: { heading: string; description: string };
  fallbackContent: string;
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  emptyPositionsMessage: string;
  notFoundMessage: string;
}

interface PageData {
  page: { content: string };
  positions: { nodes: Position[] };
}

const j = pageJson as WhatWeStandForContent;
const Q = `query{page(id:"what-we-stand-for",idType:URI){content}positions(first:100){nodes{id,title,content,menuOrder}}}`;

export default async function WhatWeStandFor() {
  try {
    const response = await fetchGraphQL<PageData>(Q);
    const data = response.data || {
      page: { content: '' },
      positions: { nodes: [] },
    };

    const html = data.page?.content || j.fallbackContent;
    const ps = data.positions?.nodes || [];

    return (
      <div className="bg-gray-100 py-14">
        <div className="container-page py-14">
          <div className="bg-dsa-red text-white p-8 rounded-lg mb-12">
            <h1 className="text-4xl font-bold mb-4">{j.hero.heading}</h1>
            <p className="text-xl">{j.hero.description}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            {html ? (
              <div
                className="prose prose-lg"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p className="text-center text-gray-500">{j.notFoundMessage}</p>
            )}
          </div>
          {ps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {ps.map((position: Position) => (
                <PositionCard key={position.id} position={position} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mb-12">
              {j.emptyPositionsMessage}
            </p>
          )}
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">{j.cta.heading}</h2>
            <p className="text-xl mb-6">{j.cta.description}</p>
            <a
              href={j.cta.buttonHref}
              className="btn btn-primary text-lg px-8 py-3"
            >
              {j.cta.buttonText}
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error: unknown) {
    console.error('Error loading positions page:', error);
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    return (
      <ErrorDisplay
        error={message}
        showDetails={process.env.NODE_ENV === 'development'}
      />
    );
  }
}
