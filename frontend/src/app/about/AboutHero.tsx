import GenericSection from '../../components/shared/GenericSection';
import aboutHeroContent from '../../content/about/aboutHero.json';
import { AboutHeroContent } from '../../types/content/about';

// Type assertion for imported JSON
const typedContent = aboutHeroContent as AboutHeroContent;

interface AboutHeroProps {
  missionStatement?: string;
}

export default function AboutHero({
  missionStatement = typedContent.defaultMissionStatement,
}: AboutHeroProps) {
  return (
    <GenericSection
      heading={typedContent.title}
      background="primary"
      className="mb-8"
    >
      <p className="text-xl leading-relaxed">{missionStatement}</p>
    </GenericSection>
  );
}
