import React from 'react';

export default function TornPaperEdge({ topColor, bottomColor }) {
  return (
    <div style={{ width: '100%', height: '24px', position: 'relative', backgroundColor: bottomColor, zIndex: 10 }}>
      {/* SVG Filter Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="torn-edge-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.3" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" floodColor="#2C1A0E" />
        </filter>
      </svg>

      {/* The Torn Paper Layer */}
      <div style={{
        width: '100%',
        height: '40px',
        backgroundColor: topColor,
        position: 'absolute',
        top: '-20px',
        filter: 'url(#torn-edge-filter)',
      }} />
    </div>
  );
}
