import { client } from '@/sanity/lib/client';
import { POST_QUERY } from '@/sanity/lib/queries';
import { Post } from '@/sanity/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import NotFound from '@/app/not-found';
import SanityContent from '@/components/SanityContent';

export const revalidate = 60;

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: Post = await client.fetch(POST_QUERY, { slug });

  if (!post) return <NotFound />;

  const authorName = typeof post.author === 'object' ? post.author.name : post.author;
  const authorImage = typeof post.author === 'object' ? post.author.image : null;

  return (
    <main className="max-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="container-max max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="mb-8 inline-block text-primary hover:text-primary-hover font-bold transition-colors"
        >
          ← Back to Blog
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            {authorImage ? (
              <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20">
                <Image
                  src={urlFor(authorImage).url()}
                  alt={authorName}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold">
                    {authorName.charAt(0)}
                </div>
            )}
            <div>
              <p className="text-text-primary font-bold">{authorName}</p>
              <p className="text-sm text-text-tertiary">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-8">
            {post.categories?.map((category: any) => (
              <span key={category.slug?.current || category.title} className="text-xs px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                {category.title}
              </span>
            ))}
          </div>

          {post.mainImage && (
            <div className="relative w-full h-[400px] lg:h-[500px] mb-12 overflow-hidden rounded-3xl border border-white/10">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        <div className="prose-container">
          <SanityContent value={post.body} />
        </div>
      </div>
    </main>
  );
}
