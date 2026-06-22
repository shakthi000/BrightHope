import { SITE } from "./constants";

export function createMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}) {
  const fullTitle = title
    ? `${title} | ${SITE.shortName}`
    : `${SITE.name} | Counselling & Coaching in Chennai`;
  const desc = description || SITE.description;
  const url = `${SITE.url}${path}`;
  const ogImage = image || `${SITE.url}/og-image`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: `+91${SITE.phone}`,
    email: SITE.email,
    image: `${SITE.url}/og-image`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: "Tamil Nadu",
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9716,
      longitude: 80.1312,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [SITE.social.youtube],
  };
}

function founderCredential(name: string) {
  return {
    "@type": "EducationalOccupationalCredential",
    name,
  };
}

export function founderPersonSchema() {
  const credentials = [
    ...SITE.founder.qualifications.map((qualification) =>
      founderCredential(qualification)
    ),
    founderCredential("Content Creator (YouTube – Let's Xplore)"),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#founder`,
    name: SITE.founder.name,
    jobTitle: SITE.founder.title,
    url: `${SITE.url}/about`,
    sameAs: [SITE.founder.youtube.url],
    hasCredential: credentials,
  };
}

export function counsellingServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    provider: {
      "@type": "Person",
      name: SITE.founder.name,
      jobTitle: SITE.founder.title,
      sameAs: [SITE.founder.youtube.url],
      hasCredential: [
        ...SITE.founder.qualifications.map((qualification) =>
          founderCredential(qualification)
        ),
        founderCredential("Content Creator (YouTube – Let's Xplore)"),
      ],
    },
    areaServed: {
      "@type": "City",
      name: "Chennai",
    },
    serviceType: [
      "Individual Counselling",
      "Relationship Counselling",
      "Cancer Support Counselling",
      "Group Counselling (For Institutions & Corporate Organisations)",
      "Academic Coaching",
      "Student Counselling",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(
  items: readonly { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
