export function buildPersonSchema(
  siteUrl: string,
  name: string,
  jobTitle: string,
  description?: string
) {
  const url = siteUrl.replace(/\/$/, "");
  return {
    "@type": "Person",
    "@id": `${url}/about-us#founder`,
    "name": name,
    "jobTitle": jobTitle,
    "worksFor": {
      "@id": `${url}/#childcare`
    },
    ...(description ? { description } : {})
  };
}
