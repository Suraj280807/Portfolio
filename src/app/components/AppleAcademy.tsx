import { motion } from "motion/react";
import { useState } from "react";
import { Award, Users, Rocket, Heart, ChevronDown } from "lucide-react";

export default function AppleAcademy() {
  const [showJourney, setShowJourney] = useState(false);

  const values = [
    {
      icon: Heart,
      title: "Passion for Impact",
      description: "Building products that genuinely improve people's lives",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Swift Excellence",
      description: "Mastering native iOS development and Apple ecosystem",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Growing through teamwork and knowledge sharing",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Rocket,
      title: "Dedication to Growth",
      description: "Constantly pushing boundaries and embracing challenges",
      color: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Vision</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Apple Developer Academy
          </h2>
        </motion.div>

        {/* Main content card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-12 lg:p-16 rounded-[3rem] bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-3xl border border-white/70 shadow-2xl overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-12">
            {/* Apple logo inspired element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </div>
            </motion.div>

            {/* Inspiring text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center space-y-6"
            >
              <p className="text-2xl lg:text-3xl text-gray-800 leading-relaxed font-medium max-w-4xl mx-auto">
                Driven by a <span className="text-blue-600 font-semibold">passion for impactful products</span> and a
                deep <span className="text-purple-600 font-semibold">interest in Swift development</span>.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                I believe in the power of collaborative learning and am dedicated to continuous growth,
                pushing the boundaries of what's possible in iOS development.
              </p>
            </motion.div>

            {/* Values grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group"
                >
                  <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center pt-8"
            >
              <motion.button
                type="button"
                aria-expanded={showJourney}
                onClick={() => setShowJourney((current) => !current)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-xl shadow-purple-500/30 hover:shadow-2xl transition-all inline-flex items-center gap-3"
              >
                {showJourney ? "Hide My Journey" : "Learn More About My Journey"}
                <ChevronDown className={`w-5 h-5 transition-transform ${showJourney ? "rotate-180" : ""}`} />
              </motion.button>
            </motion.div>

            {showJourney && (
              <motion.div
                initial={{ opacity: 0, y: 24, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 24, height: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 pt-2">
                  <div className="p-7 rounded-2xl bg-white/65 backdrop-blur-xl border border-white/80 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">My Journey</h3>
                    <p className="text-gray-600 leading-relaxed">
                      I am Surajsing Patil, a B.Tech student building my path across iOS development,
                      AI, full-stack products, UI/UX design, and cybersecurity. I enjoy turning ideas
                      into clean, usable experiences like Streakly, where design and engineering work together.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      ["Focus", "Native iOS apps, AI tools, and useful digital products."],
                      ["Style", "Soft, modern interfaces with simple flows and clear details."],
                      ["Goal", "Grow into a stronger product builder through real projects and collaboration."],
                    ].map(([title, description]) => (
                      <div
                        key={title}
                        className="p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg"
                      >
                        <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider">{title}</div>
                        <p className="text-sm text-gray-600 leading-relaxed mt-3">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
