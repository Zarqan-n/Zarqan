import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Project } from "@/types";
import ProjectShowcase from "@/components/interactive/ProjectShowcase";
import project1 from "../../assets/Screenshot 2025-04-10 170305.png";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, {});
  const isVisible = !!entry?.isIntersecting;
  const isMobile = useIsMobile();
  
  // State for view toggle (interactive vs classic)
  const [useInteractive, setUseInteractive] = useState(true);
  
  // Projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "Freelantix",
      description: "A next-generation Freelancing platform with product visualizations and  try-on features.",
      category: "web",
      image: project1,
      tags: ["React", "Node js", "Tailwind CSS"],
      links: {
        demo: "https://freelantix.netlify.app/",
        github: "https://github.com"
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
    },
    {
      id: 4,
      title: "AI Learning Platform",
      description: "Educational platform using AI to personalize learning paths and provide adaptive content for students.",
      category: "web",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80",
      tags: ["Machine Learning", "React", "Node.js"],
      links: {
        demo: "https://example.com/ai-learning",
        github: "https://github.com/example/ai-learning"
      }
    },
    {
      id: 5,
      title: "Brand Identity System",
      description: "Comprehensive design system for a global brand featuring logo variations, typography, color schemes and templates.",
      category: "ui",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
      tags: ["Adobe Creative Suite", "Typography", "Branding"],
      links: {
        demo: "https://example.com/brand-system",
        github: "https://github.com/example/brand-system"
      }
    },
    {
      id: 6,
      title: "Motion Graphics Promo",
      description: "Captivating motion graphics package for product launch campaign, including animated logo reveals and social media assets.",
      category: "animation",
      image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      tags: ["After Effects", "Cinema 4D", "Motion Design"],
      links: {
        demo: "https://example.com/motion-promo",
        github: "https://github.com/example/motion-promo"
      }
    }
  ];

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 md:py-32 projects-section relative overflow-x-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="inline-block mb-6">
            <span className="text-sm font-medium text-white py-1 px-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/20">MY WORK</span>
          </div>
          
          <h2 className="text-4xl font-montserrat font-bold mb-4 text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            A showcase of my most significant work, demonstrating my approach to problem-solving and creating engaging user experiences.
          </p>
          
          {/* View mode toggle */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
          >
            <div className="inline-flex rounded-full border-2 border-white/30 p-1 bg-white/10 backdrop-blur-sm">
              <button
                onClick={() => setUseInteractive(true)}
                className={`py-2 px-4 rounded-full transition-all ${
                  useInteractive 
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="flex items-center">
                  <i className="fas fa-cube mr-2"></i> Interactive
                </span>
              </button>
              <button
                onClick={() => setUseInteractive(false)}
                className={`py-2 px-4 rounded-full transition-all ${
                  !useInteractive 
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="flex items-center">
                  <i className="fas fa-th mr-2"></i> Classic
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Project Showcase with toggle between Interactive and Classic views */}
        {useInteractive ? (
          <ProjectShowcase projects={projects} isVisible={isVisible} />
        ) : (
          <div>
            {/* Classic grid view */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {projects.map(project => (
                <motion.div
                  key={project.id}
                  className="project-card group bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-white/30 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15,
                    delay: (project.id % 3) * 0.1
                  }}
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
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {project.links.demo && (
                        <motion.a 
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-2 hover:bg-purple-100 text-purple-600 transition-all"
                          whileHover={{ y: -5, scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="fas fa-external-link-alt text-lg"></i>
                        </motion.a>
                      )}
                      
                      {project.links.github && (
                        <motion.a 
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-2 hover:bg-purple-100 text-purple-600 transition-all"
                          whileHover={{ y: -5, scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="fab fa-github text-lg"></i>
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-montserrat font-bold text-xl text-white">{project.title}</h3>
                      <span className="text-xs font-medium text-white py-1 px-2 bg-white/20 rounded-full">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-white/80 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs py-1 px-2 bg-white/10 text-white rounded-full border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
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
                className="inline-block py-3 px-8 rounded-full border-2 border-white/30 text-white font-medium hover:bg-white/20 transition-all"
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
        )}
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 left-0 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-0 w-80 h-80 bg-indigo-600/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </section>
  );
}
