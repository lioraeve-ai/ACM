// A component to render animated background elements for atmosphere.
// In a real app, this could be a more complex particle system.

"use client";

import { useEffect, useState } from 'react';

const BackgroundFX = () => {
  const [spirits, setSpirits] = useState<{ id: number; style: React.CSSProperties; delay: string }[]>([]);

  useEffect(() => {
    const generateSpirits = () => {
      const newSpirits = Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 20 + 5;
        return {
          id: i,
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: Math.random() * 0.15 + 0.05,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          },
          delay: `${Math.random() * 5}s`,
        };
      });
      setSpirits(newSpirits);
    };
    generateSpirits();
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {spirits.map((spirit) => (
        <div
          key={spirit.id}
          className="absolute rounded-full bg-accent/50 animate-float"
          style={{
            ...spirit.style,
            boxShadow: `0 0 ${spirit.style.width} ${spirit.style.width} hsl(var(--accent) / 0.1)`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundFX;
