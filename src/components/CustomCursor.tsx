import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const followerRef = useRef<HTMLDivElement>(null);
  
  // Follower position (interpolated / lagged)
  const followerPos = useRef({ x: -100, y: -100 });
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Dynamic hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive-card') ||
        target.classList.contains('clickable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Animation Loop for Cursor Follower (creates organic lag/smoothing)
    let animationFrameId: number;
    const render = () => {
      const ease = 0.15; // interpolation factor
      
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;

      if (followerRef.current) {
        followerRef.current.style.left = `${followerPos.current.x}px`;
        followerRef.current.style.top = `${followerPos.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`cursor-system ${isHovered ? 'cursor-hover' : ''}`}>
      <div 
        className="custom-cursor" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div 
        ref={followerRef} 
        className="cursor-follower" 
      />
    </div>
  );
};
