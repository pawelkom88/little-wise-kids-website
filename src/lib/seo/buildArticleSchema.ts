import type { BlogPost } from "../types";

export function buildArticleSchema(post: BlogPost, siteUrl: string, postUrl: string, categoryLabel?: string) {
  const url = siteUrl.replace(/\/$/, "");
  return [
    {
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "mainEntityOfPage": {
        "@id": `${postUrl}#webpage`
      },
      "url": postUrl,
      "datePublished": post.publishedAt,
      "dateModified": post._updatedAt || post.publishedAt,
      ...(categoryLabel ? { "articleSection": categoryLabel } : {}),
      ...(post.imageUrl ? {
        "image": [post.imageUrl]
      } : {}),
      ...(post.authorName ? {
        "author": {
          "@type": "Person",
          "name": post.authorName,
          ...(post.authorRole ? { "jobTitle": post.authorRole } : {})
        }
      } : {}),
      "publisher": {
        "@id": `${url}/#childcare`
      },
      "inLanguage": "en-GB"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${url}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${url}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": postUrl
        }
      ]
    }
  ];
}
