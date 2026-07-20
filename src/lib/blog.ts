import type { BlogPost } from "./types";

const categoryConfig: Record<string, { label: string; tone: string; icon: string }> = {
  "nursery-news": { label: "Childcare News", tone: "purple", icon: "star" },
  "early-learning": { label: "Early Learning", tone: "blue", icon: "book" },
  "parenting-tips": { label: "Parenting Tips", tone: "purple", icon: "heart" },
  nutrition: { label: "Nutrition", tone: "yellow", icon: "heart" },
  community: { label: "Community", tone: "blue", icon: "person" },
};

export const blogCategories = [
  { id: "all", label: "All Articles", icon: "star" },
  { id: "nursery-news", label: "Childcare News", icon: "star" },
  { id: "early-learning", label: "Early Learning", icon: "book" },
  { id: "parenting-tips", label: "Parenting Tips", icon: "heart" },
  { id: "nutrition", label: "Nutrition", icon: "heart" },
  { id: "community", label: "Community", icon: "person" },
] as const;

function formatDisplayDate(publishedAt: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(publishedAt));
}

function calculateReadTime(body: import("@portabletext/types").PortableTextBlock[]): string {
  const text = JSON.stringify(body)
    .replace(/<[^>]*>/g, "")
    .replace(/\\n/g, " ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));
  return `${minutes} min read`;
}

export function mapBlogPost(post: BlogPost) {
  const cat = categoryConfig[post.category] ?? { label: post.category, tone: "purple", icon: "star" };
  return {
    slug: post.slug.current,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    categoryLabel: cat.label,
    tone: cat.tone,
    icon: cat.icon,
    published: post.publishedAt,
    displayDate: formatDisplayDate(post.publishedAt),
    readTime: calculateReadTime(post.body),
    featured: post.featured ?? false,
    image: post.featuredImage?.asset?._ref
      ? { sanityImage: post.featuredImage, alt: post.featuredImage?.altText ?? "" }
      : null,
    body: post.body,
  };
}

export type MappedBlogPost = ReturnType<typeof mapBlogPost>;
