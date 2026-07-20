import type { BusinessDetails } from "../types";

export function buildBusinessSchema(businessDetails: BusinessDetails, siteUrl: string) {
  const url = siteUrl.replace(/\/$/, "");
  return {
    "@type": "ChildCare",
    "@id": `${url}/#childcare`,
    "name": businessDetails.organizationName,
    "legalName": businessDetails.legalName,
    "url": `${url}/`,
    "description": businessDetails.footerBusinessCopy,
    "logo": {
      "@type": "ImageObject",
      "url": `${url}/assets/images/logo.png`
    },
    "telephone": businessDetails.primaryPhone?.number,
    "email": businessDetails.publicEmail,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${businessDetails.address?.line1}${businessDetails.address?.line2 ? ', ' + businessDetails.address.line2 : ''}`,
      "addressLocality": businessDetails.address?.city,
      "postalCode": businessDetails.address?.postcode,
      "addressCountry": "GB"
    },
    ...(businessDetails.latitude && businessDetails.longitude ? {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": businessDetails.latitude,
        "longitude": businessDetails.longitude
      }
    } : {}),
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
          "https://schema.org/Friday"
        ],
        "opens": businessDetails.openingTime,
        "closes": businessDetails.closingTime
      }
    ],
    "sameAs": [
      businessDetails.social?.facebookUrl,
      businessDetails.social?.instagramUrl,
      businessDetails.ofstedRecordUrl
    ].filter(Boolean),
    ...(businessDetails.ofstedUrn ? {
      "identifier": {
        "@type": "PropertyValue",
        "name": "Ofsted URN",
        "value": businessDetails.ofstedUrn
      }
    } : {}),
    ...(businessDetails.address?.mapUrl ? { "hasMap": businessDetails.address.mapUrl } : {}),
    ...(businessDetails.approvedAreaServed && businessDetails.approvedAreaServed.length > 0 ? {
      "areaServed": businessDetails.approvedAreaServed.map(area => ({
        "@type": "Place",
        "name": area
      }))
    } : {})
  };
}
