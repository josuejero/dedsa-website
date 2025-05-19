'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import homeJson from '../../content/consolidated/home.json';
import { MissionSectionContent } from '../../types/content/home';

// Inline cast so we can drop a separate typed variable
const m = homeJson.missionSection as MissionSectionContent;

// Config for the two background circles
const bgConfigs: Array<{ cl: string; range: [number, number] }> = [
  {
    cl: 'absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-red-50',
    range: [0, -100] as [number, number],
  },
  {
    cl: 'absolute bottom-[10%] right-[10%] w-64 h-64 rounded-full bg-red-50',
    range: [100, 0] as [number, number],
  },
];

// Separate component for background blobs to properly use hooks
// Fixed AnimatedBlob component with proper types
function AnimatedBlob({
  scrollYProgress,
  opacity,
  config,
  index,
}: {
  scrollYProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  config: { cl: string; range: [number, number] };
  index: number;
}) {
  const y = useTransform(scrollYProgress, [0, 1], config.range);

  return (
    <motion.div
      key={index}
      className={config.cl}
      style={{
        y,
        opacity,
      }}
    />
  );
}

export default function MissionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-20 relative bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {bgConfigs.map((config, i) => (
          <AnimatedBlob
            key={i}
            scrollYProgress={scrollYProgress}
            opacity={opacity}
            config={config}
            index={i}
          />
        ))}
      </div>

      <div className="container-page">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:space-x-12">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl font-bold mb-6 relative text-heading"
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
                <span>{m.heading}</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 bg-dsa-red rounded"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              </motion.div>
            </motion.h2>

            {m.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className="text-lg mb-6 leading-relaxed text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                {p}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href={m.button.href}
                className="btn btn-primary shadow-md hover:shadow-lg transition-all duration-300 hover-scale"
              >
                {m.button.text}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2 relative h-96 md:h-[450px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Container for overlapping images */}
            <div className="relative w-full h-full">
              {/* First image - positioned at top-left */}
              <motion.div
                className="absolute top-0 left-0 w-[60%] h-[65%] z-10 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: -20, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  zIndex: 30,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src="/home-page-photos/1.jpg"
                  alt="DSA event"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3EEvent Photo%3C/text%3E%3C/svg%3E";
                  }}
                />
              </motion.div>

              {/* Second image - overlapping in middle-right */}
              <motion.div
                className="absolute top-[15%] right-0 w-[50%] h-[60%] z-20 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: 20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  zIndex: 30,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src="/home-page-photos/2.jpg"
                  alt="DSA event"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3EEvent Photo%3C/text%3E%3C/svg%3E";
                  }}
                />
              </motion.div>

              {/* Third image - at bottom-center, overlapping the other two */}
              <motion.div
                className="absolute bottom-0 left-[20%] w-[60%] h-[50%] z-30 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  zIndex: 40,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src="/home-page-photos/3.jpg"
                  alt="DSA event"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3EEvent Photo%3C/text%3E%3C/svg%3E";
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
