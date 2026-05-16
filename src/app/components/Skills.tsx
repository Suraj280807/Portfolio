import { motion } from "motion/react";
import { Code2, Smartphone, Brain, Palette, Shield, Layers } from "lucide-react";

export default function Skills() {
  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "React, TypeScript, Tailwind, Modern Web",
      gradient: "from-blue-500 to-cyan-500",
      progress: 90,
    },
    {
      icon: Smartphone,
      title: "Swift & iOS",
      description: "Native iOS apps, SwiftUI, UIKit",
      gradient: "from-purple-500 to-pink-500",
      progress: 85,
    },
    {
      icon: Brain,
      title: "AI & APIs",
      description: "Machine Learning, API Integration, AI Systems",
      gradient: "from-pink-500 to-rose-500",
      progress: 80,
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Figma, Design Systems, User Research",
      gradient: "from-orange-500 to-amber-500",
      progress: 88,
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Security Best Practices, Threat Analysis",
      gradient: "from-red-500 to-pink-500",
      progress: 75,
    },
    {
      icon: Layers,
      title: "Product Thinking",
      description: "Strategy, User-Centered Design, Innovation",
      gradient: "from-green-500 to-emerald-500",
      progress: 92,
    },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Expertise</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Skills & Capabilities
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glassmorphism card */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-2xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Glowing border on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <skill.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{skill.description}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                      <span>Proficiency</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full`}
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative corner gradient */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${skill.gradient} opacity-10 rounded-full blur-2xl`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
