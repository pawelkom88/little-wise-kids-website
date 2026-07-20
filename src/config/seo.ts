import type { SeoImage } from '../lib/seo/types';
import ogDefault from '../assets/images/og-default.png';

export const defaultSeoImage: SeoImage = {
  url: ogDefault.src,
  alt: "Little Wise Kids — Nurturing early years childcare in Bristol BS5",
  width: ogDefault.width,
  height: ogDefault.height,
};

export const defaultSeoConfig = {
  siteName: "Little Wise Kids",
  type: "website",
};
