import { contentImage } from "./objects/contentImage";
import { strictImage } from "./objects/strictImage";
import { constrainedPortableText } from "./objects/constrainedPortableText";

import { businessDetails } from "./singletons/businessDetails";
import { homePage } from "./singletons/homePage";
import { aboutPage } from "./singletons/aboutPage";
import { multilingualPage } from "./singletons/multilingualPage";
import { hoursNutritionPage } from "./singletons/hoursNutritionPage";
import { parentsPage } from "./singletons/parentsPage";
import { galleryPage } from "./singletons/galleryPage";
import { contactPage } from "./singletons/contactPage";
import { thankYouPage } from "./singletons/thankYouPage";
import { blogPage } from "./singletons/blogPage";

import { blogPost } from "./collections/blogPost";
import { galleryPhoto } from "./collections/galleryPhoto";
import { policyDocument } from "./collections/policyDocument";

export const schemaTypes = [
  contentImage,
  strictImage,
  constrainedPortableText,
  businessDetails,
  homePage,
  aboutPage,
  multilingualPage,
  hoursNutritionPage,
  parentsPage,
  galleryPage,
  contactPage,
  thankYouPage,
  blogPage,
  blogPost,
  galleryPhoto,
  policyDocument,
];
