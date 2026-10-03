# Disposition

**Pass.** No material user-facing defects found in the supplied desktop/mobile screenshots and reviewed source. This is a visual and source review, not an independent browser test.

# Material findings

| Severity | Finding | Exact evidence |
| --- | --- | --- |
| — | None requiring correction. | All 14 supplied images in `output/review/`: desktop/mobile `home-hero`, `ja-hero`, `home`, `services`, `contact`, `ja-contact`, and `research-bounded-agent-workflow`. |

# Direction fidelity

The charcoal, ivory, restrained gold, editorial typography, left-aligned hero, original annotated diagram, thin dividers, and variable layouts follow `DESIGN.md`. Mobile stacks remain coherent. Gold inquiry actions stand out. The homepage positioning eyebrow and Research directions label are explicitly required by the user and take precedence over the generic craft-floor rule.

# Acceptance coverage

| Requirement | Evidence and assessment |
| --- | --- |
| Readable desktop/mobile, unclipped content, visible CTA | Supplied screenshots show intact headings, wrapped body copy, complete controls, and visible hero inquiry actions in English and Japanese. |
| Business-led content and five services | Home identifies workflow, model-quality, and production needs. Services screenshot and `editorial-pages.tsx` show five clear offers with suitable problems, deliverables, and evaluation. |
| Honest research evidence | Research screenshots and `research.ts` distinguish a deterministic synthetic illustration from a model benchmark or client result; method, observations, limitations, and download are explicit. |
| Bilingual experience | Japanese hero and contact screenshots are localized. Shared locale-based page rendering and bilingual research content support equivalent content; complete route SSR verification belongs to the parent's checks. |
| Navigation and accessible forms | Source provides named navigation, mobile disclosure state, Escape focus return, labeled fields, associated errors, required states, submission announcements, and a hidden honeypot. Contact screenshots show clear labels, hints, and submit actions. |
| About, Contact, retained Careers | Dedicated page components exist; supplied footer screenshots retain Careers and direct email. About/Careers were source-reviewed only. |
| Motion and contrast | Core content starts visible; diagram motion has a reduced-motion override. Text colors and typography appear readable in the supplied captures. No independent computed-style or contrast audit was performed. |

# Remaining limitations

No external reference comp was supplied; `DESIGN.md` is the visual authority. Interactive states, keyboard operation, route metadata, actual SSR output, and mail delivery were not independently exercised. The parent is handling canonical URL test normalization and the legacy career select accessible-name fix. The reported empty detector result is supplemental evidence, not the basis of this pass. Production deployment remains outside scope.
