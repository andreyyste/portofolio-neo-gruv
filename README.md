# Neo-Brutalist Portfolio (Frontend)

A stunning Neo-Brutalist portfolio built with Next.js 15 (App Router), React, TypeScript, and Tailwind CSS.
It features hard lines, loud colors, offset brutalist shadows, and smooth scroll animations.

## Architecture
- **Next.js 15 App Router**: Server-Side Rendering (SSR) for lightning-fast load times and SEO.
- **Dynamic API Integration**: Fetches data concurrently from the NestJS backend API (`localhost:3001`) via a global `DataContext.tsx`.
- **Graceful Error Handling**: Implements a custom `error.tsx` Neo-Brutalist fallback boundary if the backend is unreachable.

## Getting Started

First, ensure the backend (`portofolio-backend`) is running. Then:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
