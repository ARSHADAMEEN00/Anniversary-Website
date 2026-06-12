import React from 'react';

export default function WashiTape({ color = 'var(--rose-light)', top, left, right, bottom, rotation = '-2deg', width = '80px', height = '25px', zIndex = 5 }) {
  // SVG pattern to create texture for the tape
  const textureId = `washi-texture-${color.replace(/[^a-zA-Z0-9]/g, '')}`;
  
  return (
    <div style={{
      position: 'absolute',
      top, left, right, bottom,
      width, height,
      transform: `rotate(${rotation})`,
      zIndex,
      opacity: 0.85,
      filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))'
    }}>
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <filter id="washi-edges">
            <feTurbulence type="fractalNoise" baseFrequency="0.2 0.02" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <pattern id={textureId} width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M0,4 l4,-4 M-1,1 l2,-2 M3,5 l2,-2" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect 
          width="100%" 
          height="100%" 
          fill={color} 
          filter="url(#washi-edges)" 
        />
        <rect 
          width="100%" 
          height="100%" 
          fill={`url(#${textureId})`} 
          filter="url(#washi-edges)" 
        />
      </svg>
    </div>
  );
}
