---
name: "BitLabs"
description: "Dark editorial lab for practical AI research and delivery."
colors:
  paper: "#181a19"
  surface: "#202320"
  ink: "#f1eee5"
  muted-ink: "#b5b9ae"
  accent: "#cebb8e"
  line: "#3e423b"
  danger: "#ffb4a6"
  action-ink: "#20231d"
  accent-hover: "#e4d3aa"
  surface-hover: "#30342e"
  field-border: "#666d5d"
typography:
  display:
    fontFamily: "IBM Plex Sans, Noto Sans JP, sans-serif"
    fontSize: "clamp(2.75rem, 5.2vw, 4.65rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "IBM Plex Sans, Noto Sans JP, sans-serif"
    fontSize: "clamp(1.9rem, 3.2vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "IBM Plex Sans, Noto Sans JP, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "IBM Plex Sans, Noto Sans JP, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Sans, Noto Sans JP, sans-serif"
    fontSize: "12px"
    letterSpacing: "0.12em"
  annotation:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "11px"
    letterSpacing: "0.04em"
  display-ja:
    fontFamily: "Noto Sans JP, IBM Plex Sans, sans-serif"
    fontSize: "clamp(2.3rem, 4.8vw, 4.2rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.025em"
rounded:
  control: "2px"
  panel: "12px"
spacing:
  field-gap: "8px"
  form-gap: "22px"
  section-mobile: "48px"
  section-desktop: "84px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-hover}"
  text-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  field-control:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  status-label:
    textColor: "{colors.accent}"
  surface-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
  workflow-demo:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "30px 34px"
---

# Design System: BitLabs

## Overview

**Creative North Star: "Dark editorial lab"**

The dark editorial lab is the approved visual direction: charcoal surfaces, warm ivory type, restrained gold, and an original BitLabs mark. It communicates research depth and enterprise delivery through readable explanations, precise diagrams, and calm spacing. No external approved comp existed; the committed direction and implemented interface are the visual authority.

The interface leads with business needs and uses technical annotations to explain how work is delivered. Typography, thin rules, and varied column structures provide hierarchy. Motion is a small enhancement to content that is already visible, never a prerequisite for reading.

**Key Characteristics:**
- Dark charcoal and warm ivory with selective gold emphasis.
- IBM Plex Sans for English; Noto Sans JP for Japanese.
- Editorial sections with generous spacing and thin dividers.
- Annotated systems and explicitly labeled synthetic examples.
- Visible content, native language links, and restrained motion.

## Colors

### Primary

Restrained gold (`accent`) identifies inquiry actions, selective headline emphasis, section labels, and the model/review parts of diagrams. Its lighter hover partner belongs to primary controls. Action text uses the dark `action-ink` token.

### Neutral

Charcoal paper is the default page and header. The slightly lighter surface groups interactive examples and form controls. Warm ivory is the primary text; muted ink carries supporting explanations and metadata. The line token defines quiet dividers. Surface-hover and field-border support control states.

Danger is a functional error color, reserved for invalid borders and associated messages. It is not an additional brand accent. Frontmatter values mirror the normative CSS values; these names do not introduce a new palette.

## Typography

English uses IBM Plex Sans followed by Noto Sans JP and sans-serif. Japanese reverses the named families. Fonts are served through Next font optimization. The original logo keeps its own wordmark treatment. Monospace is confined to technical annotations and code.

The frontmatter records default display, headline, title, body, label, annotation, and Japanese display roles. Headings have regular weight and balanced wrapping. Body copy is quieter in color, not reduced to tiny text. Hero leads use 17px at 1.8 line height and approximately 60ch measure; general introductory copy uses up to 65–70ch. Article prose is limited to 760px with 17px text at 1.85 line height.

Japanese headings allow more vertical breathing room: h1 line height is 1.35 and h2 is 1.45. The Japanese hero uses `clamp(2.3rem, 4.2vw, 3.8rem)` on larger screens and `clamp(2.15rem, 8vw, 3.6rem)` at 700px and below. English mobile hero type uses `clamp(2.5rem, 9.7vw, 3.9rem)`, with a 15ch measure. Preserve language-specific wrapping instead of imposing English line lengths on Japanese.

## Layout

The desktop shell is capped at 1280px with 48px side space. At 1100px and below, side space is 32px; at 700px it is 20px; at 360px it is 16px. Main sections have 84px vertical padding, reduced to 48px at the mobile breakpoint. These are observed rhythm anchors, not a fabricated universal spacing scale.

The homepage opens with a stable, left-aligned headline and an annotated system diagram in a 1.25:0.85 grid. It stacks copy above the diagram at 700px. Other pages use a wide heading, then explanatory structures fitted to their content. Two-column introductions, offset needs/service sections, three-column capabilities, and four-step delivery lists create variety. Delivery becomes two columns at 900px and one at 360px; most other editorial grids become one column at 700px.

The sticky header is 88px tall on desktop, 78px at 900px and 74px at 700px. Primary navigation changes to a disclosure at 900px while EN / 日本語 remain visible. Actions wrap naturally. Contact field pairs and workflow steps become single-column at 700px. English routes are unprefixed and Japanese routes use `/ja`; equivalent content is server rendered.

## Elevation & Depth

The editorial system uses no shadows. Depth comes from charcoal tonal differences, thin solid rules, and a dashed system boundary. The footer is a slightly darker plane. There are no blurred glass panels or hover lifts in the implemented primitives.

## Shapes

Controls have near-square corners using the control radius. Interactive example panels and the retained application panel use the panel radius. Most editorial content is open, separated by rules rather than enclosed. Circular shapes are limited to numbered step markers and the small diagram indicator. The geometric model drawing and original BitLabs mark are authored vectors.

## Components

- **Actions:** Gold primary controls, bordered secondary controls, and underlined text actions. Solid controls have a 50px minimum height, medium 14px text, and 160ms color/background transitions. Text actions have a 44px minimum height. Global keyboard focus is a gold 2px outline offset by 5px; disabled buttons lower opacity to 0.55.
- **Navigation:** The sticky opaque header holds the original mark, Services, Research, About, inquiry action, and visible native EN / 日本語 links. Current pages are underlined; hover changes text to gold. Mobile disclosure exposes expanded state and returns focus to its toggle on Escape. Language anchors navigate to the equivalent route and retain an existing hash when activated. The footer retains Careers and verified direct contact email.
- **Forms:** Persistent labels, bordered surface controls, required states, associated error messages, and polite submission announcements. Field focus uses a gold border and 2px outline offset by 2px. Textareas are vertically resizable with a 160px minimum height. Contact drafts persist for the tab session and clear after success; loading disables the fieldset. Keep the existing hidden anti-spam field outside the visible flow.
- **Status labels and research rows:** Small gold text identifies research status without pill backgrounds. Research rows combine title, summary, author/date, and an underlined action. Status explicitly distinguishes illustrative synthetic material from research findings.
- **Annotated system diagram:** HTML labels and an original inline SVG explain input, context, model, permissions, human review, and output. The dashed boundary and gold model/review emphasis communicate structure. A single 650ms entrance translates already-visible content by 10px using `cubic-bezier(0.16, 1, 0.3, 1)`; no opacity gate is present.
- **Synthetic workflow:** A rounded tonal panel contains four numbered steps, policy/tool annotations, approval/rejection controls, and a reserved status area. It demonstrates a deterministic purchase-request workflow without external action. Approval and rejection lock those controls until reset; the status message announces the resulting state.
- **Motion:** Link and control color transitions are brief. Reduced-motion preferences remove animations, transitions, and smooth scrolling globally. Core information and all static diagram labels remain readable without motion.

The implementation source is `src/app/globals.css` with `editorial-pages.tsx`, `system-diagram.tsx`, `workflow-demo.tsx`, `site-header.tsx`, and `contact-form.tsx`. The sidecar at `.impeccable/design.json` holds component previews and metadata outside the frontmatter schema. Its synthesized tonal ramps are preview aids, not additional production tokens.

## Do's and Don'ts

### Do:
- Do retain the original BitLabs mark and approved charcoal, ivory, and gold direction.
- Do use typography, whitespace, and thin rules to organize editorial content.
- Do keep essential English and Japanese content visible on the server-rendered page.
- Do preserve clear focus, field labels, associated errors, and submission announcements.
- Do label synthetic examples and distinguish them from findings or client work.

### Don't:
- Don't replace the stable hero with rotating messages or animation-dependent copy.
- Don't turn every section into a card grid.
- Don't copy external brand assets, logos, copy, or proprietary visuals.
- Don't introduce unverified client claims, credentials, outcomes, or vendor logos.
- Don't use motion that hides content or overrides reduced-motion preferences.
