import React from 'react';

interface ProgressIndicatorProps {
  activeChapter: number;
  totalChapters: number;
  chapterNames: string[];
  onChapterClick: (index: number) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  activeChapter,
  totalChapters,
  chapterNames,
  onChapterClick,
}) => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 z-[99] pointer-events-auto">
      {/* Scroll Progress line background */}
      <div className="relative w-[2px] h-48 bg-white/10 rounded-full flex flex-col justify-start">
        {/* Dynamic active line */}
        <div 
          className="absolute top-0 left-0 w-full bg-white transition-all duration-500 ease-out rounded-full"
          style={{ 
            height: `${((activeChapter) / (totalChapters - 1)) * 100}%`,
            background: 'var(--accent-gradient)'
          }}
        />
        
        {/* Nodes overlaying the track */}
        <div className="absolute inset-0 flex flex-col justify-between items-center py-1">
          {Array.from({ length: totalChapters }).map((_, idx) => {
            const isActive = idx === activeChapter;
            const isCompleted = idx < activeChapter;
            return (
              <button
                key={idx}
                onClick={() => onChapterClick(idx)}
                className="group relative flex items-center justify-center w-3 h-3 rounded-full focus:outline-none transition-all duration-300"
                style={{
                  background: isActive 
                    ? 'white' 
                    : isCompleted 
                      ? 'var(--accent)' 
                      : 'rgba(255,255,255,0.2)',
                  transform: isActive ? 'scale(1.3)' : 'scale(1)',
                  boxShadow: isActive ? '0 0 12px var(--accent)' : 'none'
                }}
                title={chapterNames[idx]}
              >
                {/* Tooltip on hover */}
                <div className="absolute left-6 translate-x-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 py-1 px-3 rounded-md liquid-glass text-xs font-semibold text-white whitespace-nowrap border border-white/10">
                  <span className="text-white/40 mr-1.5 font-bold">CH. {idx + 1}</span>
                  {chapterNames[idx]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
