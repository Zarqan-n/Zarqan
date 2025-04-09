import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ParallaxMouseEffectProps {
  children: React.ReactNode;
  className?: string;
  sensitivity?: number;
  reset?: boolean;
  rotationFactor?: number;
  perspective?: number;
}

export default function ParallaxMouseEffect({
  children,
  className = "",
  sensitivity = 20,
  reset = true,
  rotationFactor = 5,
  perspective = 1000
}: ParallaxMouseEffectProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate normalized coordinates between -1 and 1
    const relativeX = (e.clientX - centerX) / (rect.width / 2);
    const relativeY = (e.clientY - centerY) / (rect.height / 2);
    
    setPosition({
      x: relativeX * sensitivity,
      y: relativeY * sensitivity
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (reset) {
      // Reset position with slight delay for smooth transition
      setTimeout(() => {
        setPosition({ x: 0, y: 0 });
      }, 150);
    }
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={`parallax-mouse-effect ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        transform: isHovered ? 
          `perspective(${perspective}px) rotateY(${position.x / rotationFactor}deg) rotateX(${-position.y / rotationFactor}deg)` : 
          `perspective(${perspective}px) rotateY(0deg) rotateX(0deg)`
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 60,
        mass: 0.6
      }}
    >
      {children}
    </motion.div>
  );
}