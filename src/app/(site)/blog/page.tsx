import { client } from '@/sanity/lib/client';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { Post } from '@/sanity/lib/types';
import BlogList from '@/components/blog/BlogList';
import { blogMetadata } from '@/lib/metadata';

export const metadata = blogMetadata;

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(POSTS_QUERY);

  return (
    <main className="max-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Our Blog
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Stay up to date with the latest insights, tips, and tutorials from our experts.
          </p>
        </div>

        {/* Blogs */}
        {posts.length > 0 ? (
          <BlogList posts={posts} />
        ) : (
          <div className="text-center py-20">
            <p className="text-text-secondary">No posts found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
