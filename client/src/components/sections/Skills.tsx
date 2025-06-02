import { useRef, useState, useEffect, Suspense } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Skill, Tool } from "@/types";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, {});
  const isVisible = !!entry?.isIntersecting;
  const isMobile = useIsMobile();
  const [use3D, setUse3D] = useState(false); // Disabled for compatibility
  
  // Frontend skills data
  const frontendSkills: Skill[] = [
    { name: "React.js", percentage: 90 },
    { name: "JavaScript", percentage: 80 },
    { name: "Tailwind CSS", percentage: 85 },
    { name: "Framer Motion", percentage: 75 }
  ];
  
  // Skills for 3D visualization
  const visualSkills: Skill[] = [
    { name: "CSS", percentage: 95 },
    { name: "Javascript", percentage: 90 },
    { name: "React", percentage: 82 },
    { name: "Tailwind CSS", percentage: 88 },
    { name: "Node.js", percentage: 80 },
    { name: "Express.js", percentage: 75 },
    { name: "UI/UX Design", percentage: 85 },
    { name: "Animation", percentage: 92 }
  ];
  
  // Creative tools data
  const creativeTools: Tool[] = [
    { name: "React", icon: "fab fa-react", category: "Component Building" },
    { name: "Javascript", icon: "fab fa-js", category: "Logic" },
    { name: "Tailwind CSS", icon: "fas fa-wind", category: "Creativity" },
    { name: "Framer Motion", icon: "fas fa-photo-video", category: "React Animation" }
  ];
  
  // Controls for skill bars animation
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    if (isVisible && !animated) {
      setAnimated(true);
    }
    
    // 3D features are currently disabled due to compatibility issues
    const checkDevicePerformance = () => {
      // Keep 3D disabled for now until compatibility issues are fixed
      setUse3D(false);
    };
    
    checkDevicePerformance();
  }, [isVisible, animated, isMobile]);

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
                      className="h-full bg-gradient-to-r from-white to-white rounded-full"
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
        
        {/* 3D Skills Visualization (disabled) */}
        
        {/* Core Technologies Section - Standard Version */}
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
            className="mt-20"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-montserrat font-bold text-white mb-3">
                Core Technologies
              </h3>
              <p className="text-white/80 max-w-2xl mx-auto mb-6">
                My primary technology stack and areas of expertise
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {visualSkills.slice(0, 8).map((skill, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-3 bg-gradient-to-br from-white/20 to-purple-500/30 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.4 + index * 0.1, 
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      <AnimatedCounter 
                        end={skill.percentage} 
                        suffix="%" 
                        delay={0.6 + index * 0.15}
                        className="text-white font-bold text-xl"
                      />
                    </motion.div>
                    
                    {/* Background circular track */}
                    <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
                    
                    {/* Animated circular progress */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <motion.circle 
                        cx="50%" 
                        cy="50%" 
                        r="47%" 
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="300"
                        initial={{ strokeDashoffset: 300 }}
                        animate={{ 
                          strokeDashoffset: 300 - (300 * skill.percentage / 100),
                        }}
                        transition={{ 
                          duration: 1.5, 
                          delay: 0.5 + index * 0.1, 
                          ease: "easeOut" 
                        }}
                        className="origin-center drop-shadow-glow" 
                      />
                    </svg>
                    
                    {/* Subtle pulsing glow effect */}
                    <motion.div 
                      className="absolute inset-0 bg-purple-500/10 rounded-full"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.2, 0.5, 0.2] 
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </div>
                  <motion.h4 
                    className="font-medium text-white text-center relative"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {skill.name}
                    <motion.div 
                      className="absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent"
                      initial={{ width: 0, x: "-50%" }}
                      animate={{ width: "80%", x: "-40%" }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.8 }}
                    />
                  </motion.h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
