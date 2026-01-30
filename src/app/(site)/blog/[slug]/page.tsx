'use client';

import { useParams } from 'next/navigation';
import { blogs } from '@/data/blogs';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NotFound from '@/app/not-found';

export default function BlogSlugPage() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return <NotFound/>;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  };

  return (
    <main className="max-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="container-max">
        <motion.div {...fadeIn} className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-2">{blog.title}</h1>
          <p className="text-text-secondary text-sm mb-4">
            By {blog.author} · {blog.date} · {blog.readingTime}
          </p>
          <div className="flex gap-2 flex-wrap">
            {blog.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeIn} className="prose max-w-none text-text-primary">
          {/* Dummy content */}
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id libero eu quam tristique ullamcorper.</p>
          <p>Aliquam erat volutpat. Suspendisse potenti. Quisque imperdiet mi a tellus efficitur, non hendrerit erat fermentum.</p>
          <h2>Section 1</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec tortor sem.</p>
          <h2>Section 2</h2>
          <p>Nulla facilisi. Sed vel nunc ac nulla mollis tincidunt.</p>
        </motion.div>

        <Link
          href="/blog"
          className="mt-8 inline-block text-primary hover:text-primary-hover font-bold"
        >
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}
