# Igor Otávio Caetano Diniz — Personal Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-igor--oc--diniz.github.io-6366f1?style=for-the-badge&logo=github-pages&logoColor=white)](https://igor-oc-diniz.github.io/portifolio/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-ff4154?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

> A production-grade personal portfolio built with the same care and architecture I bring to the products I ship professionally.

---

## 🌐 Live

**[igor-oc-diniz.github.io/portifolio](https://igor-oc-diniz.github.io/portifolio/)**

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌗 **Dark / Light Theme** | CSS-variable-based design tokens, toggled via Redux — no flash on load |
| 🖥️ **Interactive Terminal** | Fully functional in-browser CLI with command history and typewriter output |
| 🤖 **AI Chat** | Powered by Claude (Anthropic) via Cloudflare Worker — answers questions about my background, experience, and skills in real time |
| 👔 **Recruiter Mode** | Dedicated view that surfaces key career metrics and highlights at a glance |
| 📊 **Performance Panel** | Real-time render metrics collected via `usePerformanceMetrics` hook |
| 🎞️ **Framer Motion Animations** | Scroll-triggered reveals, aurora gradient backgrounds, parallax layers |
| ⚡ **Lazy Loading + Skeletons** | Every section loads asynchronously with matching skeleton placeholders |
| 📱 **Fully Responsive** | Mobile-first layout adapted across all breakpoints |
| ♿ **Accessible** | Semantic HTML, keyboard navigable, reduced-motion respected |

---

## 🏗️ Architecture

The project follows **Atomic Design** — components are strictly layered and never import upward.

```
atoms → molecules → organisms → templates → App
```

```
src/
├── components/
│   ├── atoms/          # Primitive building blocks (Button, Badge, Text, Icon …)
│   ├── molecules/      # Composites of atoms (NavLink, ThemeToggle, TypewriterText …)
│   ├── organisms/      # Self-contained sections (Header, HeroSection, Terminal …)
│   └── templates/      # Page-level composition + skeleton pairs
├── store/
│   ├── slices/         # theme · ui · menu · experience · terminal · recruiter · performance
│   ├── hooks.ts        # useAppSelector / useAppDispatch (typed)
│   └── index.ts
├── hooks/              # useScrolled · useMediaQuery · useTypewriter · useParallax …
├── data/               # Static content: profile · skills · experience · contact · commands
├── lib/                # cn() utility (clsx + tailwind-merge)
└── styles/
    └── globals.css     # CSS custom properties (design tokens) for dark + light modes
```

### State Management

All shared state lives in Redux Toolkit slices. No prop drilling, no context spaghetti.

```
themeSlice       → dark / light toggle (applied as class on <html>)
uiSlice          → scroll position, section visibility
menuSlice        → mobile nav open/close
experienceSlice  → expanded card state
terminalSlice    → command history, output, input
recruiterSlice   → recruiter mode on/off
performanceSlice → FPS, render time, paint metrics
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 with concurrent features |
| **Language** | TypeScript 5.9 (strict) |
| **Bundler** | Vite 7 |
| **Styling** | Tailwind CSS v3 with CSS custom properties |
| **Animations** | Framer Motion v12 |
| **State** | Redux Toolkit v2 + React-Redux v9 |
| **Icons** | Lucide React |
| **Utilities** | clsx, tailwind-merge |
| **Deploy** | GitHub Pages via `gh-pages` |
| **AI Backend** | Cloudflare Workers + Anthropic Claude API |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Local Development

```bash
# Clone the repo
git clone https://github.com/igor-oc-diniz/portifolio.git
cd portifolio

# Install dependencies
npm install

# Start dev server (localhost:5173)
npm run dev
```

### Build & Preview

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `tsc -b && vite build` and publishes the `dist/` folder to the `gh-pages` branch.

---

## 🎨 Design System

Theming is driven entirely by CSS custom properties in [`src/styles/globals.css`](src/styles/globals.css). `:root` defines the dark theme; `.light` overrides the tokens. Tailwind picks them up via `tailwind.config.ts`.

```css
/* Dark (default) */
:root {
  --bg-primary:     #0a0a0f;
  --accent-primary: #6366f1;
  --text-primary:   #f1f5f9;
  /* … */
}

/* Light override */
.light {
  --bg-primary:     #f8fafc;
  --accent-primary: #4f46e5;
  --text-primary:   #0f172a;
  /* … */
}
```

Custom Tailwind animations:

| Class | Behavior |
|---|---|
| `animate-aurora` | 8s background-position shift — aurora gradient in the Hero section |
| `animate-gradient-shift` | 6s gradient shift — animated `GradientText` component |

---

## 📂 Sections

| Section | Component | Description |
|---|---|---|
| **Hero** | `HeroSection` | Name, typewriter titles, CTA buttons, aurora background |
| **About** | `AboutSection` | Bio, quick-facts, profile photo |
| **Skills** | `SkillsSection` | Grouped skill badges by category |
| **Experience** | `ExperienceSection` | Interactive career timeline (7 roles, 2018–present) |
| **Terminal** | `TerminalSection` | In-browser CLI — type `help` to get started |
| **AI Chat** | `AIChatSection` | Ask anything about my career, skills, and experience — powered by Claude |
| **Contact** | `ContactSection` | Links to email, LinkedIn, and GitHub |

---

## 🖥️ Terminal Commands

The interactive terminal supports a real command registry defined in [`src/data/commands.tsx`](src/data/commands.tsx). Try these in the live demo:

```
help        → list all available commands
about       → display profile summary
skills      → list technical skills
experience  → career timeline
contact     → contact information
clear       → clear the terminal
```

---

## 🤖 AI Chat

The portfolio includes an AI-powered chat that answers questions about my background, skills, and career in real time.

- **Model:** Claude (Anthropic)
- **Backend:** Cloudflare Worker — acts as a secure proxy between the frontend and the Anthropic API
- **Context:** The worker is pre-loaded with my full profile so Claude can answer questions like *"What's Igor's experience with React Native?"* or *"Has he worked in the financial sector?"*

The worker source lives in the [`worker/`](worker/) directory.

---

## 📋 Roadmap

- [x] Phase 1 — Design system & foundation
- [x] Phase 2 — Hero, About, Skills, Contact sections
- [x] Phase 3 — Interactive career timeline (Experience)
- [x] Phase 4 — Interactive terminal (CLI)
- [x] Phase 5 — Recruiter Mode & Performance Panel
- [x] Phase 6 — AI chat integration (Claude via Cloudflare Worker)

---

## 👤 About Me

Senior Frontend & Mobile Engineer with 7+ years delivering production-grade applications across banking, healthcare, and B2B sectors.

- 🏦 Currently at **CI&T** → allocated to **Itaú** (largest bank in Brazil)
- 📱 Previous: **Encora** → Velocity Global (SaaS) & Mindbloom (mental health)
- 🧑‍💻 Led a B2B offline-first mobile app that generated **BRL 2.7M revenue in its first month**
- ♿ Achieved **100% WCAG compliance** across 12 interfaces at Itaú
- 📍 Based in Brazil — open to remote opportunities globally

**[linkedin.com/in/igorotavio96](https://linkedin.com/in/igorotavio96)**

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with care by <a href="https://igor-oc-diniz.github.io/portifolio/">Igor Otávio Caetano Diniz</a>
</p>
