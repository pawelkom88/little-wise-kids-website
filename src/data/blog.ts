import type { IconName } from "../components/icons/types";

export type BlogCategory =
  | "nursery-news"
  | "early-learning"
  | "parenting-tips"
  | "nutrition"
  | "community";

export type BlogTone = "purple" | "green" | "blue" | "yellow";

export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type BlogImage = ContentImage;

export type { IconName };

export type ArticleContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; id: string }
  | { type: "list"; items: string[] };

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  categoryLabel: string;
  tone: BlogTone;
  icon: IconName;
  published: string;
  displayDate: string;
  readTime: string;
  featured?: boolean;
  image?: ContentImage;
  content: ArticleContentBlock[];
}

export const categories = [
  {
    id: "all",
    label: "All Articles",
    icon: "star",
  },
  {
    id: "nursery-news",
    label: "Nursery News",
    icon: "star",
  },
  {
    id: "early-learning",
    label: "Early Learning",
    icon: "book",
  },
  {
    id: "parenting-tips",
    label: "Parenting Tips",
    icon: "heart",
  },
  {
    id: "nutrition",
    label: "Nutrition",
    icon: "heart",
  },
  {
    id: "community",
    label: "Community",
    icon: "person",
  },
] as const;

const rawArticles: Omit<BlogArticle, "displayDate" | "readTime">[] = [
  {
    slug: "welcome-to-a-new-term",
    title: "Welcome to a New Term at Little Wise Kids",
    excerpt:
      "A look at what is ahead this season, from joyful learning themes and new experiences to the little moments that make nursery life special.",
    category: "nursery-news",
    categoryLabel: "Nursery News",
    tone: "purple",
    icon: "star",
    published: "2026-07-14",
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
    categoryLabel: "Early Learning",
    tone: "blue",
    icon: "book",
    published: "2026-07-08",
    content: [
      {
        type: "paragraph",
        text: "Play is far more than just fun. It is how children explore, experiment, imagine and make connections that help them grow in so many important ways. From building friendships to solving problems, play shapes the foundations for lifelong learning.",
      },
      {
        type: "heading",
        id: "why-play-matters",
        text: "Why Play Matters",
      },
      {
        type: "paragraph",
        text: "When children play, they are in control of their learning. They follow their interests, take risks, try new things and build confidence along the way. Play supports brain development, language skills, creativity, social understanding and emotional wellbeing.",
      },
      {
        type: "heading",
        id: "learning-through-exploration",
        text: "Learning Through Exploration",
      },
      {
        type: "paragraph",
        text: "Children are naturally curious. Through hands-on experiences, open-ended materials and time to wonder, they make discoveries that spark new ideas. Whether they are building, imagining, investigating or creating, every moment of exploration helps children grow.",
      },
      {
        type: "heading",
        id: "supporting-confidence-and-connection",
        text: "Supporting Confidence and Connection",
      },
      {
        type: "paragraph",
        text: "Play together builds more than skills. It builds relationships. Through shared play, children learn to communicate, negotiate, empathise and celebrate each other’s ideas. These experiences help them feel understood, valued and confident in themselves.",
      },
      {
        type: "heading",
        id: "play-at-little-wise-kids",
        text: "Play at Little Wise Kids",
      },
      {
        type: "paragraph",
        text: "Our environment is carefully prepared to inspire curiosity and imagination. Children have time and space to explore freely, both indoors and outdoors, with a wide range of natural materials, open-ended resources and real-life experiences.",
      },
      {
        type: "heading",
        id: "support-play-at-home",
        text: "Simple Ways to Support Play at Home",
      },
      {
        type: "list",
        items: [
          "Follow your child’s lead and give them time to explore their own ideas.",
          "Offer open-ended materials such as blocks, boxes and natural objects.",
          "Spend time outdoors together in different seasons and weather.",
          "Read stories, sing songs and make space for imaginative play.",
        ],
      },
      {
        type: "paragraph",
        text: "When we value play, we give children the space to become confident, curious and capable learners. At Little Wise Kids, we are proud to protect that space and make every day rich with meaningful discovery.",
      },
    ],
  },
  {
    slug: "settling-in-gentle-tips",
    title: "Settling In: Gentle Tips for a Smooth Start",
    excerpt:
      "Practical ideas to help your child feel safe, secure and understood during those important first days at nursery.",
    category: "parenting-tips",
    categoryLabel: "Parenting Tips",
    tone: "purple",
    icon: "heart",
    published: "2026-07-01",
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
    categoryLabel: "Early Learning",
    tone: "green",
    icon: "star",
    published: "2026-06-24",
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
    categoryLabel: "Nutrition",
    tone: "yellow",
    icon: "heart",
    published: "2026-06-18",
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
    categoryLabel: "Community",
    tone: "blue",
    icon: "person",
    published: "2026-06-10",
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
    categoryLabel: "Early Learning",
    tone: "green",
    icon: "book",
    published: "2026-06-03",
    content: [
      {
        type: "paragraph",
        text: "In a world increasingly dominated by screens, we prioritize screen-free learning to encourage deeper engagement and active play.",
      },
    ],
  },
  {
    slug: "helping-young-children-build-confidence",
    title: "Helping Young Children Build Confidence",
    excerpt:
      "Simple ways families and educators can encourage independence, emotional resilience and a positive sense of self.",
    category: "parenting-tips",
    categoryLabel: "Parenting Tips",
    tone: "purple",
    icon: "heart",
    published: "2026-05-27",
    content: [
      {
        type: "paragraph",
        text: "Confidence is key to a child's development. By providing a supportive environment, we help children believe in their abilities.",
      },
    ],
  },
  {
    slug: "a-calm-rhythm-for-busy-family-days",
    title: "A Calm Rhythm for Busy Family Days",
    excerpt:
      "How familiar routines can support smoother transitions, better rest and a stronger sense of security for young children.",
    category: "nursery-news",
    categoryLabel: "Nursery News",
    tone: "yellow",
    icon: "clock",
    published: "2026-05-20",
    content: [
      {
        type: "paragraph",
        text: "A predictable daily rhythm can bring calm and stability to family life, helping children feel secure and grounded.",
      },
    ],
  },
];

function getBlockText(block: ArticleContentBlock): string {
  if (block.type === "list") {
    return block.items.join(" ");
  }
  return block.text;
}

function calculateReadingTime(
  article: Omit<BlogArticle, "displayDate" | "readTime">
): string {
  const articleText = [
    article.title,
    article.excerpt,
    ...article.content.map(getBlockText),
  ].join(" ");

  const wordCount = articleText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));
  return `${minutes} min read`;
}

function formatDisplayDate(published: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${published}T12:00:00`));
}

export const articles: BlogArticle[] = rawArticles.map((article) => ({
  ...article,
  displayDate: formatDisplayDate(article.published),
  readTime: calculateReadingTime(article),
}));

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((article) => article.slug === slug);
}
