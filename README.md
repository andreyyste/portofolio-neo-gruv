# CREATIVE.RAW — Brutalist Portfolio

A visually striking, single-page portfolio built with a neo-brutalist aesthetic. Designed for disruptors, this portfolio features bold typography, high-contrast colors, harsh borders, and an unapologetic layout that refuses to blend in.

## Features

- **Neo-Brutalist Aesthetic**: Heavy borders, high-contrast shadows, vivid colors (reds, teals, olives, yellows), and massive typography.
- **Architectural Split for Responsiveness**: Uses a custom `useMediaQuery` hook to serve a completely tailored `<MobileApp />` layout on screens smaller than 768px, ensuring the desktop (`<DesktopApp />`) experience remains uncompromised.
- **Dynamic Animations**: Includes an infinite scrolling marquee, intersection-observer based reveal animations, mouse-trail particle effects, and hover interactions.
- **Server-Side Rendering (SSR)**: Built on Next.js 15 App Router for blazing-fast load times and perfect SEO.
- **Dynamic API Integration**: All content is managed dynamically via a dedicated NestJS backend, completely eliminating static data files.
- **Graceful Error Handling**: Implements a custom `error.tsx` Neo-Brutalist fallback boundary with an ISR caching strategy if the backend API is unreachable.

## Tech Stack

- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Icons**: Google Material Symbols
- **Fonts**: Hanken Grotesk, Space Grotesk, JetBrains Mono (via Google Fonts)

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine, and that the `portofolio-backend` NestJS API is running on `localhost:3001`.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd portofolio-neo-gruv
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

| Command | Description |
|---------|-------------|
| `npm run dev` | Runs the Next.js app in development mode. |
| `npm run build` | Builds the app for production. |
| `npm run start` | Runs the production build. |
| `npm run lint` | Runs ESLint to check for code quality issues. |

## Project Structure

```text
src/
├── app/               # Next.js App Router (page.tsx, error.tsx, ClientEntry.tsx)
├── context/           # Global Contexts (DataContext for global API data)
├── hooks/             # Custom React hooks (useReveal, useMediaQuery)
├── layout/            # Desktop layout components (Navbar, Footer, etc.)
├── mobile/            # Dedicated mobile architecture and components
│   └── sections/      # Mobile-specific sections
├── sections/          # Desktop-specific sections
├── ui/                # Reusable UI components (Button, Marquee, MouseTrail, Title)
└── index.css          # Global styles and Tailwind directives
```

## Content Updates

To update the content of your portfolio, use the REST API provided by the `portofolio-backend` service. The Next.js frontend will automatically fetch the latest data on load!
