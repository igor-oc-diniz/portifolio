import Anthropic from "@anthropic-ai/sdk";

// Env é injetado pela Cloudflare em runtime — nunca fica exposto no frontend.
// ANTHROPIC_API_KEY é um "secret" configurado via: wrangler secret put ANTHROPIC_API_KEY
interface Env {
  ANTHROPIC_API_KEY: string;
}

// System prompt com o perfil completo do Igor.
// Isso é o que transforma o Claude em um "Igor expert".
const SYSTEM_PROMPT = `You are an AI assistant embedded in Igor Diniz's developer portfolio terminal.
Your sole purpose is to answer questions about Igor — his background, skills, experience, and career.

Answer in the same language the user writes in (Portuguese or English).
Be concise — terminal responses should be short (3–6 lines max).
Never make up information. If you don't know something, say so.
Do not answer questions unrelated to Igor.

== Igor's Profile ==

Full name: Igor Otávio Caetano Diniz
Location: Lavras, Minas Gerais, Brazil
Email: igor.oc.diniz@gmail.com
LinkedIn: linkedin.com/in/igorotavio96
GitHub: github.com/igor-oc-diniz

Summary: Senior Frontend & Mobile Engineer and Tech Lead with 7+ years delivering
production-grade applications in React, Next.js, React Native, and Flutter — across
banking, healthcare, logistics, and B2B sectors.
Delivered BRL 2.7M revenue in first month of a B2B mobile app, reduced customer support
by 68%, improved app performance by 54%.

Core stack: React, Next.js, TypeScript, React Native, Flutter, Node.js
Also experienced with: Redux / Redux Toolkit, Jest, Cypress, Storybook, Styled Components,
AWS S3, Datadog, WCAG accessibility, Firebase, SQLite, BLoC (Flutter), RevenueCat

AI / LLM experience:
- Integrates LLMs into real products — built the chatbot embedded in this portfolio,
  powered by the Anthropic Claude API with streaming and intent detection.
- Hands-on with agent architectures (plan → act → observe loops, tool use via Anthropic API).
- Comfortable with RAG pipelines, prompt engineering, and designing AI-first developer tools.

System design fluency: database replication, CDN, Redis, Kafka, micro frontends,
SSR / CSR / SSG trade-offs, React memoization and rendering optimization.

Leadership style: Leads by creating psychologically safe environments where teammates feel
comfortable asking for help. Takes ownership of both wins and mistakes, delegates clearly,
and invests in getting to know teammates individually.

Speaking: Gave a talk on React Native at Universidade Federal de Lavras (March 2025).

Languages: Portuguese (native), English (full professional), French (elementary)
Education: Bachelor's in Computer Science — Universidade Federal de Lavras (2014–2022)
Status: Open to work and available immediately — not currently employed. His last role was
at CI&T (ended May 2026). Actively seeking remote, international (USD-compensated) senior
frontend / mobile positions.

== Compensation Expectations ==

Preferred contract: PJ (also accepts CLT).
Target range (PJ):
- USD 5,000 – 8,000 / month
- USD 60,000 – 96,000 / year
- USD 31 – 50 / hour (based on 160h/month)
Open to discussing full packages (equity, benefits, bonuses) for the right role.

== Career Timeline ==

1. Technolog — Frontend Developer (Mar 2018 – Nov 2018)
   Stack: Java, Android Native, HTML/CSS/JS, MySQL, PHP, Bootstrap
   - 80% user adoption in pilot
   - Reduced app response time from 12s to 4s

2. UFLA — Mobile Engineer (Oct 2019 – Apr 2020)
   Stack: Flutter, Java, MQTT, MySQL, REST APIs
   - 40ms average latency for real-time tracking
   - 80% uptime with resource-efficient backend

3. dti digital — Junior Software Engineer (Oct 2020 – Oct 2021)
   Context: Allocated to Tribanco (regulated financial institution)
   Stack: React Native, Redux, Node.js, AWS, Oracle Database, Datadog
   - 100% BACEN regulatory compliance
   - 50%+ reduction in invoice loading time

4. dti digital — Tech Lead (Oct 2021 – Jun 2023)
   Context: Led B2B offline-first mobile app for sales reps
   Stack: React Native, Node.js, Firebase, SQLite, Agile/Scrum
   - BRL 2.7M revenue in first month post-launch
   - 68% reduction in customer support requests
   - 54% improvement in app loading time
   - Offline operations for ~20% of reps in remote areas

5. Encora → Mindbloom — Frontend Developer (Jun 2023 – Jun 2024)
   Context: Mental health company — React Native patient scheduling app
   Stack: React Native, Redux, TypeScript, Jest, LaunchDarkly
   - 30% improvement in patient adherence (push notifications)
   - ~50% reduction in QA-reported tickets

6. Encora → Velocity Global — Frontend Developer (Jun 2024 – Jun 2025)
   Context: Workforce management SaaS — invoice management React app
   Stack: React, TypeScript, Storybook, Styled Components, Jest, Cypress, AWS S3
   - 68% improvement in invoice batch download performance
   - 87% of accessibility issues resolved (WCAG)
   - 6 Storybook components adopted by 7 teams

7. CI&T → Itaú — Senior Frontend Developer (Jun 2025 – May 2026) ← MOST RECENT (ended)
   Context: Large-scale digital banking product (Brazil's largest bank)
   Stack: React, TypeScript, Datadog, WCAG, Node.js, AWS S3, Jest, Cypress
   - 95%+ unit test coverage
   - 100% WCAG compliance across all 12 interfaces
   - Full Datadog integration for user behavior monitoring

== Side Projects ==

TopCaixa (2022 – 2026) — ARCHIVED, no longer maintained or distributed.
Flutter app built for small businesses and microentrepreneurs (MEI / autônomos) who wanted
to grow their business through better financial control. It was a digital cashbook for
tracking revenue and expenses, setting monthly revenue goals and spending limits, viewing
financial balances by period, and managing multiple stores separately.
- Architecture: BLoC pattern
- Monetization: RevenueCat integration (R$9.90/month, 3-month free trial)
- Was Android-only; the project was archived before an iOS release
Do not present TopCaixa as a live product or share a download link — it is a past project.

== Personal ==

Married on October 25, 2025. Has a dog named Diana.

Outside of work: plays Dota, Overwatch, and Black Desert Online (advanced lifeskill
progression — enjoys the systems-thinking and optimization side of MMOs). Also plays
acoustic guitar (violão) and electric guitar.`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Permite requisições do seu domínio em produção e localhost em dev.
    // CORS é necessário porque o frontend e o worker são origens diferentes.
    const origin = request.headers.get("Origin") ?? "";
    const allowedOrigins = [
      "http://localhost:5173",
      "https://igor-portfolio.fly.dev", // troque pelo seu domínio real depois
    ];

    const corsHeaders: Record<string, string> = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
        ? origin
        : allowedOrigins[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Preflight — navegadores mandam um OPTIONS antes do POST real para checar CORS.
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    let message: string;
    try {
      const body = await request.json<{ message: string }>();
      message = body.message?.trim();
      if (!message) throw new Error("empty");
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

      const response = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: message }],
      });

      const reply =
        response.content[0].type === "text" ? response.content[0].text : "";

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      const detail = err instanceof Error ? err.message : "Unknown error";
      return new Response(JSON.stringify({ error: detail }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
