export default function DemocraticSocialism() {
  const principles = [
    {
      title: 'Economic Democracy',
      description:
        'We believe the economy should be democratically owned and controlled to meet human needs.'
    },
    {
      title: 'Social Justice',
      description: 'We fight for racial, gender, and economic justice for all people.'
    },
    {
      title: "Workers' Rights",
      description:
        'We support workers organizing for better wages, benefits, and working conditions.'
    },
    {
      title: 'Healthcare',
      description: 'We advocate for a universal, single-payer healthcare system.'
    }
  ];

  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-6">What is Democratic Socialism?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((principle, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2 text-dsa-red">{principle.title}</h3>
            <p className="text-gray-700">{principle.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
