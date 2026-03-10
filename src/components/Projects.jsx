import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { PROJECTS } from "../constants";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

function polarToXY(angleDeg, rx, ry) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * rx, y: Math.sin(rad) * ry };
}

function OrbitTag({ label, orbitRx, orbitRy, startAngle, duration, color, slow }) {
  const [angle, setAngle] = useState(startAngle);
  const rafRef = useRef(null);
  const lastRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const tick = (ts) => {
      if (lastRef.current === null) lastRef.current = ts;
      const dt = ts - lastRef.current;
      lastRef.current = ts;
      const speed = slow ? 0.3 : 1;
      setAngle((a) => (a + (dt / duration) * 360 * speed) % 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration, slow]);

  const { x, y } = polarToXY(angle, orbitRx, orbitRy);
  const depth = (Math.sin((angle * Math.PI) / 180) + 1) / 2;
  const scale = hovered ? 1.25 : 0.72 + depth * 0.55;
  const opacity = 0.45 + depth * 0.55;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
        opacity,
        zIndex: Math.round(depth * 100),
        transition: hovered ? "transform 0.25s, box-shadow 0.25s" : "transform 0.06s",
        pointerEvents: "auto",
        cursor: "default",
      }}
    >
      <span
        style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: 9999,
          background: hovered ? `${color}33` : "rgba(15,10,30,0.72)",
          border: `1.5px solid ${color}`,
          color: hovered ? "#fff" : color,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.04em",
          boxShadow: hovered
            ? `0 0 16px ${color}, 0 0 32px ${color}88`
            : `0 0 6px ${color}55`,
          whiteSpace: "nowrap",
          userSelect: "none",
          backdropFilter: "blur(8px)",
          transition: "all 0.25s ease",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function OrbitRing({ rx, ry, color }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: rx * 2,
        height: ry * 2,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        border: `1px solid ${color}33`,
        boxShadow: `0 0 8px ${color}22, inset 0 0 8px ${color}11`,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

function InfoCard({ project, accentA, ghLink, anchorRef }) {
  const [top, setTop] = React.useState("50%");
  const [transformY, setTransformY] = React.useState("-50%");

  React.useLayoutEffect(() => {
    if (!anchorRef?.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const cardH = Math.min(440, window.innerHeight * 0.7);
    const idealTop = rect.top + rect.height / 2;
    const clamped = Math.max(cardH / 2 + 16, Math.min(window.innerHeight - cardH / 2 - 16, idealTop));
    setTop(clamped);
    setTransformY(`-50%`);
  }, [anchorRef]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{
        position: "fixed",
        top,
        right: 18,
        transform: transformY === "-50%" ? "translateY(-50%)" : undefined,
        zIndex: 9999,
        width: 320,
        maxWidth: "38vw",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          borderRadius: 16,
          border: `1px solid ${accentA}44`,
          background: "rgba(5,3,18,0.97)",
          backdropFilter: "blur(20px)",
          padding: "16px 18px",
          boxShadow: `0 8px 40px rgba(0,0,0,0.9), 0 0 24px ${accentA}22`,
          maxHeight: "min(440px, 70vh)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accentA, marginBottom: 8, flexShrink: 0 }}>
          {project.title}
        </p>
        <div
          style={{
            overflowY: "auto",
            flexGrow: 1,
            marginBottom: 12,
            paddingRight: 4,
            scrollbarWidth: "thin",
            scrollbarColor: `${accentA}44 transparent`,
          }}
        >
          <p
            style={{
              fontSize: 11,
              lineHeight: 1.7,
              color: "#94a3b8",
            }}
          >
            {project.description}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", flexShrink: 0 }}>
          {ghLink && (
            <a
              href={ghLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${accentA}55`,
                color: "#e2e8f0",
                fontSize: 11,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <FaGithub size={12} /> GitHub
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 8,
                background: `${accentA}22`,
                border: `1px solid ${accentA}88`,
                color: accentA,
                fontSize: 11,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <FaExternalLinkAlt size={10} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, accentA, accentB, orbitColor, delay }) {
  const imgRef = useRef(null);
  const [imgHovered, setImgHovered] = useState(false);
  const [orbitSlow, setOrbitSlow] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 22 });
  const sry = useSpring(ry, { stiffness: 160, damping: 22 });

  const handleMouseMove = useCallback((e) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rx.set(((e.clientY - (rect.top + rect.height / 2)) / rect.height) * -18);
    ry.set(((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 18);
  }, [rx, ry]);

  const orbits = [
    { rx: 210, ry: 70, dur: 12000 },
    { rx: 270, ry: 90, dur: 18000 },
    { rx: 330, ry: 110, dur: 25000 },
  ];

  const techs = project.technologies;
  const distributed = techs.map((t, i) => ({ label: t, orbit: i % 3 }));

  const ghLink =
    typeof project.githubLink === "string"
      ? project.githubLink
      : project.githubLink?.frontend ?? project.githubLink?.backend;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Hover wrapper: covers both image AND the info card so moving between them doesn't reset hover */}
      <div
        style={{ position: "relative", display: "inline-block" }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => {
          setImgHovered(false);
          rx.set(0);
          ry.set(0);
        }}
      >
        <motion.div
          ref={imgRef}
          onMouseMove={handleMouseMove}
          style={{
            rotateX: srx,
            rotateY: sry,
            perspective: 800,
            position: "relative",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              display: "block",
              width: 560,
              maxWidth: "90vw",
              height: "auto",
              borderRadius: 18,
              transform: imgHovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              boxShadow: imgHovered
                ? `0 0 0 2px ${accentA}88, 0 0 40px ${accentA}55, 0 0 80px ${accentB}33`
                : `0 0 0 1px ${accentA}33, 0 0 20px ${accentA}22`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${accentA}11 0%, transparent 60%, ${accentB}22 100%)`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "120%",
              height: "120%",
              borderRadius: "50%",
              background: `radial-gradient(ellipse, ${accentA}22 0%, transparent 70%)`,
              filter: "blur(18px)",
              pointerEvents: "none",
              zIndex: -1,
              opacity: imgHovered ? 1 : 0.4,
              transition: "opacity 0.4s",
            }}
          />
        </motion.div>

        <AnimatePresence>
          {imgHovered && (
            <InfoCard project={project} accentA={accentA} ghLink={ghLink} anchorRef={imgRef} />
          )}
        </AnimatePresence>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.6 }}
        className="my-4 text-center text-xl font-light tracking-wide"
      >
        <span
          style={{
            background: "linear-gradient(90deg, #ef4444, #22c55e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 6px rgba(239,68,68,0.4))",
          }}
        >
          {project.title}
        </span>
      </motion.h3>

      <div
        style={{
          position: "relative",
          width: 560,
          height: 260,
          maxWidth: "95vw",
          marginTop: 8,
        }}
      >
        {orbits.map((o, i) => (
          <OrbitRing key={i} rx={o.rx} ry={o.ry} color={orbitColor} />
        ))}
        {distributed.map((item, i) => {
          const o = orbits[item.orbit];
          const sameOrbit = distributed.filter((d) => d.orbit === item.orbit);
          const posInOrbit = sameOrbit.indexOf(item);
          const startAngle = (360 / sameOrbit.length) * posInOrbit + i * 23;
          return (
            <OrbitTag
              key={i}
              label={item.label}
              orbitRx={o.rx}
              orbitRy={o.ry}
              startAngle={startAngle}
              duration={o.dur}
              color={orbitColor}
              slow={orbitSlow}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

const PALETTES = [
  { accentA: "#a855f7", accentB: "#818cf8", orbitColor: "#a855f7" },
  { accentA: "#38bdf8", accentB: "#6366f1", orbitColor: "#38bdf8" },
];

const Projects = () => {
  return (
    <section className="pb-20 overflow-hidden" style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 40% at 20% 30%, rgba(168,85,247,0.07) 0%, transparent 70%), " +
            "radial-gradient(ellipse 60% 40% at 80% 70%, rgba(56,189,248,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -60 }}
        transition={{ duration: 0.6 }}
        className="my-20 text-center text-4xl font-light tracking-wide relative z-10"
      >
        My{" "}
        <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Projects
        </span>
      </motion.h2>

      <div className="relative z-10 flex flex-col items-center gap-28" style={{ perspective: 1200 }}>
        {PROJECTS.map((project, idx) => (
          <ProjectCard
            key={idx}
            project={project}
            accentA={PALETTES[idx % PALETTES.length].accentA}
            accentB={PALETTES[idx % PALETTES.length].accentB}
            orbitColor={PALETTES[idx % PALETTES.length].orbitColor}
            delay={idx * 0.2}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
