export const site = {
  name: "Little Wise Kids",
  description:
    "A warm, screen-free early years setting in Bristol BS5, supporting children through child-led learning, meaningful play and everyday connection.",
  phones: ["07456 326016", "07940 272844"],
  email: "info@littlewisekids.co.uk",
  addressLines: [
    "Stapleton Road, Congregational Chapel",
    "Newton Street",
    "Bristol",
    "BS5 0QZ",
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100088937473803",
    instagram: "https://www.instagram.com/littlewisekidsuk/",
  },
};

export const navItems = [
  {
    label: "About Us",
    icon: "person",
    tone: "blue",
    children: [
      { label: "About Us", href: "/#approach" },
      { label: "Our Approach", href: "/#approach" },
      { label: "Our Commitment", href: "/#activities" },
      { label: "Our Leadership Team", href: "/#contact" },
    ],
  },
  {
    label: "Multilingual Learning",
    icon: "book",
    tone: "green",
    children: [
      { label: "Our Curriculum", href: "/#activities" },
      { label: "EYFS", href: "/#approach" },
      { label: "Screen-Free Learning", href: "/#activities" },
    ],
  },
  {
    label: "Parents’ Information",
    icon: "users",
    tone: "purple",
    children: [
      { label: "Fees & Funding", href: "/#parents" },
      { label: "Childcare Subsidy Questions", href: "/#parents" },
      { label: "Partnership With Families", href: "/#parents" },
      { label: "Policies", href: "/#parents" },
      { label: "Settling In", href: "/#parents" },
    ],
  },
  { label: "Operating Hours & Nutrition", href: "/", icon: "clock", tone: "green" },
  { label: "Our Gallery", href: "/#parents", icon: "image", tone: "green" },
  { label: "Contact Us", href: "/#contact", icon: "mail", tone: "green" },
  { label: "Blog / News", href: "/", icon: "chat", tone: "green" },
] as const;

export const heroFeatures = [
  {
    title: "Multilingual Learning",
    text: "Portuguese and Spanish through fun and play.",
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
