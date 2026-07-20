import { sanityClient } from "sanity:client";
import type {
  BusinessDetails,
  HomePage,
  ContactPage,
  HoursNutritionPage,
  MultilingualPage,
  ParentsPage,
  AboutPage,
  GalleryPage,
  ThankYouPage,
  BlogPage,
  BlogPost,
  GalleryPhoto,
  PolicyDocument,
} from "./types";

function assertSingleton<T>(result: T | null, name: string): T {
  if (!result) {
    throw new Error(
      `Missing required singleton: "${name}". Create it in the Sanity CMS.`
    );
  }
  return result;
}

export const businessDetailsQuery = `*[_id == "businessDetails" && _type == "businessDetails"][0]`;

export async function getBusinessDetails(): Promise<BusinessDetails> {
  return assertSingleton(
    await sanityClient.fetch<BusinessDetails>(businessDetailsQuery),
    "businessDetails"
  );
}

export const homePageQuery = `*[_id == "homePage" && _type == "homePage"][0]{
  ...,
  faqs[]{question, answer}
}`;

export async function getHomePage(): Promise<HomePage> {
  return assertSingleton(
    await sanityClient.fetch<HomePage>(homePageQuery),
    "homePage"
  );
}

export const aboutPageQuery = `*[_id == "aboutPage" && _type == "aboutPage"][0]`;

export async function getAboutPage(): Promise<AboutPage> {
  return assertSingleton(
    await sanityClient.fetch<AboutPage>(aboutPageQuery),
    "aboutPage"
  );
}

export const contactPageQuery = `*[_id == "contactPage" && _type == "contactPage"][0]`;

export async function getContactPage(): Promise<ContactPage> {
  return assertSingleton(
    await sanityClient.fetch<ContactPage>(contactPageQuery),
    "contactPage"
  );
}

export const hoursNutritionPageQuery = `*[_id == "hoursNutritionPage" && _type == "hoursNutritionPage"][0]`;

export async function getHoursNutritionPage(): Promise<HoursNutritionPage> {
  return assertSingleton(
    await sanityClient.fetch<HoursNutritionPage>(hoursNutritionPageQuery),
    "hoursNutritionPage"
  );
}

export const multilingualPageQuery = `*[_id == "multilingualPage" && _type == "multilingualPage"][0]`;

export async function getMultilingualPage(): Promise<MultilingualPage> {
  return assertSingleton(
    await sanityClient.fetch<MultilingualPage>(multilingualPageQuery),
    "multilingualPage"
  );
}

export const parentsPageQuery = `*[_id == "parentsPage" && _type == "parentsPage"][0]`;

export async function getParentsPage(): Promise<ParentsPage> {
  return assertSingleton(
    await sanityClient.fetch<ParentsPage>(parentsPageQuery),
    "parentsPage"
  );
}

export const galleryPageQuery = `*[_id == "galleryPage" && _type == "galleryPage"][0]`;

export async function getGalleryPage(): Promise<GalleryPage> {
  return assertSingleton(
    await sanityClient.fetch<GalleryPage>(galleryPageQuery),
    "galleryPage"
  );
}

export const thankYouPageQuery = `*[_id == "thankYouPage" && _type == "thankYouPage"][0]`;

export async function getThankYouPage(): Promise<ThankYouPage> {
  return assertSingleton(
    await sanityClient.fetch<ThankYouPage>(thankYouPageQuery),
    "thankYouPage"
  );
}

export const blogPageQuery = `*[_id == "blogPage" && _type == "blogPage"][0]`;

export async function getBlogPage(): Promise<BlogPage> {
  return assertSingleton(
    await sanityClient.fetch<BlogPage>(blogPageQuery),
    "blogPage"
  );
}

export const blogPostsQuery = `*[
  _type == "blogPost" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now()
] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  featured,
  category,
  excerpt,
  featuredImage,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        ...,
        reference->{ _id, _type, slug }
      }
    }
  }
}`;

export async function getBlogPosts(): Promise<BlogPost[]> {
  return await sanityClient.fetch<BlogPost[]>(blogPostsQuery);
}

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  featured,
  category,
  excerpt,
  featuredImage,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        ...,
        reference->{ _id, _type, slug }
      }
    }
  }
}`;

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return await sanityClient.fetch<BlogPost | null>(blogPostBySlugQuery, { slug });
}

export const galleryPhotosQuery = `*[_type == "galleryPhoto" && defined(image.asset._ref)] | order(displayOrder asc)`;

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  return await sanityClient.fetch<GalleryPhoto[]>(galleryPhotosQuery);
}

export const homeGalleryPhotosQuery = `*[_type == "galleryPhoto" && showOnHomepage == true && defined(image.asset._ref)] | order(homepageDisplayOrder asc)`;

export async function getHomeGalleryPhotos(): Promise<GalleryPhoto[]> {
  return await sanityClient.fetch<GalleryPhoto[]>(homeGalleryPhotosQuery);
}

export const policyDocumentsQuery = `*[_type == "policyDocument" && defined(file.asset._ref)] | order(displayOrder asc) {
  _id,
  title,
  shortDescription,
  "fileUrl": file.asset->url,
  displayOrder,
  lastReviewed,
  file
}`;

export async function getPolicyDocuments(): Promise<PolicyDocument[]> {
  return await sanityClient.fetch<PolicyDocument[]>(policyDocumentsQuery);
}
