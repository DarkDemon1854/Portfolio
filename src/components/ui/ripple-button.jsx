import React, { useState, useMemo } from 'react';

const hexToRgba = (hex, alpha) => {
  let h = hex.startsWith('#') ? hex.slice(1) : hex;
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const COLS = 36;
const ROWS = 12;
const TOTAL = COLS * ROWS;
const RIPPLE_SIZE = '18.973665961em';

const JS_RIPPLE_KF = `
@keyframes _js_ripple {
  0%   { transform: scale(0); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}
.animate-js-ripple {
  animation: _js_ripple var(--ripple-dur) ease-out forwards;
}`;

const RippleButton = ({
  children,
  onClick,
  className = '',
  disabled = false,
  variant = 'default',
  rippleColor,
  rippleDuration = 600,
  hoverBaseColor = '#6996e2',
  hoverRippleColor,
  hoverBorderEffectColor = '#6996e277',
  hoverBorderEffectThickness = '0.3em',
}) => {
  const [ripples, setRipples] = useState([]);

  const determinedRippleColor = rippleColor ?? 'var(--button-ripple-color, rgba(0,0,0,0.15))';

  const gridStyles = useMemo(() => {
    if (variant !== 'hover' && variant !== 'hoverborder') return '';
    const dur = '0.9s';
    let nth = '';
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c + 1;
        const top = 0.125 + r * 0.25;
        const left = 0.1875 + c * 0.25;
        if (variant === 'hover') {
          nth += `.hv-cell:nth-child(${idx}):hover ~ .hv-ripple{top:${top}em;left:${left}em;transition:width ${dur} ease,height ${dur} ease,top 0s,left 0s;}`;
        } else {
          nth += `.hvb-cell:nth-child(${idx}):hover ~ .hvb-ripple{top:${top}em;left:${left}em;transition:width ${dur} ease-out,height ${dur} ease-out,top 0s,left 0s;}`;
        }
      }
    }
    if (variant === 'hover') {
      const c = hoverRippleColor ?? hexToRgba(hoverBaseColor, 0.466);
      return `
        .hv-ripple{background:${c};transition:width .9s ease,height .9s ease,top 99999s,left 99999s;}
        .hv-cell:hover ~ .hv-ripple{width:${RIPPLE_SIZE};height:${RIPPLE_SIZE};}
        ${nth}`;
    }
    return `
      .hvb-cont{padding:${hoverBorderEffectThickness};mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;}
      .hvb-ripple{background:${hoverBorderEffectColor};transition:width .9s ease-out,height .9s ease-out,top 99999s,left 9999s;}
      .hvb-cell:hover ~ .hvb-ripple{width:${RIPPLE_SIZE};height:${RIPPLE_SIZE};}
      ${nth}`;
  }, [variant, hoverBaseColor, hoverRippleColor, hoverBorderEffectColor, hoverBorderEffectThickness]);

  const addRipple = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const key = Date.now() + Math.random();
    setRipples(p => [...p, { key, x, y, size }]);
    setTimeout(() => setRipples(p => p.filter(r => r.key !== key)), rippleDuration);
    onClick?.(e);
  };

  const RippleLayer = () => (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden rounded-[inherit]">
      {ripples.map(r => (
        <span
          key={r.key}
          className="absolute rounded-full animate-js-ripple"
          style={{
            left: r.x, top: r.y, width: r.size, height: r.size,
            backgroundColor: determinedRippleColor,
            '--ripple-dur': `${rippleDuration}ms`,
          }}
        />
      ))}
    </div>
  );

  if (variant === 'hover') return (
    <>
      <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KF + gridStyles }} />
      <button
        className={`relative rounded-lg isolate overflow-hidden cursor-pointer border-none bg-transparent
          ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
        onClick={addRipple} disabled={disabled}
      >
        <span className="relative z-10 pointer-events-none">{children}</span>
        <RippleLayer />
        <div className="absolute inset-0 grid overflow-hidden pointer-events-none"
          style={{ gridTemplateColumns: `repeat(${COLS}, 0.25em)` }}>
          {Array.from({ length: TOTAL }, (_, i) => (
            <span key={i} className="hv-cell relative pointer-events-auto" />
          ))}
          <div className="hv-ripple pointer-events-none absolute w-0 h-0 rounded-full -translate-x-1/2 -translate-y-1/2 top-0 left-0 z-[-1]" />
        </div>
      </button>
    </>
  );

  if (variant === 'hoverborder') return (
    <>
      <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KF + gridStyles }} />
      <button
        className={`relative rounded-lg overflow-hidden isolate cursor-pointer border-none bg-transparent
          ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
        onClick={addRipple} disabled={disabled}
      >
        <span className="relative z-10 pointer-events-none">{children}</span>
        <RippleLayer />
        <div className="hvb-cont absolute inset-0 grid rounded-[inherit] overflow-hidden pointer-events-none"
          style={{ gridTemplateColumns: `repeat(${COLS}, 0.25em)` }}>
          {Array.from({ length: TOTAL }, (_, i) => (
            <span key={i} className="hvb-cell relative pointer-events-auto" />
          ))}
          <div className="hvb-ripple pointer-events-none absolute w-0 h-0 rounded-full -translate-x-1/2 -translate-y-1/2 top-0 left-0 z-[-1]" />
        </div>
      </button>
    </>
  );

  if (variant === 'ghost') return (
    <>
      <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KF }} />
      <button
        className={`relative border-none bg-transparent isolate overflow-hidden cursor-pointer rounded-lg
          ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
        onClick={addRipple} disabled={disabled}
      >
        <span className="relative z-10 pointer-events-none">{children}</span>
        <RippleLayer />
      </button>
    </>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KF }} />
      <button
        className={`relative overflow-hidden isolate cursor-pointer border-none
          bg-blue-600 hover:opacity-90 text-white rounded-lg px-4 py-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        onClick={addRipple} disabled={disabled}
      >
        <span className="relative z-[1] pointer-events-none">{children}</span>
        <RippleLayer />
      </button>
    </>
  );
};

export { RippleButton };
export default RippleButton;
