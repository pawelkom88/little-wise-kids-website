export const site = {
  name: "Little Wise Kids",
  phone: "01234 567890",
  email: "hello@littlewisekids.co.uk",
  address: "123 Little Learners Lane, Surrey, GU1 1AA",
};

export const navItems = [
  {
    label: "About Us",
    icon: "person",
    tone: "purple",
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
    tone: "blue",
    children: [
      { label: "Our Curriculum", href: "/#activities" },
      { label: "EYFS", href: "/#approach" },
      { label: "Screen-Free Learning", href: "/#activities" },
    ],
  },
  {
    label: "Parents Information",
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
  { label: "Hours & Nutrition", href: "/", icon: "clock", tone: "green" },
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

export const approachPoints = [
  {
    title: "Home-from-home",
    text: "A warm setting with convenient access to town and local amenities.",
    tone: "purple",
  },
  {
    title: "Confident learners",
    text: "A curriculum that helps each child recognise and cultivate their talents.",
    tone: "green",
  },
  {
    title: "Modern languages",
    text: "Traditional Early Years learning with Portuguese, Spanish and culture woven in.",
    tone: "blue",
  },
] as const;

export const values = [
  {
    title: "Multilingual Learning",
    text: "Languages introduced through songs, stories and everyday moments.",
    icon: "chat",
    tone: "purple",
  },
  {
    title: "Safe & Caring",
    text: "Secure, nurturing environments where children feel loved and respected.",
    icon: "heartSmile",
    tone: "green",
  },
  {
    title: "Creative Play",
    text: "Art, music and hands-on exploration that build confidence and curiosity.",
    icon: "palette",
    tone: "blue",
  },
  {
    title: "Parent Partnership",
    text: "Close family partnerships that support each child's unique journey.",
    icon: "users",
    tone: "yellow",
  },
] as const;

export const faqs = [
  {
    question: "What ages do you care for?",
    answer:
      "We care for children from 6 months to 5 years old in a safe and engaging environment.",
  },
  {
    question: "How are languages introduced?",
    answer:
      "Portuguese and Spanish are introduced through songs, stories, play and everyday routines.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "We are open Monday to Friday from 7:00 to 18:00, including school holidays.",
  },
  {
    question: "Where are you based?",
    answer:
      "Little Wise Kids is based in a home setting just behind Cabot Circus car park.",
  },
] as const;

export const footerColumns = [
  {
    title: "Explore",
    tone: "purple",
    links: ["About Us", "Our Approach", "Activities", "Book a Visit"],
  },
  {
    title: "Families",
    tone: "green",
    links: ["Parents", "Fees & Funding", "FAQs", "News & Insights"],
  },
  {
    title: "Information",
    tone: "blue",
    links: ["Careers", "Policies", "Term Dates", "Locations"],
  },
] as const;
