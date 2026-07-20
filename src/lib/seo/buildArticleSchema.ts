import type { BlogPost } from "../types";

export function buildArticleSchema(post: BlogPost, siteUrl: string, postUrl: string) {
  const url = siteUrl.replace(/\/$/, "");
  return [
    {
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl
      },
      "url": postUrl,
      "datePublished": post.publishedAt,
      "dateModified": post.publishedAt,
      "image": [
        `${url}/assets/images/hero-image.png`
      ],
      "author": {
        "@type": "Person",
        "name": post.authorName || "Little Wise Kids Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Little Wise Kids",
        "logo": {
          "@type": "ImageObject",
          "url": `${url}/assets/images/logo.png`
        }
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
