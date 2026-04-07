# AGENTS.md - BitLabs Website Build Instructions

## Project
Build and maintain **bitlabs.site**, the corporate website for BitLabs.

## Company Context
BitLabs is a Tokyo-based AI R&D and consulting company with expertise in:
- AI agent solutions
- Enterprise AI architecture and delivery
- LLM pre-training and fine-tuning
- SLM design and training from scratch
- Custom React + AI applications
- Prompt, context, and harness engineering
- Secure cloud deployment for LLM systems
- OpenClaw custom solution implementation
- Ongoing deep AI research

Mission:
- Help people and businesses solve daily problems with practical AI
- Drive measurable business growth through secure and reliable AI systems

## Website Goals
The website should communicate:
- Technical depth
- Research credibility
- Enterprise readiness
- Delivery reliability

## Design Direction
Build an original visual system inspired by modern Anthropic-style corporate websites:
- Editorial, clean layout
- Strong typography hierarchy
- Intentional whitespace
- Subtle motion
- Premium and minimal visual tone

Hard rule:
- Never copy external brand assets, logos, copy, or proprietary visuals.

## Tone
- Clear, factual, confident
- Technical but understandable
- Enterprise-appropriate
- No hype, no inflated claims

## Required Routes
- `/` Home
- `/services`
- `/research`
- `/about`
- `/contact`

## Content Requirements
Home:
- Hero with positioning and CTA
- Capabilities summary
- Security and deployment strength
- Research highlight

Services:
- AI Agent Solutions
- Enterprise AI Solutions
- LLM/SLM Pre-training & Fine-tuning
- Custom AI Apps
- Secure Cloud Deployment

Research:
- SLM research
- Fine-tuning methods
- Agentic system design
- Evaluation and reliability

About:
- Tokyo company profile
- Team strengths
- Mission and working principles

Contact:
- Form fields: name, work email, company, project brief
- Validation and anti-spam measure

## Security & Privacy Rules
Strictly enforce:
- No secrets/keys/tokens in frontend source
- No private endpoint leakage
- No confidential client names unless approved
- No private research artifacts or internal data
- Use environment variables for all secrets
- Follow least-privilege integration design

## Technical Stack
- Next.js 16 + React 19 + TypeScript 5.9
- Tailwind CSS 4
- Framer Motion for subtle animation
- Zod + React Hook Form for contact validation
- Vercel-ready deployment setup

## SEO Baseline
Metadata should reflect:
- Brand: BitLabs
- Domain: bitlabs.site
- Location: Tokyo, Japan
- Keywords: AI consulting, AI R&D, AI agents, LLM fine-tuning, SLM development, enterprise AI

## Final Rule
If requested content risks security, privacy, legal, or confidentiality issues, replace it with a safe alternative and continue.
