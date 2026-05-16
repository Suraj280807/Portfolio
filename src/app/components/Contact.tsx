import { motion } from "motion/react";
import { Mail, Github, Linkedin, MapPin, Send, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "surajsing@example.com",
      href: "mailto:surajsing@example.com",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@surajsingpatil",
      href: "https://github.com",
      gradient: "from-gray-700 to-gray-900",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Surajsing Patil",
      href: "https://linkedin.com",
      gradient: "from-blue-600 to-blue-800",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: "#",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden scroll-mt-8">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 opacity-50" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Have an exciting project in mind? Let's collaborate and build something amazing together.
          </p>
        </motion.div>

        {/* Main contact card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-10 lg:p-14 rounded-[3rem] bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-3xl border border-white/70 shadow-2xl overflow-hidden"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-10">
            {/* Contact links grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative p-6 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <link.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-500 mb-1">{link.label}</div>
                      <div className="font-semibold text-gray-900">{link.value}</div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-12 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-medium shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Send a Message
              </motion.button>
            </motion.div>

            {/* Decorative footer text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center pt-8 border-t border-white/50"
            >
              <p className="text-gray-600">
                Open to opportunities, collaborations, and interesting conversations
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16 text-gray-500"
        >
          <p>© 2024 Surajsing Patil. Crafted with passion and precision.</p>
        </motion.div>
      </div>
    </section>
  );
}
