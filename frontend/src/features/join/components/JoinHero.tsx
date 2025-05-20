import joinHeroData from '../content/join.json';
import { JoinHeroContent } from '../types';

// Type assertion for imported JSON
const typedContent = joinHeroData.joinHero as JoinHeroContent;

export default function JoinHero() {
  return (
    <div className="bg-dsa-red text-white p-8 md:p-12 rounded-lg mb-12">
      <h1 className="text-4xl font-bold mb-4">{typedContent.title}</h1>
      <p className="text-xl">{typedContent.subtitle}</p>
    </div>
  );
}
