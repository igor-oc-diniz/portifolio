export interface Metric {
  label: string;
  value: string;
  icon?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  sector: string;
  description: string[];
  achievements: string[];
  metrics: Metric[];
  stack: string[];
  tags: FilterTag[];
  highlight?: boolean;
}

export type FilterTag = "All" | "Mobile" | "Frontend" | "Leadership";
export const FILTER_TAGS: FilterTag[] = [
  "All",
  "Mobile",
  "Frontend",
  "Leadership",
];

export const experiences: ExperienceEntry[] = [
  {
    id: "cit-senior",
    company: "CI&T",
    role: "Senior Frontend Developer",
    period: "Jun 2025 – Present",
    duration: "8 months",
    location: "Remote",
    sector: "Banking · Enterprise",
    highlight: true,
    tags: ["Frontend", "Leadership"],
    description: [
      "Allocated to Itaú, one of Brazil's largest banks, to lead the frontend foundation of a new large-scale digital banking product — defining architecture standards for accessibility, scalability, and complex user journeys in a highly regulated environment.",
    ],
    achievements: [
      "Designed and implemented all screens for the new digital banking user journey",
      "Achieved 100% WCAG compliance across 12 accessible interfaces for iOS and Android",
      "Maintained unit test coverage above 95%, ensuring high reliability and long-term maintainability",
      "Integrated all user flows with Datadog for detailed behavior tracking and performance monitoring",
      "Collaborated closely with QA to support integration and end-to-end testing",
    ],
    metrics: [
      { label: "Test coverage", value: "95%+", icon: "ShieldCheck" },
      { label: "WCAG compliance", value: "100%", icon: "Eye" },
      { label: "Accessible interfaces", value: "12", icon: "Layout" },
    ],
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Datadog",
      "WCAG",
      "Node.js",
      "AWS S3",
      "Jest",
      "Cypress",
      "Figma",
    ],
  },
  {
    id: "topcaixa",
    company: "TopCaixa",
    role: "Co-Founder & Mobile Engineer",
    period: "2019 – Present",
    duration: "Ongoing",
    highlight: true,
    location: "Remote",
    sector: "Startup · SaaS",
    tags: ["Mobile", "Frontend", "Leadership"],
    description: [
      "Co-founding member with full ownership of the mobile application — responsible for all architecture decisions, product design, and feature delivery from the ground up.\nFeel free to check-out our product available for android: www.topcaixa.com.br",
    ],
    achievements: [
      "Built the entire mobile application from scratch, including architecture, navigation, and UI",
      "Sole responsible for all frontend product decisions and continuous delivery",
    ],
    metrics: [
      { label: "Active users", value: "83.3%", icon: "Users" },
      { label: "Bugs reported over last year", value: "-13", icon: "Bug" },
    ],
    stack: ["Flutter", "Dart", "flutter_test", "Bloc"],
  },
  {
    id: "encora-velocity",
    company: "Encora",
    role: "Frontend Developer",
    period: "Jun 2024 – Jun 2025",
    duration: "1 year",
    location: "Remote",
    sector: "SaaS · Workforce Management",
    tags: ["Frontend"],
    description: [
      "Allocated to Velocity Global, a workforce management platform, to develop a React + TypeScript application for invoice management and data visualization, focusing on accessibility, performance, and scalable UI architecture.",
    ],
    achievements: [
      "Improved invoice batch download performance by 68% by orchestrating asynchronous requests",
      "Resolved 56 of 64 accessibility issues (87%) across the main user journey by applying WCAG guidelines",
      "Built a library of 6 reusable documented Storybook components, adopted by 7 teams across the organization",
      "Implemented cost comparison and pricing features to increase transparency for end users",
    ],
    metrics: [
      { label: "Download performance", value: "+68%", icon: "Zap" },
      { label: "A11y issues resolved", value: "87%", icon: "Eye" },
      { label: "Teams reached", value: "7 teams", icon: "Users" },
      { label: "Storybook components", value: "6", icon: "Layers" },
    ],
    stack: [
      "React",
      "TypeScript",
      "Storybook",
      "Styled Components",
      "Jest",
      "Cypress",
      "Node.js",
      "AWS S3",
    ],
  },
  {
    id: "encora-mindbloom",
    company: "Encora",
    role: "Frontend Developer",
    period: "Jun 2023 – Jun 2024",
    duration: "1 year",
    location: "Remote",
    sector: "Healthcare · Mobile",
    tags: ["Mobile", "Frontend"],
    description: [
      "Allocated to Mindbloom, a mental health company, to develop a mobile application helping patients schedule consultations with psychiatrists and therapists, with a strong focus on reliability, privacy, and user trust.",
    ],
    achievements: [
      "Improved patient adherence by 30% measured by therapy attendance rates using push notifications",
      "Reduced QA-reported tickets by ~50% by improving backlog refinement and Scrum ceremonies",
      "Introduced Redux for centralized state management, reducing complexity and enabling faster onboarding",
      "Supported therapy sessions through an internal media player, ensuring stability and smooth playback",
    ],
    metrics: [
      { label: "Patient adherence", value: "+30%", icon: "TrendingUp" },
      { label: "QA tickets", value: "−50%", icon: "Bug" },
    ],
    stack: [
      "React Native",
      "Redux",
      "TypeScript",
      "Jest",
      "LaunchDarkly",
      "Push Notifications",
      "REST APIs",
    ],
  },
  {
    id: "dti-lead",
    company: "dti digital",
    role: "Tech Lead",
    period: "Oct 2021 – Jun 2023",
    duration: "2 year 8 months",
    location: "Belo Horizonte, Brazil · Remote",
    sector: "B2B · Sales Mobile",
    tags: ["Mobile", "Leadership"],
    description: [
      "Led end-to-end development of a B2B offline-first mobile app for sales representatives in low-connectivity environments, combining hands-on engineering with technical leadership.",
    ],
    achievements: [
      "Generated BRL 2.7M in revenue in the first month after launch, with results published internally by stakeholders",
      "Reduced customer support requests by 68% by redesigning critical UI/UX flows based on user behavior analysis",
      "Improved app loading time by 54% by refactoring the mobile architecture and optimizing critical rendering flows",
      "Enabled offline operations for ~20% of sales reps in remote areas via SQLite + Firebase sync, eliminating connectivity as a blocker",
      "Eliminated sprint carry-overs through mentoring on best practices, achieving 100% sprint completion consistently",
    ],
    metrics: [
      { label: "Revenue at launch", value: "R$2.7M", icon: "TrendingUp" },
      { label: "Support reduction", value: "−68%", icon: "MessageCircle" },
      { label: "App performance", value: "+54%", icon: "Zap" },
      { label: "Sprint completion", value: "100%", icon: "CheckCircle" },
    ],
    stack: [
      "React Native",
      "JavaScript",
      "Node.js",
      "Firebase",
      "SQLite",
      "PM2",
      "REST APIs",
    ],
  },
  {
    id: "dti-junior",
    company: "dti digital",
    role: "Junior Software Engineer",
    period: "Oct 2020 – Oct 2021",
    duration: "1 year",
    location: "Lavras, MG · Remote",
    sector: "Fintech · Banking",
    tags: ["Mobile", "Frontend"],
    description: [
      "Allocated to Tribanco, a regulated financial institution in Uberlândia, contributing to the development and modernization of mobile and web systems under strict regulatory constraints.",
    ],
    achievements: [
      "Achieved 100% BACEN regulatory compliance by implementing XML-based financial messaging integrations",
      "Reduced initial invoice loading time by 50%+ through a two-phase async endpoint strategy",
      "Resolved critical React Native production issues, ensuring continuity of financial services for end users",
    ],
    metrics: [
      { label: "BACEN compliance", value: "100%", icon: "ShieldCheck" },
      { label: "Invoice load time", value: "−50%", icon: "Timer" },
    ],
    stack: [
      "React Native",
      "Redux",
      "Node.js",
      "AWS",
      "MySQL",
      "Oracle Database",
      "Datadog",
      "XML",
    ],
  },
];
