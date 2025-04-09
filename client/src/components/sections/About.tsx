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
      className="py-20 md:py-32 section-with-angled-bg"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <div className="relative">
              <motion.div 
                className="bg-purple-500 dark:bg-purple-600 w-84 h-84 rounded-2xl absolute -top-6 -left-6 opacity-20 blur-lg"
                animate={isVisible ? { 
                  rotate: [-5, 5, -5],
                  scale: [0.95, 1.05, 0.95]
                } : {}}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              />
              <motion.div 
                className="bg-indigo-500 dark:bg-indigo-600 w-84 h-84 rounded-2xl absolute -bottom-6 -right-6 opacity-20 blur-lg"
                animate={isVisible ? { 
                  rotate: [5, -5, 5],
                  scale: [1.05, 0.95, 1.05]
                } : {}}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              />
              
              <div className="relative bg-white/90 backdrop-blur-sm dark:bg-dark-900/90 p-6 rounded-2xl shadow-2xl flip-card w-84 h-84">
                <div className="flip-card-inner w-full h-full relative">
                  <div className="flip-card-front absolute w-full h-full flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                      alt="About Zarqan" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flip-card-back absolute w-full h-full flex flex-col items-center justify-center text-center p-7 bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white rounded-xl">
                    <h3 className="text-2xl font-montserrat font-bold mb-4">Beyond The Code</h3>
                    <p className="text-base">When I'm not crafting digital experiences, you'll find me exploring emerging tech trends, attending hackathons, and mentoring aspiring developers in the community.</p>
                    <div className="mt-8 flex justify-center space-x-5">
                      {["github", "linkedin", "twitter", "instagram"].map((platform, index) => (
                        <motion.a 
                          key={index}
                          href={`https://${platform}.com`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white hover:text-purple-200 transition-colors"
                          whileHover={{ y: -5, scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className={`fab fa-${platform} text-2xl`}></i>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 md:pl-16"
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
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300 py-2 px-4 bg-purple-100 dark:bg-purple-900/30 rounded-full shadow-sm">MY STORY</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl font-montserrat font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              Crafting Digital <span className="gradient-text">Masterpieces</span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 dark:text-gray-300 mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              I'm Zarqan, a passionate creative technologist with over 6 years of experience building immersive digital experiences. My journey began with a curiosity about how design and code intersect to create meaningful user experiences that resonate and inspire.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 dark:text-gray-300 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
            >
              My expertise lies in frontend development, interactive animations, and designing intuitive interfaces. I blend technical excellence with creative problem-solving to craft digital products that not only function flawlessly but also captivate and delight users.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: "fas fa-code", title: "Web Development", subtitle: "React, Next.js, Node.js" },
                { icon: "fas fa-paint-brush", title: "UI/UX Design", subtitle: "Figma, Tailwind CSS" },
                { icon: "fas fa-mobile-alt", title: "Responsive Design", subtitle: "Mobile-first approach" },
                { icon: "fas fa-magic", title: "Animation", subtitle: "Framer Motion, Three.js" }
              ].map((skill, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                  whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 w-14 h-14 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <i className={`${skill.icon} text-white text-xl`}></i>
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
