import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface BitmojiGuideProps {
  activeChapter: number;
}

const CHAPTER_MESSAGES = [
  "Hi! I'm Surajsing. Welcome to my digital showcase. Let's explore together — scroll down to begin!",
  "How curiosity turned into building. Scroll through the milestones of my digital journey.",
  "Here are a few premium products I've engineered. Drag, hover, and peek behind the glass mockups!",
  "Achievements and competitions are my high-octane canvas. Building MVPs and solving strategic problems under pressure makes me thrive.",
  "Design is not just what it looks like. I leverage human-centered principles to drive product clarity.",
  "The future is built on collaborative AI agents. Let's make something unforgettable together!"
];

export const BitmojiGuide: React.FC<BitmojiGuideProps> = ({ activeChapter }) => {
  const [bubbleText, setBubbleText] = useState(CHAPTER_MESSAGES[0]);
  const [showBubble, setShowBubble] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [clickAnim, setClickAnim] = useState(false);

  // Parallax cursor tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates from -0.5 to 0.5
      const relX = (e.clientX / window.innerWidth) - 0.5;
      const relY = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x: relX, y: relY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setShowBubble(false);
    const timeout = setTimeout(() => {
      setBubbleText(CHAPTER_MESSAGES[activeChapter] || CHAPTER_MESSAGES[0]);
      setShowBubble(true);
    }, 450);

    return () => clearTimeout(timeout);
  }, [activeChapter]);

  const handleAvatarClick = () => {
    setClickAnim(true);

    // Trigger local particle burst
    confetti({
      particleCount: 35,
      spread: 75,
      origin: { x: 0.92, y: 0.9 },
      colors: ['#38bdf8', '#818cf8', '#c084fc', '#fb7185']
    });

    setClickCount((prev) => prev + 1);
    setShowBubble(false);
    setTimeout(() => {
      const EasterEggs = [
        "Ouch! That tickles! 😄",
        "Fun fact: I built this whole portfolio in standard CSS for premium responsiveness!",
        "Clicking me won't write your code... or will it? 🤖",
        "Let's build something epic! Reach out below!"
      ];
      setBubbleText(EasterEggs[clickCount % EasterEggs.length]);
      setShowBubble(true);
    }, 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex items-end gap-3 pointer-events-none select-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="liquid-glass p-3.5 max-w-[240px] text-xs font-medium text-white/90 shadow-xl border border-white/10 relative pointer-events-auto"
            style={{ borderRadius: '16px 16px 2px 16px' }}
          >
            {bubbleText}
            {/* Tiny indicator triangle */}
            <div className="absolute right-4 bottom-[-6px] w-3 h-3 bg-white/5 border-r border-b border-white/10 rotate-45 backdrop-blur-md" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bitmoji Character Portal Container */}
      <motion.div
        key={activeChapter}
        initial={{ y: 80, opacity: 0 }}
        animate={{ 
          y: clickAnim ? [0, -25, 0] : 0,
          scale: clickAnim ? [1, 0.85, 1.15, 1] : 1,
          rotate: clickAnim ? [0, -12, 12, 0] : 0,
          opacity: 1
        }}
        onAnimationComplete={() => setClickAnim(false)}
        exit={{ y: 80, opacity: 0 }}
        drag
        dragConstraints={{ left: -500, right: 0, top: -700, bottom: 0 }}
        dragElastic={0.18}
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 350, bounceDamping: 15 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        onClick={handleAvatarClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-16 h-16 md:w-20 md:h-20 relative pointer-events-auto interactive-card"
        style={{ 
          cursor: 'grab',
          perspective: '600px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Fixed Circle Glassmorphic Base */}
        <div className="absolute inset-0 rounded-full border border-white/10 bg-gradient-to-tr from-white/5 to-white/10 shadow-lg" />
        
        {/* Soft background radial shine */}
        <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none rounded-full" />

        {/* The Waving Character (pops out on hover and tilts on cursor move) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[140%] flex items-end justify-center origin-bottom"
          animate={isHovered ? {
            y: -28, // Jumps out of the circle!
            scale: 1.35, // Grows larger!
            rotate: [0, -4, 4, -4, 4, 0] // Wiggles waving arm/body!
          } : {
            y: 0,
            scale: 1.08,
            rotate: 0
          }}
          style={{
            rotateX: mousePos.y * -20, // 3D tilt tracking
            rotateY: mousePos.x * 20,
            transformStyle: 'preserve-3d'
          }}
          transition={{
            type: 'spring',
            stiffness: 220,
            damping: 14,
            rotate: {
              duration: 1.2,
              ease: "easeInOut",
              repeat: isHovered ? Infinity : 0
            }
          }}
        >
          <img
            src="/bitmoji_nike.png?v=3"
            alt="Waving Nike Avatar"
            className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
