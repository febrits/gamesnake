import { type Position } from '../hooks/useSnakeGame';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  boardSize: number;
}

export function GameBoard({ snake, food, boardSize }: GameBoardProps) {
  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
    const snakeBodyIdx = snake.slice(1).findIndex((s) => s.x === x && s.y === y);
    const isSnakeBody = snakeBodyIdx !== -1;
    const isFood = food.x === x && food.y === y;

    if (isSnakeHead) {
      return (
        <div
          key={`${x}-${y}`}
          className="bg-[#67e8f9] rounded-sm"
          style={{ boxShadow: '0 0 8px rgba(103,232,249,0.6)' }}
        />
      );
    }

    if (isSnakeBody) {
      const opacity = Math.max(0.4, 1 - snakeBodyIdx * 0.03);
      return (
        <div
          key={`${x}-${y}`}
          className="bg-[#22d3ee] rounded-[2px]"
          style={{ opacity }}
        />
      );
    }

    if (isFood) {
      return (
        <div
          key={`${x}-${y}`}
          className="bg-[#111118] flex items-center justify-center"
        >
          <div
            className="w-[70%] h-[70%] rounded-full bg-[#f43f5e] animate-pulse"
            style={{ boxShadow: '0 0 10px rgba(244,63,94,0.7)' }}
          />
        </div>
      );
    }

    return (
      <div
        key={`${x}-${y}`}
        className="bg-[#111118] rounded-[1px]"
      />
    );
  };

  const cells = [];
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      cells.push(renderCell(x, y));
    }
  }

  return (
    <div
      className="grid gap-[1px] p-1 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e] w-full max-w-[min(80vw,500px)]"
      style={{
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        aspectRatio: '1',
        boxShadow: '0 0 40px rgba(34,211,238,0.05)',
      }}
    >
      {cells}
    </div>
  );
}
