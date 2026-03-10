import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';

const hexToRgb = (hex) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1];
};

const getAnchorAndDir = (origin, w, h) => {
  const outside = 0.2;
  switch (origin) {
    case 'top-left':     return { anchor: [0, -outside * h],           dir: [0.7, 0.7]   };
    case 'top-right':    return { anchor: [w, -outside * h],           dir: [-0.7, 0.7]  };
    case 'left':         return { anchor: [-outside * w, 0.5 * h],     dir: [1, 0]       };
    case 'right':        return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0]    };
    case 'bottom-left':  return { anchor: [0, (1 + outside) * h],      dir: [0.7, -0.7] };
    case 'bottom-center':return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1]   };
    case 'bottom-right': return { anchor: [w, (1 + outside) * h],      dir: [-0.7, -0.7]};
    default:             return { anchor: [0.5 * w, -outside * h],     dir: [0, 1]      };
  }
};

const VERT = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  uniform float iTime;
  uniform vec2  iResolution;
  uniform vec2  rayPos;
  uniform vec2  rayDir;
  uniform vec3  raysColor;
  uniform float raysSpeed;
  uniform float lightSpread;
  uniform float rayLength;
  uniform float pulsating;
  uniform float fadeDistance;
  uniform float saturation;
  uniform vec2  mousePos;
  uniform float mouseInfluence;
  uniform float noiseAmount;
  uniform float distortion;
  varying vec2 vUv;

  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                    float seedA, float seedB, float speed) {
    vec2 sourceToCoord = coord - raySource;
    vec2 dirNorm = normalize(sourceToCoord);
    float cosAngle = dot(dirNorm, rayRefDirection);

    float d = distortion * sin(iTime * 1.5 + length(sourceToCoord) * 0.005);
    float distortedAngle = cosAngle + d;

    float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
    float distance = length(sourceToCoord);
    float maxDistance = max(iResolution.x, iResolution.y) * rayLength;
    float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

    float fadeFactor = fadeDistance * max(iResolution.x, iResolution.y);
    float fadeFalloff = clamp((fadeFactor - distance) / fadeFactor, 0.0, 1.0);

    float pulse = pulsating > 0.5 ? (0.85 + 0.15 * sin(iTime * speed * 4.0)) : 1.0;

    float baseStrength = clamp(
      (0.5 + 0.2 * sin(distortedAngle * seedA + iTime * speed)) +
      (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed * 0.8)),
      0.0, 1.0
    );

    return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 coord = vec2(fragCoord.x, fragCoord.y);

    vec2 finalRayDir = normalize(rayDir);
    if (mouseInfluence > 0.0) {
      vec2 mouseScreenPos = mousePos * iResolution.xy;
      vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
      finalRayDir = normalize(mix(finalRayDir, mouseDirection, mouseInfluence));
    }

    float r1 = rayStrength(rayPos, finalRayDir, coord, 45.2, 31.4, 0.8 * raysSpeed);
    float r2 = rayStrength(rayPos, finalRayDir, coord, 28.5, 19.8, 1.2 * raysSpeed);
    float r3 = rayStrength(rayPos, finalRayDir, coord, 12.1, 56.2, 0.5 * raysSpeed);

    float combined = (r1 * 0.4 + r2 * 0.4 + r3 * 0.2);
    combined = pow(combined, 0.7);
    combined *= 1.5;
    vec3 finalColor = raysColor * combined;

    if (noiseAmount > 0.0) {
      float n = noise(coord * 0.01 + iTime * 0.05);
      finalColor *= (1.0 - noiseAmount + noiseAmount * n);
    }

    if (saturation != 1.0) {
      float gray = dot(finalColor, vec3(0.299, 0.587, 0.114));
      finalColor = mix(vec3(gray), finalColor, saturation);
    }

    gl_FragColor = vec4(finalColor, combined);
  }
`;

export function LightRays({
  raysOrigin = 'top-center',
  raysColor = '#ffffff',
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.02,
  distortion = 0.05,
  className = '',
}) {
  const containerRef = useRef(null);
  const uniformsRef = useRef(null);
  const rendererRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef(null);
  const meshRef = useRef(null);
  const cleanupRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    observerRef.current = new IntersectionObserver(
      entries => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
    observerRef.current.observe(containerRef.current);
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    cleanupRef.current?.();

    const init = async () => {
      if (!containerRef.current) return;
      await new Promise(r => setTimeout(r, 10));
      if (!containerRef.current) return;

      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      gl.canvas.style.display = 'block';

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const uniforms = {
        iTime:          { value: 0 },
        iResolution:    { value: [1, 1] },
        rayPos:         { value: [0, 0] },
        rayDir:         { value: [0, 1] },
        raysColor:      { value: hexToRgb(raysColor) },
        raysSpeed:      { value: raysSpeed },
        lightSpread:    { value: lightSpread },
        rayLength:      { value: rayLength },
        pulsating:      { value: pulsating ? 1.0 : 0.0 },
        fadeDistance:   { value: fadeDistance },
        saturation:     { value: saturation },
        mousePos:       { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount:    { value: noiseAmount },
        distortion:     { value: distortion },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: VERT, fragment: FRAG, uniforms, transparent: true });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return;
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);
        const dpr = renderer.dpr;
        const w = wCSS * dpr;
        const h = hCSS * dpr;
        uniforms.iResolution.value = [w, h];
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
        uniforms.rayPos.value = anchor;
        uniforms.rayDir.value = dir;
      };

      const loop = (t) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;
        uniforms.iTime.value = t * 0.001;
        if (followMouse && mouseInfluence > 0.0) {
          const s = 0.95;
          smoothMouseRef.current.x = smoothMouseRef.current.x * s + mouseRef.current.x * (1 - s);
          smoothMouseRef.current.y = smoothMouseRef.current.y * s + mouseRef.current.y * (1 - s);
          uniforms.mousePos.value = [smoothMouseRef.current.x, 1.0 - smoothMouseRef.current.y];
        }
        renderer.render({ scene: mesh });
        animationIdRef.current = requestAnimationFrame(loop);
      };

      window.addEventListener('resize', updatePlacement);
      updatePlacement();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupRef.current = () => {
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        window.removeEventListener('resize', updatePlacement);
        if (renderer.gl.canvas.parentNode) {
          renderer.gl.canvas.parentNode.removeChild(renderer.gl.canvas);
        }
      };
    };

    init();
    return () => cleanupRef.current?.();
  }, [isVisible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating,
      fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    if (followMouse) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
    />
  );
}

export default LightRays;
