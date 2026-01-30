import { client } from '@/sanity/lib/client';
import { PROJECT_QUERY } from '@/sanity/lib/queries';
import { Project } from '@/sanity/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import NotFound from '@/app/not-found';
import { ExternalLink, Calendar, User, Code } from 'lucide-react';

export const revalidate = 60;

export default async function CaseStudySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project: Project = await client.fetch(PROJECT_QUERY, { slug });

  if (!project) return <NotFound />;

  const ownerName = typeof project.owner === 'object' ? project.owner.name : project.owner;

  return (
    <main className="max-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="container-max max-w-5xl mx-auto">
        <Link
          href="/case-studies"
          className="mb-8 inline-block text-primary hover:text-primary-hover font-bold transition-colors"
        >
          ← Back to Case Studies
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h1 className="text-4xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 mb-8 text-text-tertiary">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <span className="text-sm">
                    {new Date(project.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} className="text-primary" />
                <span className="text-sm">{ownerName}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {project.techStack?.map((tech) => (
                <span key={tech} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-text-secondary">
                  {tech}
                </span>
              ))}
            </div>

            <a 
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1"
            >
              Visit Live Site <ExternalLink size={20} />
            </a>
          </div>

          {project.image && (
            <div className="relative aspect-square lg:aspect-auto h-[500px] w-full overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
              <Image
                src={urlFor(project.image).url()}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-white/10 pt-20">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-display font-bold mb-8">Project Overview</h2>
            <div className="text-text-secondary text-lg leading-relaxed space-y-6">
              {project.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="glass-card p-8 rounded-4xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Code className="text-primary" size={24} />
                <h3 className="text-xl font-bold">Tech Stack</h3>
              </div>
              <ul className="space-y-4">
                {project.techStack?.map(tech => (
                  <li key={tech} className="flex items-center gap-3 text-text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8 rounded-4xl border border-white/10 bg-primary/5">
              <h3 className="text-xl font-bold mb-4">Interested in something similar?</h3>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                We can help you build high-performance web applications tailored to your business needs.
              </p>
              <Link 
                href="/book" 
                className="block text-center px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all"
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
