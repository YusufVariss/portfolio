"use client";

import { useState, useEffect, useRef } from "react";

interface StackCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  technologies: string[];
}

interface ScrollStackDesignProps {
  cards: StackCard[];
}

export default function ScrollStackDesign({ cards }: ScrollStackDesignProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Auto scroll effect with infinite loop
  useEffect(() => {
    if (!isAutoScrolling) return;

    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        clearTimeout(autoScrollRef.current);
      }

      autoScrollRef.current = setTimeout(() => {
        if (containerRef.current && isAutoScrolling) {
          const nextIndex = (currentIndex + 1) % cards.length;
          containerRef.current.scrollTo({
            top: nextIndex * 120,
            behavior: 'smooth'
          });
        }
      }, 3000); // 3 saniyede bir değişir
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearTimeout(autoScrollRef.current);
      }
    };
  }, [currentIndex, isAutoScrolling, cards.length]);

  // Simple scroll effect with boundaries
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const cardHeight = 120;
        const maxScroll = (cards.length - 1) * cardHeight + 200;
        
        // Prevent scrolling beyond boundaries
        if (scrollTop < 0) {
          containerRef.current.scrollTo({
            top: 0,
            behavior: 'auto'
          });
          return;
        }
        
        if (scrollTop > maxScroll) {
          containerRef.current.scrollTo({
            top: maxScroll,
            behavior: 'auto'
          });
          return;
        }
        
        setScrollY(scrollTop);
        setIsScrolling(true);
        
        // Calculate current card index based on scroll position
        const newIndex = Math.floor(scrollTop / cardHeight);
        setCurrentIndex(Math.min(newIndex, cards.length - 1));
        
        // Reset scrolling state after scroll ends
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [cards.length]);


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
      {/* Scroll Stack Container */}
      <div 
        ref={containerRef}
        className="relative w-80 h-[600px] overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cards Stack - Simple 4 Cards */}
        <div className="relative" style={{ height: `${cards.length * 120 + 200}px` }}>
          {cards.map((card, index) => {
            const cardOffset = scrollY + (index * 120);
            const isActive = index === currentIndex;
            
            // Calculate stack position
            const stackIndex = Math.max(0, index - currentIndex);
            const zIndex = cards.length - stackIndex;
            const baseScale = 1; // All cards same size
            const hoverScale = hoveredIndex === index ? 1.1 : 1;
            const scale = baseScale * hoverScale;
            const translateY = 0; // No vertical offset
            const opacity = 1; // All cards fully visible
            
            return (
              <div
                key={card.id}
                className="absolute w-full transition-all duration-300 ease-out"
                style={{
                  top: `${index * 120}px`,
                  zIndex,
                  opacity,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                }}
              >
                {/* Stack Card */}
                <div 
                  className={`w-full h-28 rounded-xl p-4 shadow-lg border transition-all duration-300 select-none ${
                    hoveredIndex === index
                      ? 'border-yellow-400 shadow-yellow-400/30'
                      : 'border-white/20'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${card.bgColor}/90, ${card.color}/90)`,
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card Content */}
                  <div className="h-full flex items-center space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                        style={{
                          background: `rgba(255, 255, 255, 0.2)`,
                        }}
                      >
                        {card.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm mb-1">{card.title}</h3>
                      <p className="text-white/80 text-xs leading-tight mb-2 line-clamp-2">
                        {card.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1">
                        {card.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-white/20 rounded-full text-white text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {card.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-white/20 rounded-full text-white text-xs">
                            +{card.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-white/20 rounded-full">
        <div 
          className="w-full bg-yellow-400 rounded-full transition-all duration-300"
          style={{
            height: `${Math.min(100, (scrollY / ((cards.length - 1) * 120)) * 100)}%`
          }}
        />
      </div>


      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-green-400/60 rounded-full animate-ping"></div>
      </div>
    </div>
  );
}
