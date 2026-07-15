import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

const documents = [
  {
    _id: "businessDetails",
    _type: "businessDetails",
    organizationName: "Little Wise Kids",
    publicEmail: "hello@littlewisekids.co.uk",
    primaryPhone: { label: "Main Office", number: "0117 123 4567" },
    secondaryPhone: { label: "Emergency", number: "07700 900000" },
    address: "123 Education Lane\nEaston\nBristol\nBS5 0AB",
    openingDays: "Monday to Friday",
    openingTime: "07:30",
    closingTime: "18:00",
    morningSessionEnd: "13:00",
    afternoonSessionStart: "13:00",
    weeksOpen: "51",
    minimumAttendance: "2 full days",
    ageRange: "0–4 years",
    languages: "English and Portuguese",
    socialUrls: ["https://facebook.com/littlewisekids"],
    availabilityMessage: "We are currently accepting registrations for 2027.",
    footerBusinessCopy:
      "Little Wise Kids provides nurturing, child-led early years education in a home-from-home setting in Easton, Bristol.",
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroTitleFragments: ["Curiosity starts here,", "learning follows"],
    heroSubtitle: "A calm, nurturing and child-led early years setting in Bristol BS5.",
    heroParagraphs: [
      createTextBlock(
        "We provide a screen-free, home-from-home environment where children aged 0–4 years can explore, play and grow at their own pace."
      ),
      createTextBlock(
        "Open year-round with funded places available."
      ),
    ],
    primaryCtaLabel: "Register Your Interest",
    secondaryCtaLabel: "Explore Our Nursery",
    childCentredFeature: {
      title: "Child-Centred",
      description: "Learning inspired by curiosity and individual interests.",
    },
    playToLearnFeature: {
      title: "Play to Learn",
      description: "Open-ended resources that encourage discovery.",
    },
    nurturingEnvironmentFeature: {
      title: "Nurturing Environment",
      description: "A calm, loving space that feels like a second home.",
    },
    valuesIntroTitleFragments: ["Where Little Minds", "Grow Big Ideas"],
    valuesIntroParagraphs: [
      createTextBlock(
        "Every child is unique and deserves an environment that celebrates their individuality. At Little Wise Kids, we combine structured learning opportunities with the freedom to play, imagine and discover."
      ),
      createTextBlock(
        "Our educators build strong, trusting relationships with every family, ensuring children feel safe, understood and confident as they take their first steps into education."
      ),
    ],
    valuesDifferenceTitle: "What Makes Us Different",
    screenFreeCard: {
      title: "Screen-Free Learning",
      description: "We prioritise hands-on experiences, movement and real-world connection.",
    },
    multilingualCard: {
      title: "Multilingual Exposure",
      description: "Gentle daily exposure to English and Portuguese.",
    },
    nutritionCard: {
      title: "Wholesome Nutrition",
      description: "Freshly prepared meals that fuel active bodies and minds.",
    },
    natureCard: {
      title: "Nature & Outdoors",
      description: "Daily outdoor adventures to explore the natural world.",
    },
    communityCard: {
      title: "Community Focus",
      description: "Building strong partnerships with local families.",
    },
    childLedCard: {
      title: "Child-Led Pace",
      description: "Unhurried days that respect children's natural rhythms.",
    },
    visitTitleFragments: ["Come and See", "For Yourself"],
    visitParagraphs: [
      createTextBlock(
        "Choosing a nursery is a big decision. We invite you to visit Little Wise Kids, meet our team and experience our calm, welcoming environment."
      ),
    ],
    visitCtaLabel: "Book a Visit",
    testimonialQuote:
      "“Little Wise Kids has been wonderful for our daughter. She has grown so much in confidence and comes home happy every day.”",
    testimonialAttribution: "Sarah, Parent",
    faqTitleFragments: ["Questions Families", "Often Ask"],
    faqIntro: "Here are some of the common questions we receive from parents.",
    faqs: [
      {
        question: "Do you offer funded childcare places?",
        answer: "Yes, we accept 15 and 30 hours of government funding for eligible families.",
      },
      {
        question: "What is your settling-in process?",
        answer: "We offer a gentle, tailored settling-in period to ensure your child feels secure.",
      },
    ],
    helpPanelTitle: "Need More Help?",
    helpPanelCopy: "If you have any other questions, our team is always here to help.",
    helpPanelCtaLabel: "Contact Us",
    galleryIntroTitle: "Glimpses of Nursery Life",
    galleryIntro: "A look at the meaningful moments that happen every day.",
  },
];

const ndjson = documents.map((doc) => JSON.stringify(doc)).join("\n");
const outputPath = path.join(__dirname, "../docs/sanity/seed-data.ndjson");

fs.writeFileSync(outputPath, ndjson, "utf-8");

console.log(`✅ Successfully generated seed data at ${outputPath}`);
console.log("Run the following command to import the data into Sanity:");
console.log("npx sanity dataset import docs/sanity/seed-data.ndjson production --replace");


documents.push({
  _id: "aboutPage",
  _type: "aboutPage",
  heroTitle: "About Little Wise Kids",
  heroParagraphs: [
    createTextBlock("We are a small, dedicated team providing high-quality early years education in a nurturing environment.")
  ],
  approachTitle: "Our Approach",
  approachParagraphs: [
    createTextBlock("Our approach is guided by the belief that children learn best when they are happy, secure, and actively engaged.")
  ],
  approachChildLed: { title: "Child-Led", description: "Respecting individual interests." },
  approachCalmRhythm: { title: "Calm Rhythm", description: "Predictable routines." },
  approachLearning: { title: "Learning", description: "Joyful discovery." },
  approachExploration: { title: "Exploration", description: "Hands-on experiences." },
  approachConfidence: { title: "Confidence", description: "Building self-esteem." },
  approachRelationships: { title: "Relationships", description: "Strong family partnerships." },
  commitmentTitle: "Our Commitment",
  commitmentParagraphs: [
    createTextBlock("We are committed to providing a safe, inclusive, and stimulating environment.")
  ],
  environmentTitle: "The Environment",
  environmentParagraphs: [
    createTextBlock("Our setting is designed to feel like a home away from home.")
  ],
  programmesTitle: "Learning Programmes",
  programmesParagraphs: [
    createTextBlock("Our programmes focus on developing key foundations for lifelong learning.")
  ],
  foundationCommunication: { title: "Communication", description: "Fostering language skills." },
  foundationEmpathy: { title: "Empathy", description: "Understanding others." },
  foundationIndependence: { title: "Independence", description: "Doing things for themselves." },
  foundationCreativity: { title: "Creativity", description: "Expressing ideas." },
  foundationCriticalThinking: { title: "Critical Thinking", description: "Solving problems." },
  educatorsTitle: "Our Educators",
  educatorsParagraphs: [
    createTextBlock("Our team of experienced educators is passionate about early childhood.")
  ],
  leadershipTitle: "Leadership",
  leadershipParagraphs: [
    createTextBlock("Guided by our experienced leadership team.")
  ],
  team: [
    { _key: "t1", name: "Sarah Smith", role: "Nursery Manager", bio: "Sarah has 15 years experience." },
    { _key: "t2", name: "David Jones", role: "Early Years Educator", bio: "David is passionate about outdoor play." }
  ],
  galleryIntroTitle: "Our Spaces"
});

documents.push({
  _id: "multilingualPage",
  _type: "multilingualPage",
  heroTitle: "Multilingual Learning",
  heroParagraphs: [
    createTextBlock("We believe in the power of languages to connect us to the world.")
  ],
  philosophyTitle: "Our Philosophy",
  philosophyParagraphs: [
    createTextBlock("Children absorb languages naturally when immersed in meaningful contexts.")
  ],
  childrenEnjoyHeading: "Children at Little Wise Kids enjoy:",
  philosophyPoints: [
    "Hearing stories in English and Portuguese",
    "Singing bilingual songs",
    "Learning through contextual immersion"
  ],
  languageConnectionTitle: "Language & Connection",
  languageConnectionParagraphs: [
    createTextBlock("Language is more than words; it's how we connect.")
  ],
  eyfsTitle: "EYFS Framework",
  eyfsParagraphs: [
    createTextBlock("Our language programme integrates fully with the Early Years Foundation Stage.")
  ],
  eyfsAreas: [
    { _key: "e1", title: "Communication and Language", description: "Developing fluency." },
    { _key: "e2", title: "Physical Development", description: "Active learning." },
    { _key: "e3", title: "Personal, Social and Emotional", description: "Building confidence." },
    { _key: "e4", title: "Literacy", description: "Early reading and writing." },
    { _key: "e5", title: "Mathematics", description: "Numbers and patterns." },
    { _key: "e6", title: "Understanding the World", description: "Exploring cultures." },
    { _key: "e7", title: "Expressive Arts", description: "Creative expression." }
  ],
  screenFreeTitle: "Screen-Free Immersion",
  screenFreeParagraphs: [
    createTextBlock("We focus on real-world interactions rather than digital devices.")
  ],
  screenFreeBenefits: [
    "Improved focus and attention",
    "Better social interactions",
    "More active play"
  ],
  closingNote: "Discover the world through language with us."
});

documents.push({
  _id: "hoursNutritionPage",
  _type: "hoursNutritionPage",
  heroTitle: "Hours & Nutrition",
  heroParagraphs: [
    createTextBlock("Details about our opening times and healthy meal provision.")
  ],
  operatingHoursTitle: "Operating Hours",
  operatingHoursParagraphs: [
    createTextBlock("We are open 51 weeks a year, Monday to Friday, from 7:30 am to 6:00 pm.")
  ],
  minAttendancePanelTitle: "Minimum Attendance",
  minAttendancePanelCopy: "To support continuity, we require a minimum attendance of two full days per week.",
  nutritionTitle: "Wholesome Nutrition",
  nutritionParagraphs: [
    createTextBlock("We provide healthy, balanced meals and snacks.")
  ],
  nutritionChecklist: [
    "Freshly prepared on site",
    "Catering for dietary requirements",
    "Focus on varied, nutritious ingredients"
  ],
  freshlyPreparedHeading: "Freshly Prepared Every Day",
  chefNote: "Our on-site chef creates meals that children love, packed with hidden vegetables.",
  typicalDayTitle: "A Typical Day",
  typicalDayLead: "While we follow a rhythm rather than a strict timetable, our days flow as follows:",
  welcomeAndFreePlay: { startTime: "07:30", endTime: "09:00", description: "A gentle start to the day with free play." },
  learningAndExploration: { startTime: "09:00", endTime: "10:00", description: "Focused activities and child-led learning." },
  morningSnack: { startTime: "10:00", endTime: "10:30", description: "A healthy morning snack." },
  outdoorAdventures: { startTime: "10:30", endTime: "11:45", description: "Time outside in our garden." },
  lunch: { startTime: "11:45", endTime: "12:30", description: "A nutritious hot lunch." },
  restAndQuietTime: { startTime: "12:30", endTime: "14:00", description: "Sleep or quiet activities." },
  afternoonPlayAndHome: { startTime: "14:00", endTime: "18:00", description: "Afternoon snack, more play, and home time." },
  contactPanelTitle: "Get in Touch",
  contactPanelCopy: "Have questions about our hours or menu?",
  contactPanelCtaLabel: "Contact Us"
});

documents.push({
  _id: "parentsPage",
  _type: "parentsPage",
  heroTitle: "Parents' Information",
  heroParagraphs: [
    createTextBlock("Everything you need to know about joining Little Wise Kids.")
  ],
  startingSchoolTitle: "Starting School",
  startingSchoolParagraphs: [
    createTextBlock("We support children through their transition to school.")
  ],
  schoolSupport: [
    "School readiness activities",
    "Phonics introduction",
    "Independence building"
  ],
  feesFundingTitle: "Fees & Funding",
  feesFundingParagraphs: [
    createTextBlock("Information about our fee structure and government funding options.")
  ],
  howFundingWorksTitle: "How Funding Works",
  howFundingWorksParagraphs: [
    createTextBlock("We accept 15 and 30 hours funding.")
  ],
  fundingExamples: "Examples of funded patterns can be discussed during your visit.",
  fundingSupportTitle: "Funding Support",
  fundingSupportParagraphs: [
    createTextBlock("We are here to help you navigate the funding application process.")
  ],
  taxFreeTitle: "Tax-Free Childcare",
  taxFreeParagraphs: [
    createTextBlock("We are registered for the Tax-Free Childcare scheme.")
  ],
  weeklyFeesTitle: "Weekly Fees",
  weeklyFeesParagraphs: [
    createTextBlock("Our fees are inclusive of meals, snacks, and most activities.")
  ],
  feeRows: [
    { _key: "f1", days: "2 Full Days", price: "£140" },
    { _key: "f2", days: "3 Full Days", price: "£210" },
    { _key: "f3", days: "5 Full Days", price: "£325" }
  ],
  subsidyFaqs: [
    { _key: "sq1", question: "Do you charge top-up fees for funded hours?", answer: "We charge a small consumable fee to cover meals and resources." }
  ],
  partnershipTitle: "Working in Partnership",
  partnershipParagraphs: [
    createTextBlock("We believe that strong partnerships with parents are vital.")
  ],
  settlingInTitle: "Settling In",
  settlingInParagraphs: [
    createTextBlock("We offer a gentle settling-in process tailored to your child.")
  ],
  partnershipText: "Working together ensures a smooth transition.",
  settlingStrategies: [
    "Initial visit with parents",
    "Short unaccompanied visits",
    "Gradually building to full days"
  ],
  policiesHeading: "Our Policies",
  policiesIntro: "Important documents regarding our procedures and guidelines.",
  policiesSupportingNote: "Printed copies are available upon request."
});

documents.push({
  _id: "galleryPage",
  _type: "galleryPage",
  heroTitle: "Our Gallery",
  heroParagraphs: [
    createTextBlock("Take a look at the inspiring environment at Little Wise Kids.")
  ],
  heroCtaLabel: "Follow our Journey",
  galleryIntroTitle: "Daily Discoveries",
  galleryIntro: "Capturing moments of joy, learning, and friendship.",
  finalCtaHeading: "Ready to visit?",
  finalCtaCopy: "We would love to show you around in person.",
  finalCtaLabel: "Book a Tour"
});

documents.push({
  _id: "contactPage",
  _type: "contactPage",
  heroTitle: "Contact Us",
  heroParagraphs: [
    createTextBlock("We would love to hear from you.")
  ],
  locationHeading: "Find Us",
  locationCopy: "Conveniently located in Easton, Bristol.",
  messageIntroTitle: "Send a Message",
  messageIntro: "Fill out the form below and we will get back to you shortly.",
  nextStepsTitle: "What happens next?",
  nextSteps: [
    { _key: "ns1", title: "1. We'll be in touch", description: "Our manager will contact you within 48 hours." },
    { _key: "ns2", title: "2. Arrange a visit", description: "Come and see our setting in action." },
    { _key: "ns3", title: "3. Registration", description: "Complete the forms to secure your place." }
  ]
});

documents.push({
  _id: "thankYouPage",
  _type: "thankYouPage",
  heroEyebrow: "Thank You",
  heroTitleFragments: ["Your message", "has been sent"],
  confirmationParagraph: "Thank you for getting in touch. A member of our team will review your message and reply as soon as possible.",
  nextStepsEyebrow: "What's Next?",
  nextStepsHeading: "While you wait",
  nextStepsBody: "Why not explore our recent updates or read about our approach to early learning?",
  editorialCtaLabel1: "Read our Blog",
  editorialCtaLabel2: "Return Home"
});

documents.push({
  _id: "blogPage",
  _type: "blogPage",
  heroTitle: "Nursery News & Insights",
  heroParagraphs: [
    createTextBlock("Updates, parenting tips, and insights into early childhood education from our team.")
  ],
  latestArticlesEyebrow: "Latest Updates",
  latestArticlesHeading: "Recent Articles",
  latestArticlesIntro: "Read our latest news and educational insights."
});

const newNdjson = documents.map((doc) => JSON.stringify(doc)).join("\n");
fs.writeFileSync(outputPath, newNdjson, "utf-8");
