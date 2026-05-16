import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Name text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg w-max"
          >
            <motion.span 
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              className="text-2xl lg:text-3xl origin-bottom-right"
            >
              👋
            </motion.span>
            <span className="text-2xl lg:text-3xl font-semibold text-gray-800 tracking-tight">
              Hi, I'm <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Surajsing Patil</span>
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold leading-tight"
              style={{
                background: "linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Building Meaningful
              <br />
              Digital Experiences
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-600 font-medium"
            >
              AI • Swift • Product Design • Full Stack Experiences
            </motion.p>
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-xl shadow-purple-500/30 flex items-center gap-2 transition-all"
            >
              View Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right side - Floating mockup cards */}
        <div className="relative h-[600px] hidden lg:block">
          {/* AI Card */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: -5 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="absolute top-0 right-0 w-64 h-72 p-6 rounded-3xl bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Innovation</h3>
            <p className="text-sm text-gray-600">Building intelligent systems that solve real problems</p>
            <div className="absolute bottom-6 left-6 right-6 h-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full" />
          </motion.div>

          {/* Mobile App Card */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 5 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="absolute top-32 right-48 w-56 h-64 p-6 rounded-3xl bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.25 3h-10.5C5.784 3 5 3.784 5 4.75v14.5c0 .966.784 1.75 1.75 1.75h10.5c.966 0 1.75-.784 1.75-1.75V4.75c0-.966-.784-1.75-1.75-1.75zM12 19.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Swift & iOS</h3>
            <p className="text-sm text-gray-600">Crafting beautiful native experiences</p>
          </motion.div>

          {/* Design Card */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-0 right-24 w-60 h-56 p-6 rounded-3xl bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">UI/UX Design</h3>
            <p className="text-sm text-gray-600">Creating pixel-perfect interfaces</p>
          </motion.div>

          {/* Security Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="absolute top-64 right-12 w-48 h-48 p-5 rounded-3xl bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Security</h3>
            <p className="text-xs text-gray-600">Cybersecurity focused</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
