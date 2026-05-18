import { type Direction } from '../hooks/useSnakeGame';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface GameControlsProps {
  onDirection: (dir: Direction) => void;
}

export function GameControls({ onDirection }: GameControlsProps) {
  const btnClass =
    'w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-[#1a1a24] border border-[#2a2a3e] text-[#64748b] hover:text-[#22d3ee] hover:border-[#22d3ee] active:bg-[#22d3ee] active:text-[#0a0a0f] transition-all duration-150 select-none touch-manipulation';

  return (
    <div className="flex flex-col items-center gap-2 mt-4 sm:hidden">
      <button className={btnClass} onClick={() => onDirection('UP')} aria-label="Up">
        <ChevronUp size={28} />
      </button>
      <div className="flex gap-2">
        <button className={btnClass} onClick={() => onDirection('LEFT')} aria-label="Left">
          <ChevronLeft size={28} />
        </button>
        <button className={btnClass} onClick={() => onDirection('DOWN')} aria-label="Down">
          <ChevronDown size={28} />
        </button>
        <button className={btnClass} onClick={() => onDirection('RIGHT')} aria-label="Right">
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
