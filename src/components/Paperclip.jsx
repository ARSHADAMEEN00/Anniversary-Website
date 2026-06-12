import React from 'react';

export default function Paperclip({ top, left, right, bottom, rotation = '15deg', zIndex = 15 }) {
  return (
    <div style={{
      position: 'absolute',
      top, left, right, bottom,
      width: '24px',
      height: '80px',
      transform: `rotate(${rotation})`,
      zIndex,
      filter: 'drop-shadow(2px 3px 2px rgba(0,0,0,0.15))'
    }}>
      <svg viewBox="0 0 40 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <path 
          d="M20,130 C10,130 5,125 5,115 L5,25 C5,10 12,5 20,5 C28,5 35,10 35,25 L35,105 C35,115 30,120 25,120 C20,120 15,115 15,105 L15,35" 
          stroke="#A8A29A" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Metal highlight */}
        <path 
          d="M20,128 C12,128 7,123 7,115 L7,25 C7,12 13,7 20,7 C27,7 33,12 33,25 L33,105" 
          stroke="#DEDAD4" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );
}
