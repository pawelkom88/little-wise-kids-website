import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (source?.asset?._ref === 'image-dummyasset-png') {
    const dummyBuilder: any = {
      width: () => dummyBuilder,
      height: () => dummyBuilder,
      url: () => "https://placehold.co/1200x800.png?text=Dummy+Image",
    };
    return dummyBuilder;
  }
  try {
    return builder.image(source);
  } catch (err) {
    console.warn("Invalid image source provided to urlFor", err);
    // Return a dummy builder that resolves to a placeholder
    const dummyBuilder: any = {
      width: () => dummyBuilder,
      height: () => dummyBuilder,
      url: () => "https://placehold.co/1200x800.png?text=Dummy+Image",
    };
    return dummyBuilder;
  }
}

export async function getBusinessDetails() {
  return await sanityClient.fetch(`*[_type == "businessDetails"][0]`);
}

export async function getHomePage() {
  return await sanityClient.fetch(`*[_type == "homePage"][0]{
    ...,
    faqs[]{
      question,
      answer
    }
  }`);
}

export async function getContactPage() {
  return await sanityClient.fetch(`*[_type == "contactPage"][0]`);
}

export async function getHoursNutritionPage() {
  return await sanityClient.fetch(`*[_type == "hoursNutritionPage"][0]`);
}

export async function getMultilingualPage() {
  return await sanityClient.fetch(`*[_type == "multilingualPage"][0]`);
}

export async function getParentsPage() {
  return await sanityClient.fetch(`*[_type == "parentsPage"][0]`);
}
