import type { LucideIconName } from "../components/atoms/Icon/Icon";

export interface QuickFact {
  icon: LucideIconName;
  label: string;
}

export const profile = {
  name: "Igor Otávio Caetano Diniz",
  greeting: "Hi, I'm",
  titles: [
    "Senior Frontend Engineer",
    "Tech Lead",
    "React Specialist",
    "React Native Developer",
    "Mobile Engineer",
  ],
  aboutMe:
    "Software engineer with 7+ years delivering production-grade applications in React, React Native, and Flutter — across banking, healthcare, SaaS and B2B sectors.",
  bio: [
    "Software engineer with strong experience building scalable and reliable web and mobile applications in production environments.",
    "Focused on delivering clean, maintainable solutions that balance technical excellence with real business impact.",
    "Experienced in leading features end-to-end, from architecture decisions to production deployment.",
    "Based in Brazil, actively seeking opportunities as Senior Software Engineer or Tech Lead to combine technical leadership with products that make a real difference.",
  ],
  location: "Brazil 🇧🇷",
  available: true,
  quickFacts: [
    { icon: "MapPin" as LucideIconName, label: "Lavras, Brazil" },
    { icon: "Briefcase" as LucideIconName, label: "7+ years of experience" },
    { icon: "Users" as LucideIconName, label: "Tech Lead" },
    { icon: "Smartphone" as LucideIconName, label: "React Native & Flutter" },
  ] satisfies QuickFact[],
};
