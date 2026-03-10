import { useRef, useEffect, useCallback } from "react";

function latLngToXYZ(lat, lng, radius) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function rotateY(x, y, z, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(x, y, z, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(x, y, z, cx, cy, fov) {
  const scale = fov / (fov + z);
  return [x * scale + cx, y * scale + cy, z];
}

const InteractiveGlobe = ({
  className = "",
  size = 500,
  dotColor = "rgba(100, 180, 255, ALPHA)",
  arcColor = "rgba(139, 92, 246, 0.5)",
  markerColor = "rgba(167, 139, 250, 1)",
  labelColor = "rgba(196, 181, 253, 0.85)",
  autoRotateSpeed = 0.003,
  connections = [],
  markers = [],
}) => {
  const canvasRef = useRef(null);
  const rotYRef = useRef(0.4);
  const rotXRef = useRef(0.2);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, startRotY: 0, startRotX: 0 });
  const animRef = useRef(0);
  const timeRef = useRef(0);
  const dotsRef = useRef([]);

  useEffect(() => {
    const dots = [];
    const numDots = 1400;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numDots; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numDots);
      dots.push([
        Math.cos(theta) * Math.sin(phi),
        Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
      ]);
    }
    dotsRef.current = dots;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.40;
    const fov = 600;

    if (!dragRef.current.active) {
      rotYRef.current += autoRotateSpeed;
    }
    timeRef.current += 0.012;
    const time = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, radius * 1.6);
    glow.addColorStop(0, "rgba(139, 92, 246, 0.04)");
    glow.addColorStop(0.5, "rgba(100, 160, 255, 0.02)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    const outlineGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, 0, cx, cy, radius);
    outlineGrad.addColorStop(0, "rgba(139, 92, 246, 0.15)");
    outlineGrad.addColorStop(1, "rgba(100, 180, 255, 0.04)");
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = outlineGrad;
    ctx.fill();

    const ry = rotYRef.current;
    const rx = rotXRef.current;

    for (const dot of dotsRef.current) {
      let [x, y, z] = [dot[0] * radius, dot[1] * radius, dot[2] * radius];
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > 0) continue;
      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const depthAlpha = Math.max(0.08, 1 - (z + radius) / (2 * radius));
      const dotSize = 0.9 + depthAlpha * 0.7;
      ctx.beginPath();
      ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = dotColor.replace("ALPHA", depthAlpha.toFixed(2));
      ctx.fill();
    }

    for (const conn of connections) {
      let [x1, y1, z1] = latLngToXYZ(conn.from[0], conn.from[1], radius);
      let [x2, y2, z2] = latLngToXYZ(conn.to[0], conn.to[1], radius);
      [x1, y1, z1] = rotateX(x1, y1, z1, rx);
      [x1, y1, z1] = rotateY(x1, y1, z1, ry);
      [x2, y2, z2] = rotateX(x2, y2, z2, rx);
      [x2, y2, z2] = rotateY(x2, y2, z2, ry);

      if (z1 > radius * 0.25 && z2 > radius * 0.25) continue;

      const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
      const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);

      const mid = [(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2];
      const midLen = Math.sqrt(mid[0] ** 2 + mid[1] ** 2 + mid[2] ** 2);
      const arcH = radius * 1.28;
      const [scx, scy] = project(
        (mid[0] / midLen) * arcH,
        (mid[1] / midLen) * arcH,
        (mid[2] / midLen) * arcH,
        cx, cy, fov
      );

      ctx.beginPath();
      ctx.moveTo(sx1, sy1);
      ctx.quadraticCurveTo(scx, scy, sx2, sy2);
      ctx.strokeStyle = arcColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      const t = (Math.sin(time * 1.1 + conn.from[0] * 0.05) + 1) / 2;
      const tx = (1 - t) ** 2 * sx1 + 2 * (1 - t) * t * scx + t ** 2 * sx2;
      const ty = (1 - t) ** 2 * sy1 + 2 * (1 - t) * t * scy + t ** 2 * sy2;
      ctx.beginPath();
      ctx.arc(tx, ty, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = markerColor;
      ctx.fill();
    }

    for (const marker of markers) {
      let [x, y, z] = latLngToXYZ(marker.lat, marker.lng, radius);
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > radius * 0.15) continue;

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const pulse = Math.sin(time * 2.2 + marker.lat * 0.2) * 0.5 + 0.5;
      const depthFade = Math.max(0.3, Math.min(1, 1 - (z + radius) / (2.2 * radius)));

      ctx.beginPath();
      ctx.arc(sx, sy, 5 + pulse * 5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(167, 139, 250, ${(0.12 + pulse * 0.12) * depthFade})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sx, sy, 2.8, 0, Math.PI * 2);
      const dotGrad = ctx.createRadialGradient(sx - 0.8, sy - 0.8, 0, sx, sy, 3);
      dotGrad.addColorStop(0, `rgba(220, 200, 255, ${depthFade})`);
      dotGrad.addColorStop(1, `rgba(139, 92, 246, ${depthFade * 0.8})`);
      ctx.fillStyle = dotGrad;
      ctx.fill();

      if (marker.label && depthFade > 0.45) {
        const fontSize = Math.max(8, 10 * depthFade);
        ctx.font = `${fontSize}px "Poppins", system-ui, sans-serif`;
        const textW = ctx.measureText(marker.label).width;
        const padX = 5, padY = 2;
        const bx = sx + 9;
        const by = sy - fontSize / 2 - padY + 1;
        ctx.fillStyle = `rgba(15, 10, 30, ${0.75 * depthFade})`;
        ctx.beginPath();
        ctx.roundRect(bx - padX, by, textW + padX * 2, fontSize + padY * 2, 4);
        ctx.fill();
        ctx.fillStyle = labelColor.replace("0.85", `${0.85 * depthFade}`);
        ctx.fillText(marker.label, bx, sy + fontSize * 0.35);
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, [dotColor, arcColor, markerColor, labelColor, autoRotateSpeed, connections, markers]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const onPointerDown = useCallback((e) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startRotY: rotYRef.current,
      startRotX: rotXRef.current,
    };
    e.target.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    rotYRef.current = dragRef.current.startRotY + dx * 0.005;
    rotXRef.current = Math.max(-1, Math.min(1, dragRef.current.startRotX + dy * 0.005));
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`cursor-grab active:cursor-grabbing ${className}`}
      style={{ width: size, height: size }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  );
};

export default InteractiveGlobe;
