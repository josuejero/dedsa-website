'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import { LatestUpdatesSectionProps } from '../types';

export default function LatestUpdatesSection({
  posts,
}: LatestUpdatesSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10,
      },
    },
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-50 rounded-full translate-y-1/3 -translate-x-1/4 opacity-50"></div>

      <motion.div
        className="container-page relative z-10"
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.div className="mb-12 text-center" variants={itemVariants}>
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            Latest Updates
          </h2>
          <div className="w-24 h-1 bg-dsa-red mx-auto mb-4 rounded"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about our campaigns, events, and actions
          </p>
        </motion.div>

        <div className="space-y-8" data-testid="latest-updates-section">
          {posts.length === 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={itemVariants}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse flex flex-col border border-gray-200 rounded-xl overflow-hidden"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                  variants={itemVariants}
                  custom={index}
                >
                  {post.featuredImage?.node ? (
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        width={400}
                        height={300}
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-r from-red-100 to-red-200 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-dsa-red opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="p-6">
                    <motion.h3
                      className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-dsa-red transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      {post.title}
                    </motion.h3>
                    <p className="text-gray-500 text-sm mb-3 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      {post.author?.node?.name && (
                        <>
                          <span className="mx-2">|</span>
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          {post.author.node.name}
                        </>
                      )}
                    </p>
                    <div
                      className="text-gray-700 mb-4 line-clamp-3 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={`/newsletter/${post.slug}`}
                        className="inline-flex items-center text-dsa-red font-medium hover:underline group"
                      >
                        Read more
                        <svg
                          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/newsletter"
            className="btn btn-primary shadow-lg hover:shadow-xl transform hover:translate-y-px transition-all px-8 py-3 text-lg"
          >
            View All Updates
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
