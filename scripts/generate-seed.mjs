import fs from "fs";
import { fileURLToPath } from "url";
import pathModule from "path";

const __dirname = pathModule.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.SANITY_DATASET === "development";

function createTextBlock(text) {
  return {
    _key: Math.random().toString(36).substring(2, 9),
    _type: "block",
    style: "normal",
    children: [
      {
        _key: Math.random().toString(36).substring(2, 9),
        _type: "span",
        text,
        marks: [],
      },
    ],
  };
}

const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

function validate(doc) {
  if (!doc._id || !doc._type) throw new Error("Missing _id or _type in document");
  
  if (doc._type === "hoursNutritionPage") {
    const slots = ["welcomeAndFreePlay", "learningAndExploration", "morningSnack", "outdoorAdventures", "lunch", "restAndQuietTime", "afternoonPlayAndHome"];
    for (const slot of slots) {
      if (doc[slot]) {
        if (!timeRegex.test(doc[slot].startTime)) throw new Error(`Invalid startTime in ${slot}`);
        if (!timeRegex.test(doc[slot].endTime)) throw new Error(`Invalid endTime in ${slot}`);
        if (doc[slot].endTime <= doc[slot].startTime) throw new Error(`endTime must be later than startTime in ${slot}`);
      }
    }
  }
}

// For dev, we point to real files via _sanityAsset so the CLI imports them
// For prod, we omit the images completely.
const dummyImageRef = isDev ? {
  _type: "image",
  _sanityAsset: `image@file://${pathModule.resolve(__dirname, 'dummy-image.png')}`,
  isDecorative: false,
  altText: "Representative illustrative image for Little Wise Kids nursery setting."
} : undefined;

const decorativeDummyImageRef = isDev ? {
  _type: "image",
  _sanityAsset: `image@file://${pathModule.resolve(__dirname, 'dummy-image.png')}`,
  isDecorative: true
} : undefined;

function getPdfRef() {
  return isDev ? {
    _type: "file",
    _sanityAsset: `file@file://${pathModule.resolve(__dirname, 'dummy-policy.pdf')}`
  } : undefined;
}

function getGalleryImageRef() {
  return isDev ? {
    _type: "strictImage",
    _sanityAsset: `image@file://${pathModule.resolve(__dirname, 'dummy-image.png')}`,
    altText: "Gallery image representing nursery activities"
  } : undefined;
}

function getBlogImageRef() {
  return isDev ? {
    _type: "strictImage",
    _sanityAsset: `image@file://${pathModule.resolve(__dirname, 'dummy-image.png')}`,
    altText: "Blog featured image"
  } : undefined;
}

const rawArticles = [
  {
    slug: "welcome-to-a-new-term",
    title: "Welcome to a New Term at Little Wise Kids",
    excerpt: "A look at what is ahead this season, from joyful learning themes and new experiences to the little moments that make nursery life special.",
    category: "nursery-news",
    publishedAt: "2026-07-14T12:00:00Z",
    featured: true,
    content: [
      { type: "paragraph", text: "Welcome to a new term at Little Wise Kids. We are excited to see the children return and to welcome new families to our setting." }
    ],
  },
  {
    slug: "the-power-of-play",
    title: "The Power of Play: Learning Through Discovery",
    excerpt: "How meaningful play helps children build confidence, curiosity, communication and problem-solving skills at their own pace.",
    category: "early-learning",
    publishedAt: "2026-07-08T12:00:00Z",
    featured: false,
    content: [
      { type: "paragraph", text: "Play is far more than just fun. It is how children explore, experiment, imagine and make connections that help them grow in so many important ways." }
    ],
  },
  {
    slug: "settling-in-gentle-tips",
    title: "Settling In: Gentle Tips for a Smooth Start",
    excerpt: "Practical ideas to help your child feel safe, secure and understood during those important first days at nursery.",
    category: "parenting-tips",
    publishedAt: "2026-07-01T12:00:00Z",
    featured: false,
    content: [
      { type: "paragraph", text: "Starting nursery is a big step for both children and parents. Here are some gentle tips to help make the transition as smooth as possible." }
    ]
  },
  {
    slug: "outdoor-adventures-why-nature-nurtures",
    title: "Outdoor Adventures: Why Nature Nurtures",
    excerpt: "The benefits of outdoor learning and how time in nature supports wellbeing, creativity, confidence and resilience.",
    category: "early-learning",
    publishedAt: "2026-06-24T12:00:00Z",
    featured: false,
    content: [
      { type: "paragraph", text: "Nature provides endless opportunities for exploration and discovery. Time spent outdoors is essential for physical and mental wellbeing." }
    ]
  },
  {
    slug: "healthy-habits-happy-little-learners",
    title: "Healthy Habits, Happy Little Learners",
    excerpt: "How positive mealtimes, varied foods and gentle encouragement help children develop a healthy relationship with nutrition.",
    category: "nutrition",
    publishedAt: "2026-06-18T12:00:00Z",
    featured: false,
    content: [
      { type: "paragraph", text: "Establishing healthy eating habits early in life lays the foundation for a lifetime of wellness." }
    ]
  },
  {
    slug: "celebrating-community-and-cultural-diversity",
    title: "Celebrating Our Community and Cultural Diversity",
    excerpt: "How we celebrate languages, traditions, family stories and the many different experiences that make our community special.",
    category: "community",
    publishedAt: "2026-06-10T12:00:00Z",
    featured: false,
    content: [
      { type: "paragraph", text: "We believe that our diversity is our strength. By celebrating different cultures and traditions, we create a rich learning environment for all." }
    ]
  },
  {
    slug: "screen-free-learning-deeper-play",
    title: "Screen-Free Learning: Space for Deeper Play",
    excerpt: "Why real-world experiences, movement, stories and face-to-face connection matter so much during the earliest years.",
    category: "early-learning",
    publishedAt: "2026-06-03T12:00:00Z",
    featured: false,
    content: [
      { type: "paragraph", text: "In a world increasingly dominated by screens, we prioritize screen-free learning to encourage deeper engagement and active play." }
    ]
  }
];

const blogPostDocs = rawArticles.map((article, i) => ({
  _id: `blogPost-${i}`,
  _type: "blogPost",
  title: article.title,
  slug: { _type: "slug", current: article.slug },
  publishedAt: article.publishedAt,
  featured: article.featured,
  category: article.category,
  excerpt: article.excerpt,
  featuredImage: getBlogImageRef(),
  body: article.content.map(b => createTextBlock(b.text))
}));

const policies = [
  { title: "GDPR / Privacy Policy", shortDesc: "Details on how we handle personal data.", id: "gdpr-privacy-policy" },
  { title: "Safeguarding Policy", shortDesc: "Our commitment to child protection.", id: "safeguarding-policy" },
  { title: "Complaints Policy", shortDesc: "Procedures for raising concerns.", id: "complaints-policy" },
  { title: "Health and Safety Policy", shortDesc: "Maintaining a safe nursery environment.", id: "health-and-safety-policy" },
  { title: "Partnership Policy", shortDesc: "Working together with parents.", id: "partnership-policy" },
  { title: "Settling-In Process Policy", shortDesc: "Guidelines for a smooth transition.", id: "settling-in-process-policy" }
];

const policyDocs = policies.map((p, i) => ({
  _id: `policy-${p.id}`,
  _type: "policyDocument",
  title: p.title,
  shortDescription: p.shortDesc,
  file: getPdfRef(),
  displayOrder: i * 10,
  lastReviewed: "2026-01-01"
}));

const galleryCategories = [
  { id: "outdoor-learning-experience", title: "Outdoor Learning Experience", value: "outdoor-learning-experience" },
  { id: "indoor-learning-experience", title: "Indoor Learning Experience", value: "indoor-learning-experience" },
  { id: "language-immersion", title: "Language Immersion", value: "language-immersion" },
  { id: "nutrition-and-mealtimes", title: "Nutrition and Mealtimes", value: "nutrition-and-mealtimes" },
  { id: "creative-play", title: "Creative Play", value: "creative-play" },
  { id: "sensory-exploration", title: "Sensory Exploration", value: "sensory-exploration" },
  { id: "nature-and-gardening", title: "Nature and Gardening", value: "nature-and-gardening" },
  { id: "celebrations-and-community", title: "Celebrations and Community", value: "celebrations-and-community" }
];

const galleryDocs = galleryCategories.map((c, i) => ({
  _id: `galleryPhoto-${c.id}`,
  _type: "galleryPhoto",
  internalTitle: `${c.title} Example`,
  image: getGalleryImageRef(),
  category: c.value,
  showOnHomepage: i < 3,
  displayOrder: i * 10,
  showOnAboutPage: i < 4,
  aboutPageDisplayOrder: i * 10
}));

const singletonDocs = [
  {
    _id: "businessDetails",
    _type: "businessDetails",
    organizationName: "Little Wise Kids",
    publicEmail: "hello@littlewisekids.co.uk",
    primaryPhone: { _type: "object", label: "Main Office", number: "+441171234567" },
    address: {
      _type: "object",
      organisation: "Little Wise Kids",
      line1: "123 Education Lane",
      city: "Bristol",
      postcode: "BS5 0AB",
      shortLocation: "Easton, Bristol",
      mapUrl: "https://maps.google.com"
    },
    openingDays: "Monday to Friday",
    openingTime: "07:30",
    closingTime: "18:00",
    morningSessionEnd: "13:00",
    afternoonSessionStart: "13:00",
    weeksOpen: 51,
    minimumAttendanceDays: 2,
    ageRange: { _type: "object", minimum: 0, maximum: 4 },
    languages: ["English", "Portuguese"],
    availabilityMessage: "We are currently accepting registrations for 2027.",
    footerBusinessCopy: "Little Wise Kids provides nurturing, child-led early years education.",
    footerCtaLabel: "Register Your Interest",
    socialHeading: "Follow our journey",
    socialIntroduction: "Nursery moments, news and everyday inspiration.",
    footerTagline: { _type: "object", prefix: "Where ", purplePhrase: "Little Minds", separatorOne: " ", greenPhrase: "Feel Safe", connector: " and ", bluePhrase: "Celebrated", suffix: "." },
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroHeading: { _type: "object", introduction: "Welcome to", purplePhrase: "Little", greenPhrase: "Wise", bluePhrase: "Kids" },
    heroSubtitle: "A calm, nurturing and child-led early years setting in Bristol BS5.",
    heroParagraphs: [createTextBlock("We provide a screen-free, home-from-home environment.")],
    primaryCtaLabel: "Register Your Interest",
    secondaryCtaLabel: "Explore Our Nursery",
    multilingualFeature: { _type: "object", title: "Multilingual", description: "Exposure to languages." },
    childCentredFeature: { _type: "object", title: "Child-Centred", description: "Learning inspired by curiosity." },
    playToLearnFeature: { _type: "object", title: "Play to Learn", description: "Open-ended resources." },
    valuesIntroHeading: { _type: "object", prefix: "Where ", purplePhrase: "Little Minds", greenPhrase: "Feel Safe", connector: " and ", bluePhrase: "Grow Big Ideas" },
    valuesIntroParagraphs: [createTextBlock("Every child is unique.")],
    valuesDifferenceTitle: "What Makes Us Different",
    screenFreeCard: { _type: "object", title: "Screen-Free", description: "Hands-on experiences." },
    multilingualCard: { _type: "object", title: "Multilingual", description: "English and Portuguese." },
    indoorOutdoorCard: { _type: "object", title: "Indoor/Outdoor", description: "Free flow play." },
    childLedCard: { _type: "object", title: "Child-Led", description: "Unhurried days." },
    nutritionCard: { _type: "object", title: "Wholesome Nutrition", description: "Freshly prepared meals." },
    familySettingCard: { _type: "object", title: "Family Setting", description: "Home from home." },
    visitHeading: { _type: "object", lineOnePrefix: "Come and See", accentedPhrase: "For Yourself", lineTwo: "" },
    visitParagraphs: [createTextBlock("Choosing a nursery is a big decision.")],
    visitCtaLabel: "Book a Visit",
    ...(dummyImageRef && { visitImage: dummyImageRef }),
    testimonialQuote: "Little Wise Kids has been wonderful for our daughter.",
    testimonialAttribution: "Sarah, Parent",
    faqHeading: { _type: "object", prefix: "Questions Families", accentedPhrase: "Often Ask" },
    faqIntro: "Here are some common questions.",
    faqs: [
      { _key: "faq1", _type: "object", question: "Do you offer funded places?", answer: [createTextBlock("Yes.")] }
    ],
    helpPanelTitle: "Need More Help?",
    helpPanelCopy: "If you have any other questions, our team is here.",
    helpPanelCtaLabel: "Contact Us",
    galleryIntroTitle: "Glimpses of Nursery Life",
    galleryIntro: "A look at the meaningful moments.",
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitleLineOne: "About Us",
    heroTitleLineTwo: "Our Story",
    heroParagraphs: [createTextBlock("This is the about page.")],
    leadershipParagraphs: [createTextBlock("We are passionate educators.")],
    approachLabel: "Our Approach",
    approachHeading: "Child-Led Learning",
    approachParagraphs: [createTextBlock("We focus on individual growth.")],
    approachChildLed: "Child Led",
    approachCalmRhythm: "Calm Rhythm",
    approachLearning: "Learning",
    approachExploration: "Exploration",
    approachConfidence: "Confidence",
    approachRelationships: "Relationships",
    commitmentLabel: "Our Commitment",
    commitmentHeading: "Nurturing Your Child's Unique Path",
    commitmentParagraphs: [createTextBlock("We are committed to providing the highest quality education.")],
    ...(decorativeDummyImageRef && { commitmentImage: decorativeDummyImageRef }),
    environmentLabel: "Our Space",
    environmentHeading: "Designed for Exploration",
    environmentParagraphs: [createTextBlock("Our indoor and outdoor spaces are carefully designed.")],
    ...(decorativeDummyImageRef && { environmentImage: decorativeDummyImageRef }),
    programmesLabel: "Our Programmes",
    programmesHeading: "Foundations for the Future",
    programmesParagraphs: [createTextBlock("Our programmes build core learning foundations.")],
    foundationCommunication: "Communication",
    foundationEmpathy: "Empathy",
    foundationIndependence: "Independence",
    foundationCreativity: "Creativity",
    foundationCriticalThinking: "Critical Thinking",
    educatorsLabel: "Our Team",
    educatorsHeading: "Passionate Educators",
    educatorsParagraphs: [createTextBlock("Our staff are qualified and dedicated.")],
    ...(decorativeDummyImageRef && { educatorsImage: decorativeDummyImageRef }),
    leadershipLabel: "Leadership",
    leadershipHeading: "Our Visionaries",
    ...(decorativeDummyImageRef && { leadershipImage: decorativeDummyImageRef }),
    gallerySectionLabel: "Gallery",
    gallerySectionHeading: "Moments from Little Wise Kids",
  },
  {
    _id: "multilingualPage",
    _type: "multilingualPage",
    heroTitleLineOne: "Multilingual",
    heroTitleLineTwo: "Learning",
    heroParagraphs: [createTextBlock("We speak English and Portuguese.")],
    philosophyLabel: "Philosophy",
    philosophyHeading: "Natural Language Acquisition",
    philosophyParagraphs: [createTextBlock("We believe in natural exposure to multiple languages.")],
    childrenEnjoyHeading: "What Children Enjoy Here",
    philosophyPoints: [
      "Storytelling in multiple languages",
      "Interactive bilingual music sessions",
      "Bilingual daily routines"
    ],
    languageConnectionLabel: "Connection",
    languageConnectionHeading: "Building Bridges Through Talk",
    languageConnectionParagraphs: [createTextBlock("Languages connect our diverse community.")],
    ...(decorativeDummyImageRef && { languageConnectionImage: decorativeDummyImageRef }),
    eyfsLabel: "EYFS",
    eyfsHeading: "Early Years Foundation Stage",
    eyfsParagraphs: [createTextBlock("We follow the EYFS framework dynamically.")],
    eyfsCommunication: { _type: "object", title: "Communication & Language", description: "Expressing ideas freely." },
    eyfsPhysical: { _type: "object", title: "Physical Development", description: "Active and healthy lives." },
    eyfsPersonal: { _type: "object", title: "Personal, Social & Emotional", description: "Self-regulation and relationships." },
    eyfsLiteracy: { _type: "object", title: "Literacy", description: "Loving books and words." },
    eyfsMaths: { _type: "object", title: "Mathematics", description: "Exploring shapes and numbers." },
    eyfsUnderstanding: { _type: "object", title: "Understanding the World", description: "Investigating nature." },
    eyfsArts: { _type: "object", title: "Expressive Arts & Design", description: "Creating and building." },
    screenFreeLabel: "Screen-Free",
    screenFreeHeading: "A Space for Mindful Play",
    screenFreeParagraphs: [createTextBlock("We keep our spaces screen-free to encourage real-world interaction.")],
    screenFreeBenefits: [
      "Greater focus and attention span",
      "Deeper social connections with peers",
      "Active physical play and health",
      "Imaginative open-ended learning",
      "Closer engagement with nature"
    ],
    closingNote: "Screen-free play lets children grow naturally."
  },
  {
    _id: "hoursNutritionPage",
    _type: "hoursNutritionPage",
    heroTitleLineOne: "Hours &",
    heroTitleLineTwo: "Nutrition",
    heroParagraphs: [createTextBlock("Details about our times and meals.")],
    operatingHoursLabel: "Operating Hours",
    operatingHoursHeading: "We are open 51 weeks a year",
    operatingHoursParagraphs: [createTextBlock("Monday to Friday.")],
    minAttendancePanelTitle: "Minimum Attendance",
    minAttendancePanelCopy: "To support continuity, we require a minimum attendance of two full days.",
    nutritionLabel: "Wholesome Nutrition",
    nutritionHeading: "Healthy, balanced meals",
    nutritionParagraphs: [createTextBlock("We provide healthy meals.")],
    nutritionChecklist: ["Freshly prepared", "Nutritious ingredients"],
    freshlyPreparedHeading: "Freshly Prepared Every Day",
    chefNote: "Our on-site chef creates meals.",
    typicalDayLabel: "A Typical Day",
    typicalDayHeading: "Our rhythm",
    typicalDayLead: "While we follow a rhythm, days flow as follows:",
    welcomeAndFreePlay: { _type: "object", startTime: "07:30", endTime: "09:00", title: "Welcome", description: "A gentle start." },
    learningAndExploration: { _type: "object", startTime: "09:00", endTime: "10:00", title: "Learning", description: "Focused activities." },
    morningSnack: { _type: "object", startTime: "10:00", endTime: "10:30", title: "Snack", description: "Healthy snack." },
    outdoorAdventures: { _type: "object", startTime: "10:30", endTime: "11:45", title: "Outdoors", description: "Garden time." },
    lunch: { _type: "object", startTime: "11:45", endTime: "12:30", title: "Lunch", description: "Hot lunch." },
    restAndQuietTime: { _type: "object", startTime: "12:30", endTime: "14:00", title: "Rest", description: "Sleep or quiet time." },
    afternoonPlayAndHome: { _type: "object", startTime: "14:00", endTime: "18:00", title: "Play", description: "Afternoon snack and play." },
    contactPanelTitle: "Get in Touch",
    contactPanelCopy: "Have questions?",
    contactPanelCtaLabel: "Contact Us"
  },
  {
    _id: "parentsPage",
    _type: "parentsPage",
    heroTitleLineOne: "Parents",
    heroTitleLineTwo: "Information",
    heroParagraphs: [createTextBlock("Resources for parents.")],
    policiesHeading: "Our Policies",
    policiesIntro: [createTextBlock("Please read our policies carefully.")],
    startingSchoolLabel: "Transition",
    startingSchoolHeading: "Starting School Readiness",
    startingSchoolParagraphs: [createTextBlock("We prepare children for school entry.")],
    schoolSupport: [
      "Phonics familiarity and pre-writing skills",
      "Social-emotional readiness",
      "Self-care independence (toileting, dressing)",
      "Listening and concentration games",
      "School visit preparation",
      "Parent consultation evenings"
    ],
    feesFundingLabel: "Fees",
    feesFundingHeading: "Clear and Simple Pricing",
    feesFundingParagraphs: [createTextBlock("All fee structures are transparent.")],
    howFundingWorksLabel: "Funding",
    howFundingWorksHeading: "15 and 30 Hour Funding Support",
    howFundingWorksParagraphs: [createTextBlock("We support both government schemes.")],
    fundingExamples: [
      { _type: "object", _key: "fund1", entitlement: "15 Hours Funding", equivalent: "2 free half days per week" }
    ],
    fundingSupportLabel: "Eligibility",
    fundingSupportHeading: "How to Apply for Subsidies",
    fundingSupportParagraphs: [createTextBlock("Visit childcarechoices.gov.uk to check eligibility.")],
    taxFreeLabel: "Tax-Free Childcare",
    taxFreeHeading: "Get 20% Government Help",
    taxFreeParagraphs: [createTextBlock("Parents can pay through Tax-Free Childcare accounts.")],
    weeklyFeesLabel: "Rates",
    weeklyFeesHeading: "Weekly and Daily Rates",
    weeklyFeesParagraphs: [createTextBlock("Review our pricing tiers below.")],
    fullDayRate: "£85.00 per day",
    halfDayRate: "£50.00 per day",
    fundedHourDeductions: "Deducted directly",
    additionalCharges: "Meals & consumables included",
    exampleWeeklyCosts: "Example: 3 days is £255.00/week",
    subsidyFaqsLabel: "FAQs",
    subsidyFaqsHeading: "Frequently Asked Fee Questions",
    subsidyFaqsParagraphs: [createTextBlock("Common queries about funding.")],
    subsidyFaqs: [
      { _type: "object", _key: "faq2", question: "When are fees due?", answer: "Fees are billed monthly in advance on the 1st." }
    ],
    partnershipLabel: "Parents as Partners",
    partnershipHeading: "Nurturing Together",
    partnershipParagraphs: [createTextBlock("We value continuous parent feedback.")],
    settlingInLabel: "Settling In",
    settlingInHeading: "A Warm, Gentle Welcome",
    settlingInParagraphs: [createTextBlock("We arrange settling-in sessions for all children.")],
    partnershipText: "We use an online portal for daily parent communication.",
    settlingStrategies: [
      "First short session with parent present",
      "Second session with parent leaving briefly",
      "Short morning sessions leading to lunch",
      "Consistent drop-off routines",
      "Comfort object from home allowed",
      "Daily check-in calls for parents"
    ],
    policiesSupportingNote: "Printed policy documents are available on request at the main office."
  },
  {
    _id: "galleryPage",
    _type: "galleryPage",
    heroTitleLineOne: "Our",
    heroTitleLineTwo: "Gallery",
    heroParagraphs: [createTextBlock("See our beautiful nursery.")],
    heroCtaLabel: "Book a Visit",
    galleryIntroLabel: "Nursery Environment",
    galleryIntroHeading: "A Home from Home",
    galleryIntroCopy: [createTextBlock("Our classrooms use natural wooden materials.")],
    finalCtaHeading: "Ready to Explore?",
    finalCtaCopy: [createTextBlock("Schedule a walkthrough of our Bristol BS5 setting.")],
    finalCtaLabel: "Book a Tour",
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    heroTitleLineOne: "Contact",
    heroTitleLineTwo: "Us",
    heroParagraphs: [createTextBlock("We would love to hear from you.")],
    sectionLabel: "Get in Touch",
    sectionHeading: "Send a Message",
    introduction: [createTextBlock("Tell us how we can help.")],
    nextStepsLabel: "After You Submit",
    nextStepsHeading: "What Happens Next?",
    nextStepsParagraphs: [createTextBlock("Here is our process.")],
    receiveEnquiryStep: { _type: "object", title: "We Receive Your Enquiry", description: "Your message arrives safely." },
    getInTouchStep: { _type: "object", title: "We Get in Touch", description: "We respond within one working day." },
    helpWithNextStepsStep: { _type: "object", title: "We Help With Next Steps", description: "We answer questions." },
    locationLabel: "Visit Us",
    locationHeading: "Find Little Wise Kids",
  },
  {
    _id: "thankYouPage",
    _type: "thankYouPage",
    heroTitleLineOne: "Thank",
    heroTitleLineTwo: "You",
    heroParagraphs: [createTextBlock("Your enquiry has been received.")],
    primaryCtaLabel: "Return Home",
    secondaryCtaLabel: "Read Our Blog",
    nextStepsHeading: "What Happens Next?",
    nextStepsBody: [createTextBlock("We will be in touch shortly.")],
  },
  {
    _id: "blogPage",
    _type: "blogPage",
    heroTitleLineOne: "Our",
    heroTitleLineTwo: "Blog",
    heroParagraphs: [createTextBlock("Read our latest thoughts.")],
    latestArticlesHeading: "Latest Articles",
    latestArticlesIntroduction: [createTextBlock("Here are some articles.")],
  }
];

const documents = [...singletonDocs, ...blogPostDocs, ...policyDocs, ...galleryDocs];

documents.forEach(doc => validate(doc));

// Clean up undefined properties dynamically
const cleanDocs = documents.map(doc => {
  return JSON.parse(JSON.stringify(doc));
});

const ndjson = cleanDocs.map((doc) => JSON.stringify(doc)).join("\n");
const outputPath = pathModule.join(__dirname, "../docs/sanity/seed-data.ndjson");

fs.mkdirSync(pathModule.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, ndjson, "utf-8");

console.log(`✅ Successfully generated validated seed data at ${outputPath}`);
console.log(`ℹ️ Environment: ${isDev ? 'DEVELOPMENT (including dummy asset refs)' : 'PRODUCTION (clean/no dummy assets)'}`);
