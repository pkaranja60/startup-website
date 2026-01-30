'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

import { Post } from '@/sanity/lib/types';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: Post[];
  itemsPerPage?: number;
}

export default function BlogList({ posts, itemsPerPage = 9 }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach(post => {
      post.categories?.forEach((cat: any) => {
        cats.add(cat.title);
      });
    });
    return ['all', ...Array.from(cats)];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                             post.categories?.some((cat: any) => cat.title === selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-12 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/5 border border-border-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <Filter size={16} />
            <span className="font-bold">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-background'
                  : 'bg-white/5 text-text-secondary hover:bg-white/10 border border-border-subtle'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-text-tertiary">
          Showing {currentPosts.length} of {filteredPosts.length} articles
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Blog Grid */}
      {currentPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {currentPosts.map((post, index) => (
              <motion.div
                key={post._id}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-white/5 border border-border-subtle hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first, last, current, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl font-bold transition-all ${
                          currentPage === page
                            ? 'bg-primary text-background'
                            : 'bg-white/5 border border-border-subtle hover:bg-white/10'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="w-10 h-10 flex items-center justify-center text-text-tertiary">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-white/5 border border-border-subtle hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 glass-card rounded-3xl">
          <p className="text-text-secondary text-lg">
            No articles found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}