import { FC } from 'react';
import heroSectionContent from '../../../content/ud-ydsa/heroSection.json';
import { HeroSectionContent } from '../../../types/content/ud-ydsa';
import { SectionProps } from '../types';

// Type assertion for imported JSON
const typedContent = heroSectionContent as HeroSectionContent;

const HeroSection: FC<SectionProps> = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">{typedContent.title}</h1>
      <p className="text-xl text-gray-600">{typedContent.subtitle}</p>
    </div>
  );
};

export default HeroSection;
