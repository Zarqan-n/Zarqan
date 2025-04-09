import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Skill, Tool } from "@/types";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, {});
  const isVisible = !!entry?.isIntersecting;
  
  // Frontend skills data
  const frontendSkills: Skill[] = [
    { name: "React.js / Next.js", percentage: 95 },
    { name: "JavaScript / TypeScript", percentage: 90 },
    { name: "Tailwind CSS / SCSS", percentage: 85 },
    { name: "HTML5 / CSS3", percentage: 95 }
  ];
  
  // Creative tools data
  const creativeTools: Tool[] = [
    { name: "Figma", icon: "fab fa-figma", category: "UI/UX Design" },
    { name: "GSAP", icon: "fab fa-js", category: "Animation Library" },
    { name: "Three.js", icon: "fas fa-cube", category: "3D Visualizations" },
    { name: "Framer Motion", icon: "fas fa-photo-video", category: "React Animation" }
  ];
  
  // Controls for skill bars animation
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    if (isVisible && !animated) {
      setAnimated(true);
    }
  }, [isVisible, animated]);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 md:py-32 relative skills-section"
    >
      <motion.div 
        className="absolute inset-0 bg-primary-600/5 dark:bg-secondary-400/5 skew-y-3 z-0"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="inline-block mb-6">
            <span className="text-sm font-medium text-white py-1 px-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">MY EXPERTISE</span>
          </div>
          
          <h2 className="text-4xl font-montserrat font-bold mb-4 text-white">
            Technical <span className="gradient-text">Proficiency</span>
          </h2>
          
          <p className="text-white/80 max-w-2xl mx-auto">
            I continually expand my skill set to stay at the forefront of development technologies, focusing on creating performant, accessible, and visually stunning applications.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          >
            <h3 className="text-2xl font-montserrat font-bold mb-8 text-white">Frontend Development</h3>
            
            <div className="space-y-6">
              {frontendSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-sm text-white">
                      <AnimatedCounter 
                        end={skill.percentage} 
                        suffix="%" 
                        delay={0.2 + index * 0.1} 
                      />
                    </span>
                  </div>
                  <div className="h-2 bg-white/40 backdrop-blur-sm rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-white to-purple-300 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: animated ? `${skill.percentage}%` : 0 }}
                      transition={{ duration: 1.5, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
          >
            <h3 className="text-2xl font-montserrat font-bold mb-8 text-white">Creative Toolkit</h3>
            
            <div className="grid grid-cols-2 gap-6">
              {creativeTools.map((tool, index) => (
                <motion.div 
                  key={index}
                  className="card bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                >
                  <div className="text-purple-300 mb-3">
                    <i className={`${tool.icon} text-4xl`}></i>
                  </div>
                  <h4 className="font-montserrat font-bold text-white mb-1">{tool.name}</h4>
                  <p className="text-sm text-white/70">{tool.category}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
