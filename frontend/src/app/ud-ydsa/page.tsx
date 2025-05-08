import React from 'react';
import { Metadata } from 'next';
import { gql } from '@apollo/client';
import { getClient } from '../../lib/apollo-client';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UD YDSA',
  description:
    'University of Delaware Young Democratic Socialists of America - Student chapter of DSA at UD.',
};

const GET_UD_YDSA_PAGE = gql`
  query GetUdYdsaPage {
    page(id: "ud-ydsa", idType: URI) {
      content
      udYdsa {
        contactEmail
        meetingLocation
        meetingSchedule
        socialMedia {
          instagram
          twitter
          facebook
        }
      }
    }
  }
`;

export default async function UdYdsa() {
  const { data } = await getClient().query({
    query: GET_UD_YDSA_PAGE,
  });

  const pageContent =
    data?.page?.content ||
    `
    <p>The University of Delaware Young Democratic Socialists of America (UD YDSA) is the student chapter of DSA at the University of Delaware. We organize students to build student power and fight for democratic socialist values on campus and beyond.</p>
    <p>As a chapter of YDSA, we work to make our university more democratic and to be a force for progressive change in the broader community. We collaborate closely with Delaware DSA on campaigns and events.</p>
    `;

  const udYdsaInfo = data?.page?.udYdsa || {
    contactEmail: 'udydsa@example.org',
    meetingLocation: 'Morris Library, Room 202, University of Delaware',
    meetingSchedule: 'Every Wednesday at 7:00 PM during the academic year',
    socialMedia: {
      instagram: 'https://instagram.com/udydsa',
      twitter: 'https://twitter.com/udydsa',
      facebook: 'https://facebook.com/udydsa',
    },
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        {/* Hero Section */}
        <div className="bg-dsa-red text-white p-8 md:p-12 rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">University of Delaware YDSA</h1>
          <p className="text-xl">
            Student organizing for a democratic university and a democratic society
          </p>
        </div>

        {/* Page Content */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          />
        </div>

        {/* Meeting Information Box */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Get Involved</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Meeting Information</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-dsa-red mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">When</p>
                    <p>{udYdsaInfo.meetingSchedule}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-dsa-red mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">Where</p>
                    <p>{udYdsaInfo.meetingLocation}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-dsa-red mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${udYdsaInfo.contactEmail}`}
                      className="text-dsa-red hover:underline"
                    >
                      {udYdsaInfo.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Follow UD YDSA</h3>

              <div className="space-y-4">
                <a
                  href={udYdsaInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                >
                  <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-2 rounded-full mr-3">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 3.807-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-3.807-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </div>
                  <span className="group-hover:text-dsa-red transition-colors">Instagram</span>
                </a>

                <a
                  href={udYdsaInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                >
                  <div className="bg-blue-400 text-white p-2 rounded-full mr-3">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    </svg>
                  </div>
                  <span className="group-hover:text-dsa-red transition-colors">Twitter</span>
                </a>

                <a
                  href={udYdsaInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                >
                  <div className="bg-blue-600 text-white p-2 rounded-full mr-3">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                  <span className="group-hover:text-dsa-red transition-colors">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Current Campaigns Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Current Campaigns</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Cost of Living Crisis</h3>
              <p className="mb-4">
                Fighting for affordable housing, meal plan reform, and cost of attendance reductions
                to make education accessible for all students.
              </p>
              <Link href="/calendar?tag=ud-ydsa" className="text-dsa-red hover:underline">
                Join the campaign →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Labor Solidarity</h3>
              <p className="mb-4">
                Supporting campus workers through solidarity actions and advocating for fair wages
                and working conditions for all university employees.
              </p>
              <Link href="/calendar?tag=ud-ydsa" className="text-dsa-red hover:underline">
                Join the campaign →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Climate Justice</h3>
              <p className="mb-4">
                Pressuring the university to divest from fossil fuels and implement sustainable
                practices across campus operations.
              </p>
              <Link href="/calendar?tag=ud-ydsa" className="text-dsa-red hover:underline">
                Join the campaign →
              </Link>
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Chapter Leadership</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-dsa-red text-white text-2xl font-bold">
                  JL
                </div>
              </div>
              <h3 className="text-xl font-bold">Jordan Lee</h3>
              <p className="text-gray-600">Co-Chair</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-dsa-red text-white text-2xl font-bold">
                  AR
                </div>
              </div>
              <h3 className="text-xl font-bold">Avery Rodriguez</h3>
              <p className="text-gray-600">Co-Chair</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-dsa-red text-white text-2xl font-bold">
                  TP
                </div>
              </div>
              <h3 className="text-xl font-bold">Taylor Park</h3>
              <p className="text-gray-600">Secretary-Treasurer</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/contact?subject=UD%20YDSA%20Leadership"
              className="text-dsa-red hover:underline"
            >
              Contact the leadership team →
            </Link>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Link href="/calendar?tag=ud-ydsa" className="text-dsa-red hover:underline">
              View all events →
            </Link>
          </div>

          <div className="border border-gray-200 rounded-lg divide-y">
            <div className="p-4 flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/4">
                <p className="font-bold">April 10, 2025</p>
                <p>7:00 PM</p>
              </div>
              <div className="md:w-1/2 mt-2 md:mt-0">
                <h3 className="font-bold">General Meeting</h3>
                <p>Morris Library, Room 202</p>
              </div>
              <div className="md:w-1/4 mt-2 md:mt-0 md:text-right">
                <Link href="/calendar/event-id" className="btn btn-primary inline-block">
                  Details
                </Link>
              </div>
            </div>

            <div className="p-4 flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/4">
                <p className="font-bold">April 15, 2025</p>
                <p>5:30 PM</p>
              </div>
              <div className="md:w-1/2 mt-2 md:mt-0">
                <h3 className="font-bold">Cost of Living Campaign Meeting</h3>
                <p>Trabant Student Center, Room 109</p>
              </div>
              <div className="md:w-1/4 mt-2 md:mt-0 md:text-right">
                <Link href="/calendar/event-id" className="btn btn-primary inline-block">
                  Details
                </Link>
              </div>
            </div>

            <div className="p-4 flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/4">
                <p className="font-bold">April 22, 2025</p>
                <p>12:00 PM</p>
              </div>
              <div className="md:w-1/2 mt-2 md:mt-0">
                <h3 className="font-bold">Earth Day Rally</h3>
                <p>The Green, University of Delaware</p>
              </div>
              <div className="md:w-1/4 mt-2 md:mt-0 md:text-right">
                <Link href="/calendar/event-id" className="btn btn-primary inline-block">
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-dsa-red text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Join UD YDSA Today!</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            We're building student power at the University of Delaware. Join us to fight for a more
            just university and a democratic socialist future.
          </p>
          <a
            href={`mailto:${udYdsaInfo.contactEmail}?subject=Interested%20in%20Joining%20UD%20YDSA`}
            className="btn bg-white text-dsa-red hover:bg-gray-100 text-lg px-8 py-3"
          >
            Get Involved
          </a>
        </div>
      </div>
    </div>
  );
}
