import React, { useState } from 'react';
import { motion } from 'framer-motion';

const getObjectPosition = (src) => {
  if (!src) return 'center';
  if (src.includes('july-24') && src.includes('.jpeg') && !src.includes('2PM')) return '0 -30px';
  if (src.includes('oct-3-ooty-2')) return '0px -75px';
  if (src.includes("sep-8-sanju's hostel")) return '0 -85px';
  if (src.includes('july-28.jpg')) return '0 2px';
  if (src.includes('sep-7.jpeg')) return '0 -196px';
  if (src.includes('nov-16.jpg')) return '0px 0px';
  if (src.includes('jan-26.jpg')) return '0 -50px';
  if (src.includes('apr-16-vava-wedding.png')) return '0 -45px';
  if (src.includes('may-22-loaded-mac.png')) return '-13px -15px';
  return 'center';
};

const getScale = (src) => {
  if (!src) return 1;
  if (src.includes('may-22-loaded-mac.png')) return 1.19;
  return 1;
};

export default function TimelineStackedPhoto({ images, title }) {
  // Start with a copy of the images array, assigning a unique id to each
  const [stack, setStack] = useState(images.map((src, i) => ({ id: i, src })));

  const handleNext = () => {
    if (images.length <= 1) return;
    setStack(prev => {
      const newStack = [...prev];
      const first = newStack.shift();
      newStack.push(first);
      return newStack;
    });
  };

  if (stack.length === 1) {
    return (
      <div className="tl-photo">
        <img 
          src={stack[0].src} 
          alt={title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            objectPosition: getObjectPosition(stack[0].src),
            transform: `scale(${getScale(stack[0].src)})`
          }} 
        />
      </div>
    );
  }

  return (
    <div 
      className="tl-photo" 
      onClick={handleNext} 
      style={{ 
        position: 'relative', 
        cursor: 'pointer',
        overflow: 'visible'
      }}
    >
      {stack.map((item, index) => {
        const isTop = index === 0;
        // The deck effect: lower cards are shifted right and down slightly
        const offsetX = index * 6;
        const offsetY = index * -6; 
        
        return (
          <motion.img
            key={item.id}
            src={item.src}
            alt={`${title} - ${item.id + 1}`}
            layout
            initial={false}
            animate={{
              x: offsetX,
              y: offsetY,
              rotateZ: index * 2,
              zIndex: stack.length - index,
              opacity: index > 2 ? 0 : 1 // Only show up to 3 cards to avoid clutter
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: getObjectPosition(item.src),
              scale: getScale(item.src),
              boxShadow: isTop ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          />
        );
      })}
      
      <div style={{
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        background: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 600,
        zIndex: stack.length + 1,
        pointerEvents: 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        Tap to view next
      </div>
    </div>
  );
}
