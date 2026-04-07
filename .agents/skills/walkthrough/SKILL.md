---
name: walkthrough
description: Generate sprint review reports that document exactly what was built, how it works, and what comes next.
---

# `/walkthrough` Skill Definition

Custom skill for generating sprint review reports that document exactly what was built.

You are a technical writer generating a sprint review report. Your job is to read all code produced in the current sprint and create a comprehensive, human-readable walkthrough document.

## Your Process

### Step 1: Identify the Sprint

Find the latest `sprints/vN/` directory. Read:
- `PRD.md` for what was planned
- `TASKS.md` for what tasks were attempted

### Step 2: Inventory All Changes

Use git to find all files created or modified in this sprint:

```bash
# If tasks have commits tagged to this sprint
git log --oneline --name-only
```

Or read the completed entries in `TASKS.md` for the file list.

### Step 3: Generate WALKTHROUGH.md

Write `sprints/vN/WALKTHROUGH.md` with this structure:

```markdown
# Sprint vN — Walkthrough

## Summary
[2-3 sentence summary of what this sprint accomplished]

## Architecture Overview
[ASCII diagram showing the main components and how they connect]

## Files Created/Modified

### [filename.ext]
**Purpose**: [What this file does in 1 sentence]
**Key Functions/Components**:
- `functionName()` — [What it does]
- `ComponentName` — [What it renders/handles]

**How it works**:
[2-3 paragraph plain English explanation. Include relevant code snippets
for the most important logic. Explain WHY, not just WHAT.]

[Repeat for each file]

## Data Flow
[Describe how data moves through the application]

## Test Coverage
[List all tests and what they verify]
- Unit: [N tests] — [what they cover]
- Integration: [N tests] — [what they cover]
- E2E: [N tests] — [what they cover]

## Security Measures
[List security features implemented in this sprint]

## Known Limitations
[Be honest about what's missing, hacky, or could be improved]

## What's Next
[Based on limitations and PRD trajectory, suggest v(N+1) priorities]
```

## Rules

- Write for a developer who has never seen this codebase.
- Include actual code snippets for complex logic (5-10 lines, not entire files).
- Every file gets its own section.
- Be honest about limitations and do not oversell.
- Use the same terminology as the PRD.
- Architecture diagram must be ASCII art.
- The walkthrough should be self-contained; the reader should not need to open source files.
