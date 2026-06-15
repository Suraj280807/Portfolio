import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Rocket, Sparkles, X } from 'lucide-react';

export interface ProjectStory {
  problem: {
    heading: string;
    body: string;
  };
  solution: {
    heading: string;
    body: string;
  };
  learnings: string[];
  accent: string;
}

interface ProjectStoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  story: ProjectStory;
  projectName: string;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.44, delay },
});

export const ProjectStoryPanel: React.FC<ProjectStoryPanelProps> = ({
  isOpen,
  onClose,
  story,
  projectName,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="story-panel"
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: '28px' }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ overflow: 'hidden', width: '100%' }}
        >
          {/* Glass container */}
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            border: `1px solid ${story.accent}30`,
            overflow: 'hidden',
            boxShadow: `0 20px 60px -16px ${story.accent}20, inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}>
            {/* Blurred backdrop */}
            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
              background: 'rgba(6, 4, 16, 0.90)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }} />

            {/* Accent wash */}
            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
              background: `linear-gradient(135deg, ${story.accent}09 0%, transparent 55%)`,
              pointerEvents: 'none',
            }} />

            {/* Top shimmer */}
            <div style={{
              position: 'absolute', top: 0, left: '5%', right: '5%',
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${story.accent}50, transparent)`,
            }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, padding: '36px 40px 32px' }}>

              {/* Header */}
              <motion.div {...fadeUp(0.05)} style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '28px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '10px', letterSpacing: '0.22em', fontWeight: 700,
                    textTransform: 'uppercase', color: `${story.accent}80`,
                  }}>
                    Project Story
                  </span>
                  <span style={{
                    display: 'inline-block', width: '4px', height: '4px',
                    borderRadius: '50%', background: `${story.accent}55`,
                  }} />
                  <span style={{
                    fontSize: '10px', letterSpacing: '0.18em', fontWeight: 600,
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                  }}>
                    {projectName}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    cursor: 'pointer', color: 'rgba(255,255,255,0.45)',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.9)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)';
                  }}
                >
                  <X size={14} />
                </button>
              </motion.div>

              {/* Two-column story */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px',
              }}>
                {/* Problem */}
                <motion.div {...fadeUp(0.14)} style={{
                  padding: '24px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', flexDirection: 'column', gap: '14px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      padding: '8px', borderRadius: '10px',
                      background: 'rgba(251,191,36,0.12)',
                      border: '1px solid rgba(251,191,36,0.22)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Lightbulb size={16} color="#fbbf24" />
                    </div>
                    <h4 style={{
                      fontSize: '13px', fontWeight: 700,
                      color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.01em',
                      margin: 0,
                    }}>
                      {story.problem.heading}
                    </h4>
                  </div>
                  <p style={{
                    fontSize: '13.5px', fontWeight: 300,
                    lineHeight: 1.8, color: 'rgba(148,163,184,0.88)',
                    margin: 0,
                  }}>
                    {story.problem.body}
                  </p>
                </motion.div>

                {/* Solution */}
                <motion.div {...fadeUp(0.23)} style={{
                  padding: '24px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', flexDirection: 'column', gap: '14px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      padding: '8px', borderRadius: '10px',
                      background: `${story.accent}18`,
                      border: `1px solid ${story.accent}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Rocket size={16} color={story.accent} />
                    </div>
                    <h4 style={{
                      fontSize: '13px', fontWeight: 700,
                      color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.01em',
                      margin: 0,
                    }}>
                      {story.solution.heading}
                    </h4>
                  </div>
                  <p style={{
                    fontSize: '13.5px', fontWeight: 300,
                    lineHeight: 1.8, color: 'rgba(148,163,184,0.88)',
                    margin: 0,
                  }}>
                    {story.solution.body}
                  </p>
                </motion.div>
              </div>

              {/* Key Learnings */}
              <motion.div {...fadeUp(0.32)} style={{
                padding: '20px 24px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', flexDirection: 'column', gap: '14px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={14} color={story.accent} />
                  <span style={{
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase' as const,
                    color: `${story.accent}80`,
                  }}>
                    Key Learnings
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {story.learnings.map((learning, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.36 + i * 0.06 }}
                      style={{
                        padding: '5px 14px',
                        borderRadius: '9999px',
                        fontSize: '11.5px', fontWeight: 500,
                        background: `${story.accent}0e`,
                        border: `1px solid ${story.accent}25`,
                        color: `${story.accent}cc`,
                        letterSpacing: '0.01em',
                      }}
                    >
                      {learning}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
