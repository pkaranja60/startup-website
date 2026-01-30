import { client } from '@/sanity/lib/client';
import { PROJECT_QUERY } from '@/sanity/lib/queries';
import { Project } from '@/sanity/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import NotFound from '@/app/not-found';
import { ExternalLink, Calendar, User, Code, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const revalidate = 60;

export default async function CaseStudySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project: Project = await client.fetch(PROJECT_QUERY, { slug });

  if (!project) return <NotFound />;

  const ownerName = typeof project.owner === 'object' ? project.owner.name : project.owner;

  return (
    <>
     
      <main className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary font-medium transition-colors mb-8 lg:mb-12 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </Link>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6 lg:mb-8 leading-tight">
                {project.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 lg:gap-6 mb-6 lg:mb-8 text-text-tertiary text-sm lg:text-base">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary" />
                  <span>
                    {new Date(project.publishedAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={18} className="text-primary" />
                  <span>{ownerName}</span>
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 lg:gap-3 mb-8 lg:mb-10">
                {project.techStack?.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 rounded-full bg-white/5 border border-border-subtle text-xs lg:text-sm font-medium text-text-secondary hover:border-primary/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Live Link */}
              {project.liveLink && (
                <a 
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-primary hover:bg-primary-hover text-background rounded-full font-bold transition-all shadow-xl shadow-primary/40 hover:scale-105 active:scale-95 text-sm lg:text-base"
                >
                  Visit Live Site 
                  <ExternalLink size={20} />
                </a>
              )}
            </div>

            {/* Project Image */}
            {project.image && (
              <div className="order-1 lg:order-2 relative aspect-square lg:aspect-auto lg:h-[400px] xl:h-[500px] w-full overflow-hidden rounded-2xl lg:rounded-3xl border border-border-subtle shadow-2xl">
                <Image
                  src={urlFor(project.image).url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 lg:space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-2xl lg:text-3xl font-display font-bold mb-4 lg:mb-6">
                  Project Overview
                </h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  {project.description.split('\n').map((para, i) => (
                    <p key={i} className="text-text-secondary text-base lg:text-lg leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                </div>
              </section>

              {/* Key Features/Results - if available */}
              {project.techStack && project.techStack.length > 3 && (
                <section className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-border-subtle">
                  <h3 className="text-xl lg:text-2xl font-display font-bold mb-6">
                    Key Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Scalable architecture',
                      'Modern tech stack', 
                      'Optimized performance',
                      'Responsive design'
                    ].map((highlight, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={14} className="text-primary" strokeWidth={3} />
                        </div>
                        <span className="text-sm lg:text-base text-text-secondary">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:space-y-8">
              {/* Tech Stack Card */}
              <div className="glass-card p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-border-subtle">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Code className="text-primary" size={20} />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold">Technologies</h3>
                </div>
                <ul className="space-y-3">
                  {project.techStack?.map(tech => (
                    <li key={tech} className="flex items-center gap-3 text-sm lg:text-base text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div className="glass-card p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4">
                  Like this project?
                </h3>
                <p className="text-text-secondary text-sm lg:text-base mb-6 leading-relaxed">
                  We can help you build something similar tailored to your business needs.
                </p>
                <Link 
                  href="/book" 
                  className="block text-center px-6 py-3 bg-primary hover:bg-primary-hover text-background rounded-full font-bold transition-all hover:scale-105 active:scale-95 text-sm lg:text-base"
                >
                  Let's Talk
                </Link>
              </div>

              {/* More Projects Link */}
              <Link
                href="/case-studies"
                className="block glass-card p-6 rounded-2xl border border-border-subtle hover:bg-white/[0.05] transition-all text-center"
              >
                <p className="font-bold text-sm lg:text-base mb-1">Explore More</p>
                <p className="text-xs lg:text-sm text-text-tertiary">View all case studies →</p>
              </Link>
            </aside>
          </div>
        </div>
      </main>
     
    </>
  );
}