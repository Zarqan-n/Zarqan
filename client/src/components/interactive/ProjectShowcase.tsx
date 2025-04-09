import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import MasonryGrid from "./MasonryGrid";

interface ProjectShowcaseProps {
  projects: Project[];
  isVisible: boolean;
}

export default function ProjectShowcase({ projects, isVisible }: ProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Filter categories
  const filters = [
    { id: "all", label: "All" },
    { id: "web", label: "Web Development" },
    { id: "ui", label: "UI/UX Design" },
    { id: "animation", label: "Animation" }
  ];
  
  // Filtered projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  return (
    <motion.div 
      className="project-showcase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Filter buttons with animated underline */}
      <motion.div 
        className="flex flex-wrap justify-center mb-10 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            className="relative"
            onClick={() => setActiveFilter(filter.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={`
              py-2 px-6 rounded-full font-medium text-white transition-all
              ${activeFilter === filter.id 
                ? "bg-white/30 text-white border border-white/30" 
                : "bg-white/10 hover:bg-white/20 border border-white/20"}
            `}>
              {filter.label}
            </span>
            
            {/* Animated underline */}
            {activeFilter === filter.id && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-purple-400 rounded-full w-full mx-auto"
                layoutId="filterUnderline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
      
      {/* Selected Category Description */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={activeFilter} // Force re-render on filter change
        transition={{ duration: 0.3 }}
      >
        {activeFilter !== "all" && (
          <div className="inline-block py-2 px-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-white/80">
              {activeFilter === "web" && (
                <>Showcasing <span className="text-white font-semibold">web development</span> projects with focus on interactivity and performance</>
              )}
              {activeFilter === "ui" && (
                <>Displaying <span className="text-white font-semibold">UI/UX design</span> work emphasizing intuitive user experiences</>
              )}
              {activeFilter === "animation" && (
                <>Featuring <span className="text-white font-semibold">animation</span> projects with dynamic motion and visual effects</>
              )}
            </p>
          </div>
        )}
      </motion.div>
      
      {/* Masonry Layout for Projects */}
      <div ref={containerRef} className="relative mb-12">
        <AnimatePresence mode="sync">
          {filteredProjects.length > 0 ? (
            <MasonryGrid projects={filteredProjects} isVisible={isVisible} />
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white text-lg mb-3">No projects found in this category</p>
              <button 
                onClick={() => setActiveFilter("all")}
                className="text-purple-300 underline"
              >
                View all projects
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* View All Projects Button */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4 }}
      >
        <motion.a 
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-3 px-8 rounded-full border-2 border-white/30 text-white font-medium 
                   hover:bg-white/20 transition-all group"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 15px -3px rgba(91, 33, 182, 0.15)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center">
            View All Projects
            <motion.i 
              className="fas fa-arrow-right ml-2" 
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop", 
                duration: 1.5,
                ease: "easeInOut" 
              }}
            />
          </span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}