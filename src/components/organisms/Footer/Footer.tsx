import { SocialLink } from "../../molecules/SocialLink/SocialLink";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/igor-oc-diniz",
    icon: "Github" as const,
    label: "GitHub",
  },
  {
    href: "www.linkedin.com/in/igorotavio96/",
    icon: "Linkedin" as const,
    label: "LinkedIn",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="max-w-container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-secondary text-center sm:text-left">
          Built with React &amp; ☕ by Igor Otávio Caetano Diniz · 2026
        </p>
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.href} {...link} />
          ))}
        </div>
      </div>
    </footer>
  );
}
