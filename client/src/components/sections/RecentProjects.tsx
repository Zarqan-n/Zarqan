import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Project } from "@/types";

export default function RecentProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, {});
  const isVisible = !!entry?.isIntersecting;
  
  // Recent projects data
  const recentProjects: Project[] = [
    {
      id: 101,
      title: "Personal Portfolio 2.0",
      description: "A redesigned personal portfolio with advanced animations and interactive elements.",
      category: "web",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      tags: ["React", "Framer Motion", "Tailwind CSS"],
      links: {
        demo: "https://portfolio.example.com",
        github: "https://github.com/example/portfolio"
      }
    },
    {
      id: 102,
      title: "AI Content Generator",
      description: "An AI-powered tool that creates marketing content based on simple prompts.",
      category: "web",
      image: "https://images.unsplash.com/photo-1677442135133-3e3c00a31da9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      tags: ["OpenAI API", "React", "Node.js"],
      links: {
        demo: "https://ai-content.example.com",
        github: "https://github.com/example/ai-content"
      }
    }
  ];

  return (
    <section 
      id="recent-projects" 
      ref={sectionRef}
      className="py-20 md:py-28 relative bg-gradient-to-b from-black to-purple-900/20"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="inline-block mb-6">
            <span className="text-sm font-medium text-white py-1 px-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/20">LATEST WORK</span>
          </div>
          
          <h2 className="text-4xl font-montserrat font-bold mb-4 text-white">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Check out what I've been working on lately. These are my most recent projects that showcase my latest skills and techniques.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {recentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2 + index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -10 }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative overflow-hidden h-64 md:h-auto">
                  <motion.img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:hidden" />
                </div>
                
                <div className="md:w-2/3 p-6 md:p-8 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs py-1 px-2 bg-white/10 text-white rounded-full border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  
                  <p className="text-white/80 mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4 mt-auto">
                    {project.links.demo && (
                      <motion.a 
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <i className="fab fa-github mr-2"></i>
                        Source Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.div 
                className="absolute bottom-4 left-4 w-12 h-12 border border-white/20 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.15, 0.25, 0.15]
                }}
                transition={{
                  duration: 4,
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Add Project Button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Add New Project</span>
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <i className="fas fa-arrow-right"></i>
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}