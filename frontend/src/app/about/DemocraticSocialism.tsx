import democraticSocialismContent from '../../content/about/democraticSocialism.json';
import { DemocraticSocialismContent } from '../../types/content/about';

// Type assertion for imported JSON
const typedContent = democraticSocialismContent as DemocraticSocialismContent;

export default function DemocraticSocialism() {
  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-6">{typedContent.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {typedContent.principles.map((principle, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2 text-dsa-red">
              {principle.title}
            </h3>
            <p className="text-gray-700">{principle.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
