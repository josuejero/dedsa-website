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
    <section className="bg-dsa-red text-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-4">{typedContent.title}</h2>
      <p className="text-xl leading-relaxed">{missionStatement}</p>
    </section>
  );
}
