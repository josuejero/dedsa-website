export default function NationalInfo() {
  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-6">DSA National</h2>
      <div className="prose prose-lg">
        <p>
          Delaware DSA is a chapter of the Democratic Socialists of America (DSA), the largest
          socialist organization in the United States. DSA members are building progressive
          movements for social change while establishing an openly democratic socialist presence in
          American communities and politics.
        </p>
        <div className="mt-6">
          <a
            href="https://www.dsausa.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-dsa-red hover:underline"
          >
            Visit DSA National
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
