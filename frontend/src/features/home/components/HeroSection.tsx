'use client';

import { contentService } from '@/core/services/contentService';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { HeroSectionContent } from '@/core/types/pages/home';
import Blob from '@/core/components/ui/Blob';
import ConfettiButton from '@/core/components/ui/Confetti';

// Inline cast
const homeContent = contentService.getPageContent('home');
const c = homeContent.heroSection as HeroSectionContent;

export default function HeroSection() {
  const [ready, setReady] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    setReady(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-animated z-0" />
      <div className="absolute inset-0 bg-black bg-opacity-20 z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diag"
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
          <rect width="100%" height="100%" fill="url(#diag)" />
        </svg>
      </div>

      {ready && (
        <>
          <Blob
            color="rgba(236,31,39,0.15)"
            className="top-[10%] right-[10%] z-10"
            size="300px"
          />
          <Blob
            color="rgba(236,31,39,0.1)"
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

      <div className="container-page relative z-20" ref={ref}>
        {ready && (
          <motion.div
            className="max-w-3xl"
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-on-accent relative inline-block"
              variants={item}
            >
              <span className="relative z-10">{c.mainHeading}</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-4 bg-dsa-red z-0"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.h1>

            <motion.div variants={item}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-on-accent">
                {c.subHeading}
              </h2>
            </motion.div>

            <motion.p
              className="text-xl mb-2 text-on-accent opacity-90"
              variants={item}
            >
              {c.tagline}
            </motion.p>

            <motion.p
              className="text-xl mb-8 leading-relaxed text-on-accent"
              variants={item}
            >
              {c.description.split('.').map(
                (s, i) =>
                  s.trim() && (
                    <React.Fragment key={i}>
                      {s.trim()}.<br />
                    </React.Fragment>
                  )
              )}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={item}
            >
              <ConfettiButton className="btn bg-white text-dsa-red hover:bg-gray-100 font-medium transition transform hover:scale-105 focus:ring-4 focus:ring-white focus:ring-opacity-50 animation-pulse">
                <Link href={c.buttons.primary.href}>
                  {c.buttons.primary.text}
                </Link>
              </ConfettiButton>
              <Link
                href={c.buttons.secondary.href}
                className="btn border-2 border-white text-on-accent hover:bg-white hover:text-dsa-red font-medium transition"
              >
                {c.buttons.secondary.text}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
