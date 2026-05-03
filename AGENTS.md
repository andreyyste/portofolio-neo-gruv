# porto — CREATIVE.RAW Portfolio

Single-page React 19 + TypeScript 6 + Vite 8 + Tailwind CSS 3.4 portfolio. Neo-brutalism theme.

## Commands

| Command | Effect |
|---------|--------|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b && vite build` — type-check via project references, then bundle |
| `npm run lint` | `eslint .` |
| `npm run preview` | `vite preview` |

No test framework.

## Notable quirks

- **CSS situation (confusing)**: `src/main.tsx` imports `src/test.css` (Tailwind directives + custom classes). `src/index.css` is a dead duplicate (former import, kept with `stylelint` comments). `src/output.css` is a static copy of **only** the custom classes (no `@tailwind` directives), linked from `index.html` for initial render — but its `.reveal-section` transition values **differ** from `test.css` (1.2s vs 0.6s).
- **`verbatimModuleSyntax: true`** — type-only imports must use `import type { ... }`.
- **`erasableSyntaxOnly: true`** — no enums, namespaces, or parameter properties.
- **TS project references** — `tsconfig.app.json` (src/) and `tsconfig.node.json` (vite.config.ts). Add new files to one of these.
- **Dark mode**: `darkMode: "class"` — toggle via JS by adding `class="dark"` on `<html>`, not OS preference.
- **Icons**: Material Symbols font (`material-symbols-outlined` class) loaded from Google Fonts.
- **Custom CSS classes** (in `test.css`/`index.css`/`output.css`): `.neo-shadow`, `.neo-shadow-sm`, `.neo-border`, `.neo-border-heavy`, `.neo-section-divider`, `.exaggerated-hover`, `.reveal-section`, `.reveal-visible`, `.animate-float`, `.mouse-trail-particle`.
- **Fonts**: Hanken Grotesk (body), Space Grotesk (headings), JetBrains Mono (labels) — all from Google Fonts.

## Architecture

```
src/
  main.tsx          → entrypoint (imports test.css)
  App.tsx           → Layout + MouseTrail + 6 sections
  layout/            Navbar, Footer, Layout wrapper
  sections/          Hero, About, Skills, Work, Resume, Contact
  ui/                Button, Marquee, MouseTrail (reusable)
```

No router — single-page scroll. Sections use `.reveal-section` class with IntersectionObserver-based reveal animation (`.reveal-visible` toggled by JS in `App.tsx`).
