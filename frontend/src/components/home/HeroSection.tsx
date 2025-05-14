'use client';

import { useComponentContent } from '@/utils/content';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Blob from '../ui/Blob';
import ConfettiButton from '../ui/Confetti';

export default function HeroSection() {
  const content = useComponentContent('heroSection');
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
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

  return (
    <section className="relative min-h-screen flex items-center pt-0 pb-20 md:pb-28 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-animated z-0" />

      {/* Diagonal hatch overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20 z-10">
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
                strokeOpacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
        </svg>
      </div>

      {/* Organic blob shapes */}
      {isClient && (
        <>
          <Blob
            color="rgba(236, 31, 39, 0.15)"
            className="top-[10%] right-[10%] z-10"
            size="300px"
          />
          <Blob
            color="rgba(236, 31, 39, 0.1)"
            className="bottom-[20%] left-[5%] z-10"
            size="400px"
          />
          <motion.div
            className="absolute top-[30%] right-[30%] rotate-12 z-10 w-20 h-20 bg-white opacity-5 rounded"
            animate={{ rotate: [12, -12, 12], y: [0, 20, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </>
      )}

      <div
        className="container-page relative z-20 mt-20 md:mt-16 pt-20"
        ref={ref}
      >
        {isClient && (
          <motion.div
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-on-accent relative inline-block"
              variants={itemVariants}
            >
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              <span className="relative z-10">
                {content.heading || 'BUILDING DEMOCRATIC POWER'}
              </span>
=======
              <span className="relative z-10">{content.heading}</span>
>>>>>>> parent of 73395ad (update)
=======
              <span className="relative z-10">{content.heading}</span>
>>>>>>> parent of 73395ad (update)
=======
              <span className="relative z-10">{content.heading}</span>
>>>>>>> parent of 73395ad (update)
              <motion.span
                className="absolute -bottom-2 left-0 h-4 bg-dsa-red z-0"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.h1>

            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-on-accent">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                {content.subheading || 'Delaware DSA'}
=======
                {content.subheading}
>>>>>>> parent of 73395ad (update)
=======
                {content.subheading}
>>>>>>> parent of 73395ad (update)
=======
                {content.subheading}
>>>>>>> parent of 73395ad (update)
              </h2>
            </motion.div>

            <motion.p
              className="text-xl mb-2 text-on-accent opacity-90"
              variants={itemVariants}
            >
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              {content.tagline ||
                'Organizing for a democratic socialist Delaware since 2021'}
=======
              {content.tagline}
>>>>>>> parent of 73395ad (update)
=======
              {content.tagline}
>>>>>>> parent of 73395ad (update)
=======
              {content.tagline}
>>>>>>> parent of 73395ad (update)
            </motion.p>

            <motion.p
              className="text-xl mb-8 leading-relaxed text-on-accent"
              variants={itemVariants}
            >
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              {content.description ||
                "We're building a movement to challenge corporate control of Delaware's economy and politics."}
=======
              {content.description}
>>>>>>> parent of 73395ad (update)
=======
              {content.description}
>>>>>>> parent of 73395ad (update)
=======
              {content.description}
>>>>>>> parent of 73395ad (update)
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <ConfettiButton className="btn bg-white text-dsa-red hover:bg-gray-100 font-medium transition duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-white focus:ring-opacity-50 animation-pulse">
                <Link href="/join" className="block">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  {content.cta?.join || 'JOIN OUR CHAPTER'}
=======
                  {content.cta.join}
>>>>>>> parent of 73395ad (update)
=======
                  {content.cta.join}
>>>>>>> parent of 73395ad (update)
=======
                  {content.cta.join}
>>>>>>> parent of 73395ad (update)
                </Link>
              </ConfettiButton>

              <Link
                href="/calendar"
                className="btn border-2 border-white text-on-accent hover:bg-white hover:text-dsa-red font-medium transition duration-300 ease-in-out"
              >
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                {content.cta?.events || 'ATTEND AN EVENT'}
=======
                {content.cta.events}
>>>>>>> parent of 73395ad (update)
=======
                {content.cta.events}
>>>>>>> parent of 73395ad (update)
=======
                {content.cta.events}
>>>>>>> parent of 73395ad (update)
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
