<div align="center">
  <h1>🎨 Portfolio Frontend</h1>
  <p><i>A visually striking, unapologetic single-page portfolio designed for disruptors, built with pristine engineering.</i></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

<hr>

## Overview

Welcome to the **Neo-Brutalist** frontend for the nre.codes portfolio. This application rejects boring, clean corporate aesthetics in favor of high-contrast colors, harsh borders, and massive typography. 

### Live Production Demo
* **Website URL:** [https://nre.codes](https://nre.codes)
* **Backend API URL:** [https://api.nre.codes](https://api.nre.codes)

Beneath its chaotic exterior lies a meticulously engineered architecture adhering to **SOLID principles** and **Clean Code**. It is entirely data-driven, seamlessly pulling live content from the dedicated NestJS backend while maintaining 100% type safety.

---

## Features at a Glance

- **Neo-Brutalist Aesthetic:** Heavy borders, high-contrast drop shadows, vivid color palettes, and bold typography that refuses to blend in.
- **Clean Code Architecture:** 
  - **Single Responsibility Principle (SRP):** API calls are decoupled into a dedicated `services/api.ts` layer.
  - **Strict Type Safety:** Centralized TypeScript definitions (`types/index.ts`) eliminate `any` types across the entire application.
- **Interactive Codebase Explorer:** Browses GitHub repository directories, trees, and reads files directly in the browser using a persistent tree sidebar and Shiki syntax highlighting.
- **Mock List Blurs & Redirection:** Blurs mock lists for Issues, Pull Requests, and Actions, using a retro brutalist overlay to redirect users to live GitHub tracking.
- **CMS Admin Dashboard:** Secured admin dashboard (`/nre-masuk` -> `/dashboard`) allowing live edits to projects, skills, and configuration. Features manual GitHub sync triggers.
- **Token Deadlock Protection:** Next.js middleware JWT expiration verification and API proxy `401` session eviction to gracefully prevent stale/deadlocked admin sessions.
- **Dynamic Animations:** Infinite scrolling marquees, intersection-observer based reveal animations, mouse-trail particle effects, and satisfying hover interactions.
- **Server-Side Rendering (SSR):** Built on the robust **Next.js 15 App Router** for blazing-fast load times and perfect SEO.
- **Dynamic API Integration:** All content (projects, experiences, skills) is fetched dynamically from the backend API.
- **Robust Error Handling:** 
  - Centralized API error parsing.
  - Custom `error.tsx` Neo-Brutalist fallback boundary that catches connection failures gracefully without showing a generic browser error.

---

## Detailed Feature Breakdown

### 📂 Interactive Codebase Explorer
* **Virtual Directory Tree:** Leverages Next.js server-side fetches and NestJS APIs to retrieve GitHub repository structures dynamically. Features lazy-loading folder nodes and persistent folder expanded states.
* **Shiki Syntax Highlighting:** Renders files in real-time in the browser using the Shiki highlighting engine. Supports theme-accurate color tokens (matching the Gruvbox styling) and handles large file rendering without UI freezes.
* **Custom Code Header & Tabs:** Hides default header links while viewing code layouts, showing only "Back to Portfolio" and "Open on GitHub" CTA buttons.

### 🔒 Secure CMS & Proxy Gateway
* **Dynamic Form Rendering:** The CMS Configuration Editor dynamically adapts its form field layouts based on structural types (`text`, `textarea`, `nested` fields, `root_string_array`, or `object_array`). This allows editing nested structures like Nav Links, Socials, or Manifesto Rules directly.
* **API Proxy Layer:** A custom Route Handler (`/api/proxy/[...path]`) acts as a secure reverse proxy, appending JWT tokens to incoming request headers and filtering empty request payloads (fixing issues with parameterless calls like `DELETE`).
* **Session Deadlock Resolution:**
  * **Edge JWT Parsing:** Middleware inspects the client's `jwt_token` cookie, base64-decodes the payload, and validates the `exp` (expiration) claim entirely at the Edge. If expired, it deletes the cookie and forces a redirect to `/nre-masuk`.
  * **401 Eviction:** If the backend returns `401 Unauthorized` (e.g. database force-reset invalidating the user ID), the API proxy intercepts the response and strips the stale `jwt_token` cookie to clear the session immediately.

### 🌀 Gamified & Disruptive Visuals
* **Phaser 3 Game Sandbox Integration:** Supports dynamic, canvas-based game modules (like Phaser 3 physics-based engines) overlaying React nodes.
* **Brutalist Project Cards:** Redesigned to support conditional rendering (completely collapsing image containers when no cover image is provided), inline custom red featured tags, and optimized typography sizing.
* **Hover State Safelisting:** Explicit Tailwind safelisting for dynamic theme color hover and border styling (`hover:text-theme-*`, `hover:border-theme-*`), preserving style customizability configured inside the CMS.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Library** | React 19 |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS 3.4 |
| **Typography** | Hanken Grotesk, Space Grotesk, JetBrains Mono |
| **Design Pattern** | Neo-Brutalism |

---

## Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed, and that the `portofolio-backend` NestJS API is currently running locally.

### Installation
Clone the repository and install the dependencies:

```bash
git clone https://github.com/andreyyste/portofolio-neo-gruv.git
cd portofolio-neo-gruv
npm install
```

### Environment Configuration
Create a `.env` file in the root directory (or use `.env.example`):

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

---

## Running the Client

Start up the Next.js development server:

```bash
# Development mode (Hot-reload)
npm run dev

# Production build
npm run build
npm run start
```
> The portfolio will be accessible at `http://localhost:3000`

---

## Architecture & Structure

```text
src/
├── app/               # Next.js App Router (page.tsx, error.tsx, ClientEntry.tsx)
├── context/           # Global State (DataContext with strict typings)
├── hooks/             # Custom React hooks (useReveal, useMediaQuery)
├── layout/            # Layout wrappers (Navbar, Footer)
├── mobile/            # Tailored mobile UI components
├── sections/          # Desktop-specific UI sections
├── services/          # API Abstraction Layer (api.ts) - SRP applied!
├── types/             # Centralized TypeScript Interfaces (index.ts)
├── ui/                # Reusable Atoms (Button, Marquee, Title)
└── index.css          # Global Neo-Brutalist styling
```
