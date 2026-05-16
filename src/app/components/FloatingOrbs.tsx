import { motion } from "motion/react";

export default function FloatingOrbs() {
  return (
    <>
      {/* Large gradient orb - blue */}
      <motion.div
        className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 150, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Medium gradient orb - purple */}
      <motion.div
        className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Small gradient orb - green */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Extra orb - bottom right */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-green-300/20 rounded-full blur-3xl"
        animate={{
          x: [0, 70, 0],
          y: [0, -90, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </>
  );
}
