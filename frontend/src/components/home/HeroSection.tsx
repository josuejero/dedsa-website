'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Blob from '../ui/Blob';
import ConfettiButton from '../ui/Confetti';

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Ensure hydration mismatch prevention
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get user's city based on geolocation if available
  const [city, setCity] = useState('Delaware');

  useEffect(() => {
    // Simulate geolocation with New Castle as default
    setTimeout(() => {
      setCity('New Castle');
    }, 1000);
  }, []);

  // Animation variants
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

  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-28 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-animated z-0"></div>

      {/* Diagonal line pattern overlay */}
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

      {/* Organic shapes */}
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
            animate={{
              rotate: [12, -12, 12],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </>
      )}

      <div className="container-page relative z-20" ref={ref}>
        {isClient && (
          <motion.div
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-white relative inline-block"
              variants={itemVariants}
            >
              <span className="relative z-10">BUILDING DEMOCRATIC POWER</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-4 bg-dsa-red z-0"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.h1>

            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                Delaware DSA
              </h2>
            </motion.div>

            <motion.p
              className="text-xl mb-2 text-white opacity-90"
              variants={itemVariants}
            >
              Organizing for a democratic socialist Delaware since 2021
            </motion.p>

            <motion.p
              className="text-xl mb-8 leading-relaxed text-white"
              variants={itemVariants}
            >
              We're building a movement to challenge corporate control of
              Delaware's economy and politics. Together, we're fighting for
              housing justice, international solidarity, immigrant rights, and a
              Delaware that puts people before profits.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <ConfettiButton className="btn bg-white text-dsa-red hover:bg-gray-100 font-medium transition duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-white focus:ring-opacity-50 animation-pulse">
                <Link href="/join" className="block">
                  JOIN OUR CHAPTER
                </Link>
              </ConfettiButton>

              <Link
                href="/calendar"
                className="btn border-2 border-white text-white hover:bg-white hover:text-dsa-red font-medium transition duration-300 ease-in-out"
              >
                ATTEND AN EVENT
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
