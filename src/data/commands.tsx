import type { ReactNode } from "react";
import { experiences } from "./experience";
import { skillCategories } from "./skills";
import { store } from "../store";
import {
  toggleRecruiterMode,
  selectIsRecruiterActive,
} from "../store/slices/recruiterSlice";

// ─── Types ────────────────────────────────────────────────────────────────────

export type OutputLineType =
  | "text"
  | "highlight"
  | "accent"
  | "error"
  | "success"
  | "separator"
  | "jsx";

export interface OutputLine {
  type: OutputLineType;
  content: string | ReactNode;
  delay?: number;
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args?: string[]) => OutputLine[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SEP = "─────────────────────────────────────────";
const pad = (str: string, len: number) => str.padEnd(len, " ");

const levelLabel = (level?: string) => {
  switch (level) {
    case "expert":
      return "expert";
    case "advanced":
      return "advanced";
    case "intermediate":
      return "intermediate";
    default:
      return "";
  }
};

const categoryIcon = (label: string) => {
  switch (label) {
    case "Frontend":
      return "🖥️";
    case "Mobile":
      return "📱";
    case "Backend":
      return "🔌";
    case "Tooling & Ops":
      return "🛠️";
    case "Leadership":
      return "👥";
    case "Architecture":
      return "⚙️";
    default:
      return "▸";
  }
};

// ─── Commands ─────────────────────────────────────────────────────────────────

export const commands: Command[] = [
  // ── help ──────────────────────────────────────────────────────────────────
  {
    name: "help",
    description: "List all available commands",
    aliases: ["?"],
    execute: () => [
      { type: "accent", content: "📖  Available commands" },
      { type: "separator", content: SEP },
      {
        type: "accent",
        content: `  ${pad("help", 14)}${pad("?", 12)}List all available commands`,
      },
      {
        type: "accent",
        content: `  ${pad("whoami", 14)}${pad("about", 12)}About me — name, role and status`,
      },
      {
        type: "accent",
        content: `  ${pad("skills", 14)}${pad("ls", 12)}Tech stack by category`,
      },
      {
        type: "accent",
        content: `  ${pad("experience", 14)}${pad("exp", 12)}Career history with key metrics`,
      },
      {
        type: "accent",
        content: `  ${pad("contact", 14)}${pad("", 12)}LinkedIn, GitHub and email`,
      },
      {
        type: "accent",
        content: `  ${pad("open [target]", 14)}${pad("", 12)}Open linkedin | github in browser`,
      },
      {
        type: "accent",
        content: `  ${pad("banner", 14)}${pad("", 12)}Display the welcome banner`,
      },
      {
        type: "accent",
        content: `  ${pad("clear", 14)}${pad("cls", 12)}Clear terminal output`,
      },
      { type: "separator", content: SEP },
      {
        type: "text",
        content: "  💡 Try: whoami · skills · experience · contact",
      },
    ],
  },

  // ── whoami ─────────────────────────────────────────────────────────────────
  {
    name: "whoami",
    description: "About me — name, role, location and availability",
    aliases: ["about"],
    execute: () => [
      { type: "accent", content: "👤  Igor Otávio Caetano Diniz" },
      { type: "text", content: "    Senior Frontend Developer & Tech Lead" },
      { type: "separator", content: SEP },
      { type: "highlight", content: "📍  Location:      Brazil" },
      { type: "highlight", content: "💼  Experience:    7+ years" },
      {
        type: "highlight",
        content: "🏢  Current role:  Senior Frontend Developer @ CI&T",
      },
      {
        type: "highlight",
        content: "🚀  Venture:       Co-Founder & Mobile Engineer @ TopCaixa",
      },
      { type: "highlight", content: "✅  Status:        Open to work" },
      { type: "highlight", content: "🌐  Languages:     PT-BR · EN" },
      {
        type: "highlight",
        content: "🎓  Education:     Computer Science — UFLA (2014–2022)",
      },
    ],
  },

  // ── skills ─────────────────────────────────────────────────────────────────
  {
    name: "skills",
    description: "Tech stack by category with skill levels",
    aliases: ["ls"],
    execute: () => {
      const lines: OutputLine[] = [
        { type: "accent", content: "⚡  Skills & Technologies" },
        { type: "separator", content: SEP },
      ];
      skillCategories.forEach((cat) => {
        lines.push({
          type: "highlight",
          content: `\n  ${categoryIcon(cat.label)}  ${cat.label}`,
        });
        cat.skills.forEach((skill) => {
          lines.push({
            type: "accent",
            content: `     ${pad(skill.name, 26)}${levelLabel(skill.level)}`,
          });
        });
      });
      return lines;
    },
  },

  // ── experience ─────────────────────────────────────────────────────────────
  {
    name: "experience",
    description: "Career history with key metrics",
    aliases: ["exp"],
    execute: () => {
      const lines: OutputLine[] = [
        {
          type: "accent",
          content: `📋  Professional Experience  (${experiences.length} entries)`,
        },
        { type: "separator", content: SEP },
      ];
      experiences.forEach((exp, i) => {
        const badge = exp.highlight ? "  [current]" : "";
        const topMetric = exp.metrics[0];
        lines.push({
          type: "highlight",
          content: `\n  ${exp.company} — ${exp.role}${badge}`,
        });
        lines.push({
          type: "accent",
          content: `  ${exp.period} · ${exp.sector}`,
        });
        if (topMetric) {
          lines.push({
            type: "accent",
            content: `  → ${topMetric.value} ${topMetric.label}`,
          });
        }
        if (i < experiences.length - 1) {
          lines.push({ type: "text", content: "" });
        }
      });
      lines.push({ type: "separator", content: SEP });
      lines.push({ type: "text", content: '  Run "contact" to get in touch.' });
      return lines;
    },
  },

  // ── contact ────────────────────────────────────────────────────────────────
  {
    name: "contact",
    description: "Contact links — LinkedIn, GitHub and email",
    execute: () => [
      { type: "accent", content: "📬  Get in Touch" },
      { type: "separator", content: SEP },
      {
        type: "jsx",
        content: (
          <span className="font-mono">
            {"  "}
            <span style={{ color: "#3FB950" }}>💼 LinkedIn </span>
            {"  "}
            <a
              href="https://www.linkedin.com/in/igorotavio96/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#6366F1", textDecoration: "underline" }}
              className="hover:opacity-70 transition-opacity"
            >
              linkedin.com/in/igorotavio96
            </a>
          </span>
        ) as ReactNode,
      },
      {
        type: "jsx",
        content: (
          <span className="font-mono">
            {"  "}
            <span style={{ color: "#3FB950" }}>🐙 GitHub </span>
            {"  "}
            <a
              href="https://github.com/igor-oc-diniz"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#6366F1", textDecoration: "underline" }}
              className="hover:opacity-70 transition-opacity"
            >
              github.com/igor-oc-diniz
            </a>
          </span>
        ) as ReactNode,
      },
      {
        type: "jsx",
        content: (
          <span className="font-mono">
            {"  "}
            <span style={{ color: "#3FB950" }}>📧 Email </span>
            {"  "}
            <a
              href="mailto:igor.oc.diniz@gmail.com"
              style={{ color: "#6366F1", textDecoration: "underline" }}
              className="hover:opacity-70 transition-opacity"
            >
              igor.oc.diniz@gmail.com
            </a>
          </span>
        ) as ReactNode,
      },
    ],
  },

  // ── open ───────────────────────────────────────────────────────────────────
  {
    name: "open",
    description: "Open a link — usage: open linkedin | open github",
    execute: (args?: string[]) => {
      const target = args?.[0]?.toLowerCase();
      if (target === "linkedin") {
        if (typeof window !== "undefined") {
          window.open(
            "https://www.linkedin.com/in/igorotavio96/",
            "_blank",
            "noopener,noreferrer",
          );
        }
        return [
          { type: "success", content: "🚀  Opening LinkedIn profile..." },
        ];
      }
      if (target === "github") {
        if (typeof window !== "undefined") {
          window.open(
            "https://github.com/igor-oc-diniz",
            "_blank",
            "noopener,noreferrer",
          );
        }
        return [{ type: "success", content: "🚀  Opening GitHub profile..." }];
      }
      return [
        { type: "error", content: `❌  Unknown target: "${target ?? ""}"` },
        { type: "accent", content: "    Usage: open linkedin | open github" },
      ];
    },
  },

  // ── recruiter ──────────────────────────────────────────────────────────────
  {
    name: "recruiter",
    description: "Toggle Recruiter Mode — reorganises the page for recruiters",
    aliases: ["rm"],
    execute: () => {
      const wasActive = selectIsRecruiterActive(store.getState());
      store.dispatch(toggleRecruiterMode());
      return wasActive
        ? [
            {
              type: "success" as const,
              content: "✅ Recruiter Mode OFF — back to default view.",
            },
          ]
        : [
            {
              type: "success" as const,
              content:
                "✅ Recruiter Mode ON — page reorganised for recruiters.",
            },
            {
              type: "text" as const,
              content: "   Experience → Skills → About → Contact → Terminal",
            },
          ];
    },
  },

  // ── banner ─────────────────────────────────────────────────────────────────
  {
    name: "banner",
    description: "Display the welcome banner",
    execute: () => [
      {
        type: "accent",
        content: " ██╗  ██████╗   ██████╗  ██████╗ ",
        delay: 30,
      },
      {
        type: "accent",
        content: " ██║ ██╔════╝  ██╔═══██╗ ██╔══██╗",
        delay: 30,
      },
      {
        type: "accent",
        content: " ██║ ██║  ███╗ ██║   ██║ ██████╔╝",
        delay: 30,
      },
      {
        type: "accent",
        content: " ██║ ██║   ██║ ██║   ██║ ██╔══██╗",
        delay: 30,
      },
      {
        type: "accent",
        content: " ██║ ╚██████╔╝ ╚██████╔╝ ██║  ██║",
        delay: 30,
      },
      {
        type: "accent",
        content: " ╚═╝  ╚═════╝   ╚═════╝  ╚═╝  ╚═╝",
        delay: 30,
      },
      { type: "text", content: "" },
      { type: "highlight", content: "Senior Frontend Developer & Tech Lead" },
      { type: "separator", content: SEP },
      { type: "text", content: 'Type "help" to see available commands.' },
    ],
  },

  // ── clear ──────────────────────────────────────────────────────────────────
  {
    name: "clear",
    description: "Clear terminal output",
    aliases: ["cls"],
    execute: () => [], // handled specially in useTerminal
  },
];

// ─── Easter egg ───────────────────────────────────────────────────────────────

export function getEasterEggOutput(): OutputLine[] {
  return [
    {
      type: "accent",
      content: "  ██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗ ██╗",
      delay: 30,
    },
    {
      type: "accent",
      content: "  ██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝ ██║",
      delay: 30,
    },
    {
      type: "accent",
      content: "  ███████║██║██████╔╝█████╗      ██╔████╔██║█████╗   ██║",
      delay: 30,
    },
    {
      type: "accent",
      content: "  ██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝   ╚═╝",
      delay: 30,
    },
    {
      type: "accent",
      content: "  ██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗ ██╗",
      delay: 30,
    },
    {
      type: "accent",
      content: "  ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝     ╚═╝╚══════╝ ╚═╝",
      delay: 30,
    },
    { type: "text", content: "" },
    {
      type: "text",
      content: "  sudo: permission denied — but let's talk anyway.",
    },
    { type: "separator", content: SEP },
    {
      type: "text",
      content: "  I'm actively looking for my next challenge as",
    },
    { type: "highlight", content: "  Senior Frontend Engineer or Tech Lead." },
    { type: "text", content: "" },
    { type: "highlight", content: "  💼  linkedin.com/in/igorotavio96" },
    { type: "highlight", content: "  📧  igor.oc.diniz@gmail.com" },
    { type: "separator", content: SEP },
    {
      type: "success",
      content: "  Great engineers get hired. Let's make it happen. 🚀",
    },
  ];
}

// ─── Command lookup ───────────────────────────────────────────────────────────

export function findCommand(input: string): Command | undefined {
  const name = input.trim().toLowerCase();
  return commands.find((c) => c.name === name || c.aliases?.includes(name));
}
