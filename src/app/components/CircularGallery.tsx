"use client";

import { useState, useEffect } from "react";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  technologies: string[];
}

interface CircularGalleryProps {
  items: GalleryItem[];
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export default function CircularGallery({ 
  items, 
  autoRotate = true, 
  rotationSpeed = 3000 
}: CircularGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // Auto rotation
  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, rotationSpeed);

    return () => clearInterval(interval);
  }, [autoRotate, rotationSpeed, isHovered, items.length]);

  const handleItemClick = (index: number) => {
    setSelectedItem(selectedItem === index ? null : index);
  };

  const getItemPosition = (index: number) => {
    const angle = (360 / items.length) * index;
    const radius = 120; // Distance from center
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y, angle };
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Central Hub */}
      <div className="absolute z-10 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
        <div className="text-2xl">🎯</div>
      </div>

      {/* Gallery Items */}
      {items.map((item, index) => {
        const { x, y, angle } = getItemPosition(index);
        const isActive = index === currentIndex;
        const isSelected = selectedItem === index;
        
        return (
          <div
            key={item.id}
            className="absolute transform transition-all duration-700 ease-out cursor-pointer"
            style={{
              transform: `translate(${x}px, ${y}px) rotate(${angle}deg) ${isActive ? 'scale(1.1)' : 'scale(1)'}`,
              zIndex: isSelected ? 20 : isActive ? 15 : 10,
            }}
            onClick={() => handleItemClick(index)}
          >
            {/* Item Card */}
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-300 ${
                isActive 
                  ? 'border-yellow-400 shadow-yellow-400/50' 
                  : 'border-white/30 hover:border-white/50'
              }`}
              style={{
                background: `linear-gradient(135deg, ${item.bgColor}, ${item.color})`,
                transform: `rotate(-${angle}deg)`,
              }}
            >
              <div className="text-xl">{item.icon}</div>
            </div>

            {/* Item Label */}
            <div 
              className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center"
              style={{
                transform: `translateX(-50%) rotate(-${angle}deg)`,
              }}
            >
              <div className={`text-xs font-medium transition-all duration-300 ${
                isActive ? 'text-yellow-400 scale-110' : 'text-white/70'
              }`}>
                {item.title}
              </div>
            </div>

            {/* Connection Line */}
            <div 
              className="absolute top-8 left-1/2 w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
              style={{
                transform: `translateX(-50%) rotate(-${angle}deg)`,
              }}
            />
          </div>
        );
      })}

      {/* Selected Item Details */}
      {selectedItem !== null && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-sm mx-4 shadow-2xl border border-white/20">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${items[selectedItem].bgColor}, ${items[selectedItem].color})`,
                }}
              >
                {items[selectedItem].icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                {items[selectedItem].title}
              </h3>
              
              <p className="text-white/80 text-sm mb-4 leading-relaxed">
                {items[selectedItem].description}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 justify-center">
                {items[selectedItem].technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-all duration-300"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Dots */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
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

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-green-400/60 rounded-full animate-ping"></div>
      </div>
    </div>
  );
}
