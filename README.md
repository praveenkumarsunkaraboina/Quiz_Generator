# Quiz Application

A modern, interactive quiz application built with Next.js and TypeScript, featuring gamification elements and a clean, intuitive user interface.

## Features

- Interactive quiz interface with multiple-choice questions
- Real-time progress tracking
- Point-based scoring system
- Engaging animations and visual feedback
- Responsive design for all devices
- Performance-based achievements
- Confetti celebration for high scores

## Technical Stack

- Next.js 13 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Canvas Confetti for celebrations
- Lucide React for icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app directory
  - `/components` - Reusable UI components
  - `/types` - TypeScript type definitions
  - `page.tsx` - Main quiz application
- `/public` - Static assets

## API Integration

The application fetches quiz data from the following endpoint:
```
https://api.jsonserve.com/Uw5CrX
```

## Screenshots

![Quiz Start Screen](https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop)

![Quiz Question Screen](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop)

![Quiz Results Screen](https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop)

## License

MIT