import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-dsa-red to-red-700 text-white py-20 md:py-28">
      <div className="container-page relative">
        <div className="absolute top-0 right-0 opacity-10 w-80 h-80">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFFFFF"
              d="M45.7,-58.2C58.9,-51.3,69,-37.4,73.9,-22.1C78.8,-6.7,78.5,10.1,72.3,24.5C66.1,38.9,54,50.9,40,58.6C26,66.3,10.1,69.8,-6.4,77.5C-22.9,85.1,-45.7,96.9,-60.1,89.8C-74.5,82.8,-80.4,56.9,-82.2,34.3C-84,11.7,-81.6,-7.5,-75.6,-25.2C-69.7,-42.9,-60.2,-59.1,-46.6,-65.9C-33,-72.8,-15.3,-70.3,0.7,-71.1C16.7,-72,33.5,-76.2,45.7,-58.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight animation-slide-up">
            Delaware DSA
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            We&apos;re building a democratic-socialist Delaware where production and resources are
            controlled by the people, not private profit. Join us in creating a state that works for
            the many, not the few.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/join"
              className="btn bg-white text-dsa-red hover:bg-gray-100 font-medium transition duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-white focus:ring-opacity-50"
            >
              Join Our Chapter
            </Link>
            <Link
              href="/newsletter"
              className="btn border-2 border-white text-white hover:bg-white hover:text-dsa-red font-medium transition duration-300 ease-in-out"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
