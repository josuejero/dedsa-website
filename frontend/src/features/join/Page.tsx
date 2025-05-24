import FAQ from './components/FAQ';
import JoinHero from './components/JoinHero';
import MembershipOptions from './components/MembershipOptions';
import Testimonials from './components/Testimonials';
import WhyJoinDSA from './components/WhyJoinDSA';

export default function JoinPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container-page py-12">
        <JoinHero />
        <WhyJoinDSA />
        <MembershipOptions />
        <Testimonials />
        <FAQ />
      </div>
    </div>
  );
}
