'use client';

import React from 'react';
import './GlowButton.css';
import ClickSpark from './ClickSpark';

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  color?: string;
  size?: string;
  radius?: string;
  speed?: number;
  reveal?: string;
}

export default function GlowButton({
  children,
  className = '',
  onClick,
  color = '#F0ABFC',
  size = '2.5px',
  radius = '8px',
  speed = 0.8,
  reveal = '1.4s'
}: GlowButtonProps) {
  const buttonStyle = {
    '--color': color,
    '--size': size,
    '--radius': radius,
    '--speed': speed,
    '--reveal': reveal
  } as React.CSSProperties;

  return (
    <ClickSpark
      sparkColor={color}
      sparkSize={8}
      sparkRadius={20}
      sparkCount={12}
      duration={600}
    >
      <button 
        className={`glow-button ${className}`} 
        style={buttonStyle}
        onClick={onClick}
      >
        <span className="glow-container">    
          <span className="glow"></span>
          <span className="glow"></span>
        </span>
        
        <span className="text">{children}</span>
      </button>
    </ClickSpark>
  );
}