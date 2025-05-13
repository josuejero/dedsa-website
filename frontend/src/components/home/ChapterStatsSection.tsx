'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// A simpler, lightweight version of stats animation
export default function ChapterStatsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const statsRefs = {
    members: useRef(null),
    growth: useRef(null),
    groups: useRef(null),
    counties: useRef(null),
  };

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (inView && !isInitialized) {
      setIsInitialized(true);
    }
  }, [inView, isInitialized]);

  const stats = [
    {
      key: 'members',
      value: 220,
      label: 'Chapter Members',
      prefix: '',
      color: '#ec1f27',
    },
    {
      key: 'groups',
      value: 11,
      label: 'Working Groups & Committees',
      prefix: '+',
      color: '#ef4444',
    },
    {
      key: 'counties',
      value: 3,
      label: 'Counties Organized',
      prefix: '',
      color: '#f87171',
    },
    {
      key: 'active',
      value: 9,
      label: 'Active Membership Rate',
      prefix: '%',
      color: '#fca5a5',
    },
  ];
  return (
    <section
      ref={ref}
      className="py-16 bg-white dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="smallGrid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      <div className="container-page">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-10 rounded-xl shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Our Chapter at a Glance
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                >
                  <h4
                    className="text-4xl font-bold text-dsa-red mb-2 tabular-nums"
                    ref={
                      (statsRefs as Record<string, RefObject<null>>)[stat.key]
                    }
                  >
                    {isInitialized ? (
                      <CountUp
                        end={stat.value}
                        prefix={stat.prefix}
                        duration={1.5 + Math.random()}
                        color={stat.color}
                      />
                    ) : (
                      `0${stat.prefix}`
                    )}
                  </h4>
                  <p className="text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CountUpProps {
  end: number;
  prefix?: string;
  duration?: number;
  color?: string;
}

function CountUp({
  end,
  prefix = '',
  duration = 2,
  color = '#ec1f27',
}: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / 50;
    const startTime = Date.now();
    const updateDuration = duration * 1000;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / updateDuration, 1);

      // Easing function for smooth animation
      const easedProgress =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.min(Math.floor(easedProgress * end), end);

      setCount(current);

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span style={{ color }}>
      {count}
      {prefix}
    </span>
  );
}
