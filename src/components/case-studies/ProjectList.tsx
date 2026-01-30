'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Project } from '@/sanity/lib/types';
import { Rocket, ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: index * 0.1 }}
          className="group relative glass-card p-0 overflow-hidden rounded-[2.5rem] border border-white/10 hover:border-primary/30 transition-all duration-500"
        >
          {project.image && (
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
              <Image
                src={urlFor(project.image).url()}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-black/20 to-transparent opacity-60" />
              
              {project.featured && (
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
                  <Rocket size={14} />
                  Featured
                </div>
              )}
            </div>
          )}

          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h2>
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-text-tertiary hover:text-primary transition-all duration-300"
              >
                <ExternalLink size={20} />
              </a>
            </div>

            <p className="text-text-secondary text-base mb-6 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack?.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 rounded-full bg-white/5 text-text-tertiary text-xs border border-white/5 group-hover:border-primary/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
                <Link
                href={`/case-studies/${project.slug}`}
                className="inline-flex items-center gap-2 text-text-primary hover:text-primary font-bold group/link transition-all"
                >
                    View Case Study 
                    <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
                
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold border border-primary/20">
                        {typeof project.owner === 'object' ? project.owner.name.charAt(0) : project.owner.charAt(0)}
                    </div>
                </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
