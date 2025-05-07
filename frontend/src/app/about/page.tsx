import { Metadata } from 'next';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about the history, mission, and values of the Delaware chapter of the Democratic Socialists of America.',
};

const GET_ABOUT_PAGE = gql`
  query GetAboutPage {
    page(id: "about", idType: URI) {
      content
      about {
        foundingYear
        achievements
        missionStatement
      }
    }
  }
`;

export default async function About() {
  const { data } = await getClient().query({
    query: GET_ABOUT_PAGE,
  });

  const pageContent =
    data?.page?.content ||
    `
    <p>Delaware DSA is the Delaware state chapter of the Democratic Socialists of America (DSA), the largest socialist organization in the United States.</p>
    <p>Our chapter brings together democratic socialists of all backgrounds to organize and fight for a political and economic system that puts people before profits. We believe that both the economy and society should be run democratically to meet human needs.</p>
    `;

  const aboutInfo = data?.page?.about || {
    foundingYear: 2021,
    missionStatement:
      "Delaware DSA's mission is to build a democratic, multi-racial socialist movement in Delaware that fights for economic, racial, and social justice for all working people.",
    achievements: [
      'Successfully advocated for tenant protections in Wilmington',
      'Organized mutual aid networks during the COVID-19 pandemic',
      'Campaigned for Medicare for All in partnership with healthcare workers',
      'Supported labor organizing efforts across the state',
      'Built coalitions with community organizations fighting for racial justice',
    ],
  };

  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - aboutInfo.foundingYear;

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-4">About Delaware DSA</h1>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </div>

        {/* Mission Statement */}
        <div className="bg-dsa-red text-white p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl italic">"{aboutInfo.missionStatement}"</p>
        </div>

        {/* History Timeline */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Our History</h2>

          <div className="relative border-l-4 border-dsa-red pl-6 pb-2">
            {/* Founding Year */}
            <div className="mb-8 relative">
              <div className="absolute -left-10 mt-2 w-6 h-6 rounded-full bg-dsa-red"></div>
              <h3 className="text-xl font-bold">{aboutInfo.foundingYear}</h3>
              <p>
                Delaware DSA was founded as members from across the state came together to build a
                socialist presence in Delaware. Our chapter began with a small group of dedicated
                organizers committed to bringing democratic socialist politics to our communities.
              </p>
            </div>

            {/* 2022 */}
            <div className="mb-8 relative">
              <div className="absolute -left-10 mt-2 w-6 h-6 rounded-full bg-dsa-red"></div>
              <h3 className="text-xl font-bold">2022</h3>
              <p>
                We focused on building our membership and establishing our internal structures. The
                chapter developed its first campaigns around tenant organizing and healthcare
                justice, laying the groundwork for future victories.
              </p>
            </div>

            {/* 2023 */}
            <div className="mb-8 relative">
              <div className="absolute -left-10 mt-2 w-6 h-6 rounded-full bg-dsa-red"></div>
              <h3 className="text-xl font-bold">2023</h3>
              <p>
                Our chapter grew significantly and began building coalitions with other progressive
                organizations across the state. We expanded our work on housing justice and began
                developing our labor solidarity committee.
              </p>
            </div>

            {/* 2024 */}
            <div className="mb-8 relative">
              <div className="absolute -left-10 mt-2 w-6 h-6 rounded-full bg-dsa-red"></div>
              <h3 className="text-xl font-bold">2024</h3>
              <p>
                We celebrated several campaign victories and continued to expand our presence
                throughout the state. New committees were formed to address climate justice and
                electoral strategy as our membership grew.
              </p>
            </div>

            {/* Present */}
            <div className="relative">
              <div className="absolute -left-10 mt-2 w-6 h-6 rounded-full bg-dsa-red"></div>
              <h3 className="text-xl font-bold">Today</h3>
              <p>
                Now in our {yearsActive}
                {getOrdinalSuffix(yearsActive)} year, Delaware DSA continues to grow and fight for a
                more just, democratic, and socialist future for all Delawareans. We remain committed
                to building working class power and solidarity throughout the state.
              </p>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">What We've Accomplished</h2>

          <div className="space-y-4">
            {aboutInfo.achievements.map((achievement: string, index: number) => (
              <div key={index} className="flex items-start">
                <svg
                  className="h-6 w-6 text-dsa-red mt-1 mr-3 flex-shrink-0"
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
                <p>{achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Democratic Socialism */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">What is Democratic Socialism?</h2>

          <div className="prose prose-lg max-w-none">
            <p>
              Democratic socialism is a political philosophy that advocates for a democratic
              political system alongside a socially owned economy. We believe that both the economy
              and society should be run democratically to meet human needs, not to make profits for
              a few.
            </p>
            <p>Democratic socialists envision a society where:</p>
            <ul>
              <li>
                <strong>Economic rights are human rights.</strong> This includes the right to
                healthcare, housing, education, and dignified work.
              </li>
              <li>
                <strong>Democracy extends beyond the ballot box.</strong> Working people should have
                a say in economic decisions that affect their lives, including in their workplaces.
              </li>
              <li>
                <strong>Resources and power are distributed equitably.</strong> Wealth and resources
                should benefit the many, not the few.
              </li>
              <li>
                <strong>Marginalized communities have equal access to rights and resources.</strong>{' '}
                We fight against all forms of oppression, including racism, sexism, homophobia, and
                xenophobia.
              </li>
            </ul>
            <p>
              We work towards these goals through grassroots organizing, coalition building,
              electoral engagement, and direct action. Our approach is both pragmatic and
              visionary—we fight for immediate reforms that improve people's lives today while
              building movements for transformative change.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/what-we-stand-for"
              className="text-dsa-red hover:underline flex items-center"
            >
              Learn more about what we stand for
              <svg className="h-5 w-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Get Involved */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Get Involved</h2>

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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Become a Member</h3>
              <p className="mb-4">
                Join DSA to become part of the largest socialist organization in the United States.
                Membership includes Delaware DSA chapter membership.
              </p>
              <Link href="/join" className="text-dsa-red hover:underline">
                Join Delaware DSA →
              </Link>
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Join a Committee</h3>
              <p className="mb-4">
                Our committees and working groups are where the real work happens. Find an area that
                matches your interests and skills.
              </p>
              <Link href="/committees" className="text-dsa-red hover:underline">
                View Committees →
              </Link>
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Attend an Event</h3>
              <p className="mb-4">
                Come to a meeting, rally, or social event to learn more about our work and meet
                fellow members and organizers.
              </p>
              <Link href="/calendar" className="text-dsa-red hover:underline">
                View Calendar →
              </Link>
            </div>
          </div>
        </div>

        {/* National DSA Link */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">About the National DSA</h2>
              <p className="mb-4">
                Delaware DSA is a chapter of the Democratic Socialists of America, the largest
                socialist organization in the United States. Learn more about the national
                organization, its history, and its work.
              </p>
              <a
                href="https://www.dsausa.org/about-us/"
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

        {/* Contact */}
        <div className="bg-dsa-red text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            We're happy to answer any questions you have about Delaware DSA and how to get involved.
          </p>
          <Link
            href="/contact"
            className="btn bg-white text-dsa-red hover:bg-gray-100 text-lg px-8 py-3"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper function to get ordinal suffix
function getOrdinalSuffix(n: number): string {
  if (n > 3 && n < 21) return 'th';
  switch (n % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
