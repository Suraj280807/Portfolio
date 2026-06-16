import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  ArrowRight,
  Download
} from 'lucide-react';

// Custom Social Brand Icons
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);




// Components
import { CustomCursor } from './components/CustomCursor';
import { ProgressIndicator } from './components/ProgressIndicator';
import { BitmojiGuide } from './components/BitmojiGuide';
import { ProjectSection } from './components/ProjectSection';
import { FlipCard } from './components/FlipCard';
import { StackCards } from './components/StackCards';
import { AppleHIG } from './components/AppleHIG';

const CHAPTER_NAMES = [
  "About Me",
  "Projects & Products",
  "Achievements",
  "Design Philosophy",
  "Future Vision"
];


export default function App() {
  const [activeChapter, setActiveChapter] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  


  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Canvas Particle System inside Hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }> = [];

    // Colors mapping to Hero Theme
    const colors = ['#38bdf8', '#6366f1', '#a78bfa', '#2dd4bf'];

    // Initialize particles
    const particleCount = Math.min(60, Math.floor(width / 20));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Repulsion from mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Theme Swapping system based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = document.querySelectorAll('.chapter-section');
      
      sections.forEach((section, index) => {
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveChapter(index);

          // Dynamically adjust CSS Variables inside root document
          const root = document.documentElement;
          const themeId = index + 1; // Themes 1 to 6
          
          root.style.setProperty('--glow-1', `var(--theme-${themeId}-glow-1)`);
          root.style.setProperty('--glow-2', `var(--theme-${themeId}-glow-2)`);
          root.style.setProperty('--accent', `var(--theme-${themeId}-accent)`);
          root.style.setProperty('--accent-gradient', `var(--theme-${themeId}-gradient)`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChapterNavigate = (index: number) => {
    const sections = document.querySelectorAll('.chapter-section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };



  const triggerAchievementCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#818cf8', '#c084fc', '#fb7185', '#fbbf24']
    });
  };

  return (
    <div className="relative min-h-screen selection:bg-white/20 select-none">
      {/* Desktop Cursor System */}
      <CustomCursor />

      {/* Grid Overlay & Ambient light blobs */}
      <div className="grid-bg" />
      <div className="noise-bg" />
      
      {/* Animated Backlight Orbs */}
      <div className="glow-orb glow-1" />
      <div className="glow-orb glow-2" />

      {/* Floating Elements (Chapters Sidebar Tracker + Bitmoji Guide) */}
      <ProgressIndicator 
        activeChapter={activeChapter} 
        totalChapters={5} 
        chapterNames={CHAPTER_NAMES} 
        onChapterClick={handleChapterNavigate} 
      />
      
      <BitmojiGuide activeChapter={activeChapter} />

      {/* HEADER NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleChapterNavigate(0)}>
          <span className="w-8 h-8 rounded-lg liquid-glass flex items-center justify-center font-bold text-sm text-white border border-white/10">
            S
          </span>
          <span className="font-heading font-semibold text-xs tracking-widest text-white/80 hidden sm:inline uppercase">
            SURAJSING PATIL
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 p-1 rounded-full liquid-glass border border-white/5 bg-black/20 backdrop-blur-md px-6 py-2">
          {CHAPTER_NAMES.map((name, idx) => (
            <button
              key={idx}
              onClick={() => handleChapterNavigate(idx)}
              className={`text-[11px] font-semibold tracking-wider uppercase focus:outline-none transition-all duration-300 ${
                activeChapter === idx ? 'text-white scale-105' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {name.split(' ')[0]}
            </button>
          ))}
        </nav>

        <a 
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleChapterNavigate(4);
          }}
          className="px-4 py-2 rounded-full liquid-glass text-xs font-semibold text-white/90 border border-white/10 hover:border-white/25 hover:text-white transition-all bg-white/5 cursor-pointer interactive-card"
        >
          Contact me
        </a>

      </header>

      {/* CHAPTER 1: HERO & WHO I AM */}
      <section className="chapter-section chapter-container min-h-screen relative overflow-hidden flex flex-col justify-center items-center">
        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
        
        <div className="z-10 flex flex-col items-center justify-center text-center gap-8 max-w-4xl px-4 mt-12">
          
          {/* Main Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2"
          >
            <span className="text-[11px] font-bold tracking-[0.35em] text-white/50 uppercase">
              CREATIVE ENGINEER SHOWCASE
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none text-glow select-none">
              SURAJSING
              <span className="block text-gradient">PATIL</span>
            </h1>
          </motion.div>

          {/* Floating glass summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass p-6 md:p-8 max-w-2xl border border-white/8 flex flex-col sm:flex-row gap-6 items-center justify-between shadow-2xl relative"
          >
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <span className="text-xs font-bold text-white/40 tracking-wider">ROLES & ATTRIBUTIONS</span>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-1.5">
                <span className="px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-[10px] font-bold text-sky-400">
                  AI DEVELOPER
                </span>
                <span className="px-2.5 py-1 rounded bg-pink-500/10 border border-pink-500/20 text-[10px] font-bold text-pink-400">
                  PRODUCT BUILDER
                </span>
                <span className="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400">
                  CREATIVE TECHNOLOGIST
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
              <button 
                onClick={() => handleChapterNavigate(1)}
                className="px-5 py-3 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-white/95 hover:scale-105 active:scale-95 transition-all shadow-lg interactive-card"
              >
                Enter Story
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a 
                href="/Surajsing_Patil_Resume.pdf"
                download="Surajsing_Patil_Resume.pdf"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg interactive-card"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>
          </motion.div>

          {/* Subtle scroll guide indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-6 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => handleChapterNavigate(1)}
          >
            <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
              SCROLL TO DISCOVER
            </span>
            <div className="w-[1px] h-6 bg-white/20" />
          </motion.div>
        </div>
      </section>

      {/* CHAPTER 2: PROJECTS & PRODUCTS */}
      <section className="chapter-section chapter-container min-h-screen">
        <div className="z-10 flex flex-col items-center gap-16 max-w-5xl w-full">
          
          <div className="text-center flex flex-col gap-3">
            <span className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
              CHAPTER 02 — ENGINEERING CASE STUDY
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Projects & Products
            </h2>
            <p className="text-sm text-white/50 max-w-md mx-auto font-light">
              Explore dynamic product launches engineered with specialized logic and modular glass aesthetics.
            </p>
          </div>

          <ProjectSection />
        </div>
      </section>

      {/* CHAPTER 4: ACHIEVEMENTS */}
      <section className="chapter-section chapter-container min-h-screen bg-transparent">
        <div className="z-10 flex flex-col items-center gap-16 max-w-6xl w-full">
          
          <div className="text-center flex flex-col gap-3">
            <span className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
              CHAPTER 03 — ACHIEVEMENTS & COMPETITIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Achievements
            </h2>
            <p className="text-sm text-white/50 max-w-md mx-auto font-light">
              Demonstrated strategic planning and competitive drive. Competing in high-pressure hackathons and strategic challenges.
            </p>
          </div>

          {/* Achievements Flip Cards Grid */}
          <FlipCard />

          <button
            onClick={triggerAchievementCelebration}
            className="px-6 py-3 rounded-full liquid-glass border border-white/10 hover:border-white/25 text-xs font-bold text-white flex items-center gap-2 active:scale-95 transition-all shadow-md interactive-card"
          >
            Celebrate Milestones 🎉
          </button>
        </div>
      </section>

      {/* CHAPTER 5: DESIGN PHILOSOPHY & SKILLS STACK */}
      <section className="chapter-section chapter-container min-h-screen">
        <div className="z-10 flex flex-col items-center gap-24 max-w-6xl w-full">
          
          <div className="text-center flex flex-col gap-3">
            <span className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
              CHAPTER 04 — STACK CARDS & DESIGN VALUES
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Design Philosophy & Tech Stack
            </h2>
            <p className="text-sm text-white/50 max-w-md mx-auto font-light">
              Bridging engineering with strict compliance to human-centered structures.
            </p>
          </div>

          {/* Interactive Stack Cards (Skills) */}
          <div className="flex flex-col items-center gap-6 w-full">
            <h3 className="text-lg font-bold tracking-widest text-white/30 uppercase text-center mb-6">
              STACK CARDS (SCROLL OVERLAP REVEAL)
            </h3>
            <StackCards />
          </div>

          {/* Apple Human Interface Section */}
          <div className="flex flex-col items-center gap-8 w-full mt-12">
            <div className="text-center flex flex-col gap-2 max-w-lg mb-4">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                HUMAN-CENTERED DESIGN PRINCIPLES
              </span>
              <h3 className="text-2xl font-bold text-white">
                Designing Through Human-Centered Principles
              </h3>
              <p className="text-xs text-white/50 font-light">
                Applying rigorous standard alignment models to establish trust, focus, and clarity.
              </p>
            </div>
            
            <AppleHIG />
          </div>
        </div>
      </section>

      {/* CHAPTER 6: FUTURE VISION & CONTACT */}
      <section id="contact" className="chapter-section chapter-container min-h-screen">
        <div className="z-10 flex flex-col items-center gap-16 max-w-4xl w-full">
          
          <div className="text-center flex flex-col gap-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">
              CHAPTER 05 — FUTURE COLLABORATION
            </span>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none text-glow select-none">
              Let's Build <br />
              <span className="text-gradient">Something Meaningful</span>
            </h2>
            <p className="text-sm text-white/60 max-w-lg mx-auto font-light leading-relaxed mt-2">
              Interested in integrating AI assistance tools, native iOS apps, or building highly responsive responsive glassmorphism interfaces? Get in touch.
            </p>
          </div>

          {/* Social Links Glass Container */}
          <div className="w-full max-w-xl liquid-glass p-10 md:p-12 border border-white/10 shadow-2xl relative">
            {/* Glowing accents behind cards */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-gradient-to-r from-accent to-transparent filter blur-3xl opacity-20 pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gradient-to-r from-transparent to-accent filter blur-3xl opacity-20 pointer-events-none" />

            <div className="flex flex-col gap-6 w-full relative z-10">
              {/* GitHub Card */}
              <a 
                href="https://github.com/Suraj280807" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer interactive-card"
              >
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                  <Github className="w-6 h-6 text-sky-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase">SOURCE CODE & TOOLS</span>
                  <span className="text-base font-bold text-white mt-0.5">GitHub</span>
                  <span className="text-xs text-white/60 font-light mt-0.5">github.com/Suraj280807 — View repositories & scripts.</span>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a 
                href="https://www.linkedin.com/in/suraj-patil-804b84416" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer interactive-card"
              >
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                  <Linkedin className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase">PROFESSIONAL HUB</span>
                  <span className="text-base font-bold text-white mt-0.5">LinkedIn</span>
                  <span className="text-xs text-white/60 font-light mt-0.5">linkedin.com/in/suraj-patil — Network & collaborate.</span>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:surajpatil2882007@gmail.com" 
                className="flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer interactive-card"
              >
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                  <Mail className="w-6 h-6 text-pink-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase">DIRECT LINE</span>
                  <span className="text-base font-bold text-white mt-0.5">Email Direct</span>
                  <span className="text-xs text-white/60 font-light mt-0.5">surajpatil2882007@gmail.com — Send me a direct inquiry.</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between px-8 z-10 relative text-center sm:text-left gap-4 bg-[#020105]">
        <span className="text-[10px] text-white/30 tracking-widest uppercase">
          © {new Date().getFullYear()} SURAJSING PATIL. ALL RIGHTS RESERVED.
        </span>
      </footer>

    </div>
  );
}
