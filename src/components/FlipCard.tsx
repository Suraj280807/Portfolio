import React, { useState } from 'react';
import { Award, Star, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

// --- CUSTOM INTERACTIVE SUBCOMPONENTS ---

// 1. NASA Space Apps Challenge Telemetry Visualizer
const NasaTelemetry: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className="w-full flex flex-col gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md select-none">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-sky-400 tracking-wider">ORBITAL GEOSPATIAL</span>
        <span className="text-[9px] font-bold text-white/45">SAT-TERRA</span>
      </div>

      <div className="flex items-center justify-center py-1 relative">
        <motion.div
          animate={active ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="w-12 h-12 rounded-full border border-sky-500/20 relative flex items-center justify-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
        </motion.div>
        <div className="absolute flex flex-col items-center">
          <span className="text-[9px] font-bold text-white leading-none">AEROSOL</span>
          <span className="text-[8px] font-mono text-sky-300 mt-0.5">0.24 AOD</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col items-center">
          <span className="text-[7px] text-white/40 font-bold uppercase">Solar Wind</span>
          <span className="text-[11px] font-extrabold text-sky-400">412 km/s</span>
        </div>
        <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col items-center">
          <span className="text-[7px] text-white/40 font-bold uppercase">Data Packet</span>
          <span className="text-[11px] font-extrabold text-emerald-400">99.8% Sync</span>
        </div>
      </div>
    </div>
  );
};

// 2. National-Level Hackathons — 26 Teams, 18 States
const MVPDeployments: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className="w-full flex flex-col gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md select-none">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-pink-400 tracking-wider">NATIONAL IMPACT MAP</span>
        <span className="text-[8px] font-bold text-white/50">INDIA</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col items-center gap-0.5">
          <span className="text-[7px] text-white/40 font-bold uppercase">Teams</span>
          <span className="text-xl font-extrabold text-pink-400 leading-none">26</span>
        </div>
        <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col items-center gap-0.5">
          <span className="text-[7px] text-white/40 font-bold uppercase">States</span>
          <span className="text-xl font-extrabold text-purple-400 leading-none">18</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {[
          { label: 'UI Architecture', color: 'text-pink-400', bar: 92 },
          { label: 'Ideation & Strategy', color: 'text-purple-400', bar: 85 },
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <div className="flex justify-between text-[8px]">
              <span className={`font-bold ${item.color}`}>{item.label}</span>
              <span className="text-white/40">{item.bar}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: active ? `${item.bar}%` : '0%', transitionDelay: `${i * 150}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Base44 Hackathon Decentralized Dashboard Widget
const Base44Dashboard: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className="w-full flex flex-col gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md select-none">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold text-amber-400 tracking-wider">CAMPUS DECENTRAL NODE</span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] font-bold text-emerald-400 uppercase">Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col justify-center gap-0.5">
          <span className="text-[7px] text-white/40 font-bold uppercase">Tx Throughput</span>
          <span className="text-[11px] font-extrabold text-white">4.2 GB/s</span>
        </div>
        <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col justify-center gap-0.5">
          <span className="text-[7px] text-white/40 font-bold uppercase">Consensus</span>
          <span className="text-[11px] font-extrabold text-sky-400">99.8%</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-end justify-between text-[7px] text-white/40 font-bold uppercase">
          <span>Shard Utilization</span>
          <span className="text-white/60">0.8ms Ping</span>
        </div>
        <div className="flex items-end gap-1 h-8 w-full">
          {[35, 75, 50, 95, 60, 85, 45, 90, 55, 80].map((h, i) => (
            <div
              key={i}
              className="w-full h-full bg-white/5 rounded-sm relative overflow-hidden"
            >
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500 to-amber-300 rounded-sm transition-all duration-700 ease-out"
                style={{ height: active ? `${h}%` : '0%', transitionDelay: `${i * 40}ms` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Custom Chess Knight Icon
const ChessKnight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 20H5a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1z" />
    <path d="M6 17c0-2 1-3 2.5-4C8.5 13 8 11.5 8 10c0-3.3 2.7-6 6-6 1.5 0 2.5.5 3 1 .5.5 1 2 1 4 0 1.5-.5 2.5-.5 2.5s1 1 1.5 2c.5 1 .5 2.5-1 3.5" />
    <circle cx="12" cy="8" r="1.2" fill="currentColor" />
  </svg>
);

// 4. Chess Tactics Board & Engine Evaluation Bar
const ChessTactics: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div 
      className="w-full flex flex-col gap-2 p-2.5 rounded-xl border backdrop-blur-md select-none relative overflow-hidden"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(255, 255, 255, 0.05)' }}
    >
      {/* Background Subtle Silhouette */}
      <div 
        className="absolute right-[-12px] bottom-[-12px] w-20 h-20 pointer-events-none text-white z-0"
        style={{ opacity: 0.03 }}
      >
        <ChessKnight className="w-full h-full stroke-[1]" />
      </div>

      <div className="flex items-center justify-between z-10">
        <span className="text-[9px] font-bold text-white/50 tracking-wider">TACTICAL COMBINATION</span>
        <span className="text-[8px] font-mono text-white/40">EVAL: +3.2</span>
      </div>

      <div className="flex gap-2 items-stretch h-20 z-10">
        {/* Chess Grid (4x4) */}
        <div 
          className="grid grid-cols-4 gap-0.5 p-0.5 border rounded-md flex-1"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', borderColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const isDark = (row + col) % 2 === 1;
            
            const isStart = i === 12; // Bottom left (d4)
            const isMid = i === 9;   // Middle
            const isEnd = i === 1;    // Top right (e6)
            
            return (
              <div
                key={i}
                className="rounded-sm relative flex items-center justify-center"
                style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'transparent' }}
              >
                {isStart && (
                  <motion.div
                    animate={active ? { scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] } : {}}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_6px_#fff]"
                  />
                )}
                {isEnd && (
                  <motion.div
                    animate={active ? { scale: [1, 1.35, 1], opacity: [0.8, 1, 0.8] } : {}}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.6 }}
                    className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]"
                  />
                )}
                {isMid && (
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                )}
              </div>
            );
          })}
        </div>

        {/* Engine Evaluation Bar */}
        <div 
          className="w-3.5 border rounded flex flex-col justify-end relative overflow-hidden"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <motion.div
            className="w-full bg-white/80 rounded-b"
            initial={{ height: "50%" }}
            animate={active ? { height: "76%" } : { height: "50%" }}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
          />
          <div className="absolute inset-x-0 top-0.5 text-center text-[7px] font-bold text-white/50 z-10 font-mono">
            +3.2
          </div>
        </div>
      </div>

      {/* Strategic Skills */}
      <div className="grid grid-cols-2 gap-1 w-full z-10">
        {[
          'Strategic Thinking',
          'Decision Making',
          'Pattern Recognition',
          'Competitive Mindset'
        ].map((skill, i) => (
          <div 
            key={i} 
            className="px-1.5 py-0.5 rounded border text-[8px] font-bold text-white/60 tracking-tight text-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- DATA CONFIGURATION ---

interface Achievement {
  title: string;
  category: string;
  backTitle: string;
  metrics: string;
  icon: React.ReactNode;
  visualType: 'nasa' | 'national' | 'base44' | 'chess';
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Base44 Campus Hackathon Winner",
    category: "1ST PLACE WINNER",
    backTitle: "Base44 Hackathon",
    metrics: "Built under 24 hours with full tech stack integration.",
    icon: <Award className="w-8 h-8 text-amber-400" />,
    visualType: 'base44'
  },
  {
    title: "NASA Space Apps Challenge",
    category: "GLOBAL COMPETITION",
    backTitle: "NASA Space Apps",
    metrics: "Top-tier regional design showcase & data modeling.",
    icon: <Compass className="w-8 h-8 text-sky-400" />,
    visualType: 'nasa'
  },
  {
    title: "National-Level Hackathons",
    category: "ELITE HACKATHONS",
    backTitle: "National Finalist",
    metrics: "Major contribution in UI design & core product ideas.",
    icon: <Star className="w-8 h-8 text-pink-400" />,
    visualType: 'national'
  },
  {
    title: "Chess Championship Runner-Up",
    category: "SCHOOL CHAMPIONSHIP",
    backTitle: "♟️ Chess Championship",
    metrics: "Secured 2nd place in the school-wide chess championship, competing against students across multiple grades. Developed strategic thinking, long-term planning, pattern recognition, decision-making under pressure, and competitive problem-solving skills.",
    icon: <ChessKnight className="w-8 h-8 text-white/90" />,
    visualType: 'chess'
  }
];

export const FlipCard: React.FC = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
      {ACHIEVEMENTS.map((ach, idx) => {
        const isFlipped = flippedIndex === idx;
        const isChess = ach.visualType === 'chess';

        return (
          <div
            key={idx}
            className="h-[360px] cursor-pointer relative"
            style={{ perspective: '1200px' }}
            onMouseEnter={() => setFlippedIndex(idx)}
            onMouseLeave={() => setFlippedIndex(null)}
            onClick={() => setFlippedIndex(isFlipped ? null : idx)}
          >
            {/* Card Inner Wrapper */}
            <div
              className="relative w-full h-full duration-700 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front Side */}
              <div
                className="absolute inset-0 w-full h-full liquid-glass p-8 flex flex-col justify-between items-start backface-hidden overflow-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  background: isChess 
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)' 
                    : 'rgba(255, 255, 255, 0.02)',
                  border: isChess && isFlipped 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  boxShadow: isChess && isFlipped 
                    ? '0 8px 32px 0 rgba(255, 255, 255, 0.06)' 
                    : 'none',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Chess background silhouette */}
                {isChess && (
                  <div 
                    className="absolute right-[-10px] bottom-[-10px] w-32 h-32 pointer-events-none text-white z-0"
                    style={{ opacity: 0.03 }}
                  >
                    <ChessKnight className="w-full h-full stroke-[0.8]" />
                  </div>
                )}

                <div className="w-full flex justify-between items-start z-10">
                  <span className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase">
                    {ach.category}
                  </span>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    {ach.icon}
                  </div>
                </div>

                <div className="flex flex-col gap-3 z-10 w-full">
                  <h3 className="text-xl font-semibold leading-snug text-white/90">
                    {ach.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-white/50 group-hover:text-white transition-colors">
                    Hover or tap to inspect →
                  </div>
                </div>
              </div>

              {/* Back Side */}
              <div
                className="absolute inset-0 w-full h-full liquid-glass p-4 flex flex-col gap-2 items-start backface-hidden overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: isChess 
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)' 
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  border: isChess && isFlipped 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Header */}
                <div className="w-full flex flex-col gap-0.5 shrink-0">
                  <span className="text-[9px] tracking-[0.2em] font-bold text-white/30 uppercase">
                    IMPACT & METRICS
                  </span>
                  <h4 className="text-sm font-semibold text-white leading-tight">
                    {ach.backTitle}
                  </h4>
                </div>

                {/* DYNAMIC VISUAL WIDGET — flex-1 so it fills remaining space without bursting */}
                <div className="w-full flex-1 min-h-0 flex items-center">
                  {ach.visualType === 'nasa' && <NasaTelemetry active={isFlipped} />}
                  {ach.visualType === 'national' && <MVPDeployments active={isFlipped} />}
                  {ach.visualType === 'base44' && <Base44Dashboard active={isFlipped} />}
                  {ach.visualType === 'chess' && <ChessTactics active={isFlipped} />}
                </div>

                {/* Footer */}
                <div className="w-full pt-2 border-t border-white/5 shrink-0">
                  <span className="text-[10px] font-medium text-white/70 leading-snug">
                    {ach.metrics}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
