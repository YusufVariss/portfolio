"use client";

import { useState } from "react";

interface SkillCard {
  id: number;
  title: string;
  subtitle: string;
  technologies: string[];
  color: string;
  bgColor: string;
  tabColor: string;
  icon: string;
}

interface FileDesignProps {
  cards: SkillCard[];
}

export default function FileDesign({ cards }: FileDesignProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleFileClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleCardClick = (cardId: number) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* File Container */}
      <div className="relative">
        {/* Closed File */}
        {!isOpen && (
          <div 
            className="relative cursor-pointer transform transition-all duration-500 hover:scale-105"
            onClick={handleFileClick}
          >
            {/* File Shadow */}
            <div className="absolute inset-0 bg-gray-800 rounded-lg transform rotate-2 translate-x-2 translate-y-2 opacity-50"></div>
            
            {/* Main File */}
            <div className="relative w-80 h-96 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg shadow-2xl">
              {/* File Tab */}
              <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-t-lg"></div>
              
              {/* File Content */}
              <div className="p-8 pt-16 h-full flex flex-col justify-center items-center text-center">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">My Skills</h3>
                <p className="text-gray-700 text-lg">Click to explore</p>
                
                {/* File Lines */}
                <div className="mt-8 space-y-2 w-full">
                  <div className="h-2 bg-gray-800/20 rounded w-full"></div>
                  <div className="h-2 bg-gray-800/20 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-800/20 rounded w-1/2"></div>
                </div>
                
                {/* Click Indicator */}
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-gray-800/30 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Open File with Cards */}
        {isOpen && (
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 z-20 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Dosyayı kapat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* File Background */}
            <div className="relative w-96 h-80 bg-white/10 backdrop-blur-md rounded-lg shadow-2xl border border-white/20">
              {/* File Tab */}
              <div className="absolute top-0 left-0 w-full h-12 bg-white/20 backdrop-blur-sm rounded-t-lg border-b border-white/30"></div>
              
              {/* Cards Container */}
              <div className="p-6 pt-16 h-full overflow-hidden">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {cards.map((card, index) => (
                    <div
                      key={card.id}
                      className={`transform transition-all duration-700 cursor-pointer ${
                        selectedCard === card.id ? 'scale-110 z-10' : 'hover:scale-105'
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: isOpen ? 'cardSlideIn 0.6s ease-out forwards' : 'none',
                      }}
                      onClick={() => handleCardClick(card.id)}
                    >
                      <div 
                        className="w-full h-full rounded-lg shadow-lg p-3 flex flex-col justify-between backdrop-blur-sm border border-white/20"
                        style={{
                          background: `linear-gradient(135deg, ${card.bgColor}/80, ${card.color}/80)`,
                        }}
                      >
                        {/* Card Tab */}
                        <div 
                          className="w-full h-6 rounded-t-lg mb-2 backdrop-blur-sm border-b border-white/20"
                          style={{
                            background: `linear-gradient(90deg, ${card.tabColor}/60, ${card.bgColor}/60)`,
                          }}
                        />
                        
                        {/* Card Content */}
                        <div className="flex-1 flex flex-col justify-center text-center">
                          <div className="text-3xl mb-2">{card.icon}</div>
                          <h4 className="text-sm font-bold text-white mb-1">{card.title}</h4>
                          <p className="text-xs text-white/80">{card.subtitle}</p>
                        </div>
                        
                        {/* Selected Indicator */}
                        {selectedCard === card.id && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expanded Card Details */}
            {selectedCard !== null && (
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <div 
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-lg mx-4 shadow-2xl border border-white/20 transform transition-all duration-500 ease-out"
                  style={{
                    animation: 'cardExpand 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                  }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{cards[selectedCard - 1]?.icon}</div>
                    <h3 className="text-3xl font-bold text-yellow-400 mb-3">
                      {cards[selectedCard - 1]?.title}
                    </h3>
                    <p className="text-gray-300 text-lg mb-6">
                      {cards[selectedCard - 1]?.subtitle}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3 justify-center">
                      {cards[selectedCard - 1]?.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-yellow-400 text-base font-medium transform transition-all duration-300 hover:bg-white/30 hover:scale-105 border border-white/20"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: 'techTagSlide 0.5s ease-out forwards'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Close button for expanded view */}
                    <button
                      onClick={() => setSelectedCard(null)}
                      className="mt-6 px-6 py-2 bg-white/20 backdrop-blur-sm text-yellow-400 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/20"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute -bottom-4 -left-8 w-8 h-8 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/2 -right-12 w-6 h-6 bg-green-400 rounded-full animate-ping opacity-60"></div>
      </div>
    </div>
  );
}
