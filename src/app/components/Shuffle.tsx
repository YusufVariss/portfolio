import React, { useRef, useEffect, useState } from 'react';
import './Shuffle.css';

interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: 'left' | 'right';
  duration?: number;
  maxDelay?: number;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
  tag?: keyof JSX.IntrinsicElements;
  textAlign?: 'left' | 'center' | 'right';
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: 'evenodd' | 'random';
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
}

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  ease = 'power3.out',
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = '',
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true
}) => {
  const ref = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const splitRef = useRef<any>(null);
  const wrappersRef = useRef<HTMLElement[]>([]);
  const playingRef = useRef(false);

  useEffect(() => {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') setFontsLoaded(true);
      else document.fonts.ready.then(() => setFontsLoaded(true));
    } else setFontsLoaded(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded) return;
    
    if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onShuffleComplete?.();
      return;
    }

    const el = ref.current;

    // Simple shuffle animation without GSAP
    const build = () => {
      const chars = text.split('');
      wrappersRef.current = [];
      
      el.innerHTML = '';
      
      chars.forEach((char, index) => {
        const wrapper = document.createElement('span');
        wrapper.className = 'shuffle-char-wrapper';
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.style.verticalAlign = 'baseline';
        
        const inner = document.createElement('span');
        inner.className = 'shuffle-char';
        inner.textContent = char;
        inner.style.display = 'inline-block';
        inner.style.transform = shuffleDirection === 'right' ? 'translateX(-100%)' : 'translateX(100%)';
        inner.style.opacity = '0';
        inner.style.transition = `all ${duration}s ${ease}`;
        
        wrapper.appendChild(inner);
        el.appendChild(wrapper);
        wrappersRef.current.push(wrapper);
        
        // Animate in with stagger
        setTimeout(() => {
          inner.style.transform = 'translateX(0)';
          inner.style.opacity = '1';
        }, index * stagger * 1000);
      });
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isAnimating) {
          setIsAnimating(true);
          build();
          setReady(true);
          setTimeout(() => {
            onShuffleComplete?.();
            if (!loop) setIsAnimating(false);
          }, (text.length * stagger + duration) * 1000);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observer.observe(el);

    const handleMouseEnter = () => {
      if (triggerOnHover && ready && !isAnimating) {
        setIsAnimating(true);
        build();
        setTimeout(() => {
          if (!loop) setIsAnimating(false);
        }, (text.length * stagger + duration) * 1000);
      }
    };

    if (triggerOnHover) {
      el.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      observer.disconnect();
      if (triggerOnHover) {
        el.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, [text, fontsLoaded, duration, stagger, ease, threshold, rootMargin, shuffleDirection, triggerOnHover, loop, ready, isAnimating, onShuffleComplete, respectReducedMotion]);

  const commonStyle: React.CSSProperties = { 
    textAlign, 
    ...style,
    color: colorFrom || style.color
  };
  
  const classes = `shuffle-parent ${ready ? 'is-ready' : ''} ${className}`;
  const Tag = tag as keyof JSX.IntrinsicElements;
  
  return React.createElement(Tag, { 
    ref, 
    className: classes, 
    style: commonStyle 
  }, text);
};

export default Shuffle;