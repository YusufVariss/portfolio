'use client';

import { useState } from 'react';
import './CardSwap.css';

interface CardSwapProps {
  leftCard: React.ReactNode;
  rightCard: React.ReactNode;
}

export default function CardSwap({ leftCard, rightCard }: CardSwapProps) {
  const [isSwapped, setIsSwapped] = useState(false);

  return (
    <div className="card-swap-container">
      <div className="cards-wrapper">
        <div 
          className={`card left-card ${isSwapped ? 'swapped' : ''}`}
          onClick={() => setIsSwapped(!isSwapped)}
        >
          <div className="card-content">
            {leftCard}
          </div>
        </div>
        
        <div 
          className={`card right-card ${isSwapped ? 'swapped' : ''}`}
          onClick={() => setIsSwapped(!isSwapped)}
        >
          <div className="card-content">
            {rightCard}
          </div>
        </div>
      </div>
    </div>
  );
}