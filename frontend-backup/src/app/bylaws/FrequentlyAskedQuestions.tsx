import faqContent from '../../content/bylaws/frequentlyAskedQuestions.json';
import { FAQContent } from '../../types/content/bylaws';

// Type assertion for the imported JSON
const typedFaqContent = faqContent as FAQContent;

interface FrequentlyAskedQuestionsProps {
  lastUpdated: string;
}

export default function FrequentlyAskedQuestions({
  lastUpdated,
}: FrequentlyAskedQuestionsProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">{typedFaqContent.title}</h2>

      <div className="space-y-6">
        {typedFaqContent.questions.map((faq, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
            <p>{faq.answer.replace('{lastUpdated}', lastUpdated)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
