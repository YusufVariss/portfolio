'use client';
import { useEffect, useState } from 'react';

interface GalleryItem {
  id: number;
  icon: string;
  title: string;
  skills: string[];
  backgroundColor: string;
}

interface CircularGalleryProps {
  items: GalleryItem[];
  radius?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

const CircularGallery = ({ 
  items, 
  radius = 180, 
  autoRotate = true, 
  rotationSpeed = 0.3 
}: CircularGalleryProps) => {
  const [rotation, setRotation] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setRotation(prev => prev + rotationSpeed);
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate, rotationSpeed]);

  const angleStep = 360 / items.length;

  return (
    <div className="relative w-96 h-96 flex items-center justify-center">
      {/* Center point */}
      <div className="absolute w-4 h-4 bg-yellow-400/50 rounded-full z-10" />
      
      {/* Circular orbit line */}
      <div 
        className="absolute border border-yellow-400/20 rounded-full"
        style={{
          width: radius * 2 + 160,
          height: radius * 2 + 160,
        }}
      />

      {/* Cards in circular arrangement */}
      {items.map((item, index) => {
        const angle = (index * angleStep + rotation) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isHovered = hoveredIndex === index;

        return (
          <div
            key={item.id}
            className={`absolute transition-all duration-500 ${
              isHovered ? 'z-20 scale-110' : 'z-10 scale-100'
            }`}
            style={{
              transform: `translate(${x}px, ${y}px)`,
              transformOrigin: 'center center'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`w-32 h-32 rounded-2xl p-4 border border-yellow-400/30 cursor-pointer transition-all duration-300 ${
                isHovered 
                  ? 'shadow-2xl shadow-yellow-400/30' 
                  : 'shadow-lg shadow-black/20'
              }`}
              style={{ 
                background: item.backgroundColor,
                backdropFilter: 'blur(10px)',
                outline: 'none'
              }}
              tabIndex={-1}
            >
              <div className="text-center h-full flex flex-col justify-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="text-yellow-400 font-bold text-xs leading-tight">
                  {item.title.split(' ')[0]}
                </h3>
                {item.title.split(' ')[1] && (
                  <h3 className="text-yellow-400 font-bold text-xs leading-tight">
                    {item.title.split(' ')[1]}
                  </h3>
                )}
              </div>
            </div>

            {/* Hover detail panel */}
            {isHovered && (
              <div 
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-30"
                style={{ minWidth: '200px' }}
              >
                <div
                  className="rounded-xl p-4 border border-yellow-400/30"
                  style={{ 
                    background: item.backgroundColor,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <h4 className="text-yellow-400 font-bold text-sm mb-2 text-center">
                    {item.title}
                  </h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {item.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-2 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-400 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Arrow pointing up */}
                <div 
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderBottom: '8px solid rgba(251, 191, 36, 0.3)',
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

    </div>
  );
};

export default CircularGallery;