# Showcase Director

A Codex plugin for making product showcase films with **Hyperframes**, Apple-inspired visual craft, and your own design system.

Start with a real product story. Review scene layouts. Bring the first two scenes to the right standard. Carry that treatment through the film, then inspect and export. This is a directing workflow, not a promise that one prompt produces a finished advertisement.

## Install in Codex

```sh
codex plugin marketplace add vedant-aggarwal/showcase-director
codex plugin add showcase-director@showcase-director
```

Start a new Codex task after installation so its skill becomes available. Then ask:

> Use Showcase Director to make a 40-second product film for my app. Use our existing brand and Apple-inspired motion. Show one complete customer journey. Use my local design skills where relevant. Give me an editable preview.

The skill also works as a portable `SKILL.md` in other compatible agents. The helper scripts require Node.js 22+. Rendering requires a separately installed Hyperframes runtime, Chrome and FFmpeg. No API key, Treg subscription, cloud rendering account, voice generator, or paid model is required for the silent local workflow.

## Included

- `showcase-director` skill: discovery, evidence, storyboard, visual studies, scene refinement and delivery.
- Original Apple-inspired design and deterministic motion guide.
- Optional local-design-library adapter; no private paths or third-party skill collection is bundled.
- Standalone project scaffold with pinned Hyperframes and GSAP dependencies.
- Native Studio storyboard and frame-comment handoff.
- Read-only feedback and evidence validation helpers.
- Cross-platform tests and GitHub Actions CI.

## Start a standalone project

From a clone of this repository:

```sh
node plugins/showcase-director/skills/showcase-director/scripts/scaffold.mjs ../my-showcase --aspect landscape
cd ../my-showcase
npm install
npm run preview
```

Use `--aspect portrait` for a vertical deliverable. The starter is explicitly unfinished: replace the placeholder with the product, source-backed claims, and actual scenes. It does not contain a sample customer database or fabricated results. New projects refuse to overwrite an existing directory.

The generated project includes `BRIEF.md`, `STORYLINE.md`, `STORYBOARD.md`, `DESIGN.md`, `EVIDENCE.json`, `FEEDBACK.md` and `VERIFIED.md`. Its `npm run check` runs Hyperframes' combined static/runtime/layout gate. Use `npm run snapshot`, inspect the actual images, and review playback before export. Technical checks do not judge creative quality.

## How directing works

1. Identify a single user problem and a complete product journey.
2. Collect real UI references; label reconstructed UI and fictional data.
3. Lock message and layout in the storyboard before expensive animation.
4. Establish typography, material hierarchy and camera motion in the first two scenes.
5. Revise one or two scenes at a time. Retain camera scale across connected actions.
6. Apply the proven treatment to subsequent scenes; add music only when it helps.
7. Check, inspect, play, export, and verify the resulting file.

**Default creative checkpoints:** approve the storyline, then the static storyboard, then a one- or two-scene motion study, then review the complete video before export. Asking for a showcase begins this sequence; it does not silently approve every creative choice. Explicit autonomous-production instructions can skip checkpoints, and prior approvals are never requested again.

In Studio, save frame comments and paste its copied message into the agent. This is a file-based handoff, **not an automatic watcher**. The feedback helper shows the exact saved context and a content hash:

```sh
node /path/to/feedback.mjs /path/to/my-showcase
node /path/to/evidence.mjs /path/to/my-showcase
```

## Design and rights

Apple-inspired describes principles, not an Apple UI kit or affiliation. The plugin does not ship Apple fonts, logos, SF Symbols, commercial assets, or other authors' skill text. Use your product's actual identity; a film treatment does not authorize redesigning its application.

Hyperframes and GSAP are external dependencies with their own licenses. Review rights for any assets or music you add. See [sources](SOURCES.md) and [privacy](PRIVACY.md).

## Development

```sh
npm test
```

Licensed MIT. Contributions should preserve portability, deterministic seeking, truthful demonstrations, and a small instruction footprint.
