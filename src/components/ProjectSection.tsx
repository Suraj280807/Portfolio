import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Calendar, UserCheck, Heart, Sun, Thermometer, Wind, CheckCircle2, TrendingUp, Zap, ArrowRight, BookOpen } from 'lucide-react';
import { ProjectStoryPanel } from './ProjectStoryPanel';
import type { ProjectStory } from './ProjectStoryPanel';

// Asset Imports
import sruvoHome from '../assets/sruvo_home.png';
import sruvoChat from '../assets/sruvo_chat.png';
import projectGardener from '../assets/project_gardener.png';
import streaklyToday from '../assets/streakly_today.png';
import streaklyStats from '../assets/streakly_stats.png';
import streaklyNew from '../assets/streakly_new.png';
import streaklySettings from '../assets/streakly_settings.png';

/* ─── Per-project story content ─── */
const STORIES: Record<string, ProjectStory> = {
  sruvo: {
    accent: '#818cf8',
    problem: {
      heading: 'How I Identified the Problem',
      body: "While researching the pet-care space, I noticed something consistently frustrating: pet owners were juggling three or four different apps just to manage one animal. Vet bookings lived in one place, health records in another, and there was no intelligent layer connecting any of it. The experience felt fragmented, stressful, and completely disconnected from what pet ownership actually feels like — which is deeply personal. I kept asking myself: why hasn't anyone built a single ecosystem that understands the relationship between a pet and their owner? That question became the seed for SRUVO.",
    },
    solution: {
      heading: 'The Solution I Created',
      body: "I designed SRUVO as an AI-powered pet-care companion that consolidates everything into one cohesive platform. At its core is an intelligent assistant that can interpret pet health symptoms and surface relevant veterinary guidance instantly. Layered on top of that is a real-time booking system for clinic appointments, a full digital health record system with vaccine logs and diagnostics, and a clinic-side admin console for veterinary professionals. The result is a product that removes the friction between caring for a pet and getting them the help they need.",
    },
    learnings: [
      'AI product architecture', 'User empathy mapping', 'Real-time booking flows',
      'Role-based access design', 'End-to-end UX ownership',
    ],
  },

  gardener: {
    accent: '#34d399',
    problem: {
      heading: 'How I Identified the Problem',
      body: "Small-scale farmers and urban gardeners are making daily decisions — what to water, what to plant, when to harvest — based almost entirely on intuition. Meanwhile, there is a mountain of environmental data available from public weather APIs, soil sensors, and satellite feeds that most people have no way to meaningfully access. I saw a clear gap: data that could dramatically improve agricultural outcomes was sitting unused because there was no accessible, human-first interface built around it. The problem wasn't the data. It was the translation layer between it and the person holding the watering can.",
    },
    solution: {
      heading: 'The Solution I Created',
      body: "Virtual Gardener AI is a climate-sensitive crop advisor that pulls live environmental telemetry — temperature, wind, humidity, soil moisture — and processes it through a recommendation engine to give growers actionable guidance. I built a dashboard that aggregates N-P-K soil metrics and uses a computer vision pipeline to flag leaf anomalies early, before visible crop damage occurs. The interface was designed to feel like a knowledgeable farming companion rather than a scientific instrument — approachable, visual, and immediately useful even for someone with no data background.",
    },
    learnings: [
      'Real-time API integration', 'Data visualisation principles', 'Computer vision basics',
      'Dashboard UX patterns', 'Environmental domain research',
    ],
  },

  habit: {
    accent: '#fb7185',
    problem: {
      heading: 'How I Identified the Problem',
      body: "Most habit-tracking apps I encountered felt like productivity spreadsheets disguised with a coat of paint. They were functional but joyless — there was no reward in opening them, no sense of personality, nothing that made the act of building a habit feel meaningful. I'd read extensively about Apple's Human Interface Guidelines and become genuinely fascinated by the idea that software could be emotionally resonant. I wanted to prove that a simple habit tracker could feel premium, personal, and worth picking up every single day — not because it had features, but because it had soul.",
    },
    solution: {
      heading: 'The Solution I Created',
      body: "I built Streakly, a native iOS habit tracking application designed from the ground up around Apple's HIG principles. The centrepiece is a set of animated concentric activity rings built in CoreGraphics — visually satisfying progress indicators that make completion feel like an achievement. I added a daily grid system for streak tracking, customised haptic feedback profiles that fire precisely at habit completion moments, and an offline-first architecture using CoreData with seamless cloud sync. The entire experience is designed to make the user feel proud to open it every morning.",
    },
    learnings: [
      'Swift & SwiftUI mastery', 'Apple HIG compliance', 'CoreGraphics rendering',
      'Haptic feedback design', 'Offline-first architecture', 'Mobile UX psychology',
    ],
  },
};

const STREAKLY_SCREENS = [
  { src: streaklyToday, label: 'Today' },
  { src: streaklyStats, label: 'Stats' },
  { src: streaklyNew, label: 'Add Habit' },
  { src: streaklySettings, label: 'Settings' }
];

const SRUVO_SCREENS = [
  { src: sruvoChat, label: 'Ecosystem' },
  { src: sruvoHome, label: 'AI Vet Chat' }
];

/* ─── View Story Button ─── */
const ViewStoryButton: React.FC<{ isOpen: boolean; onClick: () => void; accent: string }> = ({ isOpen, onClick, accent }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    style={{
      display: 'flex', alignItems: 'center', gap: '7px',
      padding: '10px 18px',
      borderRadius: '12px',
      background: isOpen ? `${accent}18` : 'rgba(255,255,255,0.05)',
      border: `1px solid ${isOpen ? `${accent}40` : 'rgba(255,255,255,0.1)'}`,
      color: isOpen ? accent : 'rgba(255,255,255,0.65)',
      fontSize: '12px', fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      letterSpacing: '0.01em',
      fontFamily: 'inherit',
    }}
    onMouseEnter={e => {
      if (!isOpen) {
        (e.currentTarget as HTMLButtonElement).style.background = `${accent}12`;
        (e.currentTarget as HTMLButtonElement).style.borderColor = `${accent}35`;
        (e.currentTarget as HTMLButtonElement).style.color = accent;
      }
    }}
    onMouseLeave={e => {
      if (!isOpen) {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
        (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.65)';
      }
    }}
  >
    <BookOpen size={14} />
    {isOpen ? 'Close Story' : 'View Story'}
  </motion.button>
);

/* ─── Main Component ─── */
export const ProjectSection: React.FC = () => {
  const [openStory, setOpenStory] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [currentSruvoScreen, setCurrentSruvoScreen] = useState(0);

  const toggle = (id: string) => setOpenStory(prev => prev === id ? null : id);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen(prev => (prev + 1) % STREAKLY_SCREENS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSruvoScreen(prev => (prev + 1) % SRUVO_SCREENS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col gap-32 max-w-6xl px-4 z-10">

      {/* PROJECT 1: SRUVO */}
      <section className="flex flex-col gap-0 w-full">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between w-full">
          {/* Left: Info */}
          <div className="flex-1 flex flex-col gap-6 items-start">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                CASE STUDY 01
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="text-xs font-bold text-white/50">STARTUP LAUNCH</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
              SRUVO
            </h3>

            <p className="text-base text-white/70 font-light leading-relaxed">
              A next-generation AI Veterinary Assistant designed to connect pet parents with automated health insights, veterinary scheduling services, and clean dashboard diagnostics.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              <div className="p-4 liquid-glass border border-white/5 flex flex-col gap-1.5">
                <Zap className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-bold text-white/80">AI Assistant</span>
                <span className="text-[10px] text-white/50 font-light">Instant veterinary diagnosis & support templates.</span>
              </div>
              <div className="p-4 liquid-glass border border-white/5 flex flex-col gap-1.5">
                <Calendar className="w-5 h-5 text-teal-400" />
                <span className="text-xs font-bold text-white/80">Booking System</span>
                <span className="text-[10px] text-white/50 font-light">Real-time scheduling with clinic API integrations.</span>
              </div>
              <div className="p-4 liquid-glass border border-white/5 flex flex-col gap-1.5">
                <UserCheck className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-bold text-white/80">Pet Profiles</span>
                <span className="text-[10px] text-white/50 font-light">Digital health records, vaccine logs, and telemetry.</span>
              </div>
              <div className="p-4 liquid-glass border border-white/5 flex flex-col gap-1.5">
                <Shield className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-bold text-white/80">Admin Console</span>
                <span className="text-[10px] text-white/50 font-light">Advanced control panel for local vet clinics.</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/Suraj280807/Sruvo.git"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-white/95 hover:scale-105 active:scale-95 transition-all shadow-lg interactive-card"
              >
                Take Me There
                <ArrowRight className="w-4 h-4" />
              </a>
              <ViewStoryButton
                isOpen={openStory === 'sruvo'}
                onClick={() => toggle('sruvo')}
                accent={STORIES.sruvo.accent}
              />
            </div>
          </div>

          {/* Right: Mockup */}
          <div className="flex-1 w-full relative flex flex-col items-center justify-center min-h-[360px] md:min-h-[420px]">
            <div className="relative w-11/12 max-w-lg h-[260px] md:h-[300px]">
              {/* Card container */}
              <motion.div
                whileHover={{ y: -5, rotateY: -6, rotateX: 6 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="w-full h-full liquid-glass relative overflow-hidden shadow-2xl border border-white/10 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => setCurrentSruvoScreen(prev => (prev + 1) % SRUVO_SCREENS.length)}
              >
                <div className="w-full h-full relative overflow-hidden bg-[#0c0a15]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSruvoScreen}
                      src={SRUVO_SCREENS[currentSruvoScreen].src}
                      alt={SRUVO_SCREENS[currentSruvoScreen].label}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full object-cover object-top filter contrast-[1.02] brightness-95 opacity-90"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  </AnimatePresence>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating Widgets */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute z-20 pointer-events-none flex items-center gap-3.5 p-4 rounded-2xl border border-white/10"
                style={{
                  top: '-16px',
                  left: '-24px',
                  background: 'rgba(15, 12, 30, 0.65)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: `0 12px 36px -8px rgba(129, 140, 248, 0.15), inset 0 1px 1px rgba(255,255,255,0.08)`,
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(236, 72, 153, 0.15)',
                  border: '1px solid rgba(236, 72, 153, 0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Heart className="w-4 h-4 text-pink-400" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}>
                    APPOINTMENT SECURED
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#f8fafc' }}>
                    Dr. Sarah (Vet Surgeon)
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute flex flex-col gap-2.5 p-4 rounded-2xl border border-white/10 z-20 pointer-events-none min-w-[170px]"
                style={{
                  bottom: '-16px',
                  right: '-24px',
                  background: 'rgba(15, 12, 30, 0.65)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: `0 12px 36px -8px rgba(129, 140, 248, 0.15), inset 0 1px 1px rgba(255,255,255,0.08)`,
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}>
                  HEALTH SCORE
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-indigo-400">98%</span>
                  <span className="text-[10px] text-teal-400 font-bold">Excellent (+3.4%)</span>
                </div>
                <div className="flex items-end gap-1 h-6 w-full pt-1.5">
                  <div className="h-[40%] w-full bg-white/10 rounded-sm" />
                  <div className="h-[60%] w-full bg-white/10 rounded-sm" />
                  <div className="h-[75%] w-full bg-white/20 rounded-sm" />
                  <div className="h-[95%] w-full bg-indigo-500 rounded-sm shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                </div>
              </motion.div>
            </div>

            {/* Screen Selector Pills */}
            <div className="flex gap-1.5 mt-4 z-20">
              {SRUVO_SCREENS.map((screen, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSruvoScreen(idx)}
                  className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold transition-all duration-300 ${
                    currentSruvoScreen === idx
                      ? 'bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                      : 'bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/70'
                  }`}
                >
                  {screen.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SRUVO Story Panel */}
        <ProjectStoryPanel
          isOpen={openStory === 'sruvo'}
          onClose={() => setOpenStory(null)}
          story={STORIES.sruvo}
          projectName="SRUVO"
        />
      </section>

      {/* PROJECT 2: VIRTUAL GARDENER AI */}
      <section className="flex flex-col gap-0 w-full">
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center justify-between w-full">
          {/* Left: Info */}
          <div className="flex-1 flex flex-col gap-6 items-start">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                CASE STUDY 02
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="text-xs font-bold text-white/50">ECO-TELEMETRY</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
              Virtual Gardener AI
            </h3>

            <p className="text-base text-white/70 font-light leading-relaxed">
              An interactive climate-sensitive crop advisor dashboard. It analyzes real-time weather datasets, soil metrics, and plant health nodes to recommend agricultural actions.
            </p>

            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="p-2 rounded-lg bg-emerald-500/15">
                  <Sun className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-white/95">Soil Analysis Pipeline</h4>
                  <p className="text-[11px] text-white/55 font-light leading-normal">
                    Aggregates sensor metrics (N-P-K, pH levels) to calculate bio-activity quotients.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="p-2 rounded-lg bg-teal-500/15">
                  <Thermometer className="w-5 h-5 text-teal-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-white/95">Crop Growth Models</h4>
                  <p className="text-[11px] text-white/55 font-light leading-normal">
                    Identifies leaf anomalies using computer vision models optimized for low-latency nodes.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/Suraj280807/green-thumb-ai.git"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-white/95 hover:scale-105 active:scale-95 transition-all shadow-lg interactive-card"
              >
                Take Me There
                <ArrowRight className="w-4 h-4" />
              </a>
              <ViewStoryButton
                isOpen={openStory === 'gardener'}
                onClick={() => toggle('gardener')}
                accent={STORIES.gardener.accent}
              />
            </div>
          </div>

          {/* Right: Telemetry Dashboard */}
          <div className="flex-1 w-full relative flex items-center justify-center min-h-[360px] md:min-h-[420px]">
            <div className="relative w-11/12 max-w-lg h-[260px] md:h-[300px]">
              <motion.div
                whileHover={{ y: -5, rotateY: 6, rotateX: 6 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="w-full h-full liquid-glass relative overflow-hidden shadow-2xl border border-white/10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={projectGardener}
                  alt="Virtual Gardener AI Dashboard"
                  className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.03]"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </motion.div>

              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute flex flex-col gap-2.5 p-4 rounded-2xl border border-white/10 z-20 pointer-events-none"
                style={{
                  top: '16px',
                  right: '-32px',
                  background: 'rgba(10, 20, 15, 0.65)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: `0 12px 36px -8px rgba(52, 211, 153, 0.15), inset 0 1px 1px rgba(255,255,255,0.08)`,
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}>
                  ENV TELEMETRY
                </span>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: 'rgba(249, 115, 22, 0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Thermometer className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#f8fafc' }}>24°C</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: 'rgba(56, 189, 248, 0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Wind className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#f8fafc' }}>12km/h</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ x: [5, -5, 5] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute flex items-center gap-3.5 p-4 rounded-2xl border border-white/10 z-20 pointer-events-none max-w-[220px]"
                style={{
                  bottom: '16px',
                  left: '-32px',
                  background: 'rgba(10, 20, 15, 0.65)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: `0 12px 36px -8px rgba(52, 211, 153, 0.15), inset 0 1px 1px rgba(255,255,255,0.08)`,
                }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'rgba(52, 211, 153, 0.15)',
                  border: '1px solid rgba(52, 211, 153, 0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}>
                    BOTANICAL HEALTH ENGINE
                  </span>
                  <span style={{ fontSize: '10.5px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', lineHeight: '1.4' }}>
                    Soil moisture optimal for Hydro-Tomato crops.
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Gardener Story Panel */}
        <ProjectStoryPanel
          isOpen={openStory === 'gardener'}
          onClose={() => setOpenStory(null)}
          story={STORIES.gardener}
          projectName="Virtual Gardener AI"
        />
      </section>

      {/* PROJECT 3: STREAKLY */}
      <section className="flex flex-col gap-0 w-full">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between w-full">
          {/* Left: Info */}
          <div className="flex-1 flex flex-col gap-6 items-start">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400">
                CASE STUDY 03
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="text-xs font-bold text-white/50">MOBILE APPLICATION</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
              Streakly
            </h3>

            <p className="text-base text-white/70 font-light leading-relaxed">
              A premium iOS habit-tracking application engineered under the guidance of Apple Design Principles (HIG). Features concentric progress rings, custom haptic profiles, and a robust offline-first architecture.
            </p>

            <div className="flex flex-col gap-2.5 w-full">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="w-4 h-4 text-rose-400" />
                <span>Concentric activity tracker circles built in native CoreGraphics</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="w-4 h-4 text-rose-400" />
                <span>Haptic feedback profiles customized for habit completion triggers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="w-4 h-4 text-rose-400" />
                <span>Offline caching using CoreData with zero-latency cloud sync</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', flexWrap: 'wrap' }}>
              <ViewStoryButton
                isOpen={openStory === 'habit'}
                onClick={() => toggle('habit')}
                accent={STORIES.habit.accent}
              />
            </div>
          </div>

          {/* Right: iPhone Mockup */}
          <div className="flex-1 w-full relative flex flex-col items-center justify-center min-h-[460px] md:min-h-[520px]">
            <div className="relative w-[200px] h-[380px] md:w-[220px] md:h-[420px]">
              {/* Phone container */}
              <motion.div
                whileHover={{ y: -5, rotateY: -5, rotateX: 5 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="w-full h-full bg-[#0c0a15] border-[6px] border-white/10 rounded-[38px] shadow-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer"
                style={{ boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9), inset 0 2px 2px rgba(255,255,255,0.08)' }}
                onClick={() => setCurrentScreen(prev => (prev + 1) % STREAKLY_SCREENS.length)}
              >
                {/* Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20 border border-white/5" />
                
                {/* Image Transition Container */}
                <div className="w-full h-full relative overflow-hidden rounded-[32px] z-10 bg-[#0c0a15]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentScreen}
                      src={STREAKLY_SCREENS[currentScreen].src}
                      alt={STREAKLY_SCREENS[currentScreen].label}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full object-cover opacity-95 contrast-[1.03] brightness-[0.98]"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  </AnimatePresence>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[32px] z-20" />
              </motion.div>

              {/* Floating Widgets */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute flex flex-col gap-2 p-4 rounded-2xl border border-white/10 z-20 pointer-events-none min-w-[145px]"
                style={{
                  top: '20%',
                  left: '-48px',
                  background: 'rgba(28, 12, 16, 0.65)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: `0 12px 36px -8px rgba(251, 113, 133, 0.15), inset 0 1px 1px rgba(255,255,255,0.08)`,
                }}
              >
                <div className="flex items-center gap-1.5">
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <TrendingUp className="w-3 h-3 text-orange-400" />
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}>
                    ACTIVE STREAK
                  </span>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', marginTop: '2px' }}>12 Days</span>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>Top 5% of users.</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute flex flex-col gap-2 p-4 rounded-2xl border border-white/10 z-20 pointer-events-none min-w-[140px]"
                style={{
                  bottom: '15%',
                  right: '-48px',
                  background: 'rgba(28, 12, 16, 0.65)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: `0 12px 36px -8px rgba(251, 113, 133, 0.15), inset 0 1px 1px rgba(255,255,255,0.08)`,
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}>
                  COMPLETION
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#fb7185' }}>92%</span>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>this week</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <div className="w-4 h-4 rounded-full border border-white/10 border-t-rose-400 animate-spin" style={{ animationDuration: '1.2s' }} />
                  <span style={{ fontSize: '8.5px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>SYNCED</span>
                </div>
              </motion.div>
            </div>

            {/* Screen Selector Pills */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-2 z-20">
              {STREAKLY_SCREENS.map((screen, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentScreen(idx)}
                  className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold transition-all duration-300 ${
                    currentScreen === idx
                      ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                      : 'bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/70'
                  }`}
                >
                  {screen.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Habit Story Panel */}
        <ProjectStoryPanel
          isOpen={openStory === 'habit'}
          onClose={() => setOpenStory(null)}
          story={STORIES.habit}
          projectName="Streakly"
        />
      </section>

    </div>
  );
};
