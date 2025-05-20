import { Metadata } from 'next';
import FAQ from './components/FAQ';
import JoinHero from './components/JoinHero';
import MembershipOptions from './components/MembershipOptions';
import Testimonials from './components/Testimonials';
import WhyJoinDSA from './components/WhyJoinDSA';

export const metadata: Metadata = {
  title: 'Join Delaware DSA',
  description: 'Become a member of the Delaware chapter of the Democratic Socialists of America.',
};

export default function JoinPage() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        <JoinHero />
        <MembershipOptions />
        <WhyJoinDSA />
        <Testimonials />
        <FAQ />
      </div>
    </div>
  );
}
