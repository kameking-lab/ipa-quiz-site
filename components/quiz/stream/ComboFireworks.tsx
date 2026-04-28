"use client";

import * as React from "react";

const COLORS = [
  "#fbbf24",
  "#f472b6",
  "#60a5fa",
  "#34d399",
  "#a78bfa",
  "#fb7185",
];

interface Particle {
  id: number;
  angle: number;
  distance: number;
  delay: number;
  color: string;
  size: number;
}

function buildParticles(): Particle[] {
  return Array.from({ length: 28 }).map((_, i) => ({
    id: i,
    angle: (i / 28) * 2 * Math.PI + Math.random() * 0.4,
    distance: 90 + Math.random() * 80,
    delay: Math.random() * 120,
    color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 6,
  }));
}

export function ComboFireworks() {
  const [particles, setParticles] = React.useState<Particle[]>([]);
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(buildParticles());
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
      <style>{`
        @keyframes ipaq-burst {
          0% { transform: translate(0,0) scale(0.4); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: var(--end) scale(1); opacity: 0; }
        }
      `}</style>
      <div className="relative h-1 w-1">
        {particles.map((p) => {
          const x = Math.cos(p.angle) * p.distance;
          const y = Math.sin(p.angle) * p.distance;
          return (
            <span
              key={p.id}
              className="absolute left-0 top-0 rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 12px ${p.color}`,
                ["--end" as string]: `translate(${x}px, ${y}px)`,
                animation: `ipaq-burst 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${p.delay}ms forwards`,
              } as React.CSSProperties}
            />
          );
        })}
      </div>
    </div>
  );
}
