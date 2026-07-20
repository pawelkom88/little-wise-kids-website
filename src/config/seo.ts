import type { SeoImage } from '../lib/seo/types';
import ogDefault from '../assets/images/little-wise-kids-social.png';

export const defaultSeoImage: SeoImage = {
  url: ogDefault.src,
  alt: "Little Wise Kids childcare in Easton, Bristol",
  width: ogDefault.width,
  height: ogDefault.height,
};

export const defaultSeoConfig = {
  siteName: "Little Wise Kids",
  type: "website",
};
