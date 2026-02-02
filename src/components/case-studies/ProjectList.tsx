'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/sanity/lib/types';
import ProjectCard from './ProectCard';

interface ProjectListProps {
  projects: Project[];
  itemsPerPage?: number;
}

export default function ProjectList({ projects, itemsPerPage = 6 }: ProjectListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('all');

  // Get unique technologies
  const technologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      project.techStack?.forEach(tech => {
        techs.add(tech);
      });
    });
    return ['all', ...Array.from(techs).sort()];
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTech = selectedTech === 'all' || 
                         project.techStack?.includes(selectedTech);
      
      return matchesSearch && matchesTech;
    });
  }, [projects, searchQuery, selectedTech]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTech]);

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
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/5 border border-border-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm "
          />
        </div>

        {/* Technology Filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <Filter size={16} />
            <span className="font-bold">Technology:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 8).map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTech === tech
                    ? 'bg-primary text-background'
                    : 'bg-white/5 text-text-secondary hover:bg-white/10 border border-border-subtle'
                }`}
              >
                {tech === 'all' ? 'All' : tech}
              </button>
            ))}
            {technologies.length > 8 && (
              <button
                onClick={() => setSelectedTech('all')}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-text-tertiary hover:bg-white/10 border border-border-subtle"
              >
                +{technologies.length - 8} more
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-text-tertiary">
          Showing {currentProjects.length} of {filteredProjects.length} projects
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Projects Grid */}
      {currentProjects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project._id}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
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
            No case studies found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}