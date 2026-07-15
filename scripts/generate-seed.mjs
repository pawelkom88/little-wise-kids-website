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

const documents = [
  {
    _id: "businessDetails",
    _type: "businessDetails",
    organizationName: "Little Wise Kids",
    publicEmail: "hello@littlewisekids.co.uk",
    primaryPhone: { _type: "object", label: "Main Office", number: "0117 123 4567" },
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
    storyTitleLineOne: "Our",
    storyTitleLineTwo: "Beginning",
    storyParagraphs: [createTextBlock("Our journey started...")],
    leadershipTitleLineOne: "Meet",
    leadershipTitleLineTwo: "Our Team",
    leadershipParagraphs: [createTextBlock("We are passionate educators.")],
    galleryEyebrow: "Our Environment",
    galleryHeading: "See our nursery",
    galleryParagraphs: [createTextBlock("Our space is designed for play.")],
    galleryPrimaryCtaLabel: "View Full Gallery",
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
  },
  {
    _id: "multilingualPage",
    _type: "multilingualPage",
    heroTitleLineOne: "Multilingual",
    heroTitleLineTwo: "Learning",
    heroParagraphs: [createTextBlock("We speak English and Portuguese.")],
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
  },
  {
    _id: "galleryPage",
    _type: "galleryPage",
    heroTitleLineOne: "Our",
    heroTitleLineTwo: "Gallery",
    heroParagraphs: [createTextBlock("See our beautiful nursery.")],
    contactCtaEyebrow: "Like what you see?",
    contactCtaHeading: "Come and Visit",
    contactCtaParagraphs: [createTextBlock("Book a tour today.")],
    contactCtaPrimaryLabel: "Book a Visit",
    contactCtaSecondaryLabel: "Contact Us",
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

documents.forEach(doc => validate(doc));

const ndjson = documents.map((doc) => JSON.stringify(doc)).join("\n");
const outputPath = path.join(__dirname, "../docs/sanity/seed-data.ndjson");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, ndjson, "utf-8");

console.log(`✅ Successfully generated validated seed data at ${outputPath}`);
