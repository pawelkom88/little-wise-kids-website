export const site = {
  name: "Little Wise Kids",
  description:
    "A warm, screen-free early years setting in Bristol BS5, supporting children through child-led learning, meaningful play and everyday connection.",
  email: "hello@littlewisekids.co.uk",
  phones: [
    {
      label: "Primary",
      display: "07456 326016",
      href: "tel:+447456326016",
    },
    {
      label: "Secondary",
      display: "07940 272844",
      href: "tel:+447940272844",
    },
  ],
  address: {
    organisation: "Little Wise Kids",
    line1: "Stapleton Road, Congregational Chapel",
    line2: "Newton Street",
    city: "Bristol",
    postcode: "BS5 0QZ",
  },
  openingHours: {
    days: "Monday–Friday",
    fullDay: "7:30am–5:30pm",
    morning: "7:30am–12:30pm",
    afternoon: "12:30pm–5:30pm",
  },
  ageRange: "0–4 years",
  languages: ["English", "Portuguese"],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100088937473803",
    instagram: "https://www.instagram.com/littlewisekidsuk/",
  },
} as const;

export const navItems = [
  {
    label: "About Us",
    icon: "person",
    tone: "blue",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Approach", href: "/about-us#our-approach" },
      { label: "Our Commitment", href: "/about-us#our-commitment" },
      { label: "Our Leadership Team", href: "/about-us#our-leadership-team" },
    ],
  },
  {
    label: "Multilingual Learning",
    icon: "book",
    tone: "green",
    children: [
      { label: "Multilingual Learning", href: "/multilingual-learning" },
      {
        label: "Our Philosophy",
        href: "/multilingual-learning#our-learning-philosophy",
      },
      {
        label: "English and Portuguese",
        href: "/multilingual-learning#english-and-portuguese",
      },
      { label: "EYFS", href: "/multilingual-learning#eyfs" },
      {
        label: "Screen-Free Learning",
        href: "/multilingual-learning#screen-free-learning",
      },
    ],
  },
  {
    label: "Parents’ Information",
    icon: "users",
    tone: "purple",
    children: [
      { label: "Parents’ Information", href: "/parents-information" },
      { label: "Fees & Funding", href: "/parents-information#fees-funding" },
      {
        label: "Childcare Subsidy",
        href: "/parents-information#childcare-subsidy-questions",
      },
      {
        label: "Partnership With Families",
        href: "/parents-information#partnership-with-families",
      },
      { label: "Settling In", href: "/parents-information#settling-in" },
      { label: "Policies", href: "/parents-information#policies" },
    ],
  },
  {
    label: "Hours & Nutrition",
    href: "/hours-nutrition",
    icon: "clock",
    tone: "green",
  },
  { label: "Our Gallery", href: "/our-gallery", icon: "image", tone: "green" },
  { label: "Contact Us", href: "/contact", icon: "mail", tone: "green" },
  { label: "Blog / News", href: "/blog", icon: "chat", tone: "green" },
] as const;

export const heroFeatures = [
  {
    title: "Multilingual Learning",
    text: "English and Portuguese through fun and play.",
    icon: "book",
    tone: "purple",
  },
  {
    title: "Child-Centred",
    text: "Every child is unique. We support every step.",
    icon: "heart",
    tone: "green",
  },
  {
    title: "Play to Learn",
    text: "Hands-on activities that inspire discovery.",
    icon: "star",
    tone: "blue",
  },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/parents-information#policies" },
  { label: "Safeguarding Policy", href: "/parents-information#policies" },
] as const;

export type TaglineTone = "purple" | "green" | "blue" | "yellow";

export interface TaglinePart {
  text: string;
  tone?: TaglineTone;
}

export const tagline = [
  { text: "Growing " },
  { text: "confident", tone: "purple" },
  { text: ", " },
  { text: "kind", tone: "green" },
  { text: " and " },
  { text: "curious", tone: "blue" },
  { text: " children." },
] satisfies readonly TaglinePart[];
