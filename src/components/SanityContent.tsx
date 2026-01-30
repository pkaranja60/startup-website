import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-96 my-10 overflow-hidden rounded-3xl">
          <Image
            src={urlFor(value).url()}
            alt="Content Image"
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-8 text-white">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold my-6 text-white">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold my-4 text-white">{children}</h3>,
    normal: ({ children }: any) => <p className="text-text-secondary leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-lg text-text-primary bg-white/5 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-8 mb-6 space-y-2 text-text-secondary">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-8 mb-6 space-y-2 text-text-secondary">{children}</ol>,
  },
};

export default function SanityContent({ value }: { value: any }) {
  return (
    <div className="sanity-content prose prose-invert max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
