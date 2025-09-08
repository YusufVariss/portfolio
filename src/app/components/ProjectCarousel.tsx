"use client";

import { useState, useEffect } from "react";
import ElectricBorder from "./ElectricBorder";
import GlowButton from "./GlowButton";

interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  buttonColor: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export default function ProjectCarousel({
  projects,
  autoPlay = true,
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isHovered, projects.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Project Card */}
        <div className="transition-all duration-700 ease-in-out">
          <ElectricBorder>
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Project Image/Icon Section */}
              <div className={`h-80 ${currentProject.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="text-white text-8xl z-10 transform transition-transform duration-500 hover:scale-110">
                  {currentProject.icon}
                </div>
                {/* Floating particles effect */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
                      style={{
                        top: `${20 + (i * 15)}%`,
                        left: `${10 + (i * 15)}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${2 + (i * 0.3)}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 text-cyan-400">
                  {currentProject.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {currentProject.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {currentProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {currentProject.liveUrl && (
                    <GlowButton 
                      color={currentProject.buttonColor} 
                      size="2px" 
                      radius="8px"
                      onClick={() => window.open(currentProject.liveUrl, '_blank')}
                    >
                      Canlı Demo
                    </GlowButton>
                  )}
                  {currentProject.githubUrl && (
                    <GlowButton 
                      color="#6b7280" 
                      size="2px" 
                      radius="8px"
                      onClick={() => window.open(currentProject.githubUrl, '_blank')}
                    >
                      GitHub
                    </GlowButton>
                  )}
                </div>
              </div>
            </div>
          </ElectricBorder>
        </div>

        {/* Navigation Arrows */}
        {showArrows && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/90 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
              aria-label="Önceki proje"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/90 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
              aria-label="Sonraki proje"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots Navigation */}
      {showDots && (
        <div className="flex justify-center mt-8 space-x-3">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-yellow-400 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Proje ${index + 1}'e git`}
            />
          ))}
        </div>
      )}

      {/* Project Counter */}
      <div className="text-center mt-4">
        <span className="text-gray-400 text-sm">
          {currentIndex + 1} / {projects.length}
        </span>
      </div>
    </div>
  );
}
