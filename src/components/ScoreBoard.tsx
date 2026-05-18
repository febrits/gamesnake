import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

export function ScoreBoard({ score, highScore }: ScoreBoardProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-[min(80vw,500px)] mb-4">
      <div className="flex flex-col items-start">
        <span className="text-xs uppercase tracking-widest text-[#64748b] font-medium">Score</span>
        <span className="text-3xl font-bold text-[#22d3ee] tabular-nums" style={{ textShadow: '0 0 20px rgba(34,211,238,0.3)' }}>
          {score}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-1">
          <Trophy size={14} className="text-[#a78bfa]" />
          <span className="text-xs uppercase tracking-widest text-[#64748b] font-medium">Best</span>
        </div>
        <span className="text-3xl font-bold text-[#a78bfa] tabular-nums" style={{ textShadow: '0 0 20px rgba(167,139,250,0.3)' }}>
          {highScore}
        </span>
      </div>
    </div>
  );
}
