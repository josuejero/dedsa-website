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
    // In a real application, you would use the browser's geolocation API
    // or a third-party service to get the user's location
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

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20 z-10">
        <div className="absolute top-0 right-0 opacity-10 w-80 h-80">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFFFFF"
              d="M45.7,-58.2C58.9,-51.3,69,-37.4,73.9,-22.1C78.8,-6.7,78.5,10.1,72.3,24.5C66.1,38.9,54,50.9,40,58.6C26,66.3,10.1,69.8,-6.4,77.5C-22.9,85.1,-45.7,96.9,-60.1,89.8C-74.5,82.8,-80.4,56.9,-82.2,34.3C-84,11.7,-81.6,-7.5,-75.6,-25.2C-69.7,-42.9,-60.2,-59.1,-46.6,-65.9C-33,-72.8,-15.3,-70.3,0.7,-71.1C16.7,-72,33.5,-76.2,45.7,-58.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>

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
              <span className="relative z-10">SOLIDARITY</span>
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
              Progressive activism since 2021
            </motion.p>

            <motion.p
              className="text-xl mb-8 leading-relaxed text-white"
              variants={itemVariants}
            >
              We&apos;re building a democratic-socialist {city} where production
              and resources are controlled by the people, not private profit.
              Join us in creating a state that works for the many, not the few.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <ConfettiButton className="btn bg-white text-dsa-red hover:bg-gray-100 font-medium transition duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-white focus:ring-opacity-50 animation-pulse">
                <Link href="/join" className="block">
                  Join Our Chapter
                </Link>
              </ConfettiButton>

              <Link
                href="/newsletter"
                className="btn border-2 border-white text-white hover:bg-white hover:text-dsa-red font-medium transition duration-300 ease-in-out"
              >
                Subscribe to Newsletter
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
