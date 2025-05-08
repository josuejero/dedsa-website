import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { getClient } from '../lib/apollo-client';
import NewsletterSignup from '../components/NewsletterSignup';

const GET_RECENT_POSTS = gql`
  query GetRecentPosts {
    posts(first: 3) {
      nodes {
        id
        title
        date
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

export const revalidate = 3600;

export default async function Home() {
  const { data } = await getClient().query({
    query: GET_RECENT_POSTS,
  });

  const posts = data?.posts?.nodes || [];

  return (
    <>
      {/* Landing Section */}
      <section className="bg-gradient-to-br from-dsa-red to-red-700 text-white py-20 md:py-28">
        <div className="container-page relative">
          <div className="absolute top-0 right-0 opacity-10 w-80 h-80">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FFFFFF"
                d="M45.7,-58.2C58.9,-51.3,69,-37.4,73.9,-22.1C78.8,-6.7,78.5,10.1,72.3,24.5C66.1,38.9,54,50.9,40,58.6C26,66.3,10.1,69.8,-6.4,77.5C-22.9,85.1,-45.7,96.9,-60.1,89.8C-74.5,82.8,-80.4,56.9,-82.2,34.3C-84,11.7,-81.6,-7.5,-75.6,-25.2C-69.7,-42.9,-60.2,-59.1,-46.6,-65.9C-33,-72.8,-15.3,-70.3,0.7,-71.1C16.7,-72,33.5,-76.2,45.7,-58.2Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="max-w-3xl relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight animation-slide-up">
              Delaware DSA
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              We're building a democratic-socialist Delaware where production and resources are
              controlled by the people, not private profit. Join us in creating a state that works
              for the many, not the few.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/join"
                className="btn bg-white text-dsa-red hover:bg-gray-100 font-medium transition duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Join Our Chapter
              </Link>
              <Link
                href="/newsletter"
                className="btn border-2 border-white text-white hover:bg-white hover:text-dsa-red font-medium transition duration-300 ease-in-out"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center bg-gray-50 p-8 sm:p-12 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6 relative">
              <span className="relative inline-block">
                Our Mission
                <span className="absolute bottom-0 left-0 w-full h-1 bg-dsa-red rounded"></span>
              </span>
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              Delaware Democratic Socialists of America (DE DSA) is a member-led, democratic
              organization fighting to shift power from corporations to people. In a state known as
              America's corporate haven, we challenge the status quo by organizing for economic
              justice, racial equity, environmental sustainability, and true democracy.
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              We reject the capitalist economic order that perpetuates systemic oppression,
              violence, and environmental destruction. We are committed to a "New Delaware Way"
              rooted in economic democracy, racial justice, gender equity, environmental
              sustainability, international solidarity, and democratic pluralism.
            </p>
            <Link
              href="/what-we-stand-for"
              className="btn btn-primary shadow-md hover:shadow-lg transition-all duration-300"
            >
              What We Stand For
            </Link>
          </div>
        </div>
      </section>

      {/* Strategic Priorities Section */}
      <section className="py-20 bg-gray-100">
        <div className="container-page">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Strategic Priorities for 2025-2026
          </h2>
          <p className="text-center mb-12 text-lg text-gray-600">
            As democratically approved at our April 6, 2025 Convention:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Defending Communities from ICE',
                desc: "Building networks to protect immigrants from detention and deportation, establishing sanctuary policies, and supporting migrants' rights.",
                iconPath:
                  'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
              },
              {
                title: 'Delaware Against Apartheid',
                desc: 'Continuing our commitment to Palestinian liberation through campaigns like "No Appetite 4 Apartheid" to decrease economic support for the state of Israel, and working to establish apartheid-free zones throughout Delaware.',
                iconPath:
                  'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
              },
              {
                title: 'Enacting Rent Stabilization & Housing Justice',
                desc: 'Fighting for tenant protections, rent control, and public housing through our H.O.M.E.S. Campaign, while organizing tenant unions across the state.',
                iconPath:
                  'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
              },
              {
                title: 'Creating a Trans Refuge State',
                desc: 'Supporting legislation to make Delaware a safe haven for transgender people facing persecution elsewhere, following the model developed by Trans Refuge Now.',
                iconPath:
                  'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-dsa-red"
              >
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-red-100 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-dsa-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={p.iconPath}
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">{p.title}</h3>
                </div>
                <p className="pl-12">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <h2 className="text-3xl font-bold mb-2">Latest Updates</h2>
          <div className="w-20 h-1 bg-dsa-red mb-10 rounded"></div>

          <div className="space-y-8" data-testid="latest-updates-section">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 mt-4">Loading recent posts...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {post.featuredImage?.node ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText || post.title}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-r from-red-100 to-red-200 flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-dsa-red opacity-50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-dsa-red transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-3 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                        {post.author?.node?.name && (
                          <>
                            <span className="mx-2">|</span>
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {post.author.node.name}
                          </>
                        )}
                      </p>
                      <div
                        className="text-gray-700 mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                      <Link
                        href={`/newsletter/${post.slug}`}
                        className="inline-flex items-center text-dsa-red font-medium hover:underline group"
                      >
                        Read more
                        <svg
                          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/newsletter"
              className="btn btn-primary shadow-md hover:shadow-lg transform hover:translate-y-px transition-all"
            >
              View All Updates
            </Link>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 bg-gray-100">
        <div className="container-page">
          <h2 className="text-3xl font-bold mb-2 text-center">Get Involved</h2>
          <div className="w-24 h-1 bg-dsa-red mx-auto mb-12 rounded"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-6">
                <svg
                  className="w-8 h-8 text-dsa-red mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-2xl font-bold">Upcoming Events</h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-dsa-red pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-bold">Newark Community Rent Meeting</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Tuesday, April 23, 2025 • 6:00–8:00 PM
                  </p>
                  <p className="text-sm flex items-center mt-1">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 014 0z"
                      />
                    </svg>
                    St. Thomas Episcopal Parish (276 S. College Ave, Newark)
                  </p>
                </div>

                <div className="border-l-4 border-dsa-red pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-bold">New Member Orientation</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Thursday, April 18, 2025 • 7:00–8:30 PM
                  </p>
                  <p className="text-sm flex items-center mt-1">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14"
                      />
                    </svg>
                    Virtual via Zoom
                  </p>
                </div>

                <div className="border-l-4 border-dsa-red pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-bold">Queer Socialists Movie Night</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Friday, April 26, 2025 • 7:00–10:00 PM
                  </p>
                  <p className="text-sm flex items-center mt-1">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Private residence in Wilmington (address with RSVP)
                  </p>
                </div>

                <div className="border-l-4 border-dsa-red pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-bold">Solidarity Fair</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Sunday, June 22, 2025 • 4:00–7:00 PM
                  </p>
                  <p className="text-sm flex items-center mt-1">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Ellendale Fire Hall (302 Main St, Ellendale)
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/calendar"
                  className="group inline-flex items-center btn btn-primary shadow-sm hover:shadow transition-all"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  View Calendar
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-6">
                <svg
                  className="w-8 h-8 text-dsa-red mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="text-2xl font-bold">Committees &amp; Working Groups</h3>
              </div>

              <div className="space-y-4">
                <div className="group p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors duration-200">
                  <h4 className="font-bold group-hover:text-dsa-red transition-colors flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-dsa-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Housing Justice Working Group
                  </h4>
                  <p className="text-sm mt-2 pl-7">
                    Fights for tenants' rights, rent control, and affordable housing across
                    Delaware.
                  </p>
                </div>

                <div className="group p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors duration-200">
                  <h4 className="font-bold group-hover:text-dsa-red transition-colors flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-dsa-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    International Solidarity Working Group
                  </h4>
                  <p className="text-sm mt-2 pl-7">
                    Builds solidarity with international movements, focuses on anti-imperialism and
                    support for oppressed peoples.
                  </p>
                </div>

                <div className="group p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors duration-200">
                  <h4 className="font-bold group-hover:text-dsa-red transition-colors flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-dsa-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                      />
                    </svg>
                    Mutual Aid Working Group
                  </h4>
                  <p className="text-sm mt-2 pl-7">
                    Addresses community needs directly through solidarity-based projects, not
                    charity.
                  </p>
                </div>

                <div className="group p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors duration-200">
                  <h4 className="font-bold group-hover:text-dsa-red transition-colors flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-dsa-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Queer Socialists Working Group
                  </h4>
                  <p className="text-sm mt-2 pl-7">
                    Organizes around LGBTQ+ issues from a socialist perspective, provides community
                    for queer members.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/committees"
                  className="group inline-flex items-center btn btn-primary shadow-sm hover:shadow transition-all"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Find Your Committee
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Chapter at a Glance Section */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-xl shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
              </svg>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-center">Our Chapter at a Glance</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-4xl font-bold text-dsa-red mb-2">220</p>
                  <p className="text-sm font-medium">Dues-paying members</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-4xl font-bold text-dsa-red mb-2">15%</p>
                  <p className="text-sm font-medium">Growth since January</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-4xl font-bold text-dsa-red mb-2">10</p>
                  <p className="text-sm font-medium">Active groups</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-4xl font-bold text-dsa-red mb-2">3</p>
                  <p className="text-sm font-medium">Delaware counties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="py-20 bg-gradient-to-br from-dsa-red to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="diagonalHatch"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="10" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
          </svg>
        </div>

        <div className="container-page text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Together, we can build a better Delaware where people come before profit. Become a
            member today!
          </p>
          <Link
            href="/join"
            className="btn bg-white text-dsa-red hover:bg-gray-100 text-lg px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            Join Delaware DSA
          </Link>
        </div>
      </section>
    </>
  );
}
