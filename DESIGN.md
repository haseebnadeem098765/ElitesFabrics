# Design System Document

## 1. Overview & Creative North Star: "The Industrial Weaver"

This design system is built to reflect the intersection of precision manufacturing and tactile luxury. Our Creative North Star, **"The Industrial Weaver,"** dictates a UI that feels as structured and durable as a loom, yet as fluid and premium as the high-end textiles it produces. 

We break the "generic template" mold by moving away from rigid boxes and harsh dividers. Instead, we utilize **intentional asymmetry**, editorial-grade typography scales, and a philosophy of **Tonal Depth**. The experience should feel like flipping through a high-end textile lookbook: clean, authoritative, and sophisticated. We lean into breathable white space and layered surfaces to suggest the "comfort" and "quality" inherent in the brand’s DNA.

---

## 2. Colors

The palette is anchored by a deep, authoritative blue—extracted directly from the brand identity—balanced with cool industrial greys and warm, earthy ambers to represent the raw materials of textile manufacturing.

### Core Palette
*   **Primary (`#005c9b`):** The brand anchor. Used for primary actions and key brand moments.
*   **Surface (`#f8f9ff`):** A crisp, cool-white base that provides a modern, clean industrial feel.
*   **Tertiary (`#7f4e00`):** An amber/gold tone representing raw fibers and premium craftsmanship. Use sparingly for highlights or specialized alerts.

### The "No-Line" Rule
To maintain a high-end editorial feel, **1px solid borders for sectioning are strictly prohibited.** Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit against a `surface` background to create a logical break without a "wireframe" look.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked fabric swatches.
*   **Deepest Background:** `surface`
*   **Sectional Shifts:** `surface-container-low`
*   **Card/Component Base:** `surface-container-lowest` (pure white)
*   **Elevated Details:** `surface-container-high`

### Glass & Gradient Rule
For hero sections and floating navigation, use **Glassmorphism**. Apply `surface-variant` at 70% opacity with a `20px` backdrop blur. For primary CTAs, use a subtle linear gradient from `primary` (`#005c9b`) to `primary-container` (`#2e75b6`) at a 135-degree angle to provide a "sheen" reminiscent of silk or high-performance synthetics.

---

## 3. Typography

The typography strategy pairs the structural precision of **Manrope** for headers with the legible, professional utilitarianism of **Public Sans** for body content.

*   **Display & Headlines (Manrope):** Large, bold, and authoritative. Use `display-lg` (3.5rem) for hero statements to create an editorial impact. The wide stance of Manrope suggests durability and modern industrialism.
*   **Body & Labels (Public Sans):** Optimized for technical specifications and narrative descriptions. Public Sans provides a "trustworthy" and "clear" reading experience.
*   **The Hierarchy Role:** Use high-contrast sizing (e.g., a `display-md` headline followed by a `body-md` description) to guide the eye through the "weave" of the content, emphasizing quality over quantity.

---

## 4. Elevation & Depth

We eschew traditional "drop shadows" in favor of **Tonal Layering**, mimicking how light interacts with stacked fabrics.

*   **The Layering Principle:** Depth is achieved by stacking the surface-container tiers. A `surface-container-lowest` card placed on a `surface-container-low` section creates a soft, natural lift.
*   **Ambient Shadows:** If a floating effect is mandatory (e.g., a modal), use an extra-diffused shadow: `box-shadow: 0 12px 40px rgba(25, 28, 32, 0.06);`. The shadow color must be a tinted version of `on-surface` (`#191c20`) to feel like natural light, never a flat grey.
*   **The "Ghost Border" Fallback:** If a container requires more definition for accessibility, use the `outline-variant` token at **15% opacity**. High-contrast, 100% opaque borders are strictly forbidden.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), `md` (0.375rem) roundedness, `on-primary` text.
*   **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
*   **Tertiary:** Text-only in `primary` blue with a 2px bottom "thread" underline that expands on hover.

### Cards & Lists
*   **Constraint:** **Never use divider lines.** Separate list items using the spacing scale (e.g., `spacing-4`) or subtle background toggles between `surface-container-low` and `surface-container-lowest`.
*   **Fabric Swatch Cards:** Use `lg` (0.5rem) roundedness and ensure the image is the "hero" of the card, with metadata tucked into a `surface-container-lowest` footer area.

### Input Fields
*   **Styling:** Use `surface-container` as the fill. On focus, transition the background to `surface-container-lowest` and add a `2px` "Ghost Border" using the `primary` color at 40% opacity.

### Textile-Specific Components
*   **Texture Overlays:** Use a subtle SVG grain or "weave" pattern (opacity 3%) on `surface-variant` containers to reinforce the textile theme.
*   **Durability Badges:** Use `tertiary-container` for performance metrics (e.g., Martindale rub count), creating a warm, premium contrast against the industrial blues.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical grid layouts (e.g., a 2-column layout where one column is significantly wider) to evoke an editorial look.
*   **Do** use the `spacing-20` and `spacing-24` tokens to allow the design to "breathe"—premium brands are never cluttered.
*   **Do** use "Glassmorphism" for navigation bars to allow fabric textures and colors to bleed through as the user scrolls.

### Don't
*   **Don't** use 1px solid black or high-contrast borders. It breaks the "premium fabric" metaphor.
*   **Don't** use standard "Material Design" default shadows. They are too "software-heavy" and not "industrial-premium."
*   **Don't** clutter the screen with icons. Use clear, high-contrast typography first; icons should only be used as functional secondary cues.