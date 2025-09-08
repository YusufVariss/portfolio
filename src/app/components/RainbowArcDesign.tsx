"use client";

import { useState, useEffect, useRef } from "react";

interface ProfileCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  technologies: string[];
}

interface RainbowArcDesignProps {
  cards: ProfileCard[];
}

export default function RainbowArcDesign({ cards }: RainbowArcDesignProps) {
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
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length, isDragging]);

  const getCardPosition = (index: number) => {
    const totalCards = cards.length;
    const angleRange = 180; // Half circle (180 degrees)
    const startAngle = -90; // Start from left side
    const angleStep = angleRange / (totalCards - 1);
    const angle = startAngle + (angleStep * index);
    
    const radius = 200; // Distance from center
    const centerX = 0;
    const centerY = 50; // Offset down to create arc
    
    const x = centerX + Math.cos((angle * Math.PI) / 180) * radius;
    const y = centerY + Math.sin((angle * Math.PI) / 180) * radius;
    
    return { x, y, angle };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Rainbow Arc Container */}
      <div 
        ref={containerRef}
        className="relative w-96 h-80"
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

          const opacity = isActive ? 1 : Math.max(0.4, 1 - distance * 0.3);
          const scale = isActive ? 1 : Math.max(0.8, 1 - distance * 0.1);
          const zIndex = isActive ? 20 : 10 - distance;

          return (
            <div
              key={card.id}
              className="absolute transform transition-all duration-700 ease-out cursor-pointer"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              {/* Profile Card - Vertical */}
              <div 
                className="w-20 h-32 rounded-xl p-2 shadow-xl border border-white/20 backdrop-blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${card.bgColor}/90, ${card.color}/90)`,
                  transform: `rotate(-${angle}deg)`,
                }}
                onClick={() => setCurrentIndex(index)}
              >
                {/* Card Content - Vertical Layout */}
                <div className="h-full flex flex-col justify-between text-center">
                  {/* Icon */}
                  <div className="text-2xl mb-2">{card.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-white font-bold text-xs mb-2 leading-tight">{card.title}</h3>
                  
                  {/* Technologies - Vertical Stack */}
                  <div className="flex flex-col gap-1">
                    {card.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-1 py-0.5 bg-white/20 rounded text-white text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {card.technologies.length > 3 && (
                      <span className="px-1 py-0.5 bg-white/20 rounded text-white text-xs">
                        +{card.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Arc Line */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg width="400" height="200" viewBox="0 0 400 200" className="opacity-20">
            <path
              d="M 50 150 Q 200 50 350 150"
              stroke="url(#rainbowGradient)"
              strokeWidth="2"
              fill="none"
            />
            <defs>
              <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="16.66%" stopColor="#ff8000" />
                <stop offset="33.33%" stopColor="#ffff00" />
                <stop offset="50%" stopColor="#80ff00" />
                <stop offset="66.66%" stopColor="#00ffff" />
                <stop offset="83.33%" stopColor="#0080ff" />
                <stop offset="100%" stopColor="#8000ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Center Indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg z-30"></div>

        {/* Navigation Dots */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
