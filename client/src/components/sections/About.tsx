import { useRef } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, {});
  const isVisible = !!entry?.isIntersecting;
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-gray-50 dark:bg-dark-800 relative"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <div className="relative">
              <motion.div 
                className="bg-primary-500 dark:bg-secondary-400 w-80 h-80 rounded-lg absolute -top-4 -left-4 opacity-20"
                animate={isVisible ? { 
                  rotate: [-2, 2, -2],
                  x: [-5, 5, -5]
                } : {}}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              />
              <motion.div 
                className="bg-primary-600 dark:bg-secondary-500 w-80 h-80 rounded-lg absolute -bottom-4 -right-4 opacity-20"
                animate={isVisible ? { 
                  rotate: [2, -2, 2],
                  x: [5, -5, 5]
                } : {}}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              />
              
              <div className="relative bg-white dark:bg-dark-900 p-6 rounded-lg shadow-xl flip-card w-80 h-80">
                <div className="flip-card-inner w-full h-full relative">
                  <div className="flip-card-front absolute w-full h-full flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" 
                      alt="About Alex" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flip-card-back absolute w-full h-full flex flex-col items-center justify-center text-center p-6 bg-primary-600 dark:bg-secondary-500 text-white dark:text-dark-900 rounded-lg">
                    <h3 className="text-xl font-montserrat font-bold mb-4">A bit more about me</h3>
                    <p className="text-sm">When I'm not coding, you can find me exploring nature trails, experimenting with new recipes, or diving into sci-fi novels.</p>
                    <div className="mt-6 flex justify-center space-x-4">
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white dark:text-dark-900 hover:opacity-80 transition-opacity">
                        <i className="fab fa-github text-2xl"></i>
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white dark:text-dark-900 hover:opacity-80 transition-opacity">
                        <i className="fab fa-linkedin text-2xl"></i>
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white dark:text-dark-900 hover:opacity-80 transition-opacity">
                        <i className="fab fa-twitter text-2xl"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <motion.div 
              className="inline-block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-medium text-primary-600 dark:text-secondary-400 py-1 px-3 bg-primary-600/10 dark:bg-secondary-400/10 rounded-full">ABOUT ME</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl font-montserrat font-bold mb-6 text-gray-800 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              Crafting Digital <span className="gradient-text">Experiences</span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              I'm a passionate creative developer with 5+ years of experience building immersive digital experiences that merge technical expertise with artistic vision. My journey in tech began with a fascination for how design and code intersect to create memorable user experiences.
            </motion.p>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
            >
              I specialize in front-end development, interactive animations, and creating intuitive interfaces that engage users. My approach combines technical precision with creative problem-solving to deliver projects that not only function flawlessly but also delight users.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: "fas fa-code", title: "Web Development", subtitle: "React, Next.js, Svelte" },
                { icon: "fas fa-paint-brush", title: "UI/UX Design", subtitle: "Figma, Adobe XD" },
                { icon: "fas fa-mobile-alt", title: "Responsive Design", subtitle: "Mobile-first approach" },
                { icon: "fas fa-magic", title: "Animation", subtitle: "Framer Motion, GSAP" }
              ].map((skill, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="bg-primary-600/10 dark:bg-secondary-400/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <i className={`${skill.icon} text-primary-600 dark:text-secondary-400`}></i>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-gray-800 dark:text-white">{skill.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
