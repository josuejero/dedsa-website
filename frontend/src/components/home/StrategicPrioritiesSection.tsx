const PRIORITIES = [
  {
    title: 'Defending Communities from ICE',
    desc: "Building networks to protect immigrants from detention and deportation, establishing sanctuary policies, and supporting migrants' rights.",
    iconPath:
      'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    title: 'Delaware Against Apartheid',
    desc: 'Continuing our commitment to Palestinian liberation through campaigns like "No Appetite 4 Apartheid" to decrease economic support for the state of Israel, and working to establish apartheid-free zones throughout Delaware.',
    iconPath:
      'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Enacting Rent Stabilization & Housing Justice',
    desc: 'Fighting for tenant protections, rent control, and public housing through our H.O.M.E.S. Campaign, while organizing tenant unions across the state.',
    iconPath:
      'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    title: 'Creating a Trans Refuge State',
    desc: 'Supporting legislation to make Delaware a safe haven for transgender people facing persecution elsewhere, following the model developed by Trans Refuge Now.',
    iconPath:
      'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
];

export default function StrategicPrioritiesSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container-page">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Strategic Priorities for 2025-2026
        </h2>
        <p className="text-center mb-12 text-lg text-gray-600">
          As democratically approved at our April 6, 2025 Convention:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRIORITIES.map((p, index) => (
            <div
              key={p.title}
              className="group bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 border-l-4 border-dsa-red overflow-hidden relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>

              <div className="flex items-start mb-4 relative z-10">
                <div className="p-3 bg-red-50 rounded-full mr-4 group-hover:bg-red-100 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-dsa-red group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={p.iconPath}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold group-hover:text-dsa-red transition-colors duration-300">
                  {p.title}
                </h3>
              </div>

              <p className="pl-12 relative z-10 transform translate-y-0 opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/what-we-stand-for"
            className="inline-flex items-center text-dsa-red hover:underline font-medium"
          >
            <span>Learn more about our priorities</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
