'use client';

import React from 'react';
import './ElectricBorder.css';

interface ElectricBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export default function ElectricBorder({
  children,
  className = '',
  color = '#fbbf24'
}: ElectricBorderProps) {
  const style = {
    '--electric-border-color': color
  } as React.CSSProperties;

  return (
    <div className={`electric-border ${className}`} style={style}>
      <svg className="eb-svg">
        <defs>
          <filter id="electric-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      
      <div className="eb-content">
        {children}
      </div>
      
      <div className="eb-layers">
        <div className="eb-stroke"></div>
        <div className="eb-glow-1"></div>
        <div className="eb-glow-2"></div>
        <div className="eb-background-glow"></div>
      </div>
    </div>
  );
}