import type { LucideIconName } from "../components/atoms/Icon/Icon";

export interface Metric {
  label: string;
  value: string;
  icon?: LucideIconName;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  logo?: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  sector: string;
  description: string[];
  activities: string[];
  metrics: Metric[];
  stack: string[];
  tags: FilterTag[];
  /** Drives the timeline badge, dot glow and card emphasis. */
  status?: "current" | "archived";
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
    logo: "./cit.png",
    role: "Senior Frontend Developer",
    period: "Jun 2025 – May 2026",
    duration: "1 year",
    location: "Remote",
    sector: "Banking · Enterprise",
    tags: ["Frontend", "Leadership"],
    description: [
      "Allocated to Itaú, one of Brazil's largest banks, to lead the frontend foundation of a new large-scale digital banking product — defining architecture standards for accessibility, scalability, and complex user journeys in a highly regulated environment.",
    ],
    activities: [
      "Designed and implemented all screens for the new digital banking user journey",
      "Integrated all user flows with Datadog for detailed behavior tracking and performance monitoring",
      "Collaborated closely with QA to support integration and end-to-end testing",
      "Actively participated in task refinement and technical discussions across both frontend and backend scopes",
      "Supported others teams to develop solutions with React",
    ],
    metrics: [
      { label: "Test coverage", value: "95%+", icon: "ShieldCheck" },
      { label: "WCAG compliance", value: "100%", icon: "Eye" },
      { label: "Accessible interfaces", value: "12", icon: "PanelsTopLeft" },
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
    logo: "./topcaixa.png",
    role: "Co-Founder & Mobile Engineer",
    period: "2022 – 2026",
    duration: "4 years",
    status: "archived",
    location: "Remote",
    sector: "Startup · SaaS",
    tags: ["Mobile", "Leadership"],
    description: [
      "Co-founding member with full ownership of the mobile application — responsible for all architecture decisions, product design, and feature delivery from the ground up.\nThe project has been archived — the app is no longer maintained or distributed.",
    ],
    activities: [
      "Built the entire mobile application from scratch, including architecture, navigation, and UI",
      "Sole responsible for all frontend product decisions and continuous delivery",
      "Managed the deployment into the Google Play Store",
      "Owned the entire product road map until the project was archived",
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
    logo: "./encora.png",
    role: "Frontend Developer",
    period: "Jun 2024 – Jun 2025",
    duration: "1 year",
    location: "Remote",
    sector: "SaaS · Workforce Management",
    tags: ["Frontend"],
    description: [
      "Allocated to Velocity Global, a workforce management platform, to develop a React + TypeScript application for invoice management and data visualization, focusing on accessibility, performance, and scalable UI architecture.",
    ],
    activities: [
      "Developed and maintained a React + TypeScript web application for invoice management and data visualization",
      "Implemented responsive layouts to ensure consistent behavior across multiple devices and screen sizes",
      "Identified and addressed accessibility issues across core user journeys, following WCAG guidelines",
      "Designed and built reusable, documented UI components using Storybook to improve consistency and reuse across teams",
      "Optimized asynchronous operations and batch processing to improve performance and reliability",
      "Implemented cost comparison and pricing-related features to increase transparency for end users",
      "Integrated frontend features with backend services built on Node.js and AWS S3",
      "Wrote and maintained unit and end-to-end tests using Jest and Cypress",
      "Collaborated with product, design, backend, and QA teams in an Agile environment",
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
    logo: "./encora.png",
    role: "Frontend Developer",
    period: "Jun 2023 – Jun 2024",
    duration: "1 year",
    location: "Remote",
    sector: "Healthcare · Mobile",
    tags: ["Mobile"],
    description: [
      "Allocated to Mindbloom, a mental health company, to develop a mobile application helping patients schedule consultations with psychiatrists and therapists, with a strong focus on reliability, privacy, and user trust.",
    ],
    activities: [
      "Developed and maintained features for a healthcare mobile application focused on mental health treatment",
      "Implemented scheduling flows for psychiatric and therapy consultations",
      "Introduced Redux for state management to improve scalability, predictability, and long-term maintainability",
      "Implemented push notifications to remind patients about therapy sessions and medication schedules",
      "Collaborated with product, design, and backend teams to ensure compliance with healthcare-related requirements",
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
    logo: "./dti.png",
    role: "Tech Lead",
    period: "Oct 2021 – Jun 2023",
    duration: "2 year 8 months",
    location: "Belo Horizonte, Brazil · Remote",
    sector: "B2B · Sales Mobile",
    tags: ["Mobile", "Leadership"],
    description: [
      "Led end-to-end development of a B2B offline-first mobile app for sales representatives in low-connectivity environments, combining hands-on engineering with technical leadership.",
    ],
    activities: [
      "Led development of a B2B offline-first mobile app using React Native",
      "Built backend services with Node.js and Firebase",
      "Implemented PM2 for service management and log monitoring, improving application observability and stability.",
      "Implemented offline sync, background processing, and conflict resolution",
      "Led code reviews, mentored engineers, and promoted best practices",
      "Participated in backlog refinement and Agile/Scrum ceremonies",
    ],
    metrics: [
      { label: "Revenue at launch", value: "R$2.7M", icon: "TrendingUp" },
      { label: "Support reduction", value: "−68%", icon: "MessageCircle" },
      { label: "App performance", value: "+54%", icon: "Zap" },
      { label: "Sprint completion", value: "100%", icon: "CircleCheckBig" },
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
    logo: "./dti.png",
    role: "Junior Software Engineer",
    period: "Oct 2020 – Oct 2021",
    duration: "1 year",
    location: "Lavras, MG · Remote",
    sector: "Fintech · Banking",
    tags: ["Mobile", "Frontend"],
    description: [
      "Allocated to Tribanco, a regulated financial institution in Uberlândia, contributing to the development and modernization of mobile and web systems under strict regulatory constraints.",
    ],
    activities: [
      "Built and maintained React Native applications using Redux and REST APIs",
      "Integrated banking systems with BACEN using XML-based data models",
      "Designed and optimized relational databases with MySQL and Oracle Database",
      "Developed backend services using Node.js and AWS, focusing on security and scalability",
      "Identified and resolved performance bottlenecks across mobile and web systems",
      "Implemented monitoring and observability using Datadog",
      "Collaborated with product, backend, and QA teams within Agile/Scrum workflows",
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
  {
    id: "ufla-intern",
    company: "UFLA",
    logo: "./ufla.png",
    role: "Mobile Engineer",
    period: "Oct 2019 - Apr 2020",
    duration: "7 months",
    location: "Lavras",
    sector: "Logistics · Research",
    description: [
      "Developed an internal mobile application for the Federal University of Lavras to enable students to track campus shuttle buses in real time, view routes, and follow schedules with low-latency performance optimization focused on reliability and usability.",
    ],
    activities: [
      "Developed and maintained mobile applications using both native (Java) and cross-platform (Flutter) technologies",
      "Integrated mobile clients with backend systems through RESTful APIs",
      "Implemented real-time communication using MQTT to support live shuttle location tracking",
      "Designed and managed relational data models using MySQL to ensure data integrity and performance",
      "Built responsive and scalable UI components in Flutter following Material Design guidelines",
      "Performed testing, debugging, and performance tuning to improve stability and user experience",
    ],
    metrics: [
      { label: "Low latency", value: "40ms", icon: "Timer" },
      { label: "Smart server uptime", value: "80%" },
    ],
    stack: ["Flutter", "Java", "MQTT", "MySQL", "REST APIs", "Material Design"],
    tags: ["Mobile"],
  },
  {
    id: "technolog-intern",
    company: "Technolog",
    logo: "./technolog.png",
    role: "Frontend Developer",
    period: "Mar 2018 - Nov 2018",
    duration: "9 months",
    location: "Lavras",
    sector: "Logistics · SaaS",
    description: [
      "At Technolog, a logistics company serving multiple enterprise clients, I worked on the development and maintenance of mobile and web applications supporting operational workflows and data management. The role spanned native Android, web front-end, and backend integration, with a strong focus on performance, usability, and system reliability.",
    ],
    activities: [
      "Built and maintained native Android applications using Java and XML, focusing on performance and user experience",
      "Developed and improved web interfaces using HTML, CSS, and JavaScript",
      "Designed and implemented CRUD operations for internal and external systems",
      "Integrated mobile and web applications with backend services and databases",
      "Managed relational databases using MySQL and SQL Server",
      "Optimized application performance and usability across platforms",
      "Collaborated with multidisciplinary teams to deliver solutions aligned with client needs",
    ],
    metrics: [
      { label: "User adoption", value: "80%", icon: "Users" },
      {
        label: "Response time decreased",
        value: "33,3%",
        icon: "TrendingDown",
      },
    ],
    stack: [
      "Java",
      "Android (Native)",
      "XML",
      "HTML, CSS, JavaScript",
      "MySQL",
      "SQL Server",
      "PHP",
      "Bootstrap",
    ],
    tags: ["Mobile", "Frontend"],
  },
];
