import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types";

interface ParallaxProjectCardProps {
  project: Project;
  index: number;
}

export default function ParallaxProjectCard({ project, index }: ParallaxProjectCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const calculateMousePosition = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the card (0 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Normalize to -1 to 1 range (center is 0,0)
    setMousePosition({
      x: (x - 0.5) * 2,
      y: (y - 0.5) * 2
    });
  };
  
  // Reset card position when mouse leaves
  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(() => {
        setMousePosition({ x: 0, y: 0 });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);
  
  return (
    <motion.div
      ref={cardRef}
      className="parallax-card relative rounded-xl overflow-hidden h-[400px] bg-gradient-to-br from-white/15 to-white/5 
                backdrop-blur-lg border border-white/20 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 50, 
        damping: 15,
        delay: index * 0.1 
      }}
      onMouseMove={calculateMousePosition}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        transformStyle: "preserve-3d", 
        perspective: "1000px" 
      }}
    >
      {/* Parallax Card Container */}
      <motion.div
        className="relative w-full h-full p-4 flex flex-col"
        animate={{
          rotateX: isHovered ? mousePosition.y * -10 : 0,
          rotateY: isHovered ? mousePosition.x * 10 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30,
          mass: 0.8
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background Parallax Layer (moves slower) */}
        <motion.div 
          className="absolute inset-0 rounded-lg overflow-hidden"
          animate={{
            x: isHovered ? mousePosition.x * -15 : 0,
            y: isHovered ? mousePosition.y * -15 : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          style={{ zIndex: 1 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur" />
        </motion.div>
        
        {/* Project Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden"
          animate={{
            x: isHovered ? mousePosition.x * -20 : 0,
            y: isHovered ? mousePosition.y * -20 : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          style={{ zIndex: 2 }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
        
        {/* Card Content (moves faster for enhanced parallax) */}
        <motion.div
          className="relative h-full flex flex-col justify-between z-10"
          animate={{
            x: isHovered ? mousePosition.x * 10 : 0,
            y: isHovered ? mousePosition.y * 10 : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          style={{ zIndex: 5 }}
        >
          {/* Project Category Badge */}
          <div className="flex justify-between">
            <span className="text-xs font-bold bg-white/20 text-white py-1 px-3 rounded-full backdrop-blur-sm">
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </span>
            
            {/* Project Number */}
            <span className="text-xl font-bold text-white/50 font-montserrat">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Project Main Content */}
          <div className="mt-auto">
            <h3 className="text-2xl font-bold font-montserrat text-white mb-2 drop-shadow-lg">
              {project.title}
            </h3>
            
            <p className="text-white/80 mb-3 line-clamp-2">
              {project.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="text-xs py-1 px-2 bg-white/10 text-white rounded-full backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex space-x-3">
              {project.links.demo && (
                <motion.a 
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 rounded-full text-white bg-white/20 hover:bg-white/30 flex items-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  Live Demo
                </motion.a>
              )}
              
              {project.links.github && (
                <motion.a 
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 rounded-full text-white bg-white/20 hover:bg-white/30 flex items-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fab fa-github mr-2"></i>
                  Code
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Interactive Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 rounded-lg opacity-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.5 : 0,
            left: isHovered ? `${50 + mousePosition.x * 50}%` : "50%",
            top: isHovered ? `${50 + mousePosition.y * 50}%` : "50%",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          style={{ 
            width: "150%", 
            height: "150%", 
            transform: "translate(-50%, -50%)",
            mixBlendMode: "overlay",
            zIndex: 10 
          }}
        />
      </motion.div>
    </motion.div>
  );
}