import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import ParallaxProjectCard from "./ParallaxProjectCard";

interface MasonryGridProps {
  projects: Project[];
  isVisible: boolean;
}

export default function MasonryGrid({ projects, isVisible }: MasonryGridProps) {
  const [columns, setColumns] = useState(3); // Default columns for desktop
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Update columns based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setColumns(2); // Tablet
      } else {
        setColumns(3); // Desktop
      }
    };
    
    // Initialize
    handleResize();
    
    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Organize projects into columnar structure
  const getProjectsByColumn = () => {
    const columnArrays: Project[][] = Array.from({ length: columns }, () => []);
    
    // Distribute projects across columns
    projects.forEach((project, index) => {
      const columnIndex = index % columns;
      columnArrays[columnIndex].push(project);
    });
    
    return columnArrays;
  };
  
  const columnData = getProjectsByColumn();
  
  return (
    <div 
      ref={gridRef} 
      className="masonry-grid flex flex-wrap -mx-4"
    >
      {columnData.map((columnProjects, columnIndex) => (
        <div 
          key={`column-${columnIndex}`} 
          className={`px-4 mb-8 ${
            columns === 1 ? "w-full" :
            columns === 2 ? "w-1/2" : 
            "w-1/3"
          }`}
          style={{ 
            transform: `translateY(${columnIndex * 40}px)` 
          }}
        >
          <div className="flex flex-col space-y-8">
            <AnimatePresence>
              {columnProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ 
                    delay: 0.1 + (columnIndex * 0.1) + (index * 0.05),
                    duration: 0.5,
                    type: "spring",
                    stiffness: 50,
                    damping: 20
                  }}
                >
                  <ParallaxProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}