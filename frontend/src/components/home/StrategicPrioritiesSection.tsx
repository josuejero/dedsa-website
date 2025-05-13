'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTypewriterEffect } from '../../utils/animations';
import Blob from '../ui/Blob';

const PRIORITIES = [
  {
    title: 'Defending Communities from ICE',
    desc: "Working alongside migrants' rights organizations to protect communities from ICE authoritarianism and create sanctuary policies throughout the state.",
    iconPath:
      'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    title: 'Delaware Against Apartheid',
    desc: "Building coalitions to decrease economic support for the state of Israel through targeted campaigns like 'No Appetite 4 Apartheid' and establishing apartheid-free zones.",
    iconPath:
      'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Housing Justice & Rent Stabilization',
    desc: 'Fighting for tenant protections, promoting affordable housing policies, and organizing renters through our H.O.M.E.S. Campaign.',
    iconPath:
      'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    title: 'Making Delaware a Trans Refuge State',
    desc: "Working to transform Delaware from a state that 'doesn't persecute' to one that actively supports and protects transgender people through model legislation.",
    iconPath:
      'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
];

export default function StrategicPrioritiesSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Variable font weight based on scroll
  const fontWeight = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [400, 600, 800]
  );

  // Typewriter effect for the section title
  const { displayText } = useTypewriterEffect(
    'Chapter Priorities for 2025',
    30
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-100 relative overflow-hidden"
    >
      {/* Background with dot pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="smallDot"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallDot)" />
        </svg>
      </div>

      {/* Background blobs */}
      <Blob
        color="rgba(236, 31, 39, 0.05)"
        className="top-[10%] left-[5%]"
        size="500px"
      />
      <Blob
        color="rgba(236, 31, 39, 0.03)"
        className="bottom-[5%] right-[5%]"
        size="400px"
      />

      <div className="container-page relative z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-2 text-center"
          style={{ fontVariationSettings: `'wght' ${fontWeight.get()}` }}
        >
          {displayText}
        </motion.h2>
        <p className="text-center mb-12 text-lg text-gray-600">
          At our 2025 Convention, our members democratically adopted these four
          priorities to guide our organizing work in Delaware:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRIORITIES.map((p, index) => (
            <motion.div
              key={p.title}
              className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 border-l-4 border-dsa-red overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                style={{
                  background:
                    'radial-gradient(circle, rgba(236,31,39,0.1) 0%, rgba(255,255,255,0) 70%)',
                }}
              />

              <div className="flex items-start mb-4 relative z-10">
                <motion.div
                  className="p-3 bg-red-50 dark:bg-red-900/30 rounded-full mr-4 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-colors duration-300"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
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
                </motion.div>
                <h3 className="text-xl font-bold group-hover:text-dsa-red transition-colors duration-300">
                  {p.title}
                </h3>
              </div>

              <p className="pl-12 relative z-10 transform translate-y-0 opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="/what-we-stand-for"
            className="inline-flex items-center text-dsa-red hover:underline font-medium group"
          >
            <span>Learn more about our priorities</span>
            <motion.svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 1.5,
                repeatDelay: 1,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </motion.svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
