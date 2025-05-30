'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import getInvolvedContent from '@/core/content/pages/home.json';
import { GetInvolvedSectionContent } from '@/core/types/pages/home';
import CommitteesCard from './CommitteesCard';
import UpcomingEventsCard from './UpcomingEventsCard';

// Type assertion for the imported JSON
const typedGetInvolvedContent =
  getInvolvedContent.getInvolvedSection as GetInvolvedSectionContent;

export default function GetInvolvedSection() {
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 bg-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {isClient && (
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <g fill="#ec1f27">
              {Array.from({ length: 50 }).map((_, i) => {
                // Use a deterministic pattern instead of Math.random()
                const x = (i * 97) % 1024;
                const y = (i * 47) % 1024;
                return <circle key={i} r="2" cx={x} cy={y} />;
              })}
            </g>
          </svg>
        )}
      </div>

      <motion.div
        className="container-page relative z-10"
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={sectionVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-heading">
            {typedGetInvolvedContent.heading}
          </h2>
          <div className="w-24 h-1 bg-dsa-red mx-auto mb-4 rounded"></div>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            {typedGetInvolvedContent.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <UpcomingEventsCard />
          </motion.div>
          <motion.div variants={itemVariants}>
            <CommitteesCard />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
