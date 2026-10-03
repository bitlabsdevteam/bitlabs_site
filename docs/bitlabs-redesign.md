# BitLabs website implementation

The website now explains BitLabs through business problems, readable engineering scope, a public synthetic example, delivery practice, and operational controls. The approved dark editorial direction and existing logo are retained.

## Routes and content

English URLs are unchanged. Each public page has a Japanese counterpart under `/ja`. Separate root layouts set the document language before hydration; text and metadata are server rendered. Locale links navigate to the equivalent page and preserve anchors.

- Home, Services, Research, About, Contact, and Careers are statically generated.
- `/expertises` permanently redirects to `/services`; the Japanese equivalent behaves the same way.
- `/about#contact-form` remains a working entry point, with a compact contact section linking to the dedicated form and direct email.
- Research entries are typed in `src/lib/research.ts`. Only entries marked `published` generate detail routes. Unknown or unpublished slugs return 404.
- The first entry is an explicitly illustrative, deterministic purchase-request workflow with synthetic data. It includes author/date, question, method, observations, limitations, business relevance, interactive approval/rejection, and a downloadable JSON artifact. It calls no model or business system.
- Research themes remain labeled directions. There are no invented clients, outcomes, percentages, partnerships, or response-time promises.

Editorial translations live in `src/lib/editorial-content.ts`. Existing company, application, and form records remain in `src/lib/site-content.ts`. Shared server page components are in `src/components/editorial-pages.tsx`; interactivity is restricted to navigation and forms/demonstration components.

## Contact and careers

The contact API contract and server validation remain unchanged. Email credentials and recipient configuration remain server environment variables. Existing honeypot protection is preserved.

The contact form uses typed email/autocomplete semantics, matching field length limits, associated validation errors, first-error focus, loading/disabled states, live announcements, and recoverable failures. An unsent draft stays in session storage for the current tab, survives locale navigation/reloads, and is cleared on successful submission. Disabled storage does not prevent form submission. A 20-second timeout restores the ability to retry.

Careers retains `/career`, the existing roles, optional resume upload, and `/api/application`. Its form has explicit accessible names and error references. The inquiry and application tests intercept requests or mock the mailer; no real mail was sent during verification.

## Visual system and accessibility

Charcoal surfaces, ivory text, warm gold accents, IBM Plex Sans, and Noto Sans JP. Next.js self-hosts the font files in the build; the build requires access to Google Fonts. Essential text is visible without animation. Reduced-motion preferences disable the diagram entrance and transitions. Mobile navigation supports disclosure, Escape dismissal, and focus return. A skip link leads to the main content.

Screenshots and the independent finish review are in `output/review/`. The review passed with no material findings. `DESIGN.md` records the implemented system.

## Verification

Commands:

```sh
npm run lint
npm run build
npm test
npm run test:e2e
# Existing mobile-only entry point:
npx playwright test --config playwright.mobile.config.ts
```

Final result: production build and lint passed; 11 API tests and 92 browser checks passed across desktop Chromium, mobile Chromium, and iPhone WebKit. Seven project-specific duplicates were intentionally skipped. The 10 initially failing checks passed on a targeted rerun after fixing the careers field name, correcting root URL assertions, and using Safari’s native link-tab shortcut.

Coverage includes both languages, route metadata and alternate URLs, redirects, internal links, 404s, sitemap/robots, the social image and downloadable artifact, 320px reflow, mobile navigation, reduced motion, keyboard access, synthetic workflow branches, mocked contact success/validation/server/network failure/retry/loading, draft restoration/clearing, and a mocked careers application. Safari uses Option-Tab to include links when full keyboard access is off.

Representative local desktop/mobile loading checks assert cumulative layout shift below 0.1 and largest contentful paint below 4 seconds for Home, Japanese Home, and Contact. These are local, unthrottled smoke checks, not field Core Web Vitals measurements or a production performance guarantee.

The production build can emit Next.js's default metadata-base warning for the framework-generated not-found page. Every published page explicitly defines the `https://bitlabs.site` metadata base, and published canonical, alternate, and social URLs are verified. Deployment and live SMTP delivery are outside this implementation verification.
