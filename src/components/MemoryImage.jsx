import { useState } from 'react';

export default function MemoryImage({ moment, className = '', rounded = 'rounded-3xl' }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    const positionX = `${(moment.gridColumn || 0) * 33.333333}%`;
    const positionY = moment.gridRow === 1 ? '100%' : '0%';

    return (
      <div
        className={`memory-sprite bg-cover ${rounded} ${className}`}
        style={{ backgroundPosition: `${positionX} ${positionY}` }}
        role="img"
        aria-label={moment.title}
      />
    );
  }

  return (
    <img
      src={moment.image}
      alt={moment.title}
      className={`object-cover ${rounded} ${className}`}
      loading="lazy"
      onError={() => setImageFailed(true)}
    />
  );
}
