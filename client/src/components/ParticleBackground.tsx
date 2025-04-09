import { useEffect, useRef, useState } from "react";

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
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameIdRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  
  // Create particles on component mount
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particleCount = Math.min(window.innerWidth / 7, 180); // More particles
    const initialParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3.5 + 1, // Larger particles
        color: `rgba(${100 + Math.random() * 50}, ${30 + Math.random() * 30}, ${220 + Math.random() * 35}, ${0.2 + Math.random() * 0.3})`, // Purple variants with more opacity
        speed: Math.random() * 0.8 + 0.4, // Faster particles
        direction: Math.random() * Math.PI * 2
      });
    }
    
    setParticles(initialParticles);
    particlesRef.current = initialParticles;
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const render = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentParticles = [...particlesRef.current];
      
      // Draw and update particles
      for (let i = 0; i < currentParticles.length; i++) {
        const particle = currentParticles[i];
        
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
        currentParticles[i] = particle;
      }
      
      // Draw connections between nearby particles
      for (let i = 0; i < currentParticles.length; i++) {
        for (let j = i + 1; j < currentParticles.length; j++) {
          const dx = currentParticles[i].x - currentParticles[j].x;
          const dy = currentParticles[i].y - currentParticles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 140) { // Increased connection distance
            ctx.beginPath();
            ctx.strokeStyle = `rgba(130, 70, 235, ${0.18 * (1 - distance / 140)})`; // More visible lines
            ctx.lineWidth = 1;
            ctx.moveTo(currentParticles[i].x, currentParticles[i].y);
            ctx.lineTo(currentParticles[j].x, currentParticles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Store the updated particles in the ref (avoids state updates in animation loop)
      particlesRef.current = currentParticles;
      
      // Continue animation loop
      animationFrameIdRef.current = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      if (animationFrameIdRef.current) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [particles]); // Only re-run when particles array changes

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="fixed top-0 left-0 w-full h-full z-[-1]"
    />
  );
}
