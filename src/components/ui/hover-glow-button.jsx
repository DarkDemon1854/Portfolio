import React, { useRef, useState } from 'react';

const HoverButton = ({
  children,
  onClick,
  className = '',
  disabled = false,
  glowColor = '#00ffc3',
  backgroundColor = '#111827',
  textColor = '#ffffff',
  hoverTextColor = '#67e8f9',
}) => {
  const buttonRef = useRef(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setGlowPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-block px-8 py-4 border-none cursor-pointer overflow-hidden
        transition-colors duration-300 rounded-lg z-10 font-sans
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      style={{ backgroundColor, color: isHovered ? hoverTextColor : textColor }}
    >
      <div
        className={`absolute w-[200px] h-[200px] rounded-full opacity-50 pointer-events-none
          transition-transform duration-[400ms] ease-out -translate-x-1/2 -translate-y-1/2
          ${isHovered ? 'scale-125' : 'scale-0'}`}
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
          background: `radial-gradient(circle, ${glowColor} 10%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export { HoverButton };
export default HoverButton;
