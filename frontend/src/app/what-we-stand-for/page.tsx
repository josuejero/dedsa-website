import React from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { getClient } from '../../lib/apollo-client';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'What We Stand For',
  description:
    'Learn about the positions and values of the Delaware chapter of the Democratic Socialists of America.',
};

interface Position {
  id: string;
  title: string;
  content: string;
  order: number;
}


const GET_POSITIONS_PAGE = gql`
  query GetPositionsPage {
    page(id: "what-we-stand-for", idType: URI) {
      content
    }
    positions(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        content
        menuOrder
      }
    }
  }
`;

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
      {
        id: 'housing',
        title: 'Housing Justice',
        content: `
          <p>Safe, stable, and affordable housing should be available to all. We organize against evictions, gentrification, and homelessness.</p>
          <p>Our Delaware housing initiatives include:</p>
          <ul>
            <li>Tenant protections and rent control</li>
            <li>Public housing investment</li>
            <li>Community land trusts</li>
          </ul>
        `,
        order: 2,
      },
      {
        id: 'labor',
        title: 'Worker Power',
        content: `
          <p>We support the labor movement and fight for worker rights, fair wages, and safe working conditions. All workers deserve dignity, security, and a voice on the job.</p>
          <p>We advocate for:</p>
          <ul>
            <li>$15 minimum wage indexed to inflation</li>
            <li>Expanded union rights</li>
            <li>Workplace democracy</li>
          </ul>
        `,
        order: 3,
      },
      {
        id: 'climate',
        title: 'Climate Justice',
        content: `
          <p>The climate crisis requires bold action. We fight for a Green New Deal that transitions to renewable energy while creating good jobs and addressing environmental racism.</p>
          <p>In Delaware, we're pushing for:</p>
          <ul>
            <li>Renewable energy transition</li>
            <li>Environmental justice for affected communities</li>
            <li>Public transportation expansion</li>
          </ul>
        `,
        order: 4,
      },
      {
        id: 'democracy',
        title: 'Democratic Politics',
        content: `
          <p>We believe in a truly democratic political system free from the influence of big money. We work to elect democratic socialists to office and hold all elected officials accountable.</p>
          <p>Our democracy initiatives include:</p>
          <ul>
            <li>Campaign finance reform</li>
            <li>Expanded voting rights</li>
            <li>Participatory budgeting</li>
          </ul>
        `,
        order: 5,
      },
      {
        id: 'education',
        title: 'Education for All',
        content: `
          <p>Education is a public good that should be fully funded and accessible to all. We fight for universal free public education from pre-K through college.</p>
          <p>We're advocating for:</p>
          <ul>
            <li>Increased public school funding</li>
            <li>Student debt cancellation</li>
            <li>Democratic control of schools</li>
          </ul>
        `,
        order: 6,
      },
    ];
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        {}
        <div className="bg-dsa-red text-white p-8 md:p-12 rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">What We Stand For</h1>
          <p className="text-xl">
            The Delaware DSA is committed to building a more just and equitable society. We believe
            in democratic socialism—a system where ordinary people have a real voice in our
            workplaces, communities, and government.
          </p>
        </div>

        {}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {positions.map((position: Position) => (
            <div key={position.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold">{position.title}</h2>
              </div>
              <div className="p-6">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: position.content }}
                />
              </div>
            </div>
          ))}
        </div>

        {}
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
