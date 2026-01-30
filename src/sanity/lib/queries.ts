import { defineQuery } from 'next-sanity'

// Blog Queries
export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "author": author->name,
  "authorImage": author->image,
  mainImage,
  publishedAt,
  "excerpt": array::join(string::split(pt::text(body), "")[0..200], "") + "...",
  categories[]->{title, slug}
}`)

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "author": author->{name, image, bio},
  mainImage,
  publishedAt,
  body,
  categories[]->{title, slug}
}`)

// Project Queries
export const PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  image,
  description,
  techStack,
  liveLink,
  featured,
  publishedAt,
  "owner": owner->name
}`)

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  image,
  description,
  techStack,
  liveLink,
  featured,
  publishedAt,
  "owner": owner->{name, image, bio}
}`)
