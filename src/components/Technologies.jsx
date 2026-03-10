import { motion } from "framer-motion";
import { useState } from "react";
import InteractiveGlobe from "./InteractiveGlobe";
import { RiReactjsLine } from "react-icons/ri";
import {
  SiMongodb,
  SiCplusplus,
  SiC,
  SiPython,
  SiMysql,
  SiTailwindcss,
  SiDocker,
  SiGithub,
  SiNextdotjs,
  SiFlask,
  SiHeroku,
  SiArduino,
  SiFirebase,
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";

const SKILL_CATEGORIES = [
  {
    name: "Languages",
    color: "#60a5fa",
    glowColor: "rgba(96,165,250,",
    skills: [
      { label: "C++", icon: SiCplusplus, color: "#264f78", lat: 40.71, lng: -74.0 },
      { label: "C", icon: SiC, color: "#3b82f6", lat: 52.52, lng: 13.4 },
      { label: "Python", icon: SiPython, color: "#facc15", lat: 33.69, lng: 73.06 },
      { label: "JavaScript", icon: IoLogoJavascript, color: "#f59e0b", lat: 48.85, lng: 2.35 },
    ],
  },
  {
    name: "Frontend",
    color: "#a78bfa",
    glowColor: "rgba(167,139,250,",
    skills: [
      { label: "React.js", icon: RiReactjsLine, color: "#22d3ee", lat: 37.78, lng: -122.42 },
      { label: "Next.js", icon: SiNextdotjs, color: "#e5e7eb", lat: 51.51, lng: -0.13 },
      { label: "Tailwind", icon: SiTailwindcss, color: "#38bdf8", lat: 35.68, lng: 139.69 },
    ],
  },
  {
    name: "Backend",
    color: "#34d399",
    glowColor: "rgba(52,211,153,",
    skills: [
      { label: "Node.js", icon: FaNodeJs, color: "#16a34a", lat: 19.43, lng: -99.13 },
      { label: "Flask", icon: SiFlask, color: "#94a3b8", lat: 28.61, lng: 77.21 },
    ],
  },
  {
    name: "Databases",
    color: "#fb923c",
    glowColor: "rgba(251,146,60,",
    skills: [
      { label: "MongoDB", icon: SiMongodb, color: "#16a34a", lat: 1.35, lng: 103.82 },
      { label: "MySQL", icon: SiMysql, color: "#3b82f6", lat: -33.87, lng: 151.21 },
      { label: "Firebase", icon: SiFirebase, color: "#f97316", lat: 55.76, lng: 37.62 },
    ],
  },
  {
    name: "DevOps / Tools",
    color: "#f472b6",
    glowColor: "rgba(244,114,182,",
    skills: [
      { label: "Docker", icon: SiDocker, color: "#60a5fa", lat: -23.55, lng: -46.63 },
      { label: "GitHub", icon: SiGithub, color: "#e5e7eb", lat: 45.42, lng: -75.69 },
      { label: "Heroku", icon: SiHeroku, color: "#a855f7", lat: 36.19, lng: 44.01 },
    ],
  },
];

const ALL_MARKERS = SKILL_CATEGORIES.flatMap((cat) =>
  cat.skills.map((s) => ({ lat: s.lat, lng: s.lng, label: s.label }))
);

const ALL_CONNECTIONS = [];
for (const cat of SKILL_CATEGORIES) {
  const s = cat.skills;
  for (let i = 0; i < s.length - 1; i++) {
    ALL_CONNECTIONS.push({
      from: [s[i].lat, s[i].lng],
      to: [s[i + 1].lat, s[i + 1].lng],
    });
  }
  if (s.length > 2) {
    ALL_CONNECTIONS.push({
      from: [s[s.length - 1].lat, s[s.length - 1].lng],
      to: [s[0].lat, s[0].lng],
    });
  }
}
ALL_CONNECTIONS.push(
  { from: [37.78, -122.42], to: [19.43, -99.13] },
  { from: [28.61, 77.21], to: [1.35, 103.82] },
  { from: [51.51, -0.13], to: [-33.87, 151.21] },
  { from: [48.85, 2.35], to: [37.78, -122.42] },
  { from: [40.71, -74.0], to: [28.61, 77.21] },
);

const Technologies = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="pb-28">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -60 }}
        transition={{ duration: 0.6 }}
        className="my-20 text-center text-4xl font-light tracking-wide"
      >
        Skills &amp;{" "}
        <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Technologies
        </span>
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 px-4">

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
          <InteractiveGlobe
            size={440}
            markers={ALL_MARKERS}
            connections={ALL_CONNECTIONS}
            autoRotateSpeed={0.0025}
            dotColor="rgba(148, 163, 184, ALPHA)"
            arcColor="rgba(139, 92, 246, 0.45)"
            markerColor="rgba(167, 139, 250, 1)"
            labelColor="rgba(196, 181, 253, 0.85)"
          />
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col gap-4 w-full max-w-sm lg:max-w-xs xl:max-w-sm"
        >
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * catIdx }}
              onClick={() =>
                setActiveCategory(activeCategory === cat.name ? null : cat.name)
              }
              className={`rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
                activeCategory === cat.name
                  ? "border-violet-500/50 bg-neutral-900/80"
                  : "border-neutral-800 bg-neutral-950/60 hover:border-neutral-600"
              }`}
              style={{
                boxShadow:
                  activeCategory === cat.name
                    ? `0 0 24px ${cat.glowColor}0.12)`
                    : "none",
              }}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <span
                  className="text-sm font-semibold tracking-wide"
                  style={{ color: cat.color }}
                >
                  {cat.name}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {cat.skills.slice(0, 3).map((skill) => (
                      <skill.icon
                        key={skill.label}
                        className="text-lg opacity-60"
                        style={{ color: skill.color }}
                      />
                    ))}
                  </div>
                  <svg
                    className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                      activeCategory === cat.name ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <motion.div
                initial={false}
                animate={
                  activeCategory === cat.name
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 px-4 pb-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.label}
                      className="flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs text-neutral-300 transition-all hover:border-violet-500/50"
                    >
                      <skill.icon
                        className="text-sm"
                        style={{ color: skill.color }}
                      />
                      {skill.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Technologies;
