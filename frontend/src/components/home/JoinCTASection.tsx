'use client';

import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ConfettiButton from '../ui/Confetti';

export default function JoinCTASection() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  // Animated diagonal line pattern
  const linePatternVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.1,
      transition: { duration: 2 },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-20 bg-gradient-animated text-on-accent relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div
        className="absolute inset-0 flex justify-center"
        variants={linePatternVariants}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diagonalHatch"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="10"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
        </svg>
      </motion.div>

      <div className="container-page text-center relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-on-accent"
          variants={itemVariants}
        >
          JOIN THE MOVEMENT
        </motion.h2>
        <motion.p
          className="text-xl mb-8 max-w-2xl mx-auto text-on-accent"
          variants={itemVariants}
        >
          The corporate interests controlling Delaware aren&apos;t giving up power
          without a fight. We need you to help build a democratic socialist
          alternative that works for all Delawareans, not just the wealthy few.
          Whether you have years of organizing experience or this is your first
          step into activism, there&apos;s a place for you in Delaware DSA.
        </motion.p>
        <motion.div variants={itemVariants}>
          <ConfettiButton className="btn bg-white text-dsa-red hover:bg-gray-100 text-lg px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50">
            <Link href="/join" className="block">
              JOIN DELAWARE DSA TODAY
            </Link>
          </ConfettiButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
