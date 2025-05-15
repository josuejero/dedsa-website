// src/app/what-we-stand-for/page.tsx
import { ApolloError } from '@apollo/client';
import { Metadata } from 'next';
import Link from 'next/link';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import pageContent from '../../content/what-we-stand-for/page.json';
import { getClient } from '../../lib/apollo-client';
import { WhatWeStandForPageContent } from '../../types/content/whatWeStandFor';
import PositionCard from './PositionCard';
import { GET_POSITIONS_PAGE } from './queries';
import { Position } from './types';
export const dynamic = 'force-dynamic';

// Type assertion for the imported JSON
const typedPageContent = pageContent as WhatWeStandForPageContent;

export const metadata: Metadata = {
  title: 'What We Stand For',
  description:
    'Learn about the positions and values of the Delaware chapter of the Democratic Socialists of America.',
};

export default async function WhatWeStandFor() {
  let data: {
    page?: { id?: string; content: string };
    positions?: { nodes: Position[] };
  } = { page: { content: '' }, positions: { nodes: [] } }; // Default values

  try {
    const result = await getClient().query<{
      page: { id: string; content: string };
      positions: { nodes: Position[] };
    }>({
      query: GET_POSITIONS_PAGE,
    });
    data = result.data;
  } catch (error) {
    console.error('Error loading positions page:', error);

    // Different error handling based on error type
    if (error instanceof ApolloError) {
      if (error.networkError) {
        return (
          <ErrorDisplay
            title="Network Error"
            message="We're having trouble connecting to our servers. Please check your internet connection and try again."
            error={error}
          />
        );
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        return (
          <ErrorDisplay
            title="Data Error"
            message="There was a problem with the data. Our team has been notified."
            error={error.graphQLErrors[0]}
            showDetails={process.env.NODE_ENV === 'development'}
          />
        );
      }
    }

    // Generic error fallback
    return (
      <ErrorDisplay
        error={error}
        showDetails={process.env.NODE_ENV === 'development'}
      />
    );
  }

  const pageContentHtml =
    data.page?.content ?? typedPageContent.fallbackContent;
  const positions = data.positions?.nodes ?? [];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        {/* Hero Section */}
        <div className="bg-dsa-red text-white p-8 md:p-12 rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {typedPageContent.hero.heading}
          </h1>
          <p className="text-xl">{typedPageContent.hero.description}</p>
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          {pageContentHtml ? (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pageContentHtml }}
            />
          ) : (
            <p className="text-center text-gray-500">
              {typedPageContent.notFoundMessage}
            </p>
          )}
        </div>

        {/* Positions Grid */}
        {positions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {positions.map((position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-12">
            {typedPageContent.emptyPositionsMessage}
          </p>
        )}

        {/* CTA Section */}
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">
            {typedPageContent.cta.heading}
          </h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            {typedPageContent.cta.description}
          </p>
          <Link
            href={typedPageContent.cta.buttonHref}
            className="btn btn-primary text-lg px-8 py-3"
          >
            {typedPageContent.cta.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
