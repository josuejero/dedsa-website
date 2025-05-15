'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import prioritiesContent from '../../content/home/strategicPrioritiesSection.json';
import { StrategicPrioritiesSectionContent } from '../../types/content/home';
import { useTypewriterEffect } from '../../utils/animations';
import Blob from '../ui/Blob';

// Type assertion for the imported JSON
const typedPrioritiesContent =
  prioritiesContent as StrategicPrioritiesSectionContent;

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
    typedPrioritiesContent.heading,
    30
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-100 dark:bg-gray-900 relative overflow-hidden"
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
          className="text-3xl md:text-5xl font-bold mb-2 text-center text-heading"
          style={{ fontVariationSettings: `'wght' ${fontWeight.get()}` }}
        >
          {displayText}
        </motion.h2>
        <p className="text-center mb-12 text-lg text-secondary">
          {typedPrioritiesContent.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {typedPrioritiesContent.priorities.map((p, index) => (
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
                <h3 className="text-xl font-bold text-card-title group-hover:text-dsa-red transition-colors duration-300">
                  {p.title}
                </h3>
              </div>

              <p className="pl-12 relative z-10 text-card-body transform translate-y-0 opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {p.description}
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
            href={typedPrioritiesContent.linkHref}
            className="inline-flex items-center text-link hover:underline font-medium group"
          >
            <span>{typedPrioritiesContent.linkText}</span>
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
