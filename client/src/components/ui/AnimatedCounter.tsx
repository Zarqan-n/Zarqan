import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({
  start = 0,
  end,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const counterRef = useRef<HTMLDivElement>(null);
  const inView = useInView(counterRef, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      let startTime: number;
      let animationFrameId: number;
      
      const startAnimation = (timestamp: number) => {
        startTime = timestamp;
        animate(timestamp);
      };

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const runtime = timestamp - startTime;
        const relativeProgress = runtime / (duration * 1000);
        
        if (relativeProgress < 1) {
          const easedProgress = easeOutCubic(relativeProgress);
          const updatedCount = Math.floor(start + easedProgress * (end - start));
          setCount(updatedCount);
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCount(end);
          setHasAnimated(true);
        }
      };
      
      // Easing function for smoother animation
      const easeOutCubic = (x: number): number => {
        return 1 - Math.pow(1 - x, 3);
      };

      // Start the animation after the delay
      const timeout = setTimeout(() => {
        animationFrameId = requestAnimationFrame(startAnimation);
      }, delay * 1000);

      return () => {
        clearTimeout(timeout);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [inView, hasAnimated, start, end, duration, delay]);

  return (
    <motion.div 
      ref={counterRef}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: delay * 0.5 }}
    >
      {prefix}{count}{suffix}
    </motion.div>
  );
}