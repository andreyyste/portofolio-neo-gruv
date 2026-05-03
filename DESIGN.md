---
name: Neo-Gruvbox Brutalist
colors:
  surface: '#fff8f5'
  surface-dim: '#e0d8d5'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ef'
  surface-container: '#f4ece9'
  surface-container-high: '#efe7e3'
  surface-container-highest: '#e9e1de'
  on-surface: '#1e1b19'
  on-surface-variant: '#3f4849'
  inverse-surface: '#33302e'
  inverse-on-surface: '#f7efec'
  outline: '#6f7979'
  outline-variant: '#bfc8c8'
  surface-tint: '#24686b'
  primary: '#216568'
  on-primary: '#ffffff'
  primary-container: '#3e7e81'
  on-primary-container: '#f3ffff'
  inverse-primary: '#92d1d4'
  secondary: '#b51a16'
  on-secondary: '#ffffff'
  secondary-container: '#d9362b'
  on-secondary-container: '#fffbff'
  tertiary: '#5e6000'
  on-tertiary: '#ffffff'
  tertiary-container: '#777900'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#adeef1'
  primary-fixed-dim: '#92d1d4'
  on-primary-fixed: '#002021'
  on-primary-fixed-variant: '#004f52'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a9'
  on-secondary-fixed: '#410001'
  on-secondary-fixed-variant: '#930005'
  tertiary-fixed: '#e7ea54'
  tertiary-fixed-dim: '#cacd39'
  on-tertiary-fixed: '#1c1d00'
  on-tertiary-fixed-variant: '#484a00'
  background: '#fff8f5'
  on-background: '#1e1b19'
  surface-variant: '#e9e1de'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  button:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1'
spacing:
  unit: 8px
  gutter: 24px
  margin: 32px
  border-width: 3px
  shadow-offset: 6px
---

## Brand & Style

The design system employs a **Neo-Brutalist** aesthetic filtered through a warm, retro-technical lens. It is designed for users who value structural clarity, high-contrast legibility, and a distinct "analog-digital" personality. 

The visual language is unapologetically bold, utilizing thick borders, hard shadows, and a sophisticated earth-tone palette. It evokes the feeling of a high-end technical manual or a vintage terminal interface reimagined for modern hardware. The emotional response is one of stability, precision, and raw functional beauty.

## Colors

The palette is based on the Light Gruvbox theme, offering a high-contrast but "warm" reading experience. 

- **Background & Surface:** The cream (#fbf1c7) and beige (#ebdbb2) tones provide a soft, paper-like foundation that reduces eye strain compared to pure white.
- **Contrast & Borders:** All structural lines, borders, and primary text use the dark gray/black (#3c3836) to maintain a rigid, architectural feel.
- **Accents:** The Blue, Red, and Green are used functionally—Primary for actions, Secondary for critical alerts or "stop" actions, and Tertiary for "go" or success states.

## Typography

Typography is a structural element in this design system. We use **Space Grotesk** for headlines to lean into the geometric, technical nature of Neo-Brutalism. **Hanken Grotesk** provides a clean, highly legible experience for long-form content, while **JetBrains Mono** is utilized for labels, metadata, and status indicators to reinforce the "technical tool" aesthetic.

Large headlines should always have tight letter spacing and minimal line height to create high-impact "blocks" of text.

## Layout & Spacing

This design system uses a **fixed grid** model to emphasize containment and boxing. 
- **Grid:** A 12-column system for desktop, 8-column for tablet, and 4-column for mobile.
- **Gaps:** Gutters are consistent at 24px, ensuring that the heavy borders of neighboring components do not visually merge.
- **Rhythm:** All spacing (padding, margins) must be increments of 8px. 
- **Alignment:** Elements should feel "locked" into the grid, with no soft edges or fluid transitions.

## Elevation & Depth

In a Neo-Brutalist system, depth is not simulated via blur or light physics. Instead, we use **Hard Shadows**.

- **Shadows:** Use a solid offset shadow (color: `#3c3836`) with 100% opacity and 0px blur. The default offset is 6px down and 6px right.
- **Layers:** Depth is communicated by increasing the offset of the hard shadow. "Higher" elements have larger offsets.
- **Interaction:** On hover or active states, the element typically "pushes down" into the shadow (decreasing the offset to 2px or 0px) to simulate a physical button press.

## Shapes

The shape language is strictly **Sharp (0)**. There are no rounded corners in this design system. Every container, button, and input field is a perfect rectangle with 90-degree angles. This reinforces the raw, brutalist influence and ensures the thick 3px borders join perfectly at every vertex.

## Components

- **Buttons:** Must have a 3px solid border (`#3c3836`) and a hard 6px shadow. Backgrounds use the Primary, Secondary, or Tertiary colors. Text is centered and set in uppercase Space Grotesk.
- **Cards:** Use the Surface color (`#ebdbb2`) with a 3px border. Content inside should have generous 24px padding.
- **Input Fields:** Rectangular boxes with the Background color (`#fbf1c7`) and a 3px border. Focused states change the border color to Primary or use a thick internal "focus block."
- **Chips/Labels:** Small rectangular blocks using JetBrains Mono. Use the Warning (#d79921) or Accent colors to denote categories.
- **Checkboxes/Radios:** Square (even for radios) to maintain the brutalist geometry. Checkmarks are thick, 3px lines.
- **Lists:** Separated by 3px horizontal lines. Each list item should have a distinct hover state that changes the background color to the Surface color.