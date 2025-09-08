"use client";

import { useState, useEffect } from "react";

interface Folder {
  id: number;
  title: string;
  subtitle: string;
  technologies: string[];
  color: string;
  bgColor: string;
  tabColor: string;
  icon: string;
}

interface FolderStackProps {
  folders: Folder[];
  autoRotate?: boolean;
  rotationInterval?: number;
}

export default function FolderStack({
  folders,
  autoRotate = true,
  rotationInterval = 4000,
}: FolderStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto rotation functionality
  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % folders.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, rotationInterval, isHovered, folders.length]);

  const handleFolderClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center overflow-x-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Folder Stack Container */}
      <div className="relative w-96 h-72">
        {folders.map((folder, index) => {
          const isActive = index === currentIndex;
          const isVisible = Math.abs(index - currentIndex) <= 2;
          
          if (!isVisible) return null;

          const zIndex = folders.length - Math.abs(index - currentIndex);
          const rotation = (index - currentIndex) * 3;
          const translateY = Math.abs(index - currentIndex) * 8;
          const scale = isActive ? 1 : 0.9 - Math.abs(index - currentIndex) * 0.05;
          const opacity = isActive ? 1 : 0.7 - Math.abs(index - currentIndex) * 0.2;

          return (
            <div
              key={folder.id}
              className="absolute inset-0 transition-all duration-700 ease-out cursor-pointer"
              style={{
                zIndex,
                transform: `rotate(${rotation}deg) translateY(${translateY}px) scale(${scale})`,
                opacity: Math.max(opacity, 0.3),
              }}
              onClick={() => handleFolderClick(index)}
            >
              {/* Folder */}
              <div 
                className={`w-full h-full rounded-xl shadow-2xl transition-all duration-300 ${
                  isActive ? 'hover:scale-105' : 'hover:scale-102'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${folder.bgColor}, ${folder.color})`,
                }}
              >
                {/* Folder Tab */}
                <div 
                  className="absolute top-0 left-0 w-full h-10 rounded-t-xl"
                  style={{
                    background: `linear-gradient(90deg, ${folder.tabColor}, ${folder.bgColor})`,
                  }}
                />
                
                {/* Folder Content */}
                <div className="p-8 pt-10 h-full flex flex-col justify-between">
                  {/* Icon and Title */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-3xl">{folder.icon}</div>
                    <div>
                      <h3 className={`text-base font-bold ${isActive ? 'text-gray-800' : 'text-white'}`}>
                        {folder.title}
                      </h3>
                      <p className={`text-sm ${isActive ? 'text-gray-600' : 'text-gray-200'}`}>
                        {folder.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {folder.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          isActive 
                            ? 'bg-gray-800/20 text-gray-700' 
                            : 'bg-white/20 text-white'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {folder.technologies.length > 3 && (
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        isActive 
                          ? 'bg-gray-800/20 text-gray-700' 
                          : 'bg-white/20 text-white'
                      }`}>
                        +{folder.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute -bottom-4 -left-8 w-8 h-8 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/2 -right-12 w-6 h-6 bg-green-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-1/4 -left-6 w-5 h-5 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Right Navigation Circle */}
      <button
        onClick={() => handleFolderClick((currentIndex + 1) % folders.length)}
        className="nav-circle absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/90 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center group"
        aria-label="Sonraki klasör"
      >
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
