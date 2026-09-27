# Apple-inspired product film direction

Use the product as the hero. An Apple-inspired treatment describes disciplined composition and spatial clarity; it does not require Apple assets, imitation macOS chrome or a different product identity.

Choose one neutral canvas, the product's genuine accent, generous margins, precise typography and a small material hierarchy. Use the product's licensed font, or a portable system stack. Large text can have tighter tracking; body copy needs ordinary spacing and sufficient contrast. Reserve translucent layers for meaningful depth and keep text on a legible surface. Use one consistent icon vocabulary.

Preserve the viewer's mental map. A selected conversation can grow into its detail view, its message can become an action card, and the action can resolve into a visible result. Move the camera between those locations without an unnecessary zoom-out/zoom-in. Keep the next target near the outgoing target when possible. Hold the payoff long enough to read.

Suggested film tokens (house recommendations, not Apple specifications):

| Role | Starting range |
| --- | --- |
| Press/selection feedback | 0.10–0.18s |
| Local state transition | 0.25–0.45s |
| Camera handoff | 0.70–1.10s |
| Sequential detail reveal | 0.05–0.10s stagger |
| Primary text at 1080p | 64–112px |
| Hero UI text at 1080p | 24–36px after camera scale |

Use restrained easing, such as power3.out for state reveals and power2.inOut for camera travel. Avoid bouncing windows, perpetual floating, confetti, feature-grid fly-ins, tiny dashboard text and unnecessary blur. Every motion should guide attention, explain cause, preserve continuity or establish hierarchy.

Distinguish interactive UI from film: live gestures should respond and be interruptible; a render needs closed-form, seekable transforms. Do not transplant requestAnimationFrame loops, Lenis, ScrollTrigger, uncontrolled physics or CSS infinite animations into the composition. Translate their visual intent into one paused timeline. The preview wrapper can honor reduced motion with a static poster and explicit playback while exported film remains reproducible.

Use actual visual comparison before saying a reconstruction matches the product. Label sample data and reconstructed journeys. A good looking mockup is not evidence that its feature ships.
