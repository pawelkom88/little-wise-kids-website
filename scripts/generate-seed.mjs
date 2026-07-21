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
  if (!doc._id || !doc._type)
    throw new Error("Missing _id or _type in document");

  if (doc._type === "hoursNutritionPage") {
    const slots = [
      "welcomeAndFreePlay",
      "learningAndExploration",
      "morningSnack",
      "outdoorAdventures",
      "lunch",
      "restAndQuietTime",
      "afternoonPlayAndHome",
    ];
    for (const slot of slots) {
      if (doc[slot]) {
        if (!timeRegex.test(doc[slot].startTime))
          throw new Error(`Invalid startTime in ${slot}`);
        if (!timeRegex.test(doc[slot].endTime))
          throw new Error(`Invalid endTime in ${slot}`);
        if (doc[slot].endTime <= doc[slot].startTime)
          throw new Error(`endTime must be later than startTime in ${slot}`);
      }
    }
  }
}

// For dev, we point to real files via _sanityAsset so the CLI imports them
// For prod, we omit the images completely.
const dummyImageRef = isDev
  ? {
      _type: "image",
      _sanityAsset: `image@file://${pathModule.resolve(__dirname, "dummy-image.png")}`,
      isDecorative: false,
      altText:
        "Representative illustrative image for Little Wise Kids nursery setting.",
    }
  : undefined;

const decorativeDummyImageRef = isDev
  ? {
      _type: "image",
      _sanityAsset: `image@file://${pathModule.resolve(__dirname, "dummy-image.png")}`,
      isDecorative: true,
    }
  : undefined;

function getPdfRef() {
  return isDev
    ? {
        _type: "file",
        _sanityAsset: `file@file://${pathModule.resolve(__dirname, "dummy-policy.pdf")}`,
      }
    : undefined;
}

function getGalleryImageRef() {
  return isDev
    ? {
        _type: "strictImage",
        _sanityAsset: `image@file://${pathModule.resolve(__dirname, "dummy-image.png")}`,
        altText: "Gallery image representing nursery activities",
      }
    : undefined;
}

function getBlogImageRef() {
  return isDev
    ? {
        _type: "strictImage",
        _sanityAsset: `image@file://${pathModule.resolve(__dirname, "dummy-image.png")}`,
        altText: "Blog featured image",
      }
    : undefined;
}

const rawArticles = [
  {
    slug: "welcome-to-a-new-term",
    title: "Welcome to a New Term at Little Wise Kids",
    excerpt:
      "A look at what is ahead this season, from joyful learning themes and new experiences to the little moments that make nursery life special.",
    category: "nursery-news",
    publishedAt: "2026-07-14T12:00:00Z",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Welcome to a new term at Little Wise Kids. We are excited to see the children return and to welcome new families to our setting.",
      },
    ],
  },
  {
    slug: "the-power-of-play",
    title: "The Power of Play: Learning Through Discovery",
    excerpt:
      "How meaningful play helps children build confidence, curiosity, communication and problem-solving skills at their own pace.",
    category: "early-learning",
    publishedAt: "2026-07-08T12:00:00Z",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Play is far more than just fun. It is how children explore, experiment, imagine and make connections that help them grow in so many important ways.",
      },
    ],
  },
  {
    slug: "settling-in-gentle-tips",
    title: "Settling In: Gentle Tips for a Smooth Start",
    excerpt:
      "Practical ideas to help your child feel safe, secure and understood during those important first days at nursery.",
    category: "parenting-tips",
    publishedAt: "2026-07-01T12:00:00Z",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Starting nursery is a big step for both children and parents. Here are some gentle tips to help make the transition as smooth as possible.",
      },
    ],
  },
  {
    slug: "outdoor-adventures-why-nature-nurtures",
    title: "Outdoor Adventures: Why Nature Nurtures",
    excerpt:
      "The benefits of outdoor learning and how time in nature supports wellbeing, creativity, confidence and resilience.",
    category: "early-learning",
    publishedAt: "2026-06-24T12:00:00Z",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Nature provides endless opportunities for exploration and discovery. Time spent outdoors is essential for physical and mental wellbeing.",
      },
    ],
  },
  {
    slug: "healthy-habits-happy-little-learners",
    title: "Healthy Habits, Happy Little Learners",
    excerpt:
      "How positive mealtimes, varied foods and gentle encouragement help children develop a healthy relationship with nutrition.",
    category: "nutrition",
    publishedAt: "2026-06-18T12:00:00Z",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Establishing healthy eating habits early in life lays the foundation for a lifetime of wellness.",
      },
    ],
  },
  {
    slug: "celebrating-community-and-cultural-diversity",
    title: "Celebrating Our Community and Cultural Diversity",
    excerpt:
      "How we celebrate languages, traditions, family stories and the many different experiences that make our community special.",
    category: "community",
    publishedAt: "2026-06-10T12:00:00Z",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "We believe that our diversity is our strength. By celebrating different cultures and traditions, we create a rich learning environment for all.",
      },
    ],
  },
  {
    slug: "screen-free-learning-deeper-play",
    title: "Screen-Free Learning: Space for Deeper Play",
    excerpt:
      "Why real-world experiences, movement, stories and face-to-face connection matter so much during the earliest years.",
    category: "early-learning",
    publishedAt: "2026-06-03T12:00:00Z",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "In a world increasingly dominated by screens, we prioritize screen-free learning to encourage deeper engagement and active play.",
      },
    ],
  },
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
  body: article.content.map((b) => createTextBlock(b.text)),
}));

const policies = [
  {
    title: "GDPR / Privacy Policy",
    shortDesc: "Details on how we handle personal data.",
    id: "gdpr-privacy-policy",
  },
  {
    title: "Safeguarding Policy",
    shortDesc: "Our commitment to child protection.",
    id: "safeguarding-policy",
  },
  {
    title: "Complaints Policy",
    shortDesc: "Procedures for raising concerns.",
    id: "complaints-policy",
  },
  {
    title: "Health and Safety Policy",
    shortDesc: "Maintaining a safe nursery environment.",
    id: "health-and-safety-policy",
  },
  {
    title: "Partnership Policy",
    shortDesc: "Working together with parents.",
    id: "partnership-policy",
  },
  {
    title: "Settling-In Process Policy",
    shortDesc: "Guidelines for a smooth transition.",
    id: "settling-in-process-policy",
  },
];

const policyDocs = policies.map((p, i) => ({
  _id: `policy-${p.id}`,
  _type: "policyDocument",
  title: p.title,
  shortDescription: p.shortDesc,
  file: getPdfRef(),
  displayOrder: i * 10,
  lastReviewed: "2026-01-01",
}));

const galleryCategories = [
  {
    id: "outdoor-learning-experience",
    title: "Outdoor Learning Experience",
    value: "outdoor-learning-experience",
  },
  {
    id: "indoor-learning-experience",
    title: "Indoor Learning Experience",
    value: "indoor-learning-experience",
  },
  {
    id: "language-immersion",
    title: "Language Immersion",
    value: "language-immersion",
  },
  {
    id: "nutrition-and-mealtimes",
    title: "Nutrition and Mealtimes",
    value: "nutrition-and-mealtimes",
  },
  { id: "creative-play", title: "Creative Play", value: "creative-play" },
  {
    id: "sensory-exploration",
    title: "Sensory Exploration",
    value: "sensory-exploration",
  },
  {
    id: "nature-and-gardening",
    title: "Nature and Gardening",
    value: "nature-and-gardening",
  },
  {
    id: "celebrations-and-community",
    title: "Celebrations and Community",
    value: "celebrations-and-community",
  },
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
  aboutPageDisplayOrder: i * 10,
}));

const singletonDocs = [
  {
    _id: "businessDetails",
    _type: "businessDetails",
    organizationName: "Little Wise Kids",
    publicEmail: "hello@littlewisekids.co.uk",
    primaryPhone: {
      _type: "object",
      label: "Main Office",
      number: "+441171234567",
    },
    address: {
      _type: "object",
      organisation: "Little Wise Kids",
      line1: "123 Education Lane",
      city: "Bristol",
      postcode: "BS5 0AB",
      shortLocation: "Easton, Bristol",
      mapUrl: "https://maps.google.com",
    },
    openingDays: "Monday to Friday",
    openingTime: "07:30",
    closingTime: "17:30",
    morningSessionEnd: "12:30",
    afternoonSessionStart: "12:30",
    weeksOpen: 51,
    minimumAttendanceDays: 2,
    ageRange: { _type: "object", minimum: 0, maximum: 4 },
    languages: ["English", "Portuguese"],
    availabilityMessage: "We are currently accepting registrations for 2027.",
    footerBusinessCopy:
      "Little Wise Kids provides nurturing, child-led early years education.",
    footerCtaLabel: "Register Your Interest",
    socialHeading: "Follow our journey",
    socialIntroduction: "Nursery moments, news and everyday inspiration.",
    footerTagline: {
      _type: "object",
      prefix: "Where ",
      purplePhrase: "Little Minds",
      separatorOne: " ",
      greenPhrase: "Feel Safe",
      connector: " and ",
      bluePhrase: "Celebrated",
      suffix: ".",
    },
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroHeading: {
      _type: "object",
      introduction: "Welcome to",
      purplePhrase: "Little",
      greenPhrase: "Wise",
      bluePhrase: "Kids",
    },
    heroSubtitle:
      "A calm, nurturing and child-led early years setting in Bristol BS5.",
    heroParagraphs: [
      createTextBlock("We provide a screen-free, home-from-home environment."),
    ],
    primaryCtaLabel: "Register Your Interest",
    secondaryCtaLabel: "Explore Our Nursery",
    multilingualFeature: {
      _type: "object",
      title: "Multilingual",
      description: "Exposure to languages.",
    },
    childCentredFeature: {
      _type: "object",
      title: "Child-Centred",
      description: "Learning inspired by curiosity.",
    },
    playToLearnFeature: {
      _type: "object",
      title: "Play to Learn",
      description: "Open-ended resources.",
    },
    valuesIntroHeading: {
      _type: "object",
      prefix: "Where ",
      purplePhrase: "Little Minds",
      greenPhrase: "Feel Safe",
      connector: " and ",
      bluePhrase: "Grow Big Ideas",
    },
    valuesIntroParagraphs: [createTextBlock("Every child is unique.")],
    valuesDifferenceTitle: "What Makes Us Different",
    screenFreeCard: {
      _type: "object",
      title: "Screen-Free",
      description: "Hands-on experiences.",
    },
    multilingualCard: {
      _type: "object",
      title: "Multilingual",
      description: "English and Portuguese.",
    },
    indoorOutdoorCard: {
      _type: "object",
      title: "Indoor/Outdoor",
      description: "Free flow play.",
    },
    childLedCard: {
      _type: "object",
      title: "Child-Led",
      description: "Unhurried days.",
    },
    nutritionCard: {
      _type: "object",
      title: "Wholesome Nutrition",
      description: "Freshly prepared meals.",
    },
    familySettingCard: {
      _type: "object",
      title: "Family Setting",
      description: "Home from home.",
    },
    visitHeading: {
      _type: "object",
      lineOnePrefix: "Come and See",
      accentedPhrase: "For Yourself",
      lineTwo: "",
    },
    visitParagraphs: [createTextBlock("Choosing a nursery is a big decision.")],
    visitCtaLabel: "Book a Visit",
    ...(dummyImageRef && { visitImage: dummyImageRef }),
    testimonialQuote: "Little Wise Kids has been wonderful for our daughter.",
    testimonialAttribution: "Sarah, Parent",
    faqHeading: {
      _type: "object",
      prefix: "Questions Families",
      accentedPhrase: "Often Ask",
    },
    faqIntro: "Here are some common questions.",
    faqs: [
      {
        _key: "faq1",
        _type: "object",
        question: "Do you offer funded places?",
        answer: [createTextBlock("Yes.")],
      },
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
    commitmentParagraphs: [
      createTextBlock(
        "We are committed to providing the highest quality education.",
      ),
    ],
    ...(decorativeDummyImageRef && {
      commitmentImage: decorativeDummyImageRef,
    }),
    environmentLabel: "Our Space",
    environmentHeading: "Designed for Exploration",
    environmentParagraphs: [
      createTextBlock("Our indoor and outdoor spaces are carefully designed."),
    ],
    ...(decorativeDummyImageRef && {
      environmentImage: decorativeDummyImageRef,
    }),
    programmesLabel: "Our Programmes",
    programmesHeading: "Foundations for the Future",
    programmesParagraphs: [
      createTextBlock("Our programmes build core learning foundations."),
    ],
    foundationCommunication: "Communication",
    foundationEmpathy: "Empathy",
    foundationIndependence: "Independence",
    foundationCreativity: "Creativity",
    foundationCriticalThinking: "Critical Thinking",
    educatorsLabel: "Our Team",
    educatorsHeading: "Passionate Educators",
    educatorsParagraphs: [
      createTextBlock("Our staff are qualified and dedicated."),
    ],
    ...(decorativeDummyImageRef && { educatorsImage: decorativeDummyImageRef }),
    leadershipLabel: "Leadership",
    leadershipHeading: "Our Visionaries",
    ...(decorativeDummyImageRef && {
      leadershipImage: decorativeDummyImageRef,
    }),
    gallerySectionLabel: "Gallery",
    gallerySectionHeading: "Moments from Little Wise Kids",
  },
  {
    _id: "multilingualPage",
    _type: "multilingualPage",
    heroEyebrow: "Multilingual Learning",
    heroTitleLineOne: "Language, Play",
    heroTitleLineTwo: "and Discovery",
    heroParagraphs: [
      createTextBlock(
        "A joyful, screen-free approach where children explore language, creativity and the world around them through meaningful everyday experiences.",
      ),
    ],
    philosophyLabel: "Our Learning Philosophy",
    philosophyHeading: "Curiosity-Led. Emotionally Attuned. Rich in Meaning.",
    philosophyParagraphs: [
      createTextBlock(
        "At the heart of our curriculum is a simple belief: children learn best when they feel safe, seen and supported. We bring the seven areas of the Early Years Foundation Stage together through engaging, active and joyful experiences.",
      ),
      createTextBlock(
        "Our approach supports children to become independent thinkers and doers through play, exploration and real-world discovery.",
      ),
    ],
    childrenEnjoyHeading: "Children Enjoy",
    philosophyPoints: [
      "Adult-facilitated, free-flow play",
      "Opportunities for experimentation, discovery and sensible risk-taking",
      "Colour, creativity and artistic expression",
      "Sensory and hands-on learning",
      "Nature-based experiences",
      "A balance of themed learning and children’s individual interests",
    ],
    philosophyDiscoveryNote:
      "Every day can bring a new discovery: a word in Portuguese, an insect in the garden, a new way to solve a problem or a story that sparks a child’s imagination.",
    languageConnectionLabel: "English and Portuguese",
    languageConnectionHeading: "Language Through Everyday Connection",
    languageConnectionParagraphs: [
      createTextBlock(
        "Little Wise Kids currently offers children exposure to English and Portuguese through everyday routines, songs, stories, play and warm interactions.",
      ),
      createTextBlock(
        "Language learning is woven naturally into the day rather than taught in a pressured way. Children are encouraged to listen, communicate and build confidence while celebrating cultural diversity and connection.",
      ),
    ],
    languageConnectionNote:
      "English and Portuguese are our current languages and may evolve as our community grows.",
    eyfsLabel: "EYFS",
    eyfsHeading: "Supporting Every Area of Development",
    eyfsParagraphs: [
      createTextBlock(
        "Our practice is aligned with the Early Years Foundation Stage, supporting children’s development through meaningful play and responsive care.",
      ),
    ],
    eyfsCommunication: {
      _type: "object",
      title: "Communication & Language",
      description: "Building confident expression and understanding.",
    },
    eyfsPhysical: {
      _type: "object",
      title: "Physical Development",
      description: "Supporting movement, coordination and healthy development.",
    },
    eyfsPersonal: {
      _type: "object",
      title: "Personal, Social & Emotional Development",
      description: "Growing confidence, relationships and emotional awareness.",
    },
    eyfsLiteracy: {
      _type: "object",
      title: "Literacy",
      description: "Discovering stories, sounds, marks and meaning.",
    },
    eyfsMaths: {
      _type: "object",
      title: "Mathematics",
      description: "Exploring number, pattern, shape and measure.",
    },
    eyfsUnderstanding: {
      _type: "object",
      title: "Understanding the World",
      description: "Investigating people, places, nature and technology.",
    },
    eyfsArts: {
      _type: "object",
      title: "Expressive Arts & Design",
      description: "Creating, imagining and expressing ideas.",
    },
    eyfsClosingNote:
      "We recognise that children develop in different ways and at different rates. Our educators observe carefully, follow children’s interests and work closely with families to support each child’s individual journey.",
    screenFreeLabel: "Screen-Free Learning",
    screenFreeHeading: "A Rare and Refreshing Childhood in a Noisy World",
    screenFreeParagraphs: [
      createTextBlock(
        "In a fast-paced, digital-first world, screen exposure can feel almost unavoidable. At Little Wise Kids, we have made a conscious choice to offer a completely screen-free learning environment.",
      ),
      createTextBlock(
        "Instead of flashing screens and artificial stimulation, children are immersed in real-world experiences. They can feel the texture of soil, enjoy role-play, listen to stories, paint, build, move, explore outdoors and connect with people around them.",
      ),
    ],
    screenFreeBenefitsHeading: "Screen-Free Learning Supports",
    screenFreeBenefits: [
      "Deeper concentration and sustained attention",
      "Richer language development and face-to-face communication",
      "Creativity, physical activity and social interaction",
      "Emotional regulation and meaningful connections",
      "A childhood shaped by puddles, paints, puzzles and people rather than pixels",
    ],
    closingNote:
      "We believe the early years are sacred. Our screen-free nursery environment gives children space to imagine, create and connect with all their senses fully awake.",
  },
  {
    _id: "hoursNutritionPage",
    _type: "hoursNutritionPage",
    heroEyebrow: "Operating Hours & Nutrition",
    heroTitleLineOne: "Care That Fits",
    heroTitleLineTwo: "Your Family’s Day",
    heroParagraphs: [
      createTextBlock(
        "Clear routines, nourishing meals and caring support to help your child feel secure, energised and ready to thrive every day.",
      ),
    ],
    operatingHoursLabel: "Operating Hours",
    operatingHoursHeading: "Available Childcare Sessions",
    operatingHoursParagraphs: [
      createTextBlock(
        "Little Wise Kids is open Monday to Friday, helping families access consistent, caring early years support throughout the week.",
      ),
    ],
    minAttendancePanelTitle: "Minimum Attendance",
    minAttendancePanelCopy:
      "Children attend a minimum of two full days per week, with at least one of those days being a Monday or Friday.",
    availabilityCtaLabel: "Contact Us About Availability",
    nutritionLabel: "Nutrition",
    nutritionHeading: "Wholesome Food for Growing Minds",
    nutritionStatement: "Thriving minds start with nourished bodies.",
    nutritionParagraphs: [
      createTextBlock(
        "At Little Wise Kids, we know that thriving minds start with nourished bodies. Our food offering is designed to support children’s wellbeing, energy and enjoyment of mealtimes.",
      ),
      createTextBlock(
        "We create a warm, social approach to food, helping children enjoy a varied and wholesome diet alongside their friends.",
      ),
    ],
    nutritionChecklist: [
      "Children’s wellbeing",
      "Energy",
      "Enjoyment of mealtimes",
      "A varied and wholesome diet",
      "Alongside their friends",
    ],
    nurseryChefLabel: "Nursery Chef",
    freshlyPreparedHeading: "Freshly Prepared With Care",
    chefNote:
      "Our Nursery Chef helps provide nutritious meals and snacks designed with children’s needs in mind. Food is an important part of the Little Wise Kids day: a chance to try new tastes, develop independence and enjoy positive social moments together.",
    chefHighlights: [
      "Try new tastes",
      "Develop independence",
      "Enjoy positive social moments together",
    ],
    dietaryContactCopy:
      "Please contact us to discuss allergies, dietary requirements and the current food offering.",
    dietaryContactCtaLabel: "Contact Us",
    typicalDayLabel: "A Typical Day",
    typicalDayHeading: "Our rhythm",
    typicalDayLead: "While we follow a rhythm, days flow as follows:",
    welcomeAndFreePlay: {
      _type: "object",
      startTime: "07:30",
      endTime: "09:00",
      title: "Welcome",
      description: "A gentle start.",
    },
    learningAndExploration: {
      _type: "object",
      startTime: "09:00",
      endTime: "10:00",
      title: "Learning",
      description: "Focused activities.",
    },
    morningSnack: {
      _type: "object",
      startTime: "10:00",
      endTime: "10:30",
      title: "Snack",
      description: "Healthy snack.",
    },
    outdoorAdventures: {
      _type: "object",
      startTime: "10:30",
      endTime: "11:45",
      title: "Outdoors",
      description: "Garden time.",
    },
    lunch: {
      _type: "object",
      startTime: "11:45",
      endTime: "12:30",
      title: "Lunch",
      description: "Hot lunch.",
    },
    restAndQuietTime: {
      _type: "object",
      startTime: "12:30",
      endTime: "14:00",
      title: "Rest",
      description: "Sleep or quiet time.",
    },
    afternoonPlayAndHome: {
      _type: "object",
      startTime: "14:00",
      endTime: "17:30",
      title: "Play",
      description: "Afternoon snack and play.",
    },
  },
  {
    _id: "parentsPage",
    _type: "parentsPage",
    heroEyebrow: "Parents’ Information",
    heroTitleLineOne: "Everything You Need,",
    heroTitleLineTwo: "So Your Child Can Thrive",
    heroParagraphs: [
      createTextBlock(
        "Clear guidance on starting school, fees and funding, childcare support, settling in and the policies that help every family feel informed and reassured.",
      ),
    ],
    startingSchoolLabel: "Starting School",
    startingSchoolHeading: "A Confident First Step",
    startingSchoolParagraphs: [
      createTextBlock(
        "Starting school is an exciting and sometimes emotional milestone. At Little Wise Kids, we help make the transition smooth, joyful and empowering for children and families.",
      ),
      createTextBlock(
        "Through a screen-free, child-led and play-rich approach, children build the emotional resilience, social skills, independence and curiosity they need for their next chapter.",
      ),
    ],
    schoolSupportHeading: "We Support Children Through",
    schoolSupport: [
      "Play-based experiences aligned with EYFS",
      "Early literacy, numeracy, communication and self-care opportunities",
      "Emotional wellbeing and confidence-building",
      "Cooperative play and friendships",
      "Language exposure in English and Portuguese for now",
      "Consistent, loving routines that help children feel secure",
    ],
    feesFundingLabel: "Funding & Fees",
    feesFundingHeading: "Supporting Families, Investing in Early Years",
    feesFundingParagraphs: [
      createTextBlock(
        "We believe every child deserves access to nurturing, high-quality early years education and that families deserve clear, supportive information about childcare costs.",
      ),
      createTextBlock(
        "Little Wise Kids offers government-funded childcare places for eligible families. We are open year-round for 51 weeks of the year, helping children benefit from consistent routines, care and learning.",
      ),
    ],
    howFundingWorksLabel: "How Funding Works",
    howFundingWorksHeading: "Government-Funded Childcare",
    howFundingWorksParagraphs: [
      createTextBlock(
        "The government provides childcare support for eligible families, depending on a child’s age and a family’s circumstances.",
      ),
      createTextBlock(
        "Funding may cover some of your childcare costs, helping to make quality early years education more accessible.",
      ),
      createTextBlock(
        "Because Little Wise Kids operates year-round for 51 weeks, funded hours are spread across the year rather than only used during school terms.",
      ),
    ],
    fundingExamplesHeading: "Current Example Calculations",
    fundingExamples: [
      {
        _type: "object",
        _key: "funding-15-hours",
        entitlement: "15 funded hours during term time",
        equivalent: "Approximately 11.18 hours per week across 51 weeks",
      },
      {
        _type: "object",
        _key: "funding-30-hours",
        entitlement: "30 funded hours during term time",
        equivalent: "Approximately 22.35 hours per week across 51 weeks",
      },
    ],
    fundingAdditionalFeesNote:
      "Additional fees may apply for hours outside a family’s funded entitlement. These support extended care, meals, nursery experiences and the high-quality early years provision offered by Little Wise Kids.",
    fundingSupportLabel: "Funding Support",
    fundingSupportHeading: "We Are Here to Help",
    fundingSupportParagraphs: [
      createTextBlock(
        "Funding can feel complicated, but you do not have to work it out alone. Our team is happy to help you understand the options available, explain what information may be needed and support you through the process.",
      ),
    ],
    fundingGuidanceUrl: "https://www.gov.uk/get-childcare",
    taxFreeLabel: "Tax-Free Childcare",
    taxFreeHeading: "Additional Help With Childcare Costs",
    taxFreeParagraphs: [
      createTextBlock(
        "Eligible families may also benefit from Tax-Free Childcare. For every £8 paid into a childcare account, the government adds £2, subject to the scheme rules and limits.",
      ),
      createTextBlock(
        "Tax-Free Childcare can often be used alongside funded childcare hours.",
      ),
    ],
    taxFreeGuidanceUrl: "https://www.gov.uk/tax-free-childcare",
    weeklyFeesLabel: "Rates & Examples",
    weeklyFeesHeading: "Weekly Costs and Funding Examples",
    weeklyFeesParagraphs: [
      createTextBlock(
        "Your weekly childcare cost will depend on your child’s sessions, funding entitlement and any additional services or charges. We will always explain your estimated fees clearly before a place is confirmed.",
      ),
    ],
    weeklyFeesFactors: [
      "Your child’s sessions",
      "Funding entitlement",
      "Additional services or charges",
    ],
    fullDayRate: "[Editable]",
    halfDayRate: "[Editable]",
    fundedHourDeductions: "[Editable]",
    additionalCharges: "[Editable]",
    exampleWeeklyCosts: "[Editable]",
    subsidyFaqsLabel: "FAQs",
    subsidyFaqsHeading: "Childcare Support: Your Questions Answered",
    subsidyFaqsParagraphs: [
      createTextBlock(
        "Understanding childcare support can feel confusing, especially when your family’s circumstances or eligibility change. We are here to help you understand the options available and signpost you to the right information.",
      ),
    ],
    subsidyFaqs: [
      {
        _type: "object",
        _key: "faq-funded-childcare",
        question: "Can I use funded childcare at Little Wise Kids?",
        answer:
          "Yes, eligible families may be able to use government-funded childcare hours. Please contact us so we can explain how funding is applied across our 51-week year.",
      },
      {
        _type: "object",
        _key: "faq-tax-free",
        question: "Can I use Tax-Free Childcare?",
        answer:
          "Yes, eligible families may be able to pay through the Government’s Tax-Free Childcare scheme.",
      },
      {
        _type: "object",
        _key: "faq-start-date",
        question: "When does funding start?",
        answer:
          "Funding usually begins from the term after your child becomes eligible. Please check current eligibility and dates through the Government childcare website.",
      },
      {
        _type: "object",
        _key: "faq-information",
        question: "What will I need to provide?",
        answer:
          "Depending on your entitlement, we may ask for your eligibility code and supporting details before funding can be applied.",
      },
      {
        _type: "object",
        _key: "faq-application-help",
        question: "Can you help me apply?",
        answer:
          "We can explain the process and help you understand what to do next, although applications are completed through the Government childcare portal.",
      },
    ],
    partnershipLabel: "Partnership With Families",
    partnershipHeading: "Working Together for Your Child",
    partnershipParagraphs: [
      createTextBlock(
        "Families are at the heart of Little Wise Kids. You know your child best, and we value the insight, trust and communication that help us provide consistent, responsive care.",
      ),
      createTextBlock(
        "We share meaningful updates, celebrate milestones and work together around routines, interests, wellbeing and development.",
      ),
      createTextBlock(
        "By creating a strong bridge between home and nursery, we help each child feel secure, understood and ready to thrive.",
      ),
    ],
    partnershipHighlights: [
      {
        _type: "object",
        _key: "partnership-child-best",
        title: "You know your child best",
        description:
          "We value the insight, trust and communication that help us provide consistent, responsive care.",
      },
      {
        _type: "object",
        _key: "partnership-updates",
        title: "Meaningful updates",
        description:
          "We celebrate milestones and work together around routines, interests, wellbeing and development.",
      },
      {
        _type: "object",
        _key: "partnership-bridge",
        title: "A strong bridge",
        description:
          "Home and nursery work together so each child feels secure, understood and ready to thrive.",
      },
    ],
    settlingInLabel: "Settling In",
    settlingInHeading:
      "Where Transitions Are Gentle, Personal and Full of Heart",
    settlingInParagraphs: [
      createTextBlock(
        "Choosing an early years setting is one of the most personal decisions a family can make. At Little Wise Kids, we give settling in the time, care and attention it deserves.",
      ),
      createTextBlock(
        "We see settling in as a journey, not a single event. From your first visit onward, we work with you to understand your child’s routines, personality, comforts, preferences and any particular worries or needs.",
      ),
    ],
    settlingPartnershipHeading: "Partnership From the First Day",
    settlingPartnershipParagraphs: [
      createTextBlock(
        "You know your child best. We value your knowledge and work in partnership with you to make each transition feel familiar, reassuring and secure.",
      ),
      createTextBlock(
        "Our team supports children to build trusting relationships with their key person, other educators and their new environment.",
      ),
    ],
    settlingStrategiesHeading: "Tailored Transition Strategies",
    settlingStrategiesIntro:
      "Every child settles in differently. We use flexible strategies that are agreed with families and shaped around the child’s readiness.",
    settlingStrategies: [
      "Short introductory sessions with a parent or carer present",
      "Gradually increasing session length",
      "Consistent staffing and key-person continuity",
      "Familiar comfort routines and transitional objects",
      "Language cues in English and Portuguese where helpful",
      "A calm, predictable rhythm to each day",
    ],
    policiesHeading: "Our Policies",
    policiesIntro: [
      createTextBlock(
        "Our policies help us maintain a safe, respectful, transparent and nurturing environment for children and families.",
      ),
    ],
    policiesSupportingNote:
      "Each policy is uploaded as a downloadable PDF and managed by nursery administrators. Contact us if you need help finding a document.",
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
    galleryIntroCopy: [
      createTextBlock("Our classrooms use natural wooden materials."),
    ],
    finalCtaHeading: "Ready to Explore?",
    finalCtaCopy: [
      createTextBlock("Schedule a walkthrough of our Bristol BS5 setting."),
    ],
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
    receiveEnquiryStep: {
      _type: "object",
      title: "We Receive Your Enquiry",
      description: "Your message arrives safely.",
    },
    getInTouchStep: {
      _type: "object",
      title: "We Get in Touch",
      description: "We respond within one working day.",
    },
    helpWithNextStepsStep: {
      _type: "object",
      title: "We Help With Next Steps",
      description: "We answer questions.",
    },
    locationLabel: "Our setting",
    locationHeading: "Find Little Wise Kids in Easton, Bristol",
    locationLead: "We’re easy to find. Follow these three simple steps to reach our nursery in the heart of Easton.",
    welcomeHeading: "We can’t wait to welcome you.",
    welcomeText: "If you need any help finding us, just give us a call.",
    findBuildingStep: {
      _type: "object",
      title: "Find the building",
      description: "Look for the Congregational Chapel on Stapleton Road.",
      alt: "Front of the historic Congregational Chapel building on Stapleton Road in Easton, Bristol.",
    },
    turnStreetStep: {
      _type: "object",
      title: "Turn into Newton Street",
      description: "Continue along the side of the building.",
      alt: "Newton Street turning route beside the Congregational Chapel leading to Little Wise Kids nursery.",
    },
    lookForSignStep: {
      _type: "object",
      title: "Look for our sign",
      description: "The Little Wise Kids entrance is marked by our sign.",
      alt: "Official Little Wise Kids entrance sign welcoming families on Newton Street.",
    },
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
  },
];

const documents = [
  ...singletonDocs,
  ...blogPostDocs,
  ...policyDocs,
  ...galleryDocs,
];

documents.forEach((doc) => validate(doc));

// Clean up undefined properties dynamically
const cleanDocs = documents.map((doc) => {
  return JSON.parse(JSON.stringify(doc));
});

const ndjson = cleanDocs.map((doc) => JSON.stringify(doc)).join("\n");
const outputPath = pathModule.join(
  __dirname,
  "../docs/sanity/seed-data.ndjson",
);

fs.mkdirSync(pathModule.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, ndjson, "utf-8");

console.log(`✅ Successfully generated validated seed data at ${outputPath}`);
console.log(
  `ℹ️ Environment: ${isDev ? "DEVELOPMENT (including dummy asset refs)" : "PRODUCTION (clean/no dummy assets)"}`,
);
