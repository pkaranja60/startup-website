'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Post } from '@/sanity/lib/types';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const authorName = typeof post.author === 'string' ? post.author : post.author?.name;
  const authorImage = typeof post.author === 'object' ? post.author.image : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div className="glass-card p-0 overflow-hidden rounded-2xl lg:rounded-3xl hover:bg-white/5 transition-all flex flex-col h-full border border-border-subtle hover:border-primary/30">
        {/* Image */}
        {post.mainImage && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Content */}
        <div className="p-5 lg:p-6 flex flex-col flex-1">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-4 text-xs lg:text-sm text-text-tertiary">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-primary flex-shrink-0" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            {authorName && (
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-primary flex-shrink-0" />
                <span className="truncate">{authorName}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-lg lg:text-xl font-display font-bold mb-2 lg:mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-text-secondary text-sm lg:text-base mb-4 line-clamp-3 leading-relaxed flex-grow">
              {post.excerpt}
            </p>
          )}

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.slice(0, 2).map((category: any) => (
                <span 
                  key={category.slug?.current || category.title}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20"
                >
                  {category.title}
                </span>
              ))}
              {post.categories.length > 2 && (
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-text-tertiary">
                  +{post.categories.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Read More */}
          <div className="flex items-center gap-2 text-primary font-bold text-sm lg:text-base mt-auto group-hover:gap-3 transition-all">
            Read Article
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}