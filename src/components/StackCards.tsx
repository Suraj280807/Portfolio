import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, PenTool, Layout, Layers, ShieldCheck, Cpu } from 'lucide-react';

interface Skill {
  id: string;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  description: string;
  points: string[];
  tools: string[];
}

const SKILLS: Skill[] = [
  {
    id: "ai-intelligent-systems",
    title: "AI & Intelligent Systems",
    subtitle: "INTELLIGENT SYSTEMS",
    icon: <Brain className="w-8 h-8" style={{ color: '#38bdf8' }} />,
    description: "Designing agentic workflows, custom large language model integrations, and automated pipelines that translate intelligence into product execution.",
    points: ["Prompt Engineering", "LLM Fundamentals", "AI Integrations", "Automation Workflows", "AI Product Thinking"],
    tools: ["OpenAI", "LangChain", "Vector DBs", "Python", "LlamaIndex"]
  },
  {
    id: "product-design",
    title: "Product Design",
    subtitle: "CONCEPT TO LAUNCH",
    icon: <PenTool className="w-8 h-8" style={{ color: '#f472b6' }} />,
    description: "Bridging user needs and technical constraints to orchestrate high-impact digital products. Planning roadmaps from early ideation to deployment.",
    points: ["Design Thinking", "User Research", "Product Strategy", "Problem Solving", "Feature Planning"],
    tools: ["Figma", "User Journey", "Wireframes", "Product Sprints", "Analytics"]
  },
  {
    id: "ui-ux-design",
    title: "UI / UX Design",
    subtitle: "HUMAN INTERFACE DESIGN",
    icon: <Layout className="w-8 h-8" style={{ color: '#c084fc' }} />,
    description: "Designing immersive user interfaces with fluid typography, grid spacing models, and responsive layers that prioritize ease of use.",
    points: ["Human Interface Design", "Visual Hierarchy", "Interaction Design", "Accessibility", "User Experience"],
    tools: ["Figma", "Adobe Suite", "Responsive Grids", "Prototyping", "WCAG Specs"]
  },
  {
    id: "fullstack-development",
    title: "Full Stack Development",
    subtitle: "HIGH-PERFORMANCE ARCHITECTURE",
    icon: <Layers className="w-8 h-8" style={{ color: '#34d399' }} />,
    description: "Writing maintainable, clean code across the frontend and backend. Engineering secure sessions, real-time database queries, and modular components.",
    points: ["React", "JavaScript", "Authentication Systems", "APIs", "Responsive Design"],
    tools: ["React", "JavaScript", "Node.js", "APIs", "Git", "PostgreSQL"]
  },
  {
    id: "cybersecurity-cloud",
    title: "Cybersecurity & Cloud",
    subtitle: "ZERO TRUST SECURITY",
    icon: <ShieldCheck className="w-8 h-8" style={{ color: '#fbbf24' }} />,
    description: "Implementing robust security controls, session validation rules, and secure architectural structures to safeguard data transfers and user privacy.",
    points: ["Security Fundamentals", "Cloud Concepts", "Authentication", "Secure Architecture", "Privacy Awareness"],
    tools: ["Cloud Security", "JWT", "OAuth 2.0", "Encryption", "OWASP top 10"]
  },
  {
    id: "swift-apple-ecosystem",
    title: "Swift & Apple Ecosystem",
    subtitle: "NATIVE MOBILE DESIGN",
    icon: <Cpu className="w-8 h-8" style={{ color: '#818cf8' }} />,
    description: "Engineering native mobile solutions using Swift and SwiftUI, focusing on strict compliance to Apple's Human Interface Guidelines (HIG) and premium animation transitions.",
    points: ["Swift Fundamentals", "iOS Development", "Apple Human Interface Guidelines", "Product Thinking", "Mobile Experiences"],
    tools: ["Swift", "SwiftUI", "Xcode", "HIG Compliance", "iOS Mobile", "App Launch"]
  }
];

const THEMES: Record<string, {
  accent: string;
  border: string;
  glow: string;
  // High opacity so card below is fully blocked — but still shows page glow through
  solidBg: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  dotColor: string;
  topLine: string;
}> = {
  "ai-intelligent-systems": {
    accent: "#38bdf8",
    border: "rgba(56,189,248,0.22)",
    glow: "rgba(56,189,248,0.18)",
    solidBg: "rgba(8, 18, 34, 0.92)",
    badgeBg: "rgba(56,189,248,0.09)",
    badgeBorder: "rgba(56,189,248,0.22)",
    badgeText: "rgba(125,211,252,0.9)",
    dotColor: "rgba(56,189,248,0.65)",
    topLine: "rgba(56,189,248,0.45)",
  },
  "product-design": {
    accent: "#f472b6",
    border: "rgba(236,72,153,0.22)",
    glow: "rgba(236,72,153,0.18)",
    solidBg: "rgba(26, 8, 20, 0.92)",
    badgeBg: "rgba(236,72,153,0.09)",
    badgeBorder: "rgba(236,72,153,0.22)",
    badgeText: "rgba(249,168,212,0.9)",
    dotColor: "rgba(244,114,182,0.65)",
    topLine: "rgba(236,72,153,0.45)",
  },
  "ui-ux-design": {
    accent: "#c084fc",
    border: "rgba(168,85,247,0.22)",
    glow: "rgba(168,85,247,0.18)",
    solidBg: "rgba(16, 8, 30, 0.92)",
    badgeBg: "rgba(168,85,247,0.09)",
    badgeBorder: "rgba(168,85,247,0.22)",
    badgeText: "rgba(216,180,254,0.9)",
    dotColor: "rgba(192,132,252,0.65)",
    topLine: "rgba(168,85,247,0.45)",
  },
  "fullstack-development": {
    accent: "#34d399",
    border: "rgba(16,185,129,0.22)",
    glow: "rgba(16,185,129,0.18)",
    solidBg: "rgba(4, 18, 12, 0.92)",
    badgeBg: "rgba(16,185,129,0.09)",
    badgeBorder: "rgba(16,185,129,0.22)",
    badgeText: "rgba(110,231,183,0.9)",
    dotColor: "rgba(52,211,153,0.65)",
    topLine: "rgba(16,185,129,0.45)",
  },
  "cybersecurity-cloud": {
    accent: "#fbbf24",
    border: "rgba(245,158,11,0.22)",
    glow: "rgba(245,158,11,0.18)",
    solidBg: "rgba(22, 15, 2, 0.92)",
    badgeBg: "rgba(245,158,11,0.09)",
    badgeBorder: "rgba(245,158,11,0.22)",
    badgeText: "rgba(253,230,138,0.9)",
    dotColor: "rgba(251,191,36,0.65)",
    topLine: "rgba(245,158,11,0.45)",
  },
  "swift-apple-ecosystem": {
    accent: "#818cf8",
    border: "rgba(99,102,241,0.22)",
    glow: "rgba(99,102,241,0.18)",
    solidBg: "rgba(8, 8, 26, 0.92)",
    badgeBg: "rgba(99,102,241,0.09)",
    badgeBorder: "rgba(99,102,241,0.22)",
    badgeText: "rgba(165,180,252,0.9)",
    dotColor: "rgba(129,140,248,0.65)",
    topLine: "rgba(99,102,241,0.45)",
  }
};

const SkillCard: React.FC<{ skill: Skill; index: number; total: number }> = ({ skill, index, total }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = THEMES[skill.id];

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // Shrink card slightly as it gets buried
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const stickyTop = 88 + index * 18;

  return (
    <div
      ref={cardRef}
      style={{
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: 10 + index,
        // Enough bottom padding to give each card scroll travel
        paddingBottom: `${(total - 1 - index) * 10}px`,
        width: '100%',
      }}
    >
      <motion.div style={{ scale, transformOrigin: 'top center', width: '100%' }}>
        {/* Glass card shell */}
        <div style={{
          position: 'relative',
          borderRadius: '18px',
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
          boxShadow: `0 16px 48px -12px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}>
          {/* Background: opaque enough to block card below, but tinted glass */}
          <div style={{
            position: 'absolute',
            top: 0, right: 0, bottom: 0, left: 0,
            background: theme.solidBg,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }} />

          {/* Subtle color gradient wash over the bg */}
          <div style={{
            position: 'absolute',
            top: 0, right: 0, bottom: 0, left: 0,
            background: `linear-gradient(135deg, ${theme.accent}08 0%, transparent 60%)`,
          }} />

          {/* Top shimmer line */}
          <div style={{
            position: 'absolute',
            top: 0, left: '8%', right: '8%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${theme.topLine}, transparent)`,
          }} />

          {/* Content */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            padding: '40px 52px',
            display: 'flex',
            gap: '44px',
            alignItems: 'flex-start',
          }}>
            {/* Left side */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
              {/* Icon + Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  padding: '14px',
                  borderRadius: '14px',
                  background: `${theme.accent}10`,
                  border: `1px solid ${theme.accent}22`,
                  flexShrink: 0,
                }}>
                  {skill.icon}
                </div>
                <div>
                  <span style={{
                    fontSize: '10px',
                    letterSpacing: '0.22em',
                    fontWeight: 700,
                    display: 'block',
                    whiteSpace: 'nowrap',
                    color: `${theme.accent}70`,
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                  }}>
                    {skill.subtitle}
                  </span>
                  <h3 style={{
                    fontSize: '26px',
                    fontWeight: 700,
                    color: '#e2e8f0',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                  }}>
                    {skill.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '14.5px',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'rgba(148,163,184,0.85)',
              }}>
                {skill.description}
              </p>

              {/* Tool badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skill.tools.map((tool, i) => (
                  <span key={i} style={{
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 500,
                    background: theme.badgeBg,
                    border: `1px solid ${theme.badgeBorder}`,
                    color: theme.badgeText,
                    letterSpacing: '0.01em',
                  }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{
              width: '1px',
              alignSelf: 'stretch',
              flexShrink: 0,
              background: `linear-gradient(to bottom, transparent, ${theme.accent}22, transparent)`,
            }} />

            {/* Right: specialization */}
            <div style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span style={{
                fontSize: '10px',
                letterSpacing: '0.22em',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                color: `${theme.accent}55`,
              }}>
                Core Specialization
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                {skill.points.map((pt, i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    fontSize: '13px', fontWeight: 400,
                    color: 'rgba(203,213,225,0.82)'
                  }}>
                    <span style={{
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      background: theme.dotColor,
                      flexShrink: 0,
                    }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const StackCards: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: '100%',
      maxWidth: '960px',
      padding: '0 16px',
    }}>
      {SKILLS.map((skill, idx) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          index={idx}
          total={SKILLS.length}
        />
      ))}
    </div>
  );
};
