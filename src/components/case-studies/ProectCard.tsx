'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Project } from '@/sanity/lib/types';
import { ExternalLink, Calendar, User, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const ownerName = typeof project.owner === 'string' ? project.owner : project.owner?.name;

  return (
    <div className="group glass-card p-0 overflow-hidden rounded-2xl lg:rounded-3xl hover:bg-white/[0.05] transition-all flex flex-col h-full border border-border-subtle hover:border-primary/30">
      {/* Image */}
      {project.image && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={urlFor(project.image).url()}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Live Link Badge */}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 p-2 rounded-xl bg-background/80 backdrop-blur-sm border border-primary/30 hover:bg-primary hover:text-background transition-all opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5 lg:p-6 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-4 text-xs lg:text-sm text-text-tertiary">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-primary flex-shrink-0" />
            <span>
              {new Date(project.publishedAt).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </span>
          </div>
          {ownerName && (
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-primary flex-shrink-0" />
              <span className="truncate">{ownerName}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-lg lg:text-xl font-display font-bold mb-2 lg:mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {project.title}
        </h2>

        {/* Description */}
        {project.description && (
          <p className="text-text-secondary text-sm lg:text-base mb-4 line-clamp-3 leading-relaxed flex-grow">
            {project.description.split('\n')[0]}
          </p>
        )}

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech) => (
              <span 
                key={tech}
                className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-text-tertiary">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        )}

        {/* View Case Study */}
        <Link
          href={`/case-studies/${project.slug}`}
          className="flex items-center gap-2 text-primary font-bold text-sm lg:text-base mt-auto group-hover:gap-3 transition-all"
        >
          View Case Study
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}