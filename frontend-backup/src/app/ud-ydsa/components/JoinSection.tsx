import joinSectionContent from '../../../content/ud-ydsa/joinSection.json';
import { JoinSectionContent } from '../../../types/content/ud-ydsa';
import { SectionProps } from '../types';

// Type assertion for imported JSON
const typedContent = joinSectionContent as JoinSectionContent;

export default function JoinSection({ udYdsaInfo }: SectionProps) {
  return (
    <div className="bg-dsa-red text-white p-8 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4">{typedContent.title}</h2>
      <p className="text-xl mb-6 max-w-2xl mx-auto">
        {typedContent.description}
      </p>
      <a
        href={`mailto:${udYdsaInfo.contactEmail}?subject=Interested%20in%20Joining%20UD%20YDSA`}
        className="btn bg-white text-dsa-red hover:bg-gray-100 text-lg px-8 py-3"
      >
        {typedContent.buttonText}
      </a>
    </div>
  );
}
