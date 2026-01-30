export interface Post {
  _id: string;
  title: string;
  slug: string;
  author: string | { name: string; image?: any; bio?: any };
  authorImage?: any;
  mainImage: any;
  publishedAt: string;
  excerpt?: string;
  body: any;
  categories?: Array<{ title: string; slug: { current: string } }>;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  image: any;
  description: string;
  techStack: string[];
  liveLink: string;
  featured: boolean;
  publishedAt: string;
  owner: string | { name: string; image?: any; bio?: any };
}
