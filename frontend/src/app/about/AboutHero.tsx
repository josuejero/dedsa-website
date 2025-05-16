import GenericSection from '../../components/shared/GenericSection';
import aboutHero from '../../content/consolidated/about.json';
import { AboutHeroContent } from '../../types/content/about';

const typedContent = aboutHero as AboutHeroContent;

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
