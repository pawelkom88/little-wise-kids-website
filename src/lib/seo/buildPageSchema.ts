export function buildPageSchema(siteUrl: string, canonicalUrl?: string, title?: string, description?: string, pageType: string = "WebPage") {
  const url = siteUrl.replace(/\/$/, "");
  
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      "url": `${url}/`,
      "name": "Little Wise Kids",
      "publisher": {
        "@id": `${url}/#childcare`
      },
      "inLanguage": "en-GB"
    }
  ];

  if (canonicalUrl) {
    graph.push({
      "@type": pageType,
      "@id": `${canonicalUrl}#webpage`,
      "url": canonicalUrl,
      ...(title ? { "name": title } : {}),
      ...(description ? { "description": description } : {}),
      "isPartOf": {
        "@id": `${url}/#website`
      },
      "about": {
        "@id": `${url}/#childcare`
      }
    });
  }

  return graph;
}
