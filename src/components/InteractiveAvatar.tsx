import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractiveAvatarProps {
  isWaving: boolean;
  isHovered: boolean;
}

export const InteractiveAvatar: React.FC<InteractiveAvatarProps> = ({
  isWaving,
  isHovered
}) => {
  // Cursor tracking (using motion values for high-performance sub-pixel updates)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tracking
  const springX = useSpring(mouseX, { stiffness: 120, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 15 });

  // Transforms mapped to relative mouse coordinates (-1 to 1)
  const pupilX = useTransform(springX, [-1, 1], [-2.5, 2.5]);
  const pupilY = useTransform(springY, [-1, 1], [-1.5, 1.5]);

  // Head tilts and translates slightly towards the cursor
  const headX = useTransform(springX, [-1, 1], [-1.8, 1.8]);
  const headY = useTransform(springY, [-1, 1], [-1, 1]);
  const headRotate = useTransform(springX, [-1, 1], [-4, 4]);

  // Follow the mouse cursor globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const relX = (e.clientX / window.innerWidth) * 2 - 1;
      const relY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(relX);
      mouseY.set(relY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Variants for waving arm
  const armVariants = {
    idle: {
      rotate: 0,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 120, damping: 18 }
    },
    wave: {
      rotate: [0, -18, 12, -18, 12, -18, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut" as const,
        repeat: isWaving ? Infinity : 0
      }
    }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none pointer-events-none"
      >
        {/* Definitions for gradients and clipping */}
        <defs>
          {/* Skin tones */}
          <linearGradient id="skinGrad" x1="60" y1="30" x2="60" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbe5d6" />
            <stop offset="100%" stopColor="#e8b490" />
          </linearGradient>
          <linearGradient id="skinShadowGrad" x1="60" y1="65" x2="60" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e8b490" />
            <stop offset="100%" stopColor="#d49e7a" />
          </linearGradient>

          {/* Hoodie colors */}
          <linearGradient id="hoodieGrad" x1="60" y1="80" x2="60" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2e354f" />
            <stop offset="100%" stopColor="#151722" />
          </linearGradient>
          <linearGradient id="hoodInnerGrad" x1="60" y1="70" x2="60" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#171926" />
            <stop offset="100%" stopColor="#0d0e15" />
          </linearGradient>

          {/* Hair colors */}
          <linearGradient id="hairGrad" x1="60" y1="15" x2="60" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#372d25" />
            <stop offset="100%" stopColor="#1a1410" />
          </linearGradient>

          {/* Glowing chest gradient */}
          <radialGradient id="chestGlow" cx="60" cy="108" r="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Breathing Base Layer (gentle vertical bobbing) */}
        <motion.g
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* HOODIE BODY */}
          <path
            d="M 22 120 C 22 96, 32 86, 60 86 C 88 86, 98 96, 98 120 Z"
            fill="url(#hoodieGrad)"
          />

          {/* Glowing Code Symbol on chest */}
          <circle cx="60" cy="108" r="14" fill="url(#chestGlow)" />
          <text
            x="60"
            y="111"
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="7.5"
            fontWeight="900"
            fontFamily="monospace"
            letterSpacing="-0.5"
            opacity="0.8"
          >
            {"</>"}
          </text>

          {/* Hood Ring / Collar details */}
          <path
            d="M 38 88 C 38 88, 48 83, 60 83 C 72 83, 82 88, 82 88 C 82 88, 72 98, 60 98 C 48 98, 38 88, 38 88 Z"
            fill="url(#hoodInnerGrad)"
          />

          {/* Hoodie drawstrings */}
          <path d="M 52 92 C 51 100, 49 104, 49 105" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 68 92 C 69 100, 71 104, 71 105" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />

          {/* INTERACTIVE HEAD GROUP (responds to cursor coords) */}
          <motion.g
            style={{
              x: headX,
              y: headY,
              rotate: headRotate,
              transformOrigin: '60px 80px'
            }}
          >
            {/* Neck */}
            <rect x="52" y="70" width="16" height="15" rx="3" fill="url(#skinShadowGrad)" />

            {/* Face base */}
            <path
              d="M 38 52 C 38 38, 82 38, 82 52 C 82 66, 78 78, 60 78 C 42 78, 38 66, 38 52 Z"
              fill="url(#skinGrad)"
            />

            {/* Ears */}
            <circle cx="36" cy="55" r="4.5" fill="#e8b490" />
            <circle cx="84" cy="55" r="4.5" fill="#e8b490" />

            {/* EYES (Sclera) */}
            <ellipse cx="49" cy="50" rx="5" ry="3.5" fill="#ffffff" />
            <ellipse cx="71" cy="50" rx="5" ry="3.5" fill="#ffffff" />

            {/* PUPILS (brown/dark with eye-tracking) */}
            <motion.circle
              cx="49"
              cy="50"
              r="2.2"
              fill="#2d221c"
              style={{ x: pupilX, y: pupilY }}
            />
            <motion.circle
              cx="71"
              cy="50"
              r="2.2"
              fill="#2d221c"
              style={{ x: pupilX, y: pupilY }}
            />

            {/* Pupil glints */}
            <motion.circle
              cx="47.8"
              cy="48.8"
              r="0.7"
              fill="#ffffff"
              style={{ x: pupilX, y: pupilY }}
            />
            <motion.circle
              cx="69.8"
              cy="48.8"
              r="0.7"
              fill="#ffffff"
              style={{ x: pupilX, y: pupilY }}
            />

            {/* GLASSES (Modern rounded frames matching avatar) */}
            <circle cx="49" cy="50" r="9" fill="none" stroke="#1c1917" strokeWidth="2" />
            <circle cx="71" cy="50" r="9" fill="none" stroke="#1c1917" strokeWidth="2" />
            <path d="M 58 50 L 62 50" stroke="#1c1917" strokeWidth="2.2" strokeLinecap="round" />
            
            {/* Lenses reflection/glare */}
            <path d="M 44.5 45.5 Q 49 41, 53.5 45.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
            <path d="M 66.5 45.5 Q 71 41, 75.5 45.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.35" />

            {/* Eyebrows */}
            <path d="M 41 41.5 C 44 39, 52 39.5, 55 42" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M 79 41.5 C 76 39, 68 39.5, 65 42" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Nose */}
            <path d="M 60 48 C 61.2 48, 62 53, 62 55.5 C 62 57.5, 59.5 58, 58 58" stroke="#d49e7a" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* MOUTH (Interactive Morphing smile) */}
            <motion.path
              d={isHovered ? "M 51 63 Q 60 74 69 63 Z" : "M 51 64 Q 60 69.5 69 64"}
              fill={isHovered ? "#991b1b" : "none"}
              stroke="#1c1917"
              strokeWidth="2.2"
              strokeLinecap="round"
              animate={{ d: isHovered ? "M 51 63 Q 60 74 69 63 Z" : "M 51 64 Q 60 69.5 69 64" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
            {/* Teeth inside open mouth */}
            {isHovered && (
              <path d="M 53.5 64.5 Q 60 67, 66.5 64.5" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            )}

            {/* Blush cheeks */}
            <circle cx="41" cy="59" r="2.5" fill="#f87171" opacity="0.25" />
            <circle cx="79" cy="59" r="2.5" fill="#f87171" opacity="0.25" />

            {/* HAIR (Dark curly hair) */}
            {/* Back hair shape */}
            <path
              d="M 33 46 C 26 40, 26 24, 46 16 C 66 8, 74 16, 82 20 C 90 24, 94 40, 87 46 Z"
              fill="url(#hairGrad)"
            />
            {/* Hair strands details */}
            <path d="M 33 42 C 30 35, 34 26, 42 24" stroke="#1a1410" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 87 42 C 90 35, 86 26, 78 24" stroke="#1a1410" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Fringe/curly top volumes */}
            <circle cx="44" cy="22" r="7" fill="url(#hairGrad)" />
            <circle cx="56" cy="17" r="8.5" fill="url(#hairGrad)" />
            <circle cx="68" cy="18" r="8" fill="url(#hairGrad)" />
            <circle cx="78" cy="24" r="7.5" fill="url(#hairGrad)" />
            <circle cx="36" cy="30" r="6" fill="url(#hairGrad)" />
            <circle cx="84" cy="30" r="6" fill="url(#hairGrad)" />
          </motion.g>

          {/* WAVING ARM/HAND */}
          <motion.g
            id="waving-arm-group"
            style={{
              transformOrigin: '82px 96px',
            }}
            variants={armVariants}
            animate={isWaving ? "wave" : "idle"}
          >
            {/* Shoulder to wrist sleeve */}
            <path
              d="M 82 96 C 91 88, 102 78, 97 54"
              stroke="url(#hoodieGrad)"
              strokeWidth="9.5"
              strokeLinecap="round"
              fill="none"
            />
            
            {/* Cuff details */}
            <path d="M 94 56 C 96 55, 99 56, 100 58" stroke="#1f2937" strokeWidth="1" />

            {/* Skin Tone Hand */}
            {/* Palm */}
            <circle cx="97" cy="48" r="5.5" fill="#f3c6a5" />

            {/* Fingers (raised/waving) */}
            <rect x="91.5" y="38" width="1.8" height="6.5" rx="0.9" fill="#f3c6a5" transform="rotate(-6 91.5 38)" />
            <rect x="94" y="36" width="1.8" height="8" rx="0.9" fill="#f3c6a5" />
            <rect x="97" y="35" width="1.8" height="8" rx="0.9" fill="#f3c6a5" transform="rotate(3 97 35)" />
            <rect x="100" y="37" width="1.8" height="6.5" rx="0.9" fill="#f3c6a5" transform="rotate(8 100 37)" />
            
            {/* Thumb */}
            <path d="M 101.5 48 C 105.5 48, 106 44, 104.5 42" stroke="#f3c6a5" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
};
