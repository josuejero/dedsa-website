import Link from 'next/link';

export default function JoinCTASection() {
  return (
    <section className="py-20 bg-gradient-animated text-white relative overflow-hidden">
      <div className="absolute inset-0 flex justify-center opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diagonalHatch"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="10"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
        </svg>
      </div>

      <div className="container-page text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join the Movement
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Together, we can build a better Delaware where people come before
          profits. Become a member today!
        </p>
        <Link
          href="/join"
          className="btn bg-white text-dsa-red hover:bg-gray-100 text-lg px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
        >
          Join Delaware DSA
        </Link>
      </div>
    </section>
  );
}
