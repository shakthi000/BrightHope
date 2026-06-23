export const SITE = {
  name: "Bright Hope Counselling & Coaching Centre",
  shortName: "Bright Hope",
  description:
    "Professional counselling, mentoring and academic guidance in Chennai. Transform your life with compassionate support from A Lakshmi.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://brighthope.in",
  email: "lakshmiananthanssv@gmail.com",
  phone: "9962261841",
  phoneFormatted: "+91 99622 61841",
  address: {
    street: "12/5 Sankaranarayanan Street, VOC Nagar",
    locality: "Pammal",
    city: "Chennai",
    postalCode: "600075",
    country: "IN",
    full: "12/5 Sankaranarayanan Street, VOC Nagar, Pammal, Chennai – 600075",
  },
  founder: {
    name: "A Lakshmi",
    title: "Psychological Counsellor, Academician & Mentor",
    quote:
      "My purpose is to make a meaningful difference in people's lives by helping them heal, grow and discover the best version of themselves.",
    qualifications: [
      "M.Sc. (Psychology)",
      "M.Sc. (Plant Science)",
      "B.Ed.",
      "PG Diploma in Guidance and Counselling",
      "Diploma in School, Corporate and Family Counselling",
      "CTET Qualified",
    ],
    youtube: {
      channel: "Let's Xplore",
      url: "https://www.youtube.com/@letsxplore77",
    },
  },
  social: {
    youtube: "https://www.youtube.com/@letsxplore77",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICES = {
  counselling: [
    {
      id: "individual",
      title: "Individual Counselling",
      description:
        "One-on-one sessions tailored to your unique emotional needs, helping you navigate life's challenges with clarity and confidence.",
      icon: "User",
    },
    {
      id: "relationship",
      title: "Relationship & Family Counselling",
      description:
        "Strengthen bonds and resolve conflicts through guided communication in a safe, supportive environment.",
      icon: "Heart",
    },
    {
      id: "cancer-support",
      title: "Cancer Support Counselling",
      description:
        "Specialized emotional support for cancer combatants and their families, drawing from lived experience and professional expertise.",
      icon: "Shield",
    },
    {
      id: "group",
      title: "Group Counselling (For Institutions & Corporate Organisations)",
      description:
        "Connect with others on similar journeys in facilitated group sessions that foster shared healing and growth.",
      icon: "Users",
    },
  ],
  academic: [
    {
      id: "academic-coaching",
      title: "Academic Coaching",
      description:
        "Personalized strategies to enhance study habits, time management and academic performance.",
      icon: "GraduationCap",
    },
    {
      id: "student-counselling",
      title: "Student Counselling",
      description:
        "Emotional and psychological support for students facing academic pressure, anxiety and life transitions.",
      icon: "BookOpen",
    },
  ],
} as const;

export const ALL_SERVICES = [
  ...SERVICES.counselling,
  ...SERVICES.academic,
];

export const SERVICE_OPTIONS = ALL_SERVICES.map((s) => ({
  value: s.id,
  label: s.title,
}));

export const STATS = [
  { value: "10+", label: "Years of Experience" },
  { value: "500+", label: "Individuals Supported" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "1000+", label: "Students Mentored" },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Compassionate Expertise",
    description:
      "Over a decade of experience combining psychological insight with educational expertise.",
    icon: "Sparkles",
  },
  {
    title: "Safe & Non-Judgmental",
    description:
      "A warm, confidential space where you can express yourself freely without fear.",
    icon: "ShieldCheck",
  },
  {
    title: "Lived Resilience",
    description:
      "Founded by a cancer survivor who transformed personal adversity into a mission of hope.",
    icon: "Sunrise",
  },
  {
    title: "Holistic Approach",
    description:
      "Addressing emotional, academic and personal dimensions for complete transformation.",
    icon: "Layers",
  },
] as const;

export const JOURNEY_STEPS = [
  {
    step: 1,
    title: "Reach Out",
    description: "Take the first brave step by contacting us or booking an appointment.",
  },
  {
    step: 2,
    title: "Initial Consultation",
    description: "Share your story in a confidential, welcoming environment.",
  },
  {
    step: 3,
    title: "Personalized Plan",
    description: "Receive a tailored counselling or coaching plan designed for your goals.",
  },
  {
    step: 4,
    title: "Transform & Grow",
    description: "Embark on your journey of healing, confidence and lasting change.",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Bright Hope helped me navigate one of the most challenging phases of my life. The counselling sessions gave me emotional clarity, confidence and practical tools to move forward.",
    author: "Anonymous Client",
    location: "Chennai",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The guidance provided for my child brought noticeable improvements in confidence, emotional well-being and academic performance. The support was truly life-changing.",
    author: "Anonymous Parent",
    location: "Chennai",
    rating: 5,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What can I expect in my first counselling session?",
    answer:
      "Your first session is a welcoming conversation where we understand your concerns, establish trust and discuss how we can support your journey. There is no pressure — just a safe space to begin.",
  },
  {
    question: "Is counselling confidential?",
    answer:
      "Absolutely. All sessions are strictly confidential. Your privacy and trust are foundational to our practice.",
  },
  {
    question: "Do you offer online counselling sessions?",
    answer:
      "Yes, we offer both in-person sessions at our Chennai centre and online sessions for your convenience.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book directly through our website's appointment page, call us at 9962261841, or send us an email. We will confirm your booking promptly.",
  },
  {
    question: "What types of issues do you help with?",
    answer:
      "We support a wide range of concerns including emotional wellbeing, self-discovery, personal growth, relationship concerns, family concerns, academic challenges, career guidance, life transitions, stress management confidence building and cancer support counselling.",
  },
  {
    question: "How long is each session?",
    answer:
      "Standard counselling sessions typically last 45–60 minutes. Academic coaching sessions may vary based on individual needs.",
  },
] as const;

export const BLOG_POSTS = [
  {
    slug: "finding-hope-after-adversity",
    title: "Finding Hope After Adversity",
    excerpt:
      "Discover how resilience can be cultivated even in life's darkest moments and learn practical steps toward emotional recovery.",
    date: "2025-03-15",
    readTime: "5 min read",
    category: "Wellness",
  },
  {
    slug: "supporting-your-child-emotionally",
    title: "Supporting Your Child's Emotional Well-being",
    excerpt:
      "A guide for parents on recognizing signs of emotional distress and creating a nurturing home environment.",
    date: "2025-02-28",
    readTime: "7 min read",
    category: "Parenting",
  },
  {
    slug: "managing-academic-stress",
    title: "Managing Academic Stress: A Student's Guide",
    excerpt:
      "Practical strategies for students to balance academic pressure with mental health and personal growth.",
    date: "2025-01-20",
    readTime: "6 min read",
    category: "Academic",
  },
] as const;
