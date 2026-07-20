// @ts-ignore
import { sanityClient } from "sanity:client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(sanityClient);

const assetRefPattern = /^image-[A-Za-z0-9]+-\d+x\d+-[a-z]+$/;

export function isValidImageRef(ref: string | undefined): boolean {
  if (!ref) return false;
  return assetRefPattern.test(ref);
}

export function urlFor(source: Record<string, unknown>) {
  const s = source as Record<string, Record<string, string>>;
  if (!s?.asset?._ref || !isValidImageRef(s.asset._ref)) {
    const fallback: Record<string, unknown> = {};
    fallback.width = () => fallback;
    fallback.height = () => fallback;
    fallback.url = () => null;
    fallback.format = () => fallback;
    fallback.auto = () => fallback;
    fallback.quality = () => fallback;
    return fallback as unknown as ReturnType<typeof builder.image>;
  }
  return builder.image(source as any);
}

export function getImageUrl(source: Record<string, unknown>, w = 1200): string | null {
  const s = source as Record<string, Record<string, string>>;
  if (!s?.asset?._ref || !isValidImageRef(s.asset._ref)) return null;
  return urlFor(source).width(w).url();
}
