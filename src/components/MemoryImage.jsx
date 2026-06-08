export default function MemoryImage({ moment, className = '', rounded = 'rounded-3xl' }) {
  const positionX = `${moment.gridColumn * 33.333333}%`;
  const positionY = moment.gridRow === 0 ? '0%' : '100%';

  return (
    <div
      className={`memory-sprite bg-cover ${rounded} ${className}`}
      style={{ backgroundPosition: `${positionX} ${positionY}` }}
      role="img"
      aria-label={moment.title}
    />
  );
}
