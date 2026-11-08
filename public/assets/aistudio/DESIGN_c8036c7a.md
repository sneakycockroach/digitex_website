---
name: Digitex Studio
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5c403c'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#916f6b'
  outline-variant: '#e6bdb8'
  surface-tint: '#bf0715'
  primary: '#b70011'
  on-primary: '#ffffff'
  primary-container: '#dc2626'
  on-primary-container: '#fff6f5'
  inverse-primary: '#ffb4ab'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#585a5a'
  on-tertiary: '#ffffff'
  tertiary-container: '#717272'
  on-tertiary-container: '#f8f8f8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c9c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 44px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.25rem
  margin-tablet: 2.5rem
  margin-desktop: 5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 3rem
---

## Brand & Style

This design system embodies high-contrast architectural minimalism crafted for an elite creative studio rooted in Mbale City, Uganda. The brand visual language balances East African creative boldness with stark Swiss precision. 

The aesthetic marries flat solid visual planes, stark monochromatic tension, razor-sharp geometric balance, and calculated bursts of pure red. The mood is unapologetic, precise, highly polished, and distinctly authoritative—communicating institutional competence and world-class craft.

Visual signatures:
- High-contrast, stark transitions between deep obsidian surfaces, crisp white negative space, and laser-precise crimson highlights.
- Architectural layout discipline: strong structural axes, intentional whitespace, and zero decorative fluff.
- Flat solid blocks: absence of muddy gradients or heavy skeuomorphism in favor of pure flat fills and clean hairline boundaries.
- Font Awesome line-weight harmony: crisp, monoline geometry scaling uniformly with adjacent typography.

## Colors

The palette operates on absolute chromatic austerity:
- **Primary Red (`#DC2626`):** The catalytic accent. Reserved strictly for primary calls-to-action, active indicators, critical badges, and bold focal moments. Used with deliberate restraint to prevent visual fatigue.
- **Deep Black (`#0B0B0B`):** The grounding anchor. Applied to primary headline typography, solid inverted container planes, structural dividers, and dominant iconography.
- **Crisp Pure White (`#FFFFFF`):** The primary canvas plane. Establishes immaculate, gallery-grade whitespace that allows studio work and editorial case studies to breathe.
- **Neutral Accent Surface (`#F7F7F7`):** Secondary structural fill used to delineate card modules, input tracks, subtle banding, and muted tags without breaking the minimalist harmony.
- **Hairline Border Rule (`#E5E5E5` / `#1A1A1A` in inverted modules):** Meticulously calculated hairline strokes ensuring structural definition across high-contrast viewports.

## Typography

The typographic hierarchy pairs the geometric, structural personality of Space Grotesk for display and headlines with the pristine grotesque legibility of Hanken Grotesk for body copy and UI labels.

Key rules:
- All display and headline tracking is tightened (`-0.01em` to `-0.03em`) to mimic architectural editorial headlines.
- `label-sm` utilizes uppercase formatting and expanded letter-spacing (`0.08em`) for index codes, project categories, and status meters.
- Body text retains optimal reading line-heights (`1.5` to `1.6`) in high-contrast charcoal black (`#0B0B0B`) against white backgrounds, shifting to crisp white (`#FFFFFF`) against dark inverted modules.

## Layout & Spacing

The layout philosophy follows a strict fluid architectural grid system based on an 8px rhythmic increment:
- **Mobile (< 768px):** 4-column layout with 20px outer margin and 16px gutter. Content sections collapse strictly into stacked linear modules.
- **Tablet (768px – 1024px):** 8-column layout with 40px outer margin and 24px gutter.
- **Desktop (> 1024px):** 12-column layout with up to 80px outer margin, capped at a maximum container width of 1440px for editorial integrity.

Whitespace is deliberately amplified. Major page sections must breathe through multi-step vertical padding (`space-xl` scaled dynamically up to 6rem on desktop displays) to sustain the gallery-grade minimalist presence.

## Elevation & Depth

In alignment with pure flat minimalism, visual depth avoids blurred, heavy drop shadows. Hierarchy is achieved via stark planar contrast, hairline boundary framing, and subtle micro-elevation:
- **Surface Elevation:** Base canvas is flat white (`#FFFFFF`). Secondary layer containers sit on `#F7F7F7` or solid `#0B0B0B`.
- **Borders & Hairstyle Lines:** Crisp 1px solid hairline rules (`#E5E5E5` on light surfaces; `#222222` on dark surfaces) outline interactive panels and module cards.
- **Micro-Elevation (Interactive Hover Only):** On interactive elevation states (e.g., card hover, modal overlay), a razor-sharp, zero-blur hard offset or ultra-subtle diffuse elevation is used: `box-shadow: 0 2px 4px rgba(11, 11, 11, 0.04), 0 8px 16px rgba(11, 11, 11, 0.03)`.
- **Modals & Flyouts:** Pure flat `#FFFFFF` containers bounded by a 1px solid `#0B0B0B` border, cast against a stark backdrop overlay of `rgba(11, 11, 11, 0.75)`.

## Shapes

The design system adopts a strict `0` (Sharp) shape language. All corners are engineered with absolute 90-degree geometric edges:
- Buttons, form inputs, status tags, cards, and modal surfaces maintain crisp `0px` border-radii.
- This creates an unapologetic, architectural structural frame across all touchpoints, distinguishing the studio from generic rounded web templates.
- Circular geometry is strictly prohibited except for micro-indicators (such as a 6px status dot) and standard icon vector coordinates.

## Components

### Buttons
- **Primary:** Solid `#DC2626` background, `#FFFFFF` bold uppercase label (`label-md`), 0px border-radius, `16px 32px` padding. Hover: `#0B0B0B` background with instantaneous 150ms color transition.
- **Secondary:** Solid `#0B0B0B` background, `#FFFFFF` text. Hover: `#DC2626` background.
- **Outline / Minimal:** Transparent background, 1px solid `#0B0B0B`, `#0B0B0B` text. Hover: Solid `#0B0B0B` fill with `#FFFFFF` text.

### Form Inputs & Textareas
- Built on `#F7F7F7` flat solid background with a 1px bottom border or clean perimeter border of `#E5E5E5`.
- Focus state: Surface turns `#FFFFFF` with a crisp 1px solid `#0B0B0B` outline. No glowing colored halos. Error states switch the 1px border strictly to `#DC2626`.
- Typography: `body-md` in `#0B0B0B`, with subtle `#888888` placeholder text.

### Chips & Badges
- Sharp rectangular capsules (`0px` radius).
- Static category chips: `#F7F7F7` fill, 1px solid `#E5E5E5` border, `#0B0B0B` uppercase `label-sm` text.
- Featured / Status Badges: Inverted `#0B0B0B` background with `#FFFFFF` text, or `#DC2626` fill with `#FFFFFF` text for live updates and flagship case studies.

### Cards & Studio Portfolio Tiles
- Flat `#FFFFFF` or `#F7F7F7` surface encapsulated by a 1px solid `#E5E5E5` border.
- Hover state: Border shifts to `#0B0B0B` with subtle micro-elevation lift (`0 8px 24px rgba(11, 11, 11, 0.05)`). Imagery within portfolio tiles features clean full-bleed framing with razor-sharp seams.

### Lists & Case Study Indexes
- Editorial index rows separated by 1px solid `#E5E5E5` horizontal dividers.
- Rows feature generous vertical padding (`space-md`), project titles in `title-lg`, and meta tags right-aligned. Hovering an entire row triggers a swift background shift to `#F7F7F7` and shifts the right icon to `#DC2626`.

### Checkboxes & Radio Controls
- Sharp square boxes (0px radius) with 1.5px solid `#0B0B0B` border.
- Checked state: Filled with solid `#0B0B0B` housing a sharp `#FFFFFF` geometric check icon, or solid `#DC2626` when used in active studio service selection forms.

### Iconography
- Consistent Font Awesome Pro style: clean, monoline strokes, 1.5px to 2px vector weights matching adjacent headline and label line weights. Icons inherit text color directly (`#0B0B0B` or `#DC2626`).