interface AboutHeroProps {
  missionStatement?: string;
}

export default function AboutHero({
  missionStatement = "Delaware DSA's mission is to build a democratic, multi-racial socialist movement in Delaware that fights for economic, racial, and social justice for all working people."
}: AboutHeroProps) {
  return (
    <section className="bg-dsa-red text-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
      <p className="text-xl leading-relaxed">{missionStatement}</p>
    </section>
  );
}
