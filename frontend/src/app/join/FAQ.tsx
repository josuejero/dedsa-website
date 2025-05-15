import faqContent from '../../content/join/faq.json';
import { FAQContent } from '../../types/content/join';

// Type assertion for imported JSON
const typedContent = faqContent as FAQContent;

export default function FAQ() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-12">
      <h2 className="text-3xl font-bold mb-6">{typedContent.heading}</h2>

      <div className="space-y-6">
        {typedContent.questions.map((item, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold mb-2">{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
