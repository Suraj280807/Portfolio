import { motion } from "motion/react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import FeaturedProject from "./components/FeaturedProject";
import OtherProjects from "./components/OtherProjects";
import AppleAcademy from "./components/AppleAcademy";
import Contact from "./components/Contact";
import FloatingOrbs from "./components/FloatingOrbs";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 relative overflow-hidden">
      {/* Floating gradient orbs background */}
      <FloatingOrbs />

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 origin-left z-50"
        style={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Main content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <FeaturedProject />
        <OtherProjects />
        <AppleAcademy />
        <Contact />
      </div>
    </div>
  );
}
