'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogs } from '@/data/blogs';

export default function BlogPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  };

  return (
    <main className="max-h-screen pt-32 pb-20">
      <div className="container-max">
         {/* Header */}
        <motion.div {...fadeIn} className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Our Blog
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Stay up to date with the latest insights, tips, and tutorials from our experts.
          </p>
        </motion.div>

      {/* Blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const Icon = blog.icon;
            return (
              <motion.div
                key={blog.slug}
                {...fadeIn}
                className="glass-card p-6 rounded-3xl hover:bg-white/5 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">{blog.author}</p>
                    <p className="text-xs text-text-tertiary">{blog.date} · {blog.readingTime}</p>
                  </div>
                </div>

                <h2 className="text-xl font-display font-bold mb-2">
                  {blog.title}
                </h2>
                <p className="text-text-secondary text-sm mb-4">
                  {blog.excerpt}
                </p>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-primary hover:text-primary-hover font-bold"
                >
                  Read More → 
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
