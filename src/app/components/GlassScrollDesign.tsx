"use client";

import { useState, useEffect, useRef } from "react";

interface SkillCard {
  id: number;
  title: string;
  subtitle: string;
  technologies: string[];
  color: string;
  bgColor: string;
  icon: string;
  description: string;
}

interface GlassScrollDesignProps {
  cards: SkillCard[];
}

export default function GlassScrollDesign({ cards }: GlassScrollDesignProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        setScrollY(scrollTop);
        setIsScrolling(true);
        
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
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glass Container */}
      <div 
        ref={containerRef}
        className="relative w-80 h-96 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Glass Header */}
        <div className="sticky top-0 z-10 bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-1">My Skills</h3>
            <p className="text-white/70 text-sm">Scroll to explore</p>
          </div>
        </div>

        {/* Scrollable Cards Container */}
        <div className="p-4 space-y-4 overflow-y-auto h-full pb-4">
          {cards.map((card, index) => {
            const cardOffset = scrollY + (index * 120);
            const isVisible = cardOffset > -100 && cardOffset < 500;
            const opacity = Math.max(0, Math.min(1, (cardOffset + 100) / 200));
            const scale = Math.max(0.8, Math.min(1, (cardOffset + 100) / 300));
            const translateY = Math.max(-50, Math.min(50, (cardOffset - 200) / 10));

            return (
              <div
                key={card.id}
                className="transform transition-all duration-300 ease-out"
                style={{
                  opacity: isVisible ? opacity : 0,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                }}
              >
                <div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                  style={{
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Card Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl backdrop-blur-sm border border-white/20"
                      style={{
                        background: `linear-gradient(135deg, ${card.bgColor}/30, ${card.color}/30)`
                      }}
                    >
                      {card.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg">{card.title}</h4>
                      <p className="text-white/70 text-sm">{card.subtitle}</p>
                    </div>
                  </div>

                  {/* Card Description */}
                  <p className="text-white/80 text-sm mb-3 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {card.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/20 group-hover:bg-white/30 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {card.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/20">
                        +{card.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-white/20 rounded-full">
          <div 
            className="w-full bg-white/40 rounded-full transition-all duration-300"
            style={{
              height: `${Math.min(100, (scrollY / (cards.length * 120)) * 100)}%`
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-2 w-1 h-1 bg-white/25 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
