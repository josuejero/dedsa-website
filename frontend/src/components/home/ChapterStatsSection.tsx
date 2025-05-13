'use client';

import { useEffect, useRef, useState } from 'react';

export default function ChapterStatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const stats = [
    { value: 220, label: 'Dues-paying members', prefix: '' },
    { value: 15, label: 'Growth since January', prefix: '%' },
    { value: 10, label: 'Active groups', prefix: '' },
    { value: 3, label: 'Delaware counties', prefix: '' },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container-page">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-xl shadow-md relative overflow-hidden">
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

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Our Chapter at a Glance
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-4xl font-bold text-dsa-red mb-2 tabular-nums">
                    {isVisible ? (
                      <CountUp
                        end={stat.value}
                        prefix={stat.prefix}
                        delay={index * 100}
                      />
                    ) : (
                      `0${stat.prefix}`
                    )}
                  </p>
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
  delay: number;
  duration?: number;
}

function CountUp({
  end,
  prefix = '',
  delay = 0,
  duration = 2000,
}: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / 40;

    // Add delay before starting count
    const timer = setTimeout(() => {
      const intervalId = setInterval(() => {
        start += increment;
        setCount(Math.floor(start));

        if (start >= end) {
          setCount(end);
          clearInterval(intervalId);
        }
      }, duration / 40);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, delay, duration]);

  return <>{prefix ? `${count}${prefix}` : count}</>;
}
