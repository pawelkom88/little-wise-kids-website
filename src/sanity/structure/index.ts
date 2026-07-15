import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Business Details")
        .child(S.document().schemaType("businessDetails").documentId("businessDetails")),
      S.divider(),
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("About Page")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Multilingual Page")
        .child(S.document().schemaType("multilingualPage").documentId("multilingualPage")),
      S.listItem()
        .title("Hours & Nutrition Page")
        .child(S.document().schemaType("hoursNutritionPage").documentId("hoursNutritionPage")),
      S.listItem()
        .title("Parents' Info Page")
        .child(S.document().schemaType("parentsPage").documentId("parentsPage")),
      S.listItem()
        .title("Gallery Page")
        .child(S.document().schemaType("galleryPage").documentId("galleryPage")),
      S.listItem()
        .title("Contact Page")
        .child(S.document().schemaType("contactPage").documentId("contactPage")),
      S.listItem()
        .title("Thank You Page")
        .child(S.document().schemaType("thankYouPage").documentId("thankYouPage")),
      S.listItem()
        .title("Blog Index Page")
        .child(S.document().schemaType("blogPage").documentId("blogPage")),
      S.divider(),
      S.documentTypeListItem("blogPost").title("Blog Posts"),
      S.documentTypeListItem("galleryPhoto").title("Gallery Photos"),
      S.documentTypeListItem("policyDocument").title("Policy Documents"),
    ]);
