import testimonialsContent from '../../content/join/testimonials.json';
import { TestimonialsContent } from '../../types/content/join';

// Type assertion for imported JSON
const typedContent = testimonialsContent as TestimonialsContent;

export default function Testimonials() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-12">
      <h2 className="text-3xl font-bold mb-6">{typedContent.heading}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {typedContent.testimonials.map((testimonial, index) => (
          <div key={index} className="border-l-4 border-dsa-red pl-4 py-2">
            <p className="italic mb-4">&quot;{testimonial.quote}&quot;</p>
            <p className="font-bold">
              — {testimonial.author}, {testimonial.year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
