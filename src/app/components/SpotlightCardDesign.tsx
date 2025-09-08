"use client";

import { useState, useEffect, useRef } from "react";

interface SpotlightCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  technologies: string[];
}

interface SpotlightCardDesignProps {
  cards: SpotlightCard[];
}

export default function SpotlightCardDesign({ cards }: SpotlightCardDesignProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll effect
  useEffect(() => {
    if (!isAutoScrolling) return;

    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        clearTimeout(autoScrollRef.current);
      }

      autoScrollRef.current = setTimeout(() => {
        if (isAutoScrolling) {
          setCurrentIndex((prev) => (prev + 1) % cards.length);
        }
      }, 2000); // 2 saniyede bir değişir
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearTimeout(autoScrollRef.current);
      }
    };
  }, [currentIndex, isAutoScrolling, cards.length]);

  // Mouse position tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Pause auto scroll on hover
  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
    if (autoScrollRef.current) {
      clearTimeout(autoScrollRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Spotlight Container */}
      <div 
        ref={containerRef}
        className="relative w-32 h-32 flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Spotlight Effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`,
            transition: 'background 0.1s ease-out',
          }}
        />

        {/* Cards Stack */}
        <div className="relative w-24 h-24">
          {cards.map((card, index) => {
            const isActive = index === currentIndex;
            const isVisible = Math.abs(index - currentIndex) <= 1;
            
            return (
              <div
                key={card.id}
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  transform: `translateY(${(index - currentIndex) * 100}px) scale(${isActive ? 1 : 0.9})`,
                  zIndex: cards.length - Math.abs(index - currentIndex),
                  opacity: isVisible ? 1 : 0,
                }}
              >
                {/* Spotlight Card */}
                <div 
                  className={`w-24 h-24 rounded-lg p-3 shadow-lg border transition-all duration-500 select-none ${
                    isActive 
                      ? 'border-yellow-400 shadow-yellow-400/50' 
                      : 'border-white/20'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${card.bgColor}/90, ${card.color}/90)`,
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                  }}
                >
                  {/* Card Content */}
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-1">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                        style={{
                          background: `rgba(255, 255, 255, 0.2)`,
                        }}
                      >
                        {card.icon}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-white font-bold text-xs leading-tight">{card.title}</h3>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 justify-center">
                      {card.technologies.slice(0, 1).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-1 py-0.5 bg-white/20 rounded-full text-white text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {card.technologies.length > 1 && (
                        <span className="px-1 py-0.5 bg-white/20 rounded-full text-white text-xs">
                          +{card.technologies.length - 1}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Spotlight Overlay */}
                <div 
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x - 0}px ${mousePosition.y - 0}px, rgba(255, 255, 255, 0.4) 0%, transparent 70%)`,
                    transition: 'background 0.1s ease-out',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoScrolling(false);
                if (autoScrollRef.current) {
                  clearTimeout(autoScrollRef.current);
                }
                setCurrentIndex(index);
                // Restart auto scroll after 5 seconds
                setTimeout(() => {
                  setIsAutoScrolling(true);
                }, 5000);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/60 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-green-400/60 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
}
