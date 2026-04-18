# Design System Strategy: The Kinetic Monolith

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **Technical Brutalism**. Unlike standard web layouts that rely on soft shadows and rounded safety, this system embraces the aesthetic of high-end tech hardware and precision engineering. It is a "Kinetic Monolith"—an interface that feels heavy, structural, and unyielding, yet vibrates with the energy of neon emerald accents.

We are breaking the "template" look by leaning into intentional asymmetry and "Over-Scaling." By utilizing massive typography against deep, obsidian-like surfaces, we create an editorial experience that commands attention. This is not a system for the timid; it is a system for builders, developers, and visionaries.

## 2. Colors & Surface Architecture
The palette is built on a foundation of "Emerald-Black" neutrals with high-velocity neon accents.

*   **Primary Core:** The duo of `primary` (#a1ffc2) and `secondary` (#45fec9) provides a piercing contrast against the `background` (#0a0f0d). These colors should be used for high-impact moments and interactive states.
*   **The "No-Line" Rule for Layout:** Prohibit 1px solid borders for sectioning layout areas. Instead, define boundaries through sharp shifts in background color. For example, a `surface_container_low` section should sit directly against a `surface` background to create a structural break without the "cheapness" of a thin line.
*   **The "Thick Border" Exception:** In alignment with the brutalist aesthetic, borders are only permitted if they are structural "statements." Use the `outline` (#717773) token at a 2px or 4px weight for specific component framing to simulate industrial casing.
*   **Signature Textures:** To avoid a "flat" digital feel, apply subtle linear gradients transitioning from `primary` (#a1ffc2) to `primary_container` (#00fc9a) on primary CTAs. This adds a "backlit hardware" soul to the UI.

## 3. Typography: The Editorial Engine
Typography is the primary visual driver of this system. We use **Manrope** for its structural clarity and **Space Grotesk** for its technical, monospaced-adjacent personality.

*   **Display & Headline:** Use `display-lg` (3.5rem) and `headline-lg` (2rem) aggressively. These should be set in Bold or Extra Bold. Don't be afraid to let headlines overlap container boundaries or bleed toward the edge of the frame to create an "intentional" editorial break.
*   **Labels & Metadata:** Use `label-md` and `label-sm` (Space Grotesk) for all technical data, micro-copy, and tags. This creates a functional contrast between the "Art" (Manrope) and the "Machine" (Space Grotesk).
*   **Visual Hierarchy:** Hierarchy is achieved through massive scale shifts. A `display-lg` headline should feel like a physical object on the screen, while `body-md` remains clean and legible for long-form technical documentation.

## 4. Elevation & Depth: Tonal Layering
In a brutalist system with `ROUND_NONE` (0px corners), we do not use traditional drop shadows. We use **Tonal Layering** and **Atmospheric Glass.**

*   **The Layering Principle:** Depth is achieved by "stacking" surface-container tiers. Place a `surface_container_highest` (#202724) card on a `surface_container_low` (#0f1512) section. This creates a hard-edged, physical lift that feels like stacked sheets of metal or glass.
*   **Glassmorphism & Depth:** For floating modals or navigation overlays, use `surface_bright` at 60% opacity with a heavy `backdrop-blur` (20px-40px). This allows the neon emerald glows of the background to bleed through, softening the harshness of the sharp corners while maintaining a premium, high-end tech feel.
*   **Ambient Glows:** Instead of shadows, use "Glows." If a component needs to feel "active," apply a subtle outer glow using the `primary` color at 10-15% opacity. This mimics the light bleed of a high-end LED display.

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#a1ffc2) fill with `on_primary` (#00643a) text. 0px corner radius. 2px `outline` transition on hover.
*   **Secondary:** Ghost style with a 2px `primary` border. Sharp corners.
*   **Tertiary:** All caps `label-md` (Space Grotesk) with a trailing technical icon (e.g., `->`).

### Input Fields
*   **Style:** `surface_container_lowest` (#000000) background with a 2px `outline_variant` (#444946) bottom border only. 
*   **Active State:** The border transitions to `secondary` (#45fec9) and thickens to 3px.
*   **Error State:** Use `error` (#ff716c) with a high-contrast background shift to `error_container`.

### Cards & Lists
*   **No Dividers:** Absolute prohibition of 1px divider lines. Use `surface_container` color blocking or 32px/48px vertical spacing to separate list items.
*   **Interactive Cards:** On hover, a card should shift from `surface_container` to `surface_bright` and move 4px up/left to simulate a "physical" click-in.

### Data Chips
*   **Selection Chips:** High-contrast `tertiary_container` (#cafd00) with 0px radius. These act as "yellow alerts" or highlights within the emerald ecosystem.

## 6. Do's and Don'ts

### Do:
*   **Do** use `0px` border radius for everything. No exceptions.
*   **Do** use heavy weights for Manrope headlines to anchor the page.
*   **Do** use "Extreme Spacing." Give oversized elements room to breathe, or pack technical data tightly to look like a terminal.
*   **Do** use `spaceGrotesk` for all numbers and data points.

### Don't:
*   **Don't** use soft, grey drop shadows. If it doesn't have a hard edge, it doesn't belong.
*   **Don't** use 1px lines for decoration. Lines must be 2px+ and serve a structural purpose.
*   **Don't** use pastel colors. Stick to the high-contrast emerald/neon and deep charcoal values provided.
*   **Don't** use center alignment for large blocks of text. Stick to strong left-aligned grids to maintain the "monolithic" feel.