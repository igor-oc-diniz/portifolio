import type { LucideIconName } from "../components/atoms/Icon/Icon";

export interface Skill {
  name: string;
  level?: "expert" | "advanced" | "intermediate";
}

export interface SkillCategory {
  label: string;
  icon: LucideIconName;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    icon: "Monitor",
    skills: [
      { name: "React", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "JavaScript", level: "expert" },
      { name: "Next.js", level: "intermediate" },
      { name: "Styled Components", level: "advanced" },
      { name: "WCAG / Accessibility", level: "advanced" },
    ],
  },
  {
    label: "Mobile",
    icon: "Smartphone",
    skills: [
      { name: "React Native", level: "expert" },
      { name: "Flutter", level: "advanced" },
      { name: "Expo", level: "advanced" },
      { name: "Push Notifications", level: "advanced" },
      { name: "App Store / Play Store Deploy", level: "advanced" },
    ],
  },
  {
    label: "Backend",
    icon: "Server",
    skills: [
      { name: "Node.js", level: "advanced" },
      { name: "Firebase", level: "advanced" },
      { name: "REST APIs", level: "expert" },
      { name: "AWS S3", level: "advanced" },
      { name: "Spring Boot", level: "intermediate" },
      { name: "PostgreSQL", level: "advanced" },
    ],
  },
  {
    label: "Tooling & Ops",
    icon: "Wrench",
    skills: [
      { name: "Jest", level: "advanced" },
      { name: "Cypress", level: "advanced" },
      { name: "ESLint / Prettier", level: "advanced" },
      { name: "Storybook", level: "advanced" },
      { name: "Datadog", level: "intermediate" },
      { name: "Git", level: "expert" },
      { name: "Figma", level: "intermediate" },
    ],
  },
  {
    label: "Leadership",
    icon: "Users",
    skills: [
      { name: "Tech Lead", level: "expert" },
      { name: "Code Review", level: "expert" },
      { name: "Mentoring", level: "advanced" },
      { name: "Agile / Scrum", level: "expert" },
    ],
  },
  {
    label: "Architecture",
    icon: "Boxes",
    skills: [
      { name: "Atomic Design", level: "expert" },
      { name: "Microfrontends", level: "advanced" },
      { name: "Monorepo", level: "advanced" },
      { name: "Design System", level: "advanced" },
      { name: "Clean Architecture", level: "intermediate" },
    ],
  },
];
