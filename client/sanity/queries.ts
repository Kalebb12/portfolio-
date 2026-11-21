import { defineQuery } from "groq";

// Only documents with a slug are routable, so every list filters on it.

const imageFields = /* groq */ `{
  ...,
  "lqip": asset->metadata.lqip,
  "dimensions": asset->metadata.dimensions{width, height}
}`;

// Body images need the same metadata as cover images for next/image.
const bodyFields = /* groq */ `"body": body[]{
  ...,
  _type == "image" => ${imageFields}
}`;

const projectCard = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  des,
  category,
  year,
  stack,
  "img": img${imageFields}
}`;

// Home shows the four best: featured first (by `order`), so the section is never empty-handed.
export const featuredProjectsQuery = defineQuery(`
  *[_type == "projects" && featured == true && defined(slug.current)]
    | order(order asc, _createdAt desc)[0...4] ${projectCard}
`);

export const allProjectsQuery = defineQuery(`
  *[_type == "projects" && defined(slug.current)]
    | order(featured desc, order asc, year desc, _createdAt desc) ${projectCard}
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "projects" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    des,
    category,
    role,
    event,
    year,
    stack,
    highlights,
    github_url,
    preview_url,
    video_url,
    "img": img${imageFields},
    ${bodyFields}
  }
`);

export const projectSlugsQuery = defineQuery(`
  *[_type == "projects" && defined(slug.current)].slug.current
`);

const writeupCard = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  summary,
  tags
}`;

export const latestWriteupQuery = defineQuery(`
  *[_type == "writeup" && defined(slug.current)] | order(publishedAt desc)[0] ${writeupCard}
`);

export const allWriteupsQuery = defineQuery(`
  *[_type == "writeup" && defined(slug.current)] | order(publishedAt desc) ${writeupCard}
`);

export const writeupBySlugQuery = defineQuery(`
  *[_type == "writeup" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    summary,
    tags,
    ${bodyFields}
  }
`);

export const writeupSlugsQuery = defineQuery(`
  *[_type == "writeup" && defined(slug.current)].slug.current
`);

export const profileQuery = defineQuery(`
  *[_type == "profile" && _id == "profile"][0]{
    name,
    headline,
    bio,
    stack,
    "cvUrl": cv.asset->url
  }
`);

export const socialLinksQuery = defineQuery(`
  *[_type == "socialLinks" && defined(url)] | order(title asc){
    _id,
    title,
    url,
    icon
  }
`);

// Home timeline. Published documents only (the client reads the published perspective).
export const timelineQuery = defineQuery(`{
  "hackathons": *[_type == "hackathon"] | order(date desc){
    _id, project, event, date, role, summary, stack, result, link, featured
  },
  "experience": *[_type == "experience"] | order(startDate desc){
    _id, title, organization, type, startDate, endDate, summary, tags
  }
}`);

export const sitemapQuery = defineQuery(`{
  "projects": *[_type == "projects" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "writeups": *[_type == "writeup" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
}`);
