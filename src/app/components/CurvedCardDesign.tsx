"use client";

import { useState, useEffect, useRef } from "react";

interface CurvedCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  technologies: string[];
}

interface CurvedCardDesignProps {
  cards: CurvedCard[];
}

export default function CurvedCardDesign({ cards }: CurvedCardDesignProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart;
    setDragOffset(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Determine if we should move to next/previous card
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
      } else {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
      }
    }
    
    setDragOffset(0);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - dragStart;
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
      } else {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
      }
    }
    
    setDragOffset(0);
  };

  // Auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [cards.length, isDragging]);

  const getCardPosition = (index: number) => {
    const totalCards = cards.length;
    const angle = (360 / totalCards) * index;
    const radius = 150;
    const centerX = 0;
    const centerY = 0;
    
    const x = centerX + Math.cos((angle * Math.PI) / 180) * radius;
    const y = centerY + Math.sin((angle * Math.PI) / 180) * radius;
    
    return { x, y, angle };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Curved Cards Container */}
      <div 
        ref={containerRef}
        className="relative w-96 h-96"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Cards */}
        {cards.map((card, index) => {
          const { x, y, angle } = getCardPosition(index);
          const isActive = index === currentIndex;
          const distance = Math.abs(index - currentIndex);
          const isVisible = distance <= 2;
          
          if (!isVisible) return null;

          const opacity = isActive ? 1 : Math.max(0.3, 1 - distance * 0.3);
          const scale = isActive ? 1 : Math.max(0.7, 1 - distance * 0.15);
          const zIndex = isActive ? 20 : 10 - distance;

          return (
            <div
              key={card.id}
              className="absolute transform transition-all duration-700 ease-out"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              {/* Card */}
              <div 
                className="w-48 h-32 rounded-2xl p-4 shadow-2xl border border-white/20 backdrop-blur-sm cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${card.bgColor}/80, ${card.color}/80)`,
                  transform: `rotate(-${angle}deg)`,
                }}
                onClick={() => setCurrentIndex(index)}
              >
                {/* Card Content */}
                <div className="h-full flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-xl">{card.icon}</div>
                    <h3 className="text-white font-bold text-sm">{card.title}</h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-white/90 text-xs leading-relaxed mb-2">
                    {card.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {card.technologies.slice(0, 2).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-white/20 rounded-full text-white text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {card.technologies.length > 2 && (
                      <span className="px-2 py-1 bg-white/20 rounded-full text-white text-xs">
                        +{card.technologies.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Center Indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg z-30"></div>

        {/* Navigation Dots */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
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
