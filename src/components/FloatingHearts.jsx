const hearts = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 8) * 0.55}s`,
  duration: `${7 + (index % 6)}s`,
  size: `${14 + (index % 5) * 5}px`,
  opacity: 0.18 + (index % 5) * 0.07,
}));

export default function FloatingHearts() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute -bottom-12 heart-shadow animate-floaty"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
            opacity: heart.opacity,
            color: '#C4917A',
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
