import { motion } from "motion/react";
import { Leaf, Heart, Github, ExternalLink, Cloud, Brain, Wind } from "lucide-react";

export default function OtherProjects() {
  const projects = [
    {
      title: "Virtual Gardener AI",
      description: "AI-powered plant analysis and care recommendations with real-time weather integration for optimal gardening results.",
      icon: Leaf,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      features: ["Plant Analysis", "AI Recommendations", "Weather Integration"],
      tags: ["React", "AI/ML", "Weather API", "Computer Vision"],
      github: "#",
      demo: "#",
    },
    {
      title: "ReliefBuddy",
      description: "A calming companion app featuring guided breathing exercises and mindfulness experiences for emotional wellness.",
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      features: ["Breathing Exercises", "Calming Experiences", "Emotional Wellness"],
      tags: ["Swift", "iOS", "HealthKit", "Animations"],
      github: "#",
      demo: "#",
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
          <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">More Work</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Other Projects
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Glass card */}
              <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-2xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Decorative gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${project.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10 space-y-6">
                  {/* Icon and title */}
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <project.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    </div>
                  </div>

                  {/* Preview area */}
                  <div className="relative h-48 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-xl border border-white/60 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-3">
                        {project.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + i * 0.1, duration: 0.5 }}
                            className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-md text-sm font-medium text-gray-700 inline-block mx-1"
                          >
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-white/50 backdrop-blur-xl border border-white/60 text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4 pt-2">
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-md hover:shadow-lg font-medium text-gray-700 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white shadow-lg hover:shadow-xl font-medium transition-all`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  </div>
                </div>

                {/* Hover effect corner accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
