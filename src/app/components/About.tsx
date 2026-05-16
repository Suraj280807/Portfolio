import { motion } from "motion/react";
import { GraduationCap, Code, Palette, Shield } from "lucide-react";

export default function About() {
  const journeyItems = [
    { icon: GraduationCap, label: "B.Tech Student", color: "from-blue-500 to-purple-500" },
    { icon: Code, label: "Swift Developer", color: "from-purple-500 to-pink-500" },
    { icon: Palette, label: "UI/UX Designer", color: "from-pink-500 to-red-500" },
    { icon: Shield, label: "Cybersecurity", color: "from-red-500 to-orange-500" },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">About Me</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Creative Technologist
          </h2>
        </motion.div>

        {/* Glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative p-12 rounded-[3rem] bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-8">
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
              B.Tech student passionate about <span className="font-semibold text-blue-600">AI</span>,
              {" "}<span className="font-semibold text-purple-600">Swift development</span>,
              {" "}<span className="font-semibold text-pink-600">UI/UX design</span>,
              {" "}<span className="font-semibold text-red-600">cybersecurity</span>, and building
              {" "}<span className="font-semibold text-green-600">impactful digital products</span>.
            </p>

            {/* Journey timeline */}
            <div className="pt-8">
              <div className="flex flex-wrap justify-center gap-6">
                {journeyItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="group relative"
                  >
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-xl transition-all">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating skill chips */}
            <div className="flex flex-wrap justify-center gap-3 pt-6">
              {["React", "Swift", "Python", "TypeScript", "Figma", "AI/ML", "iOS", "Security"].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-xl border border-white/60 shadow-md text-sm font-medium text-gray-700 hover:shadow-lg transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
