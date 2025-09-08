'use client';
import { useEffect, useState } from 'react';

interface GalleryItem {
  id: number;
  icon: string;
  title: string;
  skills: string[];
  backgroundColor: string;
}

interface SimpleGalleryProps {
  items: GalleryItem[];
}

const SimpleGallery = ({ items }: SimpleGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setRotation(prev => prev + 360);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setIsTransitioning(false);
      }, 600);
    }, 2000);

    return () => clearInterval(timer);
  }, [items.length]);

  const currentItem = items[currentIndex];

  return (
    <div className="w-96 h-80 relative overflow-hidden">
      {/* Main Card */}
      <div 
        className="w-full h-full rounded-2xl p-10 border border-yellow-400/20 transition-all duration-800"
        style={{ 
          background: currentItem.backgroundColor,
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
          transform: `rotate(${rotation}deg) scale(${isTransitioning ? 0.9 : 1})`,
          opacity: isTransitioning ? 0 : 1
        }}
      >
        <div className={`flex items-center mb-8 transition-all duration-500 ${
          isTransitioning ? 'transform translate-y-4 opacity-0' : 'transform translate-y-0 opacity-100'
        }`}>
          <div className="text-4xl mr-5">
            {currentItem.icon}
          </div>
          <h3 className="text-yellow-400 font-bold text-2xl">
            {currentItem.title}
          </h3>
        </div>
        
        <div className={`flex flex-wrap gap-4 transition-all duration-600 delay-100 ${
          isTransitioning ? 'transform translate-y-8 opacity-0' : 'transform translate-y-0 opacity-100'
        }`}>
          {currentItem.skills.map((skill, idx) => (
            <span 
              key={idx}
              className="px-5 py-3 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-400 text-base font-medium transform transition-all duration-300 hover:scale-105"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, idx) => (
          <div
            key={idx}
            className={`w-8 h-1 rounded-full transition-all duration-700 ease-out transform ${
              idx === currentIndex 
                ? 'bg-yellow-400 scale-110' 
                : 'bg-yellow-400/30 scale-100'
            }`}
          />
        ))}
      </div>

      {/* Card Counter */}
      <div className={`absolute top-4 right-4 text-yellow-400/60 text-sm font-medium transition-all duration-500 ${
        isTransitioning ? 'opacity-0 transform scale-90' : 'opacity-100 transform scale-100'
      }`}>
        {currentIndex + 1} / {items.length}
      </div>
    </div>
  );
};

export default SimpleGallery;