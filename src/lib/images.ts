import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

const assetRefPattern = /^image-[A-Za-z0-9]+-\d+x\d+-[a-z]+$/;

export function isValidImageRef(ref: string | undefined): boolean {
  if (!ref) return false;
  return assetRefPattern.test(ref);
}

export function urlFor(source: any) {
  if (!source?.asset?._ref || !isValidImageRef(source.asset._ref)) {
    const fallback: any = {
      width: () => fallback,
      height: () => fallback,
      url: () => null,
      format: () => fallback,
      auto: () => fallback,
      quality: () => fallback,
    };
    return fallback;
  }
  return builder.image(source);
}

export function getImageUrl(source: any, w = 1200): string | null {
  if (!source?.asset?._ref || !isValidImageRef(source.asset._ref)) return null;
  return urlFor(source).width(w).url();
}
