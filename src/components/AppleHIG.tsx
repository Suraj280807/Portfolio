import React from 'react';
import { motion } from 'framer-motion';
import { Eye, RotateCcw, Layers, Compass, Zap, HelpCircle } from 'lucide-react';

interface Principle {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const PRINCIPLES: Principle[] = [
  {
    title: "Clarity",
    description: "Prioritizing legible typography, crisp iconography, and layout-driven focus so that user actions are intuitive.",
    icon: <Eye className="w-6 h-6 text-sky-400" />,
    gradient: "from-sky-500/10 to-indigo-500/5"
  },
  {
    title: "Consistency",
    description: "Maintaining cohesive UI patterns, symbols, and layouts across all viewport sizes, devices, and user states.",
    icon: <RotateCcw className="w-6 h-6 text-pink-400" />,
    gradient: "from-pink-500/10 to-purple-500/5"
  },
  {
    title: "Depth",
    description: "Constructing spatial hierarchies using realistic translucent glass blurs, stacked cards, shadows, and parallax.",
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    gradient: "from-purple-500/10 to-indigo-500/5"
  },
  {
    title: "Accessibility",
    description: "Integrating high-contrast text ratios, clear touch boundaries, and assistive tags for screen reader compatibility.",
    icon: <Compass className="w-6 h-6 text-emerald-400" />,
    gradient: "from-emerald-500/10 to-teal-500/5"
  },
  {
    title: "Feedback",
    description: "Offering subtle micro-animations, loading loops, and state changes to instantly confirm user interactions.",
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    gradient: "from-amber-500/10 to-rose-500/5"
  },
  {
    title: "Simplicity",
    description: "Eliminating digital clutter and focus-scattering modules to prioritize the content itself.",
    icon: <HelpCircle className="w-6 h-6 text-indigo-400" />,
    gradient: "from-indigo-500/10 to-sky-500/5"
  }
];

export const AppleHIG: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
      {PRINCIPLES.map((principle, idx) => {
        return (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`liquid-glass p-8 flex flex-col gap-5 bg-gradient-to-br ${principle.gradient} relative overflow-hidden interactive-card group`}
          >
            {/* Ambient hover light */}
            <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                {principle.icon}
              </div>
              <span className="text-[10px] font-bold text-white/20 tracking-wider">
                0{idx + 1}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-white/95 group-hover:text-white transition-colors">
                {principle.title}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                {principle.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
