import { FC } from 'react';
import { SectionProps } from '../types';

const HeroSection: FC<SectionProps> = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">UD Young Democratic Socialists of America</h1>
      <p className="text-xl text-gray-600">Building student power at the University of Delaware</p>
    </div>
  );
};

export default HeroSection;
