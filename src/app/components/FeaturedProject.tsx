import { motion } from "motion/react";
import { BarChart3, Bell, CheckCircle2, Palette, PlusCircle, Smartphone } from "lucide-react";
import todayScreen from "../../assets/streakly/today.png";
import statsScreen from "../../assets/streakly/stats.png";
import addHabitScreen from "../../assets/streakly/add-habit.png";
import settingsScreen from "../../assets/streakly/settings.png";

const screenshots = [
  {
    src: todayScreen,
    title: "Today",
    caption: "Daily momentum and habit check-ins",
    tilt: "lg:-rotate-6",
    lift: "lg:mt-12",
  },
  {
    src: statsScreen,
    title: "Stats",
    caption: "Weekly rhythm and streak tracking",
    tilt: "lg:-rotate-2",
    lift: "lg:mt-0",
  },
  {
    src: addHabitScreen,
    title: "Add",
    caption: "Fast habit creation with icons and colors",
    tilt: "lg:rotate-2",
    lift: "lg:mt-0",
  },
  {
    src: settingsScreen,
    title: "Settings",
    caption: "Personalization and habit management",
    tilt: "lg:rotate-6",
    lift: "lg:mt-12",
  },
];

const modules = [
  { icon: CheckCircle2, label: "Daily Habits", color: "from-cyan-500 to-teal-500" },
  { icon: BarChart3, label: "Progress Stats", color: "from-orange-400 to-amber-500" },
  { icon: PlusCircle, label: "Quick Add", color: "from-sky-500 to-cyan-500" },
  { icon: Palette, label: "Personal Themes", color: "from-fuchsia-500 to-pink-500" },
  { icon: Bell, label: "Reminders", color: "from-violet-500 to-indigo-500" },
  { icon: Smartphone, label: "SwiftUI iOS", color: "from-gray-800 to-gray-600" },
];

export default function FeaturedProject() {
  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden scroll-mt-8">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-orange-50 opacity-80" />
      <div className="absolute inset-x-0 top-16 h-64 bg-gradient-to-r from-cyan-200/30 via-emerald-100/20 to-orange-200/30 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wider">Featured Project</span>
          <h2 className="text-4xl lg:text-6xl font-bold mt-4 bg-gradient-to-r from-gray-950 via-gray-800 to-cyan-700 bg-clip-text text-transparent">
            Streakly Habit Tracker
          </h2>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            A polished SwiftUI habit tracker built around daily momentum, simple streak insights, quick habit creation,
            and a soft personalization system that keeps the experience calm and focused.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-6 md:p-10 lg:p-12 rounded-[3rem] bg-white/70 backdrop-blur-3xl border border-white/80 shadow-2xl overflow-hidden"
          >
            <div className="absolute -top-24 left-12 w-72 h-72 bg-cyan-300/25 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 right-12 w-80 h-80 bg-orange-200/35 rounded-full blur-3xl" />

            <div className="relative z-10 grid xl:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 font-semibold text-sm">
                    <Smartphone className="w-4 h-4" />
                    iPhone App Case Study
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-950 mt-6">
                    Tiny actions, visible momentum.
                  </h3>
                  <p className="text-gray-600 leading-relaxed mt-4 text-lg">
                    Streakly turns habit tracking into a lightweight daily ritual: users see progress at a glance,
                    create new habits in seconds, and tune the app to match their routine.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {modules.map((module, index) => (
                    <motion.div
                      key={module.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06, duration: 0.45 }}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-white/70 border border-white/80 shadow-lg"
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-md`}>
                        <module.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-800">{module.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  {[
                    ["4", "Core tabs"],
                    ["20+", "Habit icons"],
                    ["1.0", "Launch build"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl bg-white/70 border border-white/80 p-5 shadow-lg">
                      <div className="text-3xl font-bold text-cyan-600">{value}</div>
                      <div className="text-sm text-gray-500 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[720px] lg:min-h-[780px]">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/60 via-white/20 to-orange-100/60 rounded-[2.5rem] blur-2xl" />
                <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 items-start justify-items-center">
                  {screenshots.map((screen, index) => (
                    <motion.figure
                      key={screen.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.18 + index * 0.1, duration: 0.7 }}
                      whileHover={{ y: -12, scale: 1.03, rotate: 0 }}
                      className={`group relative w-full max-w-[190px] sm:max-w-[220px] lg:max-w-[210px] xl:max-w-[230px] ${screen.lift} ${screen.tilt} transition-transform duration-500`}
                    >
                      <div className="rounded-[2.3rem] bg-gray-950 p-2 shadow-2xl">
                        <img
                          src={screen.src}
                          alt={`Streakly ${screen.title} screen`}
                          className="w-full aspect-[473/1024] rounded-[1.9rem] object-cover bg-white"
                        />
                      </div>
                      <figcaption className="mt-4 text-center">
                        <div className="font-bold text-gray-900">{screen.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{screen.caption}</div>
                      </figcaption>
                    </motion.figure>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>



          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute -right-8 bottom-1/4 hidden xl:block"
          >
            <div className="p-6 rounded-2xl bg-white/75 backdrop-blur-2xl border border-white/70 shadow-xl">
              <div className="text-3xl font-bold text-orange-500">SwiftUI</div>
              <div className="text-sm text-gray-600 mt-1">Native iOS build</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
