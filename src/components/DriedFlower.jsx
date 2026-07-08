import React from 'react';

export default function DriedFlower({ top, left, right, bottom, rotation = '0deg', scale = 1, zIndex = 8 }) {
  // SVG representation of a sprig of dried baby's breath or similar flower
  // We use multiple paths to give it an organic, delicate dried look
  return (
    <div style={{
      position: 'absolute',
      top, left, right, bottom,
      width: '120px',
      height: '180px',
      transform: `rotate(${rotation}) scale(${scale})`,
      zIndex,
      pointerEvents: 'none',
      filter: 'drop-shadow(2px 4px 3px rgba(44, 26, 14, 0.15)) sepia(0.3)'
    }}>
      <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Main Stem */}
        <path d="M50,140 Q45,100 55,50" stroke="#7E6D57" strokeWidth="2" strokeLinecap="round" />
        
        {/* Branch 1 */}
        <path d="M52,110 Q35,80 25,60" stroke="#7E6D57" strokeWidth="1.5" strokeLinecap="round" />
        {/* Branch 1 sub-branches */}
        <path d="M38,90 Q20,70 15,65" stroke="#7E6D57" strokeWidth="1" strokeLinecap="round" />
        
        {/* Branch 2 */}
        <path d="M48,90 Q70,70 80,45" stroke="#7E6D57" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Branch 3 */}
        <path d="M53,70 Q65,50 60,30" stroke="#7E6D57" strokeWidth="1" strokeLinecap="round" />

        {/* Dried Flower heads (clusters of small circles/paths) */}
        <g fill="#D5C5B3" stroke="#B8A48D" strokeWidth="0.5">
          {/* Top cluster */}
          <circle cx="55" cy="50" r="3" />
          <circle cx="58" cy="48" r="2.5" />
          <circle cx="52" cy="47" r="3.5" />
          <circle cx="55" cy="44" r="3" />
          
          {/* Branch 1 cluster */}
          <circle cx="25" cy="60" r="3" />
          <circle cx="28" cy="58" r="2.5" />
          <circle cx="22" cy="59" r="3" />
          
          {/* Branch 1 sub cluster */}
          <circle cx="15" cy="65" r="2.5" />
          <circle cx="12" cy="63" r="2" />
          
          {/* Branch 2 cluster */}
          <circle cx="80" cy="45" r="3.5" />
          <circle cx="83" cy="42" r="2.5" />
          <circle cx="77" cy="43" r="3" />
          <circle cx="81" cy="48" r="2.5" />

          {/* Branch 3 cluster */}
          <circle cx="60" cy="30" r="3" />
          <circle cx="63" cy="28" r="2.5" />
          <circle cx="57" cy="27" r="2.5" />
        </g>
      </svg>
    </div>
  );
}
