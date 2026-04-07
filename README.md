# BitLabs Website (`bitlabs.site`)

Corporate website for BitLabs, a Tokyo-based AI R&D and consulting company.

## Overview

This project is the production website codebase for **bitlabs.site**. It is designed to communicate:
- Technical depth
- Research credibility
- Enterprise readiness
- Delivery reliability

The site content and UI follow a factual, enterprise-appropriate tone and avoid hype or unverified claims.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- React Hook Form + Zod (contact form validation)
- ESLint 9

## Routes

- `/` Home
- `/services`
- `/research`
- `/about`
- `/contact`

## Key Features

- Editorial, minimal visual design with subtle motion
- Shared site shell (header/footer) and centralized content constants
- SEO baseline metadata configured in the root layout
- Contact form with:
  - Required fields and schema validation
  - Honeypot anti-spam field
  - Client-side submission state feedback

## Project Structure

```text
src/
  app/
    about/page.tsx
    contact/page.tsx
    research/page.tsx
    services/page.tsx
    page.tsx
    layout.tsx
    globals.css
  components/
    contact-form.tsx
    site-header.tsx
    site-footer.tsx
    fade-in.tsx
    adam-chat-widget.tsx
  lib/
    site-content.ts
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start development server

```bash
pnpm dev
```

Open `http://localhost:3000`.

### 3. Lint

```bash
pnpm lint
```

### 4. Build for production

```bash
pnpm build
```

### 5. Run production server locally

```bash
pnpm start
```

## Environment Variables

No secrets are required for the current static/contact-flow implementation.

If/when backend integrations are added (email delivery, CRM, anti-bot verification, analytics), all secrets must be provided through environment variables and **must not** be hardcoded in client code.

Example pattern:

```bash
# .env.local (example only)
API_BASE_URL=https://api.example.com
TURNSTILE_SECRET_KEY=...
```

## Security and Privacy Rules

This repository follows strict security/privacy constraints:

- No secrets, keys, or tokens in frontend source
- No private endpoint leakage
- No confidential client names unless explicitly approved
- No private research artifacts or internal data exposure
- Use least-privilege integration patterns

Current contact form anti-spam protection uses a hidden honeypot field. For production hardening, add server-side validation plus Turnstile/hCaptcha and rate limiting.

## SEO Baseline

Configured metadata includes:

- Brand: BitLabs
- Domain: `https://bitlabs.site`
- Location: Tokyo, Japan
- Keywords: AI consulting, AI R&D, AI agents, LLM fine-tuning, SLM development, enterprise AI

Primary metadata is defined in `src/app/layout.tsx`.

## Deployment (Vercel)

Recommended deployment target is Vercel.

### Standard flow

1. Push to GitHub (`main` branch)
2. Import repo in Vercel
3. Configure required environment variables
4. Build command: `pnpm build`
5. Output: handled by Next.js default

## Content and Brand Constraints

- Keep tone clear, factual, and technically grounded
- Do not copy external brand assets, logos, proprietary visuals, or protected copy
- Keep claims auditable and enterprise-appropriate

## Git Workflow

Typical commands:

```bash
git add -A
git commit -m "feat: ..."
git push origin main
```

## Notes for Future Work

- Add server action or API route for real contact delivery
- Add bot protection (Turnstile/hCaptcha) and rate limiting
- Add analytics with privacy-aware consent handling
- Add automated tests for page rendering and form behavior
