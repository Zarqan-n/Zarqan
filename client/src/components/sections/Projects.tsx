import { useRef, useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Project } from "@/types";
import ProjectGallery3D, { ProjectGallery3DSimple } from "@/components/3d/ProjectGallery3D";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, {});
  const isVisible = !!entry?.isIntersecting;
  const isMobile = useIsMobile();
  
  // State for active filter and 3D gallery view
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showGallery, setShowGallery] = useState(false);
  const [use3D, setUse3D] = useState(true);
  
  // Check for device capabilities
  useEffect(() => {
    // 3D features are currently disabled due to compatibility issues
    const checkDevicePerformance = () => {
      // Keep 3D disabled for now until compatibility issues are fixed
      setUse3D(false);
    };
    
    checkDevicePerformance();
  }, [isMobile]);
  
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
            <span className="text-sm font-medium text-white py-1 px-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/20">MY WORK</span>
          </div>
          
          <h2 className="text-4xl font-montserrat font-bold mb-4 text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            A showcase of my most significant work, demonstrating my approach to problem-solving and creating engaging user experiences.
          </p>
          
          <motion.div 
            className="flex flex-wrap justify-center mb-6 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            {filters.map(filter => (
              <motion.button
                key={filter.id}
                className={`project-filter py-2 px-6 rounded-full font-medium transition ${
                  activeFilter === filter.id 
                    ? "bg-white/30 text-white border border-white/30" 
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>
          
          {/* View Toggle: 3D Gallery vs Regular */}
          {use3D && (
            <motion.div
              className="flex justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-sm p-1 rounded-full border border-white/20">
                <button
                  className={`py-2 px-4 rounded-full transition ${
                    !showGallery 
                      ? "bg-white/20 text-white font-medium" 
                      : "text-white/70 hover:text-white"
                  }`}
                  onClick={() => setShowGallery(false)}
                >
                  <i className="fas fa-th-large mr-2"></i>
                  Grid View
                </button>
                <button
                  className={`py-2 px-4 rounded-full transition ${
                    showGallery 
                      ? "bg-white/20 text-white font-medium" 
                      : "text-white/70 hover:text-white"
                  }`}
                  onClick={() => setShowGallery(true)}
                >
                  <i className="fas fa-cube mr-2"></i>
                  3D Gallery
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Conditional rendering between regular grid view and 3D gallery */}
        {!showGallery ? (
          <LayoutGroup>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              <AnimatePresence>
                {filteredProjects.map(project => (
                  <motion.div
                    key={project.id}
                    className="project-card group bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-white/30 transition-all"
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
                          {filters.find(f => f.id === project.category)?.label}
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
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        ) : (
          // 3D Project Gallery View
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <Suspense fallback={
                <div className="w-full h-[400px] flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="inline-block mb-3">
                      <i className="fas fa-spinner fa-spin text-3xl"></i>
                    </div>
                    <p>Loading 3D Gallery...</p>
                  </div>
                </div>
              }>
                {isMobile ? (
                  <ProjectGallery3DSimple projects={filteredProjects} />
                ) : (
                  <ProjectGallery3D projects={filteredProjects} />
                )}
              </Suspense>
              
              <div className="text-center mt-4">
                <p className="text-white/70 text-sm">
                  <i className="fas fa-mouse mr-2"></i>
                  Drag to rotate and explore the 3D gallery
                </p>
              </div>
            </div>
          </motion.div>
        )}
        
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
    </section>
  );
}
