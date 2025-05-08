import { SectionProps } from '../types';

export default function HeroSection({}: SectionProps) {
  return (
    <div className="bg-dsa-red text-white p-8 md:p-12 rounded-lg mb-12">
      <h1 className="text-4xl font-bold mb-4">University of Delaware YDSA</h1>
      <p className="text-xl">
        Student organizing for a democratic university and a democratic society
      </p>
    </div>
  );
}
