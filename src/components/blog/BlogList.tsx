'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Post } from '@/sanity/lib/types';

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <motion.div
          key={post._id}
          {...fadeIn}
          className="glass-card p-0 overflow-hidden rounded-3xl hover:bg-white/5 transition-all flex flex-col"
        >
          {post.mainImage && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          )}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-4">
              {post.authorImage ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
                    <Image 
                        src={urlFor(post.authorImage).url()} 
                        alt={typeof post.author === 'string' ? post.author : post.author.name}
                        width={40} height={40} className="object-cover"
                    />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold">
                  {(typeof post.author === 'string' ? post.author : post.author.name).charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm text-text-secondary">
                    {typeof post.author === 'string' ? post.author : post.author.name}
                </p>
                <p className="text-xs text-text-tertiary">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <h2 className="text-xl font-display font-bold mb-2 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-text-secondary text-sm mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-auto inline-flex items-center gap-2 text-primary hover:text-primary-hover font-bold"
            >
              Read More → 
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
