import type { PortableTextBlock } from "@portabletext/types";

export interface Address {
  organisation: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  shortLocation: string;
  mapUrl: string;
}

export interface PhoneEntry {
  label: string;
  number: string;
}

export interface AgeRange {
  minimum: number;
  maximum: number;
  displayOverride?: string;
}

export interface SocialProfiles {
  facebookUrl?: string;
  instagramUrl?: string;
}

export interface FooterTagline {
  prefix: string;
  purplePhrase: string;
  separatorOne: string;
  greenPhrase: string;
  connector: string;
  bluePhrase: string;
  suffix: string;
}

export interface BusinessDetails {
  organizationName: string;
  publicEmail: string;
  primaryPhone: PhoneEntry;
  secondaryPhone?: PhoneEntry;
  address: Address;
  openingDays: string;
  openingTime: string;
  closingTime: string;
  morningSessionEnd: string;
  afternoonSessionStart: string;
  weeksOpen: number;
  minimumAttendanceDays: number;
  ageRange: AgeRange;
  languages: string[];
  social?: SocialProfiles;
  availabilityMessage: string;
  footerBusinessCopy: string;
  footerCtaLabel: string;
  socialHeading: string;
  socialIntroduction: string;
  footerTagline: FooterTagline;
}

export interface InlineBusinessDetail {
  _type: "inlineBusinessDetail";
  field: string;
}

export interface ContentImage {
  _type: "contentImage";
  asset: { _ref: string; _type: "reference" };
  isDecorative?: boolean;
  altText?: string;
  caption?: string;
}

export interface StrictImage {
  _type: "strictImage";
  asset: { _ref: string; _type: "reference" };
  altText: string;
  caption?: string;
}

export interface HeroHeading {
  introduction: string;
  purplePhrase: string;
  greenPhrase: string;
  bluePhrase: string;
}

export interface ValuesIntroHeading {
  prefix: string;
  purplePhrase: string;
  greenPhrase: string;
  connector: string;
  bluePhrase: string;
}

export interface VisitHeading {
  lineOnePrefix: string;
  accentedPhrase: string;
  lineTwo: string;
}

export interface FaqHeading {
  prefix: string;
  accentedPhrase: string;
}

export interface FaqItem {
  question: string;
  answer: PortableTextBlock[];
}

export interface CardSlot {
  title: string;
  description: string;
}

export interface FeatureSlot {
  title: string;
  description: string;
}

export interface StepSlot {
  title: string;
  description: string;
}

export interface DailyRhythmSlot {
  startTime: string;
  endTime: string;
  title: string;
  description: string;
}

export interface HomePage {
  heroEyebrow?: string;
  heroHeading: HeroHeading;
  heroSubtitle: string;
  heroParagraphs: PortableTextBlock[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  valuesIntroHeading: ValuesIntroHeading;
  valuesIntroParagraphs: PortableTextBlock[];
  valuesDifferenceTitle: string;
  screenFreeCard: CardSlot;
  multilingualCard: CardSlot;
  indoorOutdoorCard: CardSlot;
  childLedCard: CardSlot;
  nutritionCard: CardSlot;
  familySettingCard: CardSlot;
  visitHeading: VisitHeading;
  visitParagraphs: PortableTextBlock[];
  visitCtaLabel: string;
  visitImage: ContentImage;
  testimonialQuote: string;
  testimonialAttribution: string;
  faqHeading: FaqHeading;
  faqIntro: string;
  faqs: FaqItem[];
  helpPanelTitle: string;
  helpPanelCopy: string;
  helpPanelCtaLabel: string;
  galleryIntroTitle: string;
  galleryIntro: string;
  galleryImages?: StrictImage[];
}

export interface AboutPage {
  heroEyebrow?: string;
  heroTitleLineOne: string;
  heroTitleLineTwo: string;
  heroParagraphs: PortableTextBlock[];
  approachLabel: string;
  approachHeading: string;
  approachParagraphs: PortableTextBlock[];
  approachChildLed: string;
  approachCalmRhythm: string;
  approachLearning: string;
  approachExploration: string;
  approachConfidence: string;
  approachRelationships: string;
  commitmentLabel: string;
  commitmentHeading: string;
  commitmentParagraphs: PortableTextBlock[];
  commitmentImage: ContentImage;
  environmentLabel: string;
  environmentHeading: string;
  environmentParagraphs: PortableTextBlock[];
  environmentImage: ContentImage;
  programmesLabel: string;
  programmesHeading: string;
  programmesParagraphs: PortableTextBlock[];
  foundationCommunication: string;
  foundationEmpathy: string;
  foundationIndependence: string;
  foundationCreativity: string;
  foundationCriticalThinking: string;
  educatorsLabel: string;
  educatorsHeading: string;
  educatorsParagraphs: PortableTextBlock[];
  educatorsImage: ContentImage;
  leadershipLabel: string;
  leadershipHeading: string;
  leadershipParagraphs: PortableTextBlock[];
  leadershipImage: ContentImage;
  gallerySectionLabel: string;
  gallerySectionHeading: string;
}

export interface MultilingualPage {
  heroEyebrow?: string;
  heroTitleLineOne: string;
  heroTitleLineTwo: string;
  heroParagraphs: PortableTextBlock[];
  philosophyLabel: string;
  philosophyHeading: string;
  philosophyParagraphs: PortableTextBlock[];
  childrenEnjoyHeading: string;
  philosophyPoints: string[];
  languageConnectionLabel: string;
  languageConnectionHeading: string;
  languageConnectionParagraphs: PortableTextBlock[];
  languageConnectionImage: ContentImage;
  eyfsLabel: string;
  eyfsHeading: string;
  eyfsParagraphs: PortableTextBlock[];
  eyfsCommunication: { title: string; description?: string };
  eyfsPhysical: { title: string; description?: string };
  eyfsPersonal: { title: string; description?: string };
  eyfsLiteracy: { title: string; description?: string };
  eyfsMaths: { title: string; description?: string };
  eyfsUnderstanding: { title: string; description?: string };
  eyfsArts: { title: string; description?: string };
  screenFreeLabel: string;
  screenFreeHeading: string;
  screenFreeParagraphs: PortableTextBlock[];
  screenFreeBenefits: string[];
  discoveryNote: string;
  closingNote: string;
}

export interface HoursNutritionPage {
  heroEyebrow?: string;
  heroTitleLineOne: string;
  heroTitleLineTwo: string;
  heroParagraphs: PortableTextBlock[];
  operatingHoursLabel: string;
  operatingHoursHeading: string;
  operatingHoursParagraphs: PortableTextBlock[];
  minAttendancePanelTitle: string;
  minAttendancePanelCopy: string;
  nutritionLabel: string;
  nutritionHeading: string;
  nutritionParagraphs: PortableTextBlock[];
  nutritionChecklist: string[];
  freshlyPreparedHeading: string;
  chefNote: string;
  typicalDayLabel: string;
  typicalDayHeading: string;
  typicalDayLead: string;
  welcomeAndFreePlay: DailyRhythmSlot;
  learningAndExploration: DailyRhythmSlot;
  morningSnack: DailyRhythmSlot;
  outdoorAdventures: DailyRhythmSlot;
  lunch: DailyRhythmSlot;
  restAndQuietTime: DailyRhythmSlot;
  afternoonPlayAndHome: DailyRhythmSlot;
  contactPanelTitle: string;
  contactPanelCopy: string;
  contactPanelCtaLabel: string;
}

export interface ParentsPage {
  heroEyebrow?: string;
  heroTitleLineOne: string;
  heroTitleLineTwo: string;
  heroParagraphs: PortableTextBlock[];
  startingSchoolLabel: string;
  startingSchoolHeading: string;
  startingSchoolParagraphs: PortableTextBlock[];
  schoolSupport: string[];
  feesFundingLabel: string;
  feesFundingHeading: string;
  feesFundingParagraphs: PortableTextBlock[];
  howFundingWorksLabel: string;
  howFundingWorksHeading: string;
  howFundingWorksParagraphs: PortableTextBlock[];
  fundingExamples: { entitlement: string; equivalent: string }[];
  fundingSupportLabel: string;
  fundingSupportHeading: string;
  fundingSupportParagraphs: PortableTextBlock[];
  taxFreeLabel: string;
  taxFreeHeading: string;
  taxFreeParagraphs: PortableTextBlock[];
  weeklyFeesLabel: string;
  weeklyFeesHeading: string;
  weeklyFeesParagraphs: PortableTextBlock[];
  fullDayRate: string;
  halfDayRate: string;
  fundedHourDeductions: string;
  additionalCharges: string;
  exampleWeeklyCosts: string;
  subsidyFaqsLabel: string;
  subsidyFaqsHeading: string;
  subsidyFaqsParagraphs: PortableTextBlock[];
  subsidyFaqs: { question: string; answer: string }[];
  partnershipLabel: string;
  partnershipHeading: string;
  partnershipParagraphs: PortableTextBlock[];
  settlingInLabel: string;
  settlingInHeading: string;
  settlingInParagraphs: PortableTextBlock[];
  partnershipText: string;
  settlingStrategies: string[];
  policiesHeading: string;
  policiesIntro: PortableTextBlock[];
  policiesSupportingNote: string;
}

export interface GalleryPage {
  heroEyebrow?: string;
  heroTitleLineOne: string;
  heroTitleLineTwo: string;
  heroParagraphs: PortableTextBlock[];
  heroCtaLabel: string;
  galleryIntroLabel: string;
  galleryIntroHeading: string;
  galleryIntroCopy: PortableTextBlock[];
  finalCtaHeading: string;
  finalCtaCopy: PortableTextBlock[];
  finalCtaLabel: string;
}

export interface ContactPage {
  heroEyebrow?: string;
  heroTitleLineOne: string;
  heroTitleLineTwo: string;
  heroParagraphs: PortableTextBlock[];
  sectionLabel: string;
  sectionHeading: string;
  introduction: PortableTextBlock[];
  nextStepsLabel: string;
  nextStepsHeading: string;
  nextStepsParagraphs: PortableTextBlock[];
  receiveEnquiryStep: StepSlot;
  getInTouchStep: StepSlot;
  helpWithNextStepsStep: StepSlot;
  locationLabel: string;
  locationHeading: string;
}

export interface ThankYouPage {
  heroEyebrow?: string;
  heroTitleLineOne: string;
  heroTitleLineTwo: string;
  heroParagraphs: PortableTextBlock[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  nextStepsEyebrow?: string;
  nextStepsHeading: string;
  nextStepsBody: PortableTextBlock[];
}

export interface BlogPage {
  heroEyebrow?: string;
  heroTitleLineOne: string;
  heroTitleLineTwo: string;
  heroParagraphs: PortableTextBlock[];
  latestArticlesEyebrow?: string;
  latestArticlesHeading: string;
  latestArticlesIntroduction?: PortableTextBlock[];
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  featured?: boolean;
  category: string;
  excerpt: string;
  featuredImage: StrictImage;
  body: PortableTextBlock[];
}

export interface GalleryPhoto {
  _id: string;
  internalTitle?: string;
  image: StrictImage;
  category?: string;
  showOnHomepage?: boolean;
  homepageDisplayOrder?: number;
  publicCaption?: string;
  displayOrder?: number;
  showOnAboutPage?: boolean;
  aboutPageDisplayOrder?: number;
}

export interface PolicyDocument {
  _id: string;
  title: string;
  shortDescription?: string;
  fileUrl: string;
  file: { asset: { _ref: string; _type: "reference" } };
  displayOrder: number;
  lastReviewed: string;
}

export interface BlogCategory {
  id: string;
  label: string;
  icon: string;
}
