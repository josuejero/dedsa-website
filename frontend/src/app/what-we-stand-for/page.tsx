// src/app/what-we-stand-for/page.tsx
import { ApolloError } from '@apollo/client';
import { Metadata } from 'next';
import Link from 'next/link';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import { getClient } from '../../lib/apollo-client';
import PositionCard from './PositionCard';
import { GET_POSITIONS_PAGE } from './queries';
import { Position } from './types';

export const metadata: Metadata = {
  title: 'What We Stand For',
  description:
    'Learn about the positions and values of the Delaware chapter of the Democratic Socialists of America.',
};

export default async function WhatWeStandFor() {
  let data: {
    page?: { content: string };
    positions?: { nodes: Position[] };
  };

  try {
    const result = await getClient().query<{
      page: { content: string };
      positions: { nodes: Position[] };
    }>({
      query: GET_POSITIONS_PAGE,
    });
    data = result.data;

    // Check if we got valid data
    if (!data.page && !data.positions) {
      throw new Error('Failed to load page content');
    }
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

  const pageContent = data.page?.content ?? '';
  const positions = data.positions?.nodes ?? [];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        {/* Hero Section */}
        <div className="bg-dsa-red text-white p-8 md:p-12 rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">What We Stand For</h1>
          <p className="text-xl">
            The Delaware DSA is committed to building a more just and equitable
            society. We believe in democratic socialism—a system where ordinary
            people have a real voice in our workplaces, communities, and
            government.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          {pageContent ? (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          ) : (
            <p className="text-center text-gray-500">
              Content is not available.
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
            No positions to display at this time.
          </p>
        )}

        {/* CTA Section */}
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">Join Our Movement</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            If you share our vision for a more just, democratic, and sustainable
            future, we invite you to join Delaware DSA today.
          </p>
          <Link href="/join" className="btn btn-primary text-lg px-8 py-3">
            Become A Member
          </Link>
        </div>
      </div>
    </div>
  );
}
