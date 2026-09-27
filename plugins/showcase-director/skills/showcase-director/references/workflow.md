# Production workflow

## 1. Product truth and brief

Write `BRIEF.md` with audience, central outcome, destination, aspect, duration, voice/music and delivery scope. Build the evidence ledger before choosing persuasive claims. Save source URLs, observation dates and verification levels. Capture only authorized UI; sanitize it before use.

## 2. Story and stills

First write `STORYLINE.md` and present the narrative for review. Do not design the storyboard until the storyline is approved, unless the user explicitly delegated autonomous creative decisions. `STORYLINE.md` records the approved message and narrative; `STORYBOARD.md` later translates it into individual visual scenes. They have separate jobs.

Use a short arc: friction → product action → visible result → memorable takeaway. This is a starting structure, not four compulsory title cards. Get into the product quickly. Write exact on-screen copy; avoid abstract feature lists.

Native storyboard format:

```markdown
---
format: 1920x1080
message: "One clear product outcome"
arc: "Friction → action → result"
audience: "Specific product users"
---

## Frame 1 — First action
- status: outline
- src: compositions/01-action.html
- duration: 7s
- poster: 4s
- transition_in: cut
- scene: The user selects the overlooked question.
- evidence: capability-1

0–2s: show the current state. 2–4s: focus the action. 4–7s: show its consequence.
```

Use `outline` for plans, `built` for still layouts, and `animated` only when motion exists. Verify the local CLI and native storyboard UI; don't invent a storyboard command. Preserve stable source paths so feedback stays attached.

Present the static storyboard for approval before animation. Technical preparation does not count as creative approval.

## 3. Establish the standard

Produce the first two scenes with final typography, UI fidelity, light/material treatment and camera framing. Inspect their midpoints and transitions. Resolve tiny text, oversized margins, abrupt camera jumps and distracting details before replicating them. Save the decisions in `DESIGN.md`.

Show the motion study and wait for approval before completing the remaining scenes, unless autonomous production was explicitly requested.

## 4. Complete and refine

Build the remaining scenes as modular sub-compositions when useful. Match root IDs, template IDs and timeline keys. Put sub-composition styles and scripts inside their templates; keep media playback owned by Hyperframes. Explicitly size the root. Keep full-screen fills on children. Use local assets so a render has no network dependency.

Apply feedback in small batches; keep a short applied-feedback log. Do not rebuild already approved scenes unless a cross-scene issue requires it. Verify camera continuity in the assembled root and inspect transient moments, not just polished stills.

## 5. Delivery evidence

`VERIFIED.md` should distinguish command checks, visual inspection, playback, export and publication. Commands alone do not establish creative success. When export is authorized, probe the actual file and view samples. Record silent output explicitly. Deliver source alongside the requested video or preview.
