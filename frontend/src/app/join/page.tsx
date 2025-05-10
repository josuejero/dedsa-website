import { Metadata } from 'next';
import { getClient } from '../../lib/apollo-client';
import FAQ from './FAQ';
import JoinHero from './JoinHero';
import MembershipOptions from './MembershipOptions';
import { GET_JOIN_PAGE } from './queries';
import Testimonials from './Testimonials';
import WhyJoinDSA from './WhyJoinDSA';

export const metadata: Metadata = {
  title: 'Join Delaware DSA',
  description: 'Become a member of the Delaware chapter of the Democratic Socialists of America.'
};

interface PageData {
  page?: {
    content: string;
    title: string;
    slug: string;
  };
}

export default async function JoinPage() {
  try {
    const { data } = await getClient().query<PageData>({
      query: GET_JOIN_PAGE
    });

    const pageContent =
      data?.page?.content ||
      `<p>Join us in building a more just and democratic society! Delaware DSA is a chapter of the Democratic Socialists of America, the largest socialist organization in the United States.</p>
       <p>By becoming a member, you&apos;ll be part of a growing movement fighting for economic justice, healthcare for all, housing as a human right, and genuine democracy in our workplaces and communities.</p>`;

    return (
      <div className="bg-gray-100 py-12">
        <div className="container-page">
          <JoinHero />
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          </div>
          <MembershipOptions />
          <WhyJoinDSA />
          <Testimonials />
          <FAQ />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching join page data:', error);
    return (
      <div className="bg-gray-100 py-12">
        <div className="container-page">
          <JoinHero />
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div className="prose prose-lg max-w-none">
              <p>
                Join us in building a more just and democratic society! Delaware DSA is a chapter of
                the Democratic Socialists of America, the largest socialist organization in the
                United States.
              </p>
              <p>
                By becoming a member, you&apos;ll be part of a growing movement fighting for
                economic justice, healthcare for all, housing as a human right, and genuine
                democracy in our workplaces and communities.
              </p>
            </div>
          </div>
          <MembershipOptions />
          <WhyJoinDSA />
          <Testimonials />
          <FAQ />
        </div>
      </div>
    );
  }
}
