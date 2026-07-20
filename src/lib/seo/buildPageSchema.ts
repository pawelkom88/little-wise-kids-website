export function buildPageSchema(siteUrl: string, pageType: string = "WebPage") {
  const url = siteUrl.replace(/\/$/, "");
  return [
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      "url": `${url}/`,
      "name": "Little Wise Kids",
      "publisher": {
        "@id": `${url}/#childcare`
      },
      "inLanguage": "en-GB"
    },
    {
      "@type": pageType,
      "@id": `${url}/#webpage`,
      "url": `${url}/`,
      "isPartOf": {
        "@id": `${url}/#website`
      },
      "about": {
        "@id": `${url}/#childcare`
      }
    }
  ];
}
