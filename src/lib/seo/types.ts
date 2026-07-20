export interface SeoImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  mimeType?: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
  type?: "website" | "article";
  image?: SeoImage;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  schemas?: Record<string, unknown>[];
}
