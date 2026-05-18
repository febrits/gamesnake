# 🐍 GameSnake
## 🌐 Live Demo

febrits/gamesnake


A classic Snake browser game built with React 19, TypeScript, Vite, and Tailwind CSS v4.

![GameSnake](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)

## Features

- 🎮 **Classic Snake gameplay** — eat food, grow longer, don't hit walls or yourself
- 📈 **Progressive difficulty** — speed increases as your score grows
- 🏆 **High score tracking** — persisted in localStorage
- ⏸️ **Pause/Resume** — press Space or Escape
- 📱 **Mobile-friendly** — touch controls for mobile devices
- 🎨 **Retro-modern UI** — dark theme with neon glow effects

## Controls

| Key | Action |
|-----|--------|
| Arrow Keys / WASD | Move snake |
| Space / Escape | Pause / Resume |
| Enter | Start game |

On mobile, use the on-screen D-pad buttons.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS v4** for styling
- **lucide-react** for icons

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── GameBoard.tsx      # Game grid rendering
│   ├── GameControls.tsx   # Mobile touch controls
│   ├── GameOverlay.tsx    # Start/Pause/GameOver screens
│   └── ScoreBoard.tsx     # Score & high score display
├── hooks/
│   └── useSnakeGame.ts    # Core game logic hook
├── App.tsx                # Main app component
├── main.tsx               # Entry point
└── index.css              # Global styles + Tailwind
```

## License

MIT
