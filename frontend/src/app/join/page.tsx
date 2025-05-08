import { Metadata } from 'next';
import { gql } from '@apollo/client';
import { getClient } from '../../lib/apollo-client';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Join Delaware DSA',
  description: 'Become a member of the Delaware chapter of the Democratic Socialists of America.',
};

const GET_JOIN_PAGE = gql`
  query GetJoinPage {
    page(id: "join", idType: URI) {
      content
    }
  }
`;

export default async function Join() {
  const { data } = await getClient().query({
    query: GET_JOIN_PAGE,
  });

  const pageContent =
    data?.page?.content ||
    `
    <p>Join us in building a more just and democratic society! Delaware DSA is a chapter of the Democratic Socialists of America, the largest socialist organization in the United States.</p>
    <p>By becoming a member, you'll be part of a growing movement fighting for economic justice, healthcare for all, housing as a human right, and genuine democracy in our workplaces and communities.</p>
    `;

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        {}
        <div className="bg-dsa-red text-white p-8 md:p-12 rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Delaware DSA</h1>
          <p className="text-xl">
            Become part of a democratic, member-run organization working to build a better Delaware
            for the many, not the few.
          </p>
        </div>

        {}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-800 text-white p-6">
              <h2 className="text-2xl font-bold mb-2">DSA Membership</h2>
              <p className="text-lg">Join the national Democratic Socialists of America</p>
            </div>
            <div className="p-6">
              <ul className="space-y-4 mb-6">
                <li className="flex">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    <strong>National membership</strong> with automatic Delaware chapter membership
                  </span>
                </li>
                <li className="flex">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    <strong>Sliding scale dues</strong> based on income ($27-$130 annually)
                  </span>
                </li>
                <li className="flex">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    <strong>Publications</strong> including the Democratic Left magazine
                  </span>
                </li>
                <li className="flex">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    <strong>Voting rights</strong> in Delaware DSA chapter decisions
                  </span>
                </li>
                <li className="flex">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    <strong>Full participation</strong> in national and local campaigns
                  </span>
                </li>
              </ul>
              <a
                href="https:
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn btn-primary text-center block"
              >
                Join DSA
              </a>
            </div>
          </div>

          {}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-800 text-white p-6">
              <h2 className="text-2xl font-bold mb-2">Dues Waiver Program</h2>
              <p className="text-lg">Financial assistance for membership dues</p>
            </div>
            <div className="p-6">
              <p className="mb-4">
                We believe that financial circumstances should never be a barrier to joining DSA.
                Our dues waiver program provides options for those who cannot afford the standard
                membership dues.
              </p>
              <p className="mb-4">
                DSA offers reduced dues options starting at $1/month for those experiencing
                financial hardship. Delaware DSA can also sponsor memberships for those who cannot
                afford any dues at all.
              </p>
              <p className="mb-6">
                To request a dues waiver or sponsorship from Delaware DSA, please contact us using
                the button below.
              </p>
              <Link
                href="/contact?subject=Dues%20Waiver"
                className="w-full btn btn-primary text-center block"
              >
                Request Dues Waiver
              </Link>
            </div>
          </div>
        </div>

        {}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Join DSA?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Build Community</h3>
              <p>
                Connect with like-minded individuals committed to social and economic justice.
                Develop relationships with fellow organizers and build solidarity across movements.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
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
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Learn and Grow</h3>
              <p>
                Participate in political education and skill-building workshops. Develop your
                organizing skills and deepen your understanding of socialist politics and strategy.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
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
                  d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Take Action</h3>
              <p>
                Join campaigns for Medicare for All, Green New Deal, housing justice, and labor
                organizing. Make a tangible difference in the lives of working people in Delaware.
              </p>
            </div>
          </div>
        </div>

        {}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-3xl font-bold mb-6">What Our Members Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-dsa-red pl-4 py-2">
              <p className="italic mb-4">
                "Joining Delaware DSA gave me the opportunity to channel my political frustration
                into meaningful action. I've learned so much about organizing and found a community
                of people committed to building a better world."
              </p>
              <p className="font-bold">— Jamie, Member since 2022</p>
            </div>

            <div className="border-l-4 border-dsa-red pl-4 py-2">
              <p className="italic mb-4">
                "I was looking for a way to get involved in local politics that aligned with my
                values. In DSA, I found not only a political home but also friendships and a sense
                of purpose working collectively for change."
              </p>
              <p className="font-bold">— Taylor, Member since 2021</p>
            </div>
          </div>
        </div>

        {}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">What is Democratic Socialism?</h3>
              <p>
                Democratic socialism is a political philosophy that advocates for economic and
                social democracy alongside political democracy. We believe that both the economy and
                society should be run democratically to meet human needs, not to make profits for a
                few.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">How active do I need to be as a member?</h3>
              <p>
                Members participate at different levels based on their capacity. Some attend monthly
                meetings, others join a committee or working group, and some participate primarily
                online. We welcome any level of involvement you can offer, while encouraging active
                participation when possible.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Do I have to be a socialist to join?</h3>
              <p>
                You don't need to identify as a socialist to join DSA. Many members are still
                exploring their political beliefs. We welcome anyone who shares our commitment to
                building a more just and equitable society and is interested in learning more about
                socialist ideas and organizing.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">How does my membership fee get used?</h3>
              <p>
                Membership dues fund DSA's national organization and local chapters like ours. Funds
                cover organizing materials, event spaces, political education resources, campaign
                literature, and supporting member attendance at national conventions and trainings.
              </p>
            </div>
          </div>
        </div>

        {}
        <div className="bg-dsa-red text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Movement?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Together, we can build a democratic society that works for all of us, not just the
            wealthy few. Join Delaware DSA today.
          </p>
          <a
            href="https:
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-white text-dsa-red hover:bg-gray-100 text-lg px-8 py-3"
          >
            Become a Member
          </a>
        </div>
      </div>
    </div>
  );
}
