'use client';

import type {
  CorePrinciplesContent,
  DemocraticStructureContent,
  OrganizationContent,
  PositionCardContent,
  StrategicGoalsContent,
  WhatWeStandForPageContent,
} from '@/core/types/pages/whatWeStandFor';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

type Props = WhatWeStandForPageContent & { positionCard: PositionCardContent };

export default function WhatWeStandForPage(props: Props) {
  const {
    hero,
    aboutSection,
    corePrinciplesSection,
    strategicGoalsSection,
    beliefs,
    platform,
    democraticStructureSection,
    priorities2025,
    organizationSection,
    cta,
  } = props;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <HeroSection hero={hero} />

      {/* About Section */}
      <AboutSection aboutSection={aboutSection} />

      {/* Core Principles Section - NEW */}
      <CorePrinciplesSection corePrinciplesSection={corePrinciplesSection} />

      {/* Strategic Goals Section - NEW */}
      <StrategicGoalsSection strategicGoalsSection={strategicGoalsSection} />

      {/* Beliefs Section */}
      <BeliefsSection beliefs={beliefs} />

      {/* 2025 Priorities Section */}
      <PrioritiesSection priorities2025={priorities2025} />

      {/* Organization Section - NEW */}
      <OrganizationSection organizationSection={organizationSection} />

      {/* Call to Action */}
      <CTASection cta={cta} />
    </div>
  );
}

// Hero Section Component
function HeroSection({ hero }: { hero: WhatWeStandForPageContent['hero'] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="bg-gradient-animated text-white py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="container-page relative z-10">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {hero.heading}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl max-w-4xl leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {hero.description}
        </motion.p>
      </div>
    </motion.section>
  );
}

// About Section Component
function AboutSection({
  aboutSection,
}: {
  aboutSection: WhatWeStandForPageContent['aboutSection'];
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {aboutSection.title}
        </motion.h2>
        <motion.p
          className="text-lg text-center max-w-4xl mx-auto leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {aboutSection.content}
        </motion.p>
      </div>
    </motion.section>
  );
}

// NEW: Core Principles Section Component
function CorePrinciplesSection({
  corePrinciplesSection,
}: {
  corePrinciplesSection: CorePrinciplesContent;
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {corePrinciplesSection.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {corePrinciplesSection.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {corePrinciplesSection.principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className="bg-white border-l-4 border-dsa-red p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start mb-4">
                <div className="p-3 bg-red-50 rounded-full mr-4 flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-dsa-red"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={principle.icon}
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {principle.description}
                  </p>
                  <Link
                    href={principle.sourceLink}
                    className="text-sm text-dsa-red hover:underline inline-flex items-center"
                  >
                    Source: {principle.source}
                    <svg
                      className="ml-1 w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// NEW: Strategic Goals Section Component
function StrategicGoalsSection({
  strategicGoalsSection,
}: {
  strategicGoalsSection: StrategicGoalsContent;
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {strategicGoalsSection.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {strategicGoalsSection.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strategicGoalsSection.goals.map((goal, index) => (
            <motion.div
              key={goal.title}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="p-4 bg-blue-50 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={goal.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {goal.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {goal.description}
                </p>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Bylaws {goal.source}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/bylaws"
            className="inline-flex items-center text-dsa-red hover:underline font-medium text-lg"
          >
            Read our complete bylaws
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Beliefs Section Component
function BeliefsSection({
  beliefs,
}: {
  beliefs: WhatWeStandForPageContent['beliefs'];
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {beliefs.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {beliefs.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beliefs.principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-start mb-4">
                <div className="p-3 bg-dsa-red rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={principle.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{principle.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Platform Section Component
function PlatformSection({
  platform,
}: {
  platform: WhatWeStandForPageContent['platform'];
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {platform.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {platform.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {platform.planks.map((plank, index) => (
            <motion.div
              key={plank.title}
              className="bg-white border-l-4 p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              style={{ borderLeftColor: plank.color }}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start mb-4">
                <div
                  className="p-3 rounded-full mr-4"
                  style={{ backgroundColor: `${plank.color}20` }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: plank.color }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={plank.icon}
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: plank.color }}
                >
                  {plank.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {plank.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// NEW: Democratic Structure Section Component
function DemocraticStructureSection({
  democraticStructureSection,
}: {
  democraticStructureSection: DemocraticStructureContent;
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {democraticStructureSection.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {democraticStructureSection.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {democraticStructureSection.structure.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center mb-6">
                <div className="p-4 bg-green-50 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Key Responsibilities:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {item.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/leadership"
            className="inline-flex items-center text-dsa-red hover:underline font-medium text-lg mr-6"
          >
            Meet our current leadership
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
          <Link
            href="/bylaws"
            className="inline-flex items-center text-dsa-red hover:underline font-medium text-lg"
          >
            Read governance details
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Priorities Section Component - Updated for 2025
function PrioritiesSection({
  priorities2025,
}: {
  priorities2025: WhatWeStandForPageContent['priorities2025'];
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-20 bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dot"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot)" />
        </svg>
      </div>

      <div className="container-page relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-heading">
            {priorities2025.title}
          </h2>
          <div className="w-24 h-1 bg-dsa-red mx-auto mb-4 rounded"></div>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            {priorities2025.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {priorities2025.priorities.map((priority, index) => (
            <motion.div
              key={priority.title}
              className="group bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 border-l-4 border-dsa-red relative overflow-hidden"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                style={{
                  background:
                    'radial-gradient(circle,rgba(236,31,39,0.1) 0%,rgba(255,255,255,0) 70%)',
                }}
              />

              <div className="flex items-start mb-4 relative z-10">
                <motion.div
                  className="p-3 bg-red-50 rounded-full mr-4 group-hover:bg-red-100 transition-colors duration-300"
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
                      d={priority.iconPath}
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-card-title group-hover:text-dsa-red transition-colors duration-300">
                  {priority.title}
                </h3>
              </div>

              <p className="pl-12 relative z-10 text-card-body transition-all duration-300">
                {priority.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href={priorities2025.linkHref}
            className="inline-flex items-center text-link hover:underline font-medium group"
          >
            <span>{priorities2025.linkText}</span>
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
              />
            </motion.svg>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

// NEW: Organization Section Component
function OrganizationSection({
  organizationSection,
}: {
  organizationSection: OrganizationContent;
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {organizationSection.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {organizationSection.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {organizationSection.organizationTypes.map((type, index) => (
            <motion.div
              key={type.title}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start mb-6">
                <div className="p-3 bg-purple-50 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={type.icon}
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {type.description}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Examples:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {type.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-2 bg-gray-50 rounded text-sm"
                    >
                      <svg
                        className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-white p-8 rounded-lg shadow-md text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Involved?
          </h3>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
            {organizationSection.participationInfo}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/committees" className="btn btn-primary">
              View All Committees
            </Link>
            <Link href="/join" className="btn btn-secondary">
              Join Delaware DSA
            </Link>
            <Link href="/bylaws" className="btn btn-outline">
              Read Our Bylaws
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// CTA Section Component
function CTASection({ cta }: { cta: WhatWeStandForPageContent['cta'] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-dsa-red text-white"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {cta.heading}
        </motion.h2>
        <motion.p
          className="text-lg mb-8 max-w-2xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {cta.description}
        </motion.p>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href={cta.buttonHref}
            className="btn bg-white text-dsa-red hover:bg-gray-100 text-lg px-8 py-3"
          >
            {cta.buttonText}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
