import GenericSection from '@/core/components/shared/GenericSection';
import { contentService } from '@/core/services/contentService';

// Get content from service - assuming aboutHero is in the about.json
const aboutContent = contentService.getPageContent('about');
const aboutHeroContent = aboutContent.aboutHero;

interface AboutHeroProps {
  missionStatement?: string;
}

export default function AboutHero({
  missionStatement = aboutHeroContent.defaultMissionStatement,
}: AboutHeroProps) {
  return (
    <GenericSection
      heading={aboutHeroContent.title}
      background="primary"
      className="mb-8"
    >
      <p className="text-xl leading-relaxed">{missionStatement}</p>
    </GenericSection>
  );
}
