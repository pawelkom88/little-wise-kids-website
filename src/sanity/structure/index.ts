import type { StructureResolver } from "sanity/structure";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { DocumentIcon } from "@sanity/icons/Document";
import { ImagesIcon } from "@sanity/icons/Images";
import { BookIcon } from "@sanity/icons/Book";
import { ComposeIcon } from "@sanity/icons/Compose";

const SINGLETON_TYPES = [
  "businessDetails",
  "homePage",
  "aboutPage",
  "multilingualPage",
  "hoursNutritionPage",
  "parentsPage",
  "galleryPage",
  "contactPage",
  "thankYouPage",
  "blogPage",
];

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Business Details")
        .icon(EarthGlobeIcon)
        .child(
          S.document()
            .schemaType("businessDetails")
            .documentId("businessDetails")
        ),
      S.divider(),
      S.listItem()
        .title("Website Pages")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Home")
                .child(
                  S.document().schemaType("homePage").documentId("homePage")
                ),
              S.listItem()
                .title("About")
                .child(
                  S.document().schemaType("aboutPage").documentId("aboutPage")
                ),
              S.listItem()
                .title("Multilingual")
                .child(
                  S.document()
                    .schemaType("multilingualPage")
                    .documentId("multilingualPage")
                ),
              S.listItem()
                .title("Hours & Nutrition")
                .child(
                  S.document()
                    .schemaType("hoursNutritionPage")
                    .documentId("hoursNutritionPage")
                ),
              S.listItem()
                .title("Parents")
                .child(
                  S.document()
                    .schemaType("parentsPage")
                    .documentId("parentsPage")
                ),
              S.listItem()
                .title("Gallery")
                .child(
                  S.document()
                    .schemaType("galleryPage")
                    .documentId("galleryPage")
                ),
              S.listItem()
                .title("Contact")
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                ),
              S.listItem()
                .title("Thank You")
                .child(
                  S.document()
                    .schemaType("thankYouPage")
                    .documentId("thankYouPage")
                ),
              S.listItem()
                .title("Blog Main")
                .child(
                  S.document().schemaType("blogPage").documentId("blogPage")
                ),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("blogPost").title("Blog Posts").icon(ComposeIcon),
      S.documentTypeListItem("galleryPhoto")
        .title("Gallery Photos")
        .icon(ImagesIcon),
      S.documentTypeListItem("policyDocument")
        .title("Policies and Documents")
        .icon(BookIcon),

      // Filter out singletons from the main list
      ...S.documentTypeListItems().filter(
        (listItem: import("sanity/structure").ListItemBuilder) =>
          !SINGLETON_TYPES.includes(listItem.getId() as string) &&
          !["blogPost", "galleryPhoto", "policyDocument"].includes(
            listItem.getId() as string
          )
      ),
    ]);
