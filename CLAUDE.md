# CLAUDE.md

Guidance for Claude Code when working in this repository. This file incorporates
and extends the build brief in `AGENTS.md` (imported below). Where this file and
`AGENTS.md` overlap, both apply; the rules in `AGENTS.md` are authoritative for
product scope, tone, and security policy.

@AGENTS.md

---

## 1. Project Overview

**bitlabs.site** — the corporate website for **BitLabs**, a Tokyo-based AI R&D and
consulting company. The site communicates technical depth, research credibility,
enterprise readiness, and delivery reliability through an editorial, minimal,
Anthropic-inspired visual system with subtle motion.

See `AGENTS.md` for full company context, mission, content requirements, tone, and
the non-negotiable design/security rules.

## 2. Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/postcss`), global styles in `src/app/globals.css`
- **Motion:** Framer Motion, GSAP, Lenis (smooth scroll)
- **3D / cinematic:** Three.js with `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Forms & validation:** React Hook Form + Zod (`@hookform/resolvers`)
- **Testing:** Playwright (e2e, `tests/`), Vitest (unit)
- **Lint/format:** ESLint (`eslint-config-next`) + Prettier
- **Deployment:** Vercel-ready

## 3. Commands

```bash
npm run dev       # Start dev server via scripts/dev-safe.mjs (safe port handling)
npm run dev:raw   # Plain `next dev` (bypasses the safe wrapper)
npm run build     # Production build
npm run start     # Serve the production build
npm run lint      # ESLint

npx playwright test                    # Run all e2e tests
npx playwright test tests/<file>       # Run a single spec
npx vitest                             # Run unit tests
```

`npm run dev` uses `scripts/dev-safe.mjs`, which detects and avoids conflicting
processes already listening on the dev port before starting Next.js. Prefer it over
`dev:raw`.

## 4. Architecture & Layout

```
src/
  app/                      # Next.js App Router
    layout.tsx              # Root layout (fonts, providers, header/footer)
    page.tsx                # Home route (/)
    globals.css             # Tailwind layers + global tokens/animations
    about/   contact/   research/   services/   expertises/   # Route segments
    api/adam-chat/route.ts  # Adam chat endpoint (Zod-validated, supports web search)
  components/
    page-content/           # Per-route content sections (home, services, research,
                            #   about, contact, expertises) — page.tsx files stay thin
    site-header.tsx  site-footer.tsx  bitlabs-logo.tsx
    language-provider.tsx   # i18n / language context
    adam-chat-widget.tsx    # Client widget that calls /api/adam-chat
    *-hero-visual.tsx       # 3D / animated hero visuals
    landing-cinematic-*.tsx # Cinematic landing scenes (incl. Three.js + Blender-derived)
    cinematic-motion.ts  motion-preferences.ts  # Shared motion config & reduced-motion
    fade-in.tsx  section-parallax.tsx  landing-scroll-fade.tsx  # Motion primitives
  lib/
    site-content.ts         # Central source of site copy/content data
public/
  images/  videos/  models/ # Static assets, 3D models, cinematic media
tests/                      # Playwright specs (home-cinematic, mobile-layout)
```

### Conventions

- **Routes are thin.** `app/<route>/page.tsx` should render a matching component
  from `src/components/page-content/`. Put real markup/logic there, not in `page.tsx`.
- **Content lives in data.** Prefer editing `src/lib/site-content.ts` over hardcoding
  copy inside components, so content stays centralized and translatable.
- **Server vs client.** Default to Server Components. Add `"use client"` only when a
  component needs hooks, browser APIs, motion, or interactivity (chat widget, 3D scenes).
- **Motion respects preferences.** Use the shared helpers in `motion-preferences.ts`
  and `cinematic-motion.ts`; honor `prefers-reduced-motion` for all animations.
- **3D is heavy — keep it lazy.** Cinematic/Three.js scenes should be dynamically
  imported and client-only; never block first paint on them.
- **Styling.** Tailwind utility classes first; shared tokens/keyframes go in
  `globals.css`. Keep the editorial, minimal, premium tone from `AGENTS.md`.

## 5. API & Validation

- API route handlers live under `src/app/api/`. The Adam chat endpoint
  (`api/adam-chat/route.ts`) validates every request body with a Zod schema —
  follow this pattern for any new endpoint: define a `requestSchema`, parse, and
  reject invalid input with a 4xx before doing work.
- Contact form uses React Hook Form + Zod for client-side validation and includes
  an anti-spam measure (see `AGENTS.md` content requirements).

## 6. Security & Privacy (enforced)

From `AGENTS.md`, strictly enforced in all changes:

- **No secrets in frontend source.** No API keys, tokens, or credentials committed
  to client code. Use environment variables; never log or echo secret values.
- **No private endpoint leakage**, no confidential client names (unless approved),
  no private research artifacts or internal data in the repo or copy.
- **Least-privilege** integration design for any external service.
- If requested content risks security, privacy, legal, or confidentiality issues,
  replace it with a safe alternative and continue.

## 7. SEO Baseline

Metadata should consistently reflect: brand **BitLabs**, domain **bitlabs.site**,
location **Tokyo, Japan**, and keywords: AI consulting, AI R&D, AI agents, LLM
fine-tuning, SLM development, enterprise AI. Set per-route `metadata` exports.

## 8. Working Agreements for Claude

- **Match the surrounding code** — naming, structure, comment density, and the
  thin-route / centralized-content patterns above.
- **Verify before claiming done.** Run `npm run lint` and the relevant Playwright/
  Vitest specs after changes that touch behavior or layout.
- **Don't add dependencies** without a clear need; the stack above is intentional.
- **Confirm before outward-facing or hard-to-reverse actions** (deploys, deletes,
  publishing). Commit/push only when asked.
- **Never copy external brand assets, logos, copy, or proprietary visuals** — build
  original work inspired by, not derived from, reference sites.
