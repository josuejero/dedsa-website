import Link from 'next/link';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';

// Define the GraphQL query to fetch recent posts
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
      }
    }
  }
`;

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
              We're a member-run, democratic socialist organization fighting for a political and
              economic system that puts people before profits.
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
            <p className="text-lg mb-8">
              The Delaware Democratic Socialists of America (DSA) is dedicated to building a more
              just, equitable society through grassroots organizing, education, and electoral
              activism. As part of the largest socialist organization in the United States, we're
              working to create a world where resources and power are democratically controlled by
              the people.
            </p>
            <Link href="/what-we-stand-for" className="btn btn-primary">
              What We Stand For
            </Link>
          </div>
        </div>
      </section>

      {/* Recent News/Blog Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-page">
          <h2 className="text-3xl font-bold mb-8">Latest Updates</h2>

          {posts.length === 0 ? (
            <p>Loading recent posts...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post: any) => (
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
                    <p className="text-gray-500 text-sm mb-4">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
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

          <div className="mt-8 text-center">
            <Link href="/newsletter" className="btn btn-primary">
              View All Updates
            </Link>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Get Involved</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Upcoming Events */}
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
                <p className="mb-4">
                  Join us for meetings, actions, educational events, and social gatherings. All are
                  welcome!
                </p>
                <Link href="/calendar" className="btn btn-primary">
                  View Calendar
                </Link>
              </div>

              {/* Committees & Working Groups */}
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Committees & Working Groups</h3>
                <p className="mb-4">
                  Our work happens in committees and working groups focused on specific issues and
                  campaigns.
                </p>
                <Link href="/committees" className="btn btn-primary">
                  Find Your Committee
                </Link>
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
