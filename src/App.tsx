import { useEffect, useCallback } from 'react';
import { useSnakeGame, type Direction } from './hooks/useSnakeGame';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { ScoreBoard } from './components/ScoreBoard';
import { GameOverlay } from './components/GameOverlay';

function App() {
  const {
    snake,
    food,
    status,
    score,
    highScore,
    boardSize,
    changeDirection,
    startGame,
    togglePause,
  } = useSnakeGame();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (status === 'idle' || status === 'gameover') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          startGame();
          return;
        }
      }

      if (status === 'playing' || status === 'paused') {
        if (e.key === ' ' || e.key === 'Escape') {
          e.preventDefault();
          togglePause();
          return;
        }
      }

      if (status === 'playing') {
        const keyMap: Record<string, Direction> = {
          ArrowUp: 'UP',
          ArrowDown: 'DOWN',
          ArrowLeft: 'LEFT',
          ArrowRight: 'RIGHT',
          w: 'UP',
          s: 'DOWN',
          a: 'LEFT',
          d: 'RIGHT',
        };
        const dir = keyMap[e.key];
        if (dir) {
          e.preventDefault();
          changeDirection(dir);
        }
      }
    },
    [status, changeDirection, startGame, togglePause]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-4 select-none">
      <div className="flex flex-col items-center w-full max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] bg-clip-text text-transparent">
          🐍 GameSnake
        </h1>
        <p className="text-xs text-[#64748b] mb-4 hidden sm:block">Arrow keys to move • Space to pause</p>

        <ScoreBoard score={score} highScore={highScore} />

        <div className="relative w-full max-w-[min(80vw,500px)]">
          <GameBoard snake={snake} food={food} boardSize={boardSize} />
          <GameOverlay
            status={status}
            score={score}
            onStart={startGame}
            onTogglePause={togglePause}
          />
        </div>

        <GameControls onDirection={changeDirection} />

        <div className="mt-6 text-center">
          <p className="text-[10px] text-[#3a3a4e]">
            Speed increases as your score grows
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
