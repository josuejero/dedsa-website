// ./frontend/src/app/what-we-stand-for/page.tsx
import React from 'react';
import Link from 'next/link';
import { getClient } from '../../lib/apollo-client';
import { Metadata } from 'next';
import { Position } from './types';
import { GET_POSITIONS_PAGE } from './queries';
import PositionCard from './PositionCard';

export const metadata: Metadata = {
  title: 'What We Stand For',
  description:
    'Learn about the positions and values of the Delaware chapter of the Democratic Socialists of America.',
};

export default async function WhatWeStandFor() {
  const { data } = await getClient().query({
    query: GET_POSITIONS_PAGE,
  });

  const pageContent =
    data?.page?.content ||
    `
    <p>
      As democratic socialists, we believe that both the economy and society should be run
      democratically to meet human needs, not to make profits for a few. We are committed
      to fighting for justice and equity in Delaware and beyond.
    </p>
    <p>
      Below are some of the key issues we're fighting for in Delaware:
    </p>
  `;

  let positions =
    data?.positions?.nodes?.map((node: any) => ({
      id: node.id,
      title: node.title,
      content: node.content,
      order: node.menuOrder,
    })) || [];

  if (positions.length === 0) {
    positions = [
      {
        id: 'healthcare',
        title: 'Medicare for All',
        content: `
          <p>We believe healthcare is a right, not a privilege. We fight for a universal, single-payer healthcare system that provides comprehensive care to all.</p>
          <p>In Delaware, we're advocating for:</p>
          <ul>
            <li>Expanded Medicaid coverage</li>
            <li>Caps on prescription drug prices</li>
            <li>Protection of reproductive healthcare access</li>
          </ul>
        `,
        order: 1,
      },
      // Additional fallback positions would be here
    ];
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        {/* Hero Section */}
        <div className="bg-dsa-red text-white p-8 md:p-12 rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">What We Stand For</h1>
          <p className="text-xl">
            The Delaware DSA is committed to building a more just and equitable society. We believe
            in democratic socialism—a system where ordinary people have a real voice in our
            workplaces, communities, and government.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </div>

        {/* Positions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {positions.map((position: Position) => (
            <PositionCard key={position.id} position={position} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">Join Our Movement</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            If you share our vision for a more just, democratic, and sustainable future, we invite
            you to join Delaware DSA today.
          </p>
          <Link href="/join" className="btn btn-primary text-lg px-8 py-3">
            Become A Member
          </Link>
        </div>
      </div>
    </div>
  );
}
