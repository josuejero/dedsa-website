import React from 'react';

export default function Testimonials() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-12">
      <h2 className="text-3xl font-bold mb-6">What Our Members Say</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border-l-4 border-dsa-red pl-4 py-2">
          <p className="italic mb-4">
            "Joining Delaware DSA gave me the opportunity to channel my political frustration into
            meaningful action. I've learned so much about organizing and found a community of people
            committed to building a better world."
          </p>
          <p className="font-bold">— Jamie, Member since 2022</p>
        </div>

        <div className="border-l-4 border-dsa-red pl-4 py-2">
          <p className="italic mb-4">
            "I was looking for a way to get involved in local politics that aligned with my values.
            In DSA, I found not only a political home but also friendships and a sense of purpose
            working collectively for change."
          </p>
          <p className="font-bold">— Taylor, Member since 2021</p>
        </div>
      </div>
    </div>
  );
}
