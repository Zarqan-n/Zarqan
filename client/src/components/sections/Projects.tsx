import { useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Project } from "@/types";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, {});
  const isVisible = !!entry?.isIntersecting;
  
  // State for active filter
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "Immersive E-commerce",
      description: "A next-generation shopping platform with 3D product visualizations and AR try-on features.",
      category: "web",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      tags: ["React", "Three.js", "Tailwind CSS"],
      links: {
        demo: "https://example.com/ecommerce",
        github: "https://github.com/example/ecommerce"
      }
    },
    {
      id: 2,
      title: "Financial Dashboard",
      description: "Comprehensive financial analytics interface with real-time data visualization and predictive insights.",
      category: "ui",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80",
      tags: ["Figma", "D3.js", "Next.js"],
      links: {
        demo: "https://example.com/dashboard",
        github: "https://github.com/example/dashboard"
      }
    },
    {
      id: 3,
      title: "Interactive Story",
      description: "Scroll-based narrative experience with parallax effects and character animations.",
      category: "animation",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      tags: ["GSAP", "JavaScript", "Canvas API"],
      links: {
        demo: "https://example.com/story",
        github: "https://github.com/example/story"
      }
    }
  ];
  
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

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 md:py-32 projects-section relative"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="inline-block mb-6">
            <span className="text-sm font-medium text-primary-600 dark:text-secondary-400 py-1 px-3 bg-primary-600/10 dark:bg-secondary-400/10 rounded-full">MY WORK</span>
          </div>
          
          <h2 className="text-4xl font-montserrat font-bold mb-4 text-gray-800 dark:text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            A showcase of my most significant work, demonstrating my approach to problem-solving and creating engaging user experiences.
          </p>
          
          <motion.div 
            className="flex flex-wrap justify-center mb-12 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            {filters.map(filter => (
              <motion.button
                key={filter.id}
                className={`project-filter py-2 px-6 rounded-full font-medium transition ${
                  activeFilter === filter.id 
                    ? "bg-primary-600 text-white dark:bg-secondary-500 dark:text-dark-900" 
                    : "bg-gray-200 dark:bg-dark-900 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white dark:hover:bg-secondary-500 dark:hover:text-dark-900"
                }`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        <LayoutGroup>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {filteredProjects.map(project => (
                <motion.div
                  key={project.id}
                  className="project-card group bg-white dark:bg-dark-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  layout
                  whileHover={{ y: -10 }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    <motion.div 
                      className="absolute inset-0 bg-primary-600/80 dark:bg-secondary-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {project.links.demo && (
                        <motion.a 
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white dark:bg-dark-900 text-primary-600 dark:text-secondary-500 w-12 h-12 rounded-full flex items-center justify-center mx-2 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                          whileHover={{ y: -5 }}
                          whileTap={{ y: 0 }}
                        >
                          <i className="fas fa-link"></i>
                        </motion.a>
                      )}
                      
                      {project.links.github && (
                        <motion.a 
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white dark:bg-dark-900 text-primary-600 dark:text-secondary-500 w-12 h-12 rounded-full flex items-center justify-center mx-2 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                          whileHover={{ y: -5 }}
                          whileTap={{ y: 0 }}
                        >
                          <i className="fab fa-github"></i>
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-montserrat font-bold text-xl text-gray-800 dark:text-white">{project.title}</h3>
                      <span className="text-xs font-medium text-primary-600 dark:text-secondary-400 py-1 px-2 bg-primary-600/10 dark:bg-secondary-400/10 rounded-full">
                        {filters.find(f => f.id === project.category)?.label}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs py-1 px-2 bg-gray-200 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
        >
          <motion.a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-3 px-8 rounded-full border-2 border-primary-600 dark:border-secondary-500 text-primary-600 dark:text-secondary-500 font-medium hover:bg-primary-600 hover:text-white dark:hover:bg-secondary-500 dark:hover:text-dark-900 transition"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <i className="fas fa-arrow-right ml-2"></i>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
