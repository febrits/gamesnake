import { type GameStatus } from '../hooks/useSnakeGame';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface GameOverlayProps {
  status: GameStatus;
  score: number;
  onStart: () => void;
  onTogglePause: () => void;
}

export function GameOverlay({ status, score, onStart, onTogglePause }: GameOverlayProps) {
  if (status === 'playing') {
    return (
      <button
        onClick={onTogglePause}
        className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-[#1a1a24]/80 border border-[#2a2a3e] text-[#64748b] hover:text-[#22d3ee] transition-colors"
        aria-label="Pause"
      >
        <Pause size={18} />
      </button>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/80 backdrop-blur-sm rounded-lg z-10">
      <div className="flex flex-col items-center gap-4 p-8">
        {status === 'idle' && (
          <>
            <h2 className="text-2xl font-bold text-[#e2e8f0]">🐍 GameSnake</h2>
            <p className="text-sm text-[#64748b]">Use arrow keys or tap to control</p>
            <button
              onClick={onStart}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#22d3ee] text-[#0a0a0f] font-bold hover:bg-[#67e8f9] transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              <Play size={20} />
              Start Game
            </button>
          </>
        )}

        {status === 'paused' && (
          <>
            <h2 className="text-2xl font-bold text-[#e2e8f0]">⏸ Paused</h2>
            <button
              onClick={onTogglePause}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#22d3ee] text-[#0a0a0f] font-bold hover:bg-[#67e8f9] transition-colors"
            >
              <Play size={20} />
              Resume
            </button>
          </>
        )}

        {status === 'gameover' && (
          <>
            <h2 className="text-2xl font-bold text-[#f43f5e]">Game Over</h2>
            <p className="text-lg text-[#e2e8f0]">
              Score: <span className="font-bold text-[#22d3ee]">{score}</span>
            </p>
            <button
              onClick={onStart}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#22d3ee] text-[#0a0a0f] font-bold hover:bg-[#67e8f9] transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
