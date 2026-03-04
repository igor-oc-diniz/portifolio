export interface ContactLink {
  icon: string;
  label: string;
  value: string;
  href: string;
}

export const contactLinks: ContactLink[] = [
  {
    icon: "Linkedin",
    label: "LinkedIn",
    value: "/in/igorotavio96",
    href: "https://www.linkedin.com/in/igorotavio96/",
  },
  {
    icon: "Github",
    label: "GitHub",
    value: "github.com/igor-oc-diniz",
    href: "https://github.com/igor-oc-diniz",
  },
  {
    icon: "Mail",
    label: "E-mail",
    value: "igor.oc.diniz@gmail.com",
    href: "mailto:igor.oc.diniz@gmail.com",
  },
];
