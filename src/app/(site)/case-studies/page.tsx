import { client } from '@/sanity/lib/client';
import { PROJECTS_QUERY } from '@/sanity/lib/queries';
import { Project } from '@/sanity/lib/types';
import ProjectList from '@/components/case-studies/ProjectList';

export const revalidate = 60;

export default async function CaseStudiesPage() {
  const projects: Project[] = await client.fetch(PROJECTS_QUERY);

  return (
    <main className="max-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
            Case Studies
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            A deep dive into the problems we've solved, the products we've built, and the impact we've made for our clients.
          </p>
        </div>

        {/* Projects */}
        {projects.length > 0 ? (
          <ProjectList projects={projects} />
        ) : (
          <div className="text-center py-32 glass-card rounded-[2.5rem]">
            <p className="text-text-secondary text-lg">No case studies found yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
