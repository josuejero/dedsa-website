import Link from 'next/link';

export default function MissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
            {/* Text content */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-6 relative">
                <span className="relative inline-block">
                  Our Mission
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-dsa-red rounded"></span>
                </span>
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
                Delaware Democratic Socialists of America (DE DSA) is a
                member-led, democratic organization fighting to shift power from
                corporations to people. In a state known as America&apos;s
                corporate haven, we challenge the status quo by organizing for
                economic justice, racial equity, environmental sustainability,
                and true democracy.
              </p>
              <p className="text-lg mb-8 leading-relaxed">
                We reject the capitalist economic order that perpetuates
                systemic oppression, violence, and environmental destruction. We
                are committed to a &quot;New Delaware Way&quot; rooted in
                economic democracy, racial justice, gender equity, environmental
                sustainability, international solidarity, and democratic
                pluralism.
              </p>
              <Link
                href="/what-we-stand-for"
                className="btn btn-primary shadow-md hover:shadow-lg transition-all duration-300 hover-scale"
              >
                What We Stand For
              </Link>
            </div>

            {/* Image collage with rounded corners */}
            <div className="md:w-1/2 relative h-80 md:h-96">
              <div className="absolute top-0 left-0 w-3/5 h-3/5 bg-gray-50 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full bg-gray-300">
                  {/* Placeholder for image 1 */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Image 1
                  </div>
                </div>
              </div>
              <div className="absolute top-1/4 right-0 w-2/5 h-2/5 bg-gray-50 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500 z-10">
                <div className="w-full h-full bg-gray-300">
                  {/* Placeholder for image 2 */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Image 2
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gray-50 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500 z-20">
                <div className="w-full h-full bg-gray-300">
                  {/* Placeholder for image 3 */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Image 3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
