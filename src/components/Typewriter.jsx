import { useEffect, useState } from 'react';

export default function Typewriter({ text, speed = 42, className = '' }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let index = 0;
    const timer = window.setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index += 1;
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [speed, text]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}
