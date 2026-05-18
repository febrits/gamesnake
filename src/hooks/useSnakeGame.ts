import { useState, useCallback, useEffect, useRef } from 'react';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Position = { x: number; y: number };
export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameover';

const BOARD_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 2;
const MIN_SPEED = 60;

function getRandomPosition(snake: Position[]): Position {
  let pos: Position;
  do {
    pos = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

export function useSnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [status, setStatus] = useState<GameStatus>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('gamesnake-highscore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const directionRef = useRef<Direction>(direction);
  const nextDirectionRef = useRef<Direction | null>(null);
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const scoreRef = useRef(score);
  const statusRef = useRef(status);

  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { foodRef.current = food; }, [food]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { statusRef.current = status; }, [status]);
  useEffect(() => { directionRef.current = direction; }, [direction]);

  const getSpeed = useCallback((currentScore: number) => {
    return Math.max(MIN_SPEED, INITIAL_SPEED - currentScore * SPEED_INCREMENT);
  }, []);

  const tick = useCallback(() => {
    if (statusRef.current !== 'playing') return;

    if (nextDirectionRef.current) {
      directionRef.current = nextDirectionRef.current;
      setDirection(nextDirectionRef.current);
      nextDirectionRef.current = null;
    }

    const currentSnake = snakeRef.current;
    const currentFood = foodRef.current;
    const currentDirection = directionRef.current;
    const head = currentSnake[0];

    const newHead: Position = { ...head };
    switch (currentDirection) {
      case 'UP': newHead.y -= 1; break;
      case 'DOWN': newHead.y += 1; break;
      case 'LEFT': newHead.x -= 1; break;
      case 'RIGHT': newHead.x += 1; break;
    }

    if (newHead.x < 0 || newHead.x >= BOARD_SIZE || newHead.y < 0 || newHead.y >= BOARD_SIZE) {
      setStatus('gameover');
      return;
    }

    const bodyToCheck = currentSnake.slice(0, -1);
    if (bodyToCheck.some((s) => s.x === newHead.x && s.y === newHead.y)) {
      setStatus('gameover');
      return;
    }

    const newSnake = [newHead, ...currentSnake];

    if (newHead.x === currentFood.x && newHead.y === currentFood.y) {
      const newScore = scoreRef.current + 1;
      setScore(newScore);
      const newFood = getRandomPosition(newSnake);
      setFood(newFood);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, []);

  useEffect(() => {
    if (status !== 'playing') return;
    const speed = getSpeed(scoreRef.current);
    const interval = setInterval(tick, speed);
    return () => clearInterval(interval);
  }, [status, score, tick, getSpeed]);

  // Update high score on game over
  useEffect(() => {
    if (status === 'gameover' && score > highScore) {
      setHighScore(score);
      localStorage.setItem('gamesnake-highscore', score.toString());
    }
  }, [status, score, highScore]);

  const changeDirection = useCallback((newDir: Direction) => {
    if (statusRef.current !== 'playing') return;
    const current = nextDirectionRef.current || directionRef.current;
    if (newDir === current) return;
    // Prevent 180-degree turns
    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT',
    };
    if (opposites[newDir] === current) return;
    nextDirectionRef.current = newDir;
  }, []);

  const startGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(getRandomPosition(initialSnake));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    nextDirectionRef.current = null;
    setScore(0);
    setStatus('playing');
  }, []);

  const pauseGame = useCallback(() => {
    if (status === 'playing') setStatus('paused');
  }, [status]);

  const resumeGame = useCallback(() => {
    if (status === 'paused') setStatus('playing');
  }, [status]);

  const togglePause = useCallback(() => {
    if (status === 'playing') setStatus('paused');
    else if (status === 'paused') setStatus('playing');
  }, [status]);

  return {
    snake,
    food,
    direction,
    status,
    score,
    highScore,
    boardSize: BOARD_SIZE,
    changeDirection,
    startGame,
    pauseGame,
    resumeGame,
    togglePause,
  };
}
