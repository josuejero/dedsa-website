import React from 'react';

export default function ChapterStatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-page">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-xl shadow-md relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 text-center">Our Chapter at a Glance</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-dsa-red mb-2">220</p>
                <p className="text-sm font-medium">Dues-paying members</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-dsa-red mb-2">15%</p>
                <p className="text-sm font-medium">Growth since January</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-dsa-red mb-2">10</p>
                <p className="text-sm font-medium">Active groups</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-dsa-red mb-2">3</p>
                <p className="text-sm font-medium">Delaware counties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
