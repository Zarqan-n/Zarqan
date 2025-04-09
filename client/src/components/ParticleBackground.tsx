import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

type Particle = {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  direction: number;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [particlesState, setParticlesState] = useState<Particle[]>([]);
  
  // Create particles on component mount
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particleCount = Math.min(window.innerWidth / 10, 100);
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: theme === "dark" 
          ? `rgba(45, 212, 191, ${Math.random() * 0.2})` 
          : `rgba(108, 99, 255, ${Math.random() * 0.2})`,
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() * Math.PI * 2
      });
    }
    
    setParticlesState(particles);
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || particlesState.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    const render = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = [...particlesState];
      const isDark = theme === "dark";
      
      // Draw and update particles
      particles.forEach((particle, i) => {
        // Update color based on theme
        particle.color = isDark 
          ? particle.color.replace('rgba(108, 99, 255,', 'rgba(45, 212, 191,')
          : particle.color.replace('rgba(45, 212, 191,', 'rgba(108, 99, 255,');
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Move particle
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        
        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Update particle in the array
        particles[i] = particle;
      });
      
      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(45, 212, 191, ${0.1 * (1 - distance / 100)})`
              : `rgba(108, 99, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Update state
      setParticlesState(particles);
      
      // Continue animation loop
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [particlesState, theme]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="fixed top-0 left-0 w-full h-full z-[-1]"
    />
  );
}
