import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { EXPERIENCES } from "../constants";

const InfoCard = ({ item, side }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 14 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className={`absolute bottom-[calc(100%+14px)] z-50 w-80 ${
      side === "right" ? "left-0" : "right-0"
    }`}
  >
    <div className="rounded-2xl border border-violet-500/20 bg-neutral-950/95 backdrop-blur-2xl p-5 shadow-2xl shadow-violet-950/40">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-violet-400 mb-1">
        {item.year}
      </p>
      <h4 className="text-sm font-bold text-white leading-snug mb-0.5">
        {item.role}
      </h4>
      <p className="text-xs font-medium text-violet-300/70 mb-3">
        {item.company}
      </p>
      <p className="text-xs leading-relaxed text-neutral-400">
        {item.description}
      </p>
    </div>
    <div
      className={`absolute -bottom-[7px] w-3.5 h-3.5 rotate-45 bg-neutral-950/95 border-b border-r border-violet-500/20 ${
        side === "right" ? "left-10" : "right-10"
      }`}
    />
  </motion.div>
);

const TimelineNode = ({ item, side }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`flex items-center gap-0 ${
        side === "right" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div
        className={`h-[2px] w-14 shrink-0 ${
          side === "right"
            ? "bg-gradient-to-r from-red-500/80 to-transparent"
            : "bg-gradient-to-l from-red-500/80 to-transparent"
        }`}
      />

      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="w-[72px] h-[72px] rounded-full p-[2px] cursor-pointer"
          style={{
            background: hovered
              ? "linear-gradient(135deg,#ef4444,#f97316,#dc2626)"
              : "linear-gradient(135deg,rgba(239,68,68,0.45),rgba(220,38,38,0.35))",
            transition: "background 0.3s",
          }}
        >
          <div className="w-full h-full rounded-full bg-neutral-950 overflow-hidden">
            <img
              src={item.image}
              alt={item.company}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          animate={hovered ? { opacity: 1, scale: 1.3 } : { opacity: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle,rgba(239,68,68,0.4),transparent 70%)",
            filter: "blur(10px)",
            zIndex: -1,
          }}
        />

        <AnimatePresence>
          {hovered && <InfoCard item={item} side={side} />}
        </AnimatePresence>
      </div>

      <div
        className={`flex flex-col shrink-0 max-w-[140px] ${
          side === "right" ? "ml-4 items-start" : "mr-4 items-end text-right"
        }`}
      >
        <p className="text-white text-sm font-semibold leading-tight">
          {item.company}
        </p>
        <p className="text-red-400 text-xs mt-0.5 font-medium">{item.year}</p>
      </div>
    </div>
  );
};

const CenterDot = () => (
  <div className="relative z-10 shrink-0 w-4 h-4">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-[0_0_14px_4px_rgba(239,68,68,0.6)]" />
    <div className="absolute inset-[3px] rounded-full bg-neutral-950" />
    <div className="absolute inset-[5px] rounded-full bg-gradient-to-br from-red-400 to-orange-500" />
  </div>
);

const Education = () => (
  <div className="pb-28">
    <style>{`
      @keyframes timelinePulse {
        0%,100% { opacity:0.5; }
        50%      { opacity:1;   }
      }
    `}</style>

    <motion.h2
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="my-20 text-center text-4xl font-light tracking-wide"
    >
      My{" "}
      <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Education
      </span>
    </motion.h2>

    <div className="relative mx-auto max-w-3xl px-4">
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] bg-gradient-to-b from-transparent via-red-900/40 to-transparent" />
      <div
        className="absolute left-1/2 top-0 bottom-0 -translate-x-[2.5px] w-[5px]"
        style={{
          background:
            "linear-gradient(180deg,transparent 0%,#ef4444 25%,#dc2626 60%,#f97316 85%,transparent 100%)",
          animation: "timelinePulse 3s ease-in-out infinite",
          filter: "blur(3px)",
        }}
      />

      {EXPERIENCES.map((item, index) => {
        const side = index % 2 === 0 ? "right" : "left";
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative flex items-center mb-20 last:mb-0"
          >
            <div className="w-1/2 flex justify-end pr-0">
              {side === "left" && <TimelineNode item={item} side="left" />}
            </div>

            <CenterDot />

            <div className="w-1/2 flex justify-start pl-0">
              {side === "right" && <TimelineNode item={item} side="right" />}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default Education;
