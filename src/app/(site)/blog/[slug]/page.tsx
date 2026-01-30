import { client } from '@/sanity/lib/client';
import { POST_QUERY } from '@/sanity/lib/queries';
import { Post } from '@/sanity/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import NotFound from '@/app/not-found';
import SanityContent from '@/components/SanityContent';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2 } from 'lucide-react';


export const revalidate = 60;

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: Post = await client.fetch(POST_QUERY, { slug });

  if (!post) return <NotFound />;

  const authorName = typeof post.author === 'object' ? post.author.name : post.author;
  const authorImage = typeof post.author === 'object' ? post.author.image : null;

  // Estimate reading time (rough calculation: 200 words per minute)
  const wordCount = post.body?.reduce((count: number, block: any) => {
    if (block._type === 'block' && block.children) {
      return count + block.children.reduce((c: number, child: any) => 
        c + (child.text?.split(' ').length || 0), 0);
    }
    return count;
  }, 0) || 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
    
      <main className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-20">
        <div className="container-max max-w-4xl px-4 sm:px-6">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary font-medium transition-colors mb-8 lg:mb-12 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article>
            <header className="mb-8 lg:mb-12">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4 lg:mb-6">
                  {post.categories.map((category: any) => (
                    <span 
                      key={category.slug?.current || category.title} 
                      className="inline-flex items-center gap-1.5 text-xs lg:text-sm px-3 lg:px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      <Tag size={12} />
                      {category.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6 lg:mb-8 leading-tight">
                {post.title}
              </h1>

              {/* Author & Meta Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 lg:mb-8 pb-6 lg:pb-8 border-b border-border-subtle">
                {/* Author */}
                <div className="flex items-center gap-3">
                  {authorImage ? (
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                      <Image
                        src={urlFor(authorImage).url()}
                        alt={authorName}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 text-primary font-bold text-lg lg:text-xl flex-shrink-0">
                      {authorName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm lg:text-base font-bold text-foreground flex items-center gap-2">
                      <User size={14} className="text-primary" />
                      {authorName}
                    </p>
                    <div className="flex items-center gap-3 text-xs lg:text-sm text-text-tertiary mt-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-primary" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-primary" />
                        {readingTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {post.mainImage && (
                <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] mb-8 lg:mb-12 overflow-hidden rounded-2xl lg:rounded-3xl border border-border-subtle shadow-2xl">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
                  />
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="mb-12 lg:mb-16">
              <div className="prose prose-lg prose-invert max-w-none
                prose-headings:font-display prose-headings:font-bold 
                prose-headings:text-foreground prose-headings:tracking-tight
                prose-h2:text-2xl sm:prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl sm:prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:mt-10 prose-h3:mb-4
                prose-h4:text-lg sm:prose-h4:text-xl lg:prose-h4:text-2xl prose-h4:mt-8 prose-h4:mb-3
                prose-p:text-text-secondary prose-p:text-base lg:prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:text-primary-hover hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-bold
                prose-em:text-text-secondary prose-em:italic
                prose-code:text-primary prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 
                prose-code:rounded prose-code:text-sm prose-code:font-mono
                prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-surface prose-pre:border prose-pre:border-border-subtle 
                prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
                prose-pre:text-sm lg:prose-pre:text-base
                prose-ul:text-text-secondary prose-ul:my-6 prose-ul:space-y-2
                prose-ol:text-text-secondary prose-ol:my-6 prose-ol:space-y-2
                prose-li:text-base lg:prose-li:text-lg prose-li:leading-relaxed
                prose-li:marker:text-primary
                prose-blockquote:border-l-primary prose-blockquote:border-l-4 
                prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-6
                prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                prose-blockquote:text-text-secondary prose-blockquote:my-8
                prose-img:rounded-xl prose-img:border prose-img:border-border-subtle
                prose-img:shadow-lg prose-img:my-8
                prose-hr:border-border-subtle prose-hr:my-12
                prose-table:border-collapse prose-table:w-full prose-table:text-sm lg:prose-table:text-base
                prose-thead:bg-white/5 prose-thead:border-b prose-thead:border-border-subtle
                prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-bold prose-th:text-foreground
                prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-border-subtle prose-td:text-text-secondary
              ">
                <SanityContent value={post.body} />
              </div>
            </div>

            {/* Article Footer */}
            <footer className="border-t border-border-subtle pt-8 lg:pt-12 space-y-8 lg:space-y-12">
              {/* Share Section (optional - can be implemented with client component) */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-sm text-text-tertiary">
                  Published {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
                <button className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
                  <Share2 size={16} />
                  Share article
                </button>
              </div>

              {/* CTA Card */}
              <div className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-xl lg:text-2xl font-display font-bold mb-3 lg:mb-4">
                  Enjoyed this article?
                </h3>
                <p className="text-sm lg:text-base text-text-secondary mb-6 lg:mb-8 leading-relaxed max-w-2xl">
                  Get more insights like this delivered to your inbox. Or let's discuss how we can help bring your project to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-background px-6 lg:px-8 py-3 lg:py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 text-sm lg:text-base"
                  >
                    Schedule a Consultation
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-bold border border-border-subtle transition-all text-sm lg:text-base"
                  >
                    Read More Articles
                  </Link>
                </div>
              </div>

              {/* Navigation to other posts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/blog"
                  className="glass-card rounded-2xl p-6 hover:bg-white/[0.05] transition-all group border border-border-subtle"
                >
                  <p className="text-xs text-text-tertiary mb-2 flex items-center gap-2">
                    <ArrowLeft size={14} />
                    Previous
                  </p>
                  <p className="font-bold text-sm lg:text-base group-hover:text-primary transition-colors">
                    More Articles
                  </p>
                </Link>
                <Link
                  href="/blog"
                  className="glass-card rounded-2xl p-6 hover:bg-white/[0.05] transition-all group text-right border border-border-subtle"
                >
                  <p className="text-xs text-text-tertiary mb-2 flex items-center justify-end gap-2">
                    Next
                    <ArrowLeft size={14} className="rotate-180" />
                  </p>
                  <p className="font-bold text-sm lg:text-base group-hover:text-primary transition-colors">
                    Browse All Posts
                  </p>
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </main>
   
    </>
  );
}