import React from 'react';
import cat1 from '../assets/caticons/cat1.jpeg';
import cat2 from '../assets/caticons/cat2.jpeg';
import cat3 from '../assets/caticons/cat3.jpeg';
import cat4 from '../assets/caticons/cat4.jpeg';
import cat5 from '../assets/caticons/cat5.jpeg';
import cat6 from '../assets/caticons/cat6.jpeg';
import cat7 from '../assets/caticons/cat7.jpeg';
import cat8 from '../assets/caticons/cat8.jpeg';
import cat9 from '../assets/caticons/cat9.jpeg';
import cat10 from '../assets/caticons/cat10.jpeg';

const CAT_ICONS = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10];

// 24 random cat positions across the landing page height (0% to 98%)
const CAT_POSITIONS = [
  { top: '3.5%', left: '3%', size: '38px', anim: 'catFloat1', duration: '3.5s', delay: '0s' },
  { top: '4%', right: '4%', size: '45px', anim: 'catFloat2', duration: '4s', delay: '-1s' },
  { top: '8%', left: '90%', size: '35px', anim: 'catFloat3', duration: '3.8s', delay: '-2s' },
  { top: '12%', left: '2%', size: '40px', anim: 'catFloat4', duration: '4.2s', delay: '-0.5s' },
  { top: '17%', right: '5%', size: '30px', anim: 'catFloat1', duration: '3.6s', delay: '-1.5s' },
  { top: '21%', left: '5%', size: '50px', anim: 'catFloat2', duration: '4.5s', delay: '-2.5s' },
  { top: '26%', right: '3%', size: '35px', anim: 'catFloat3', duration: '3.9s', delay: '-0.8s' },
  { top: '30%', left: '88%', size: '42px', anim: 'catFloat4', duration: '4.1s', delay: '-1.8s' },
  { top: '35%', left: '3%', size: '48px', anim: 'catFloat1', duration: '3.7s', delay: '-2.2s' },
  { top: '39%', right: '6%', size: '32px', anim: 'catFloat2', duration: '4.4s', delay: '-0.3s' },
  { top: '44%', left: '4%', size: '40px', anim: 'catFloat3', duration: '3.8s', delay: '-1.2s' },
  { top: '49%', right: '4%', size: '45px', anim: 'catFloat4', duration: '4s', delay: '-2.7s' },
  { top: '53%', left: '90%', size: '30px', anim: 'catFloat1', duration: '3.6s', delay: '-0.9s' },
  { top: '58%', left: '2%', size: '42px', anim: 'catFloat2', duration: '4.3s', delay: '-1.4s' },
  { top: '62%', right: '5%', size: '36px', anim: 'catFloat3', duration: '3.9s', delay: '-2.1s' },
  { top: '67%', left: '4%', size: '40px', anim: 'catFloat4', duration: '4.1s', delay: '-0.7s' },
  { top: '72%', right: '3%', size: '50px', anim: 'catFloat1', duration: '3.7s', delay: '-1.6s' },
  { top: '77%', left: '88%', size: '32px', anim: 'catFloat2', duration: '4.2s', delay: '-2.8s' },
  { top: '81%', left: '3%', size: '44px', anim: 'catFloat3', duration: '3.5s', delay: '-0.4s' },
  { top: '86%', right: '6%', size: '38px', anim: 'catFloat4', duration: '4.6s', delay: '-1.9s' },
  { top: '90%', left: '5%', size: '35px', anim: 'catFloat1', duration: '3.8s', delay: '-2.3s' },
  { top: '94%', right: '4%', size: '42px', anim: 'catFloat2', duration: '4.1s', delay: '-1.1s' },
  { top: '96%', right: '87%', size: '46px', anim: 'catFloat3', duration: '3.9s', delay: '-0.6s' },
];

export default function FloatingCatIcons() {
  return (
    <div className="floating-cats-layer">
      {CAT_POSITIONS.map((pos, idx) => {
        const catImg = CAT_ICONS[idx % CAT_ICONS.length];
        const style = {
          position: 'absolute',
          top: pos.top,
          ...(pos.left ? { left: pos.left } : { right: pos.right }),
          width: pos.size,
          height: pos.size,
          objectFit: 'cover',
          borderRadius: '50%',
          boxShadow: '0 1px 4px rgba(44, 26, 14, 0.2)',
          pointerEvents: 'none',
          zIndex: 15,
          animation: `${pos.anim} ${pos.duration} ease-in-out infinite`,
          animationDelay: pos.delay,
        };

        return (
          <img
            key={`cat-icon-${idx}`}
            src={catImg}
            alt="cat sticker"
            className="floating-cat-icon"
            style={style}
          />
        );
      })}
    </div>
  );
}
