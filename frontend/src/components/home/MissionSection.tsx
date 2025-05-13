'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function MissionSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Create parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="py-20 relative bg-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-red-50"
          style={{ y, opacity }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-64 h-64 rounded-full bg-red-50"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [100, 0]),
            opacity,
          }}
        />
      </div>

      <div className="container-page">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
            {/* Text content */}
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-4xl font-bold mb-6 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="relative inline-block"
                  initial={{ width: 0 }}
                  whileInView={{ width: 'auto' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <span>Our Mission</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-dsa-red rounded"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  />
                </motion.div>
              </motion.h2>

              <motion.p
                className="text-lg mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Delaware Democratic Socialists of America (DE DSA) is a
                member-led, democratic organization fighting to shift power from
                corporations to people. In a state known as America&apos;s
                corporate haven, we challenge the status quo by organizing for
                economic justice, racial equity, environmental sustainability,
                and true democracy.
              </motion.p>

              <motion.p
                className="text-lg mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                We reject the capitalist economic order that perpetuates
                systemic oppression, violence, and environmental destruction. We
                are committed to a &quot;New Delaware Way&quot; rooted in
                economic democracy, racial justice, gender equity, environmental
                sustainability, international solidarity, and democratic
                pluralism.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link
                  href="/what-we-stand-for"
                  className="btn btn-primary shadow-md hover:shadow-lg transition-all duration-300 hover-scale"
                >
                  What We Stand For
                </Link>
              </motion.div>
            </motion.div>

            {/* Image collage with rounded corners - uses framer motion for animation */}
            <motion.div
              className="md:w-1/2 relative h-80 md:h-96"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Replace these with actual event/member photos */}
              <motion.div
                className="absolute top-0 left-0 w-3/5 h-3/5 bg-gray-50 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div className="w-full h-full">
                  {/* Replace placeholder with actual image */}
                  <img
                    src="/images/home/dsa-event-1.jpg"
                    alt="Delaware DSA community event"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3EEvent Photo%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-1/4 right-0 w-2/5 h-2/5 bg-gray-50 rounded-lg overflow-hidden shadow-lg z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div className="w-full h-full">
                  {/* Replace placeholder with actual image */}
                  <img
                    src="/images/home/dsa-event-2.jpg"
                    alt="Delaware DSA members organizing"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3EEvent Photo%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </motion.div>
              <motion.div
                className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gray-50 rounded-lg overflow-hidden shadow-lg z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div className="w-full h-full">
                  {/* Replace placeholder with actual image */}
                  <img
                    src="/images/home/dsa-event-3.jpg"
                    alt="Delaware DSA rally"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3EEvent Photo%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
