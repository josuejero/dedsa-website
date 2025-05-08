import Link from 'next/link';

export default function MissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <div className="max-w-4xl mx-auto text-center bg-gray-50 p-8 sm:p-12 rounded-xl shadow-sm">
          <h2 className="text-3xl font-bold mb-6 relative">
            <span className="relative inline-block">
              Our Mission
              <span className="absolute bottom-0 left-0 w-full h-1 bg-dsa-red rounded"></span>
            </span>
          </h2>
          <p className="text-lg mb-6 leading-relaxed">
            Delaware Democratic Socialists of America (DE DSA) is a member-led, democratic
            organization fighting to shift power from corporations to people. In a state known as
            America&apos;s corporate haven, we challenge the status quo by organizing for economic
            justice, racial equity, environmental sustainability, and true democracy.
          </p>
          <p className="text-lg mb-8 leading-relaxed">
            We reject the capitalist economic order that perpetuates systemic oppression, violence,
            and environmental destruction. We are committed to a &quot;New Delaware Way&quot; rooted
            in economic democracy, racial justice, gender equity, environmental sustainability,
            international solidarity, and democratic pluralism.
          </p>
          <Link
            href="/what-we-stand-for"
            className="btn btn-primary shadow-md hover:shadow-lg transition-all duration-300"
          >
            What We Stand For
          </Link>
        </div>
      </div>
    </section>
  );
}
