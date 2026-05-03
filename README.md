# CREATIVE.RAW — Brutalist Portfolio

A visually striking, single-page portfolio built with a neo-brutalist aesthetic. Designed for disruptors, this portfolio features bold typography, high-contrast colors, harsh borders, and an unapologetic layout that refuses to blend in. 

## Features

- **Neo-Brutalist Aesthetic**: Heavy borders, high-contrast shadows, vivid colors (reds, teals, olives, yellows), and massive typography.
- **Architectural Split for Responsiveness**: Uses a custom `useMediaQuery` hook to serve a completely tailored `<MobileApp />` layout on screens smaller than 768px, ensuring the desktop (`<DesktopApp />`) experience remains uncompromised.
- **Dynamic Animations**: Includes an infinite scrolling marquee, intersection-observer based reveal animations, mouse-trail particle effects, and hover interactions.
- **Centralized Data**: All portfolio content (projects, skills, experience, about text) is managed centrally in `src/data/`, allowing for easy content updates without touching the UI components.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript 6
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 3.4
- **Icons**: Google Material Symbols
- **Fonts**: Hanken Grotesk, Space Grotesk, JetBrains Mono (via Google Fonts)

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd porto
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Available Scripts

In the project directory, you can run:

| Command | Description |
|---------|-------------|
| `npm run dev` | Runs the app in development mode. |
| `npm run build` | Builds the app for production to the `dist` folder. |
| `npm run lint` | Runs ESLint to check for code quality issues. |
| `npm run preview` | Locally preview the production build. |

## Project Structure

```text
src/
├── data/              # Centralized content (Hero, About, Projects, etc.)
├── hooks/             # Custom React hooks (useReveal, useMediaQuery)
├── layout/            # Desktop layout components (Navbar, Footer, etc.)
├── mobile/            # Dedicated mobile architecture and components
│   └── sections/      # Mobile-specific sections
├── sections/          # Desktop-specific sections
├── ui/                # Reusable UI components (Button, Marquee, MouseTrail, Title)
├── App.tsx            # Main component handling Desktop vs Mobile rendering
├── main.tsx           # Application entry point
└── test.css           # Global styles and Tailwind directives
```

## Content Updates

To update the content of your portfolio, simply edit the files inside the `src/data/` directory. The UI will automatically reflect the changes across both the mobile and desktop layouts.

