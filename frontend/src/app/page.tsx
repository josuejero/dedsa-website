import React from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { getClient } from '../lib/apollo-client';

// Define the GraphQL query to fetch recent posts
const GET_RECENT_POSTS = gql`
  query GetRecentPosts {
    posts(first: 5) {
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
  // Fetch data using Apollo Client
  const { data } = await getClient().query({
    query: GET_RECENT_POSTS,
  });

  const posts = data?.posts?.nodes || [];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-dsa-red text-white py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Delaware DSA</h1>
            <p className="text-xl mb-8">
              We're building a democratic-socialist Delaware where production and resources are
              controlled by the people, not private profit. Join us in creating a state that works
              for the many, not the few.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/join" className="btn bg-white text-dsa-red hover:bg-gray-100">
                Join Our Chapter
              </Link>
              <Link
                href="/newsletter"
                className="btn border border-white text-white hover:bg-white hover:text-dsa-red"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-6">
              Delaware Democratic Socialists of America (DE DSA) is a member-led, democratic
              organization fighting to shift power from corporations to people. In a state known as
              America's corporate haven, we challenge the status quo by organizing for economic
              justice, racial equity, environmental sustainability, and true democracy.
            </p>
            <p className="text-lg mb-8">
              We reject the capitalist economic order that perpetuates systemic oppression,
              violence, and environmental destruction. We are committed to a "New Delaware Way"
              rooted in economic democracy, racial justice, gender equity, environmental
              sustainability, international solidarity, and democratic pluralism.
            </p>
            <Link href="/what-we-stand-for" className="btn btn-primary">
              What We Stand For
            </Link>
          </div>
        </div>
      </section>

      {/* Strategic Priorities Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-page">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Strategic Priorities for 2025-2026
          </h2>
          <p className="text-center mb-8 text-lg">
            As democratically approved at our April 6, 2025 Convention:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Defending Communities from ICE</h3>
              <p>
                Building networks to protect immigrants from detention and deportation, establishing
                sanctuary policies, and supporting migrants' rights.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Delaware Against Apartheid</h3>
              <p>
                Continuing our commitment to Palestinian liberation through campaigns like "No
                Appetite 4 Apartheid" to decrease economic support for the state of Israel, and
                working to establish apartheid-free zones throughout Delaware.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">
                Enacting Rent Stabilization & Housing Justice
              </h3>
              <p>
                Fighting for tenant protections, rent control, and public housing through our
                H.O.M.E.S. Campaign, while organizing tenant unions across the state.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Creating a Trans Refuge State</h3>
              <p>
                Supporting legislation to make Delaware a safe haven for transgender people facing
                persecution elsewhere, following the model developed by Trans Refuge Now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent News/Blog Section */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <h2 className="text-3xl font-bold mb-8">Latest Updates</h2>

          <div className="space-y-8" data-testid="latest-updates-section">
            {posts.length === 0 ? (
              <p>Loading recent posts...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {post.featuredImage?.node && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText || post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-500 text-sm mb-2">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                        {post.author?.node?.name && ` | By ${post.author.node.name}`}
                      </p>
                      <div
                        className="text-gray-700 mb-4"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                      <Link
                        href={`/newsletter/${post.slug}`}
                        className="text-dsa-red font-medium hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link href="/newsletter" className="btn btn-primary">
              View All Updates
            </Link>
          </div>
        </div>
      </section>

      {/* Get Involved Section - Events */}
      <section className="py-16 bg-gray-100">
        <div className="container-page">
          <h2 className="text-3xl font-bold mb-8 text-center">Get Involved</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upcoming Events */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-dsa-red pl-4 py-2">
                  <h4 className="font-bold">Newark Community Rent Meeting</h4>
                  <p className="text-sm text-gray-500">Tuesday, April 23, 2025 • 6:00–8:00 PM</p>
                  <p className="text-sm">
                    St. Thomas Episcopal Parish (276 S. College Ave, Newark)
                  </p>
                </div>

                <div className="border-l-4 border-dsa-red pl-4 py-2">
                  <h4 className="font-bold">New Member Orientation</h4>
                  <p className="text-sm text-gray-500">Thursday, April 18, 2025 • 7:00–8:30 PM</p>
                  <p className="text-sm">Virtual via Zoom</p>
                </div>

                <div className="border-l-4 border-dsa-red pl-4 py-2">
                  <h4 className="font-bold">Queer Socialists Movie Night</h4>
                  <p className="text-sm text-gray-500">Friday, April 26, 2025 • 7:00–10:00 PM</p>
                  <p className="text-sm">Private residence in Wilmington (address with RSVP)</p>
                </div>

                <div className="border-l-4 border-dsa-red pl-4 py-2">
                  <h4 className="font-bold">Solidarity Fair</h4>
                  <p className="text-sm text-gray-500">Sunday, June 22, 2025 • 4:00–7:00 PM</p>
                  <p className="text-sm">Ellendale Fire Hall (302 Main St, Ellendale)</p>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/calendar" className="btn btn-primary">
                  View Calendar
                </Link>
              </div>
            </div>

            {/* Committees & Working Groups */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">Committees & Working Groups</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold">Housing Justice Working Group</h4>
                  <p className="text-sm">
                    Fights for tenants' rights, rent control, and affordable housing across
                    Delaware.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">International Solidarity Working Group</h4>
                  <p className="text-sm">
                    Builds solidarity with international movements, focuses on anti-imperialism and
                    support for oppressed peoples.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Mutual Aid Working Group</h4>
                  <p className="text-sm">
                    Addresses community needs directly through solidarity-based projects, not
                    charity.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Queer Socialists Working Group</h4>
                  <p className="text-sm">
                    Organizes around LGBTQ+ issues from a socialist perspective, provides community
                    for queer members.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/committees" className="btn btn-primary">
                  Find Your Committee
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Stats */}
      <section className="py-12 bg-white">
        <div className="container-page">
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Chapter at a Glance</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-dsa-red">220</p>
                <p className="text-sm font-medium">Dues-paying members</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-dsa-red">15%</p>
                <p className="text-sm font-medium">Growth since January</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-dsa-red">10</p>
                <p className="text-sm font-medium">Active groups</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-dsa-red">3</p>
                <p className="text-sm font-medium">Delaware counties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-dsa-red text-white">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Together, we can build a better Delaware where people come before profit. Become a
            member today!
          </p>
          <Link
            href="/join"
            className="btn bg-white text-dsa-red hover:bg-gray-100 text-lg px-8 py-3"
          >
            Join Delaware DSA
          </Link>
        </div>
      </section>
    </>
  );
}
