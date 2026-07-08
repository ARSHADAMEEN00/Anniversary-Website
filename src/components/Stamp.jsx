import React from 'react';

export default function Stamp({ text = "FOREVER & ALWAYS", size = "100px", top, left, right, bottom, rotation = '-10deg', zIndex = 5, color = "rgba(44,26,14,0.4)" }) {
  // A circular stamp look, similar to a postmark
  return (
    <div style={{
      position: 'absolute',
      top, left, right, bottom,
      width: size,
      height: size,
      transform: `rotate(${rotation})`,
      zIndex,
      opacity: 0.85,
      pointerEvents: 'none'
    }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        {/* Outer dashed ring */}
        <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
        {/* Inner solid ring */}
        <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="1.5" />
        
        {/* Curved Text Path */}
        <path id="stamp-text-path" d="M 15,50 A 35,35 0 1,1 85,50 A 35,35 0 1,1 15,50" fill="none" />
        <text fill={color} fontSize="12" fontWeight="600" letterSpacing="2px" style={{ textTransform: 'uppercase' }}>
          <textPath href="#stamp-text-path" startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>

        {/* Center icon (heart) */}
        <path 
          d="M 50,60 C 50,60 38,50 38,42 C 38,36 43,32 48,32 C 50,32 50,35 50,35 C 50,35 50,32 52,32 C 57,32 62,36 62,42 C 62,50 50,60 50,60 Z" 
          fill="none" 
          stroke={color} 
          strokeWidth="1.5" 
        />
      </svg>
    </div>
  );
}
