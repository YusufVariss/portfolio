'use client';
import { useEffect, useState } from 'react';

interface LightRaysProps {
  count?: number;
  className?: string;
}

const LightRays = ({ count = 12, className = '' }: LightRaysProps) => {
  const [rays, setRays] = useState<Array<{ rotation: number; delay: number; opacity: number }>>([]);

  useEffect(() => {
    const newRays = Array.from({ length: count }, (_, i) => ({
      rotation: (360 / count) * i,
      delay: Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.2
    }));
    setRays(newRays);
  }, [count]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Center light source */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 rounded-full bg-yellow-400/30 animate-pulse" />
      </div>

      {/* Light rays */}
      {rays.map((ray, index) => (
        <div
          key={index}
          className="absolute top-1/2 left-1/2 origin-left"
          style={{
            transform: `translate(-50%, -50%) rotate(${ray.rotation}deg)`,
            animationDelay: `${ray.delay}s`
          }}
        >
          <div
            className="light-ray"
            style={{
              width: '150vw',
              height: '2px',
              background: `linear-gradient(90deg, 
                rgba(251, 191, 36, ${ray.opacity}) 0%, 
                rgba(251, 191, 36, ${ray.opacity * 0.5}) 30%, 
                transparent 70%
              )`,
              animation: `lightPulse 4s ease-in-out infinite`,
              animationDelay: `${ray.delay}s`
            }}
          />
        </div>
      ))}

      {/* Additional glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.05) 0%, transparent 70%)',
          animation: 'slowPulse 6s ease-in-out infinite'
        }}
      />

      <style jsx>{`
        @keyframes lightPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scaleX(1);
          }
          50% {
            opacity: 1;
            transform: scaleX(1.1);
          }
        }

        @keyframes slowPulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        .light-ray {
          filter: blur(0.5px);
        }
      `}</style>
    </div>
  );
};

export default LightRays;