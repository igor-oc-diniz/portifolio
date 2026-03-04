export interface Skill {
  name: string;
  level?: "expert" | "advanced" | "intermediate";
}

export interface SkillCategory {
  label: string;
  icon: string;
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
      { name: "Redux", level: "expert" },
    ],
  },
  {
    label: "Backend",
    icon: "Server",
    skills: [
      { name: "Node.js", level: "advanced" },
      { name: "Firebase", level: "advanced" },
      { name: "REST APIs", level: "expert" },
      { name: "AWS S3", level: "intermediate" },
    ],
  },
  {
    label: "Tooling & Ops",
    icon: "Wrench",
    skills: [
      { name: "Jest", level: "advanced" },
      { name: "Cypress", level: "advanced" },
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
];
