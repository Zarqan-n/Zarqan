import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, {});
  const isVisible = !!entry?.isIntersecting;
  
  const [typingText, setTypingText] = useState("Developer");
  
  // Typing animation effect
  useEffect(() => {
    const texts = ["Developer", "Designer", "Creator"];
    let currentIndex = 0;
    let isDeleting = false;
    let charIndex = 0;
    
    const typeWriter = () => {
      const currentText = texts[currentIndex];
      
      if (isDeleting) {
        // Deleting text
        setTypingText(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        // Typing text
        setTypingText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }
      
      // Switch between typing and deleting
      if (!isDeleting && charIndex === currentText.length) {
        // Wait before deleting
        setTimeout(() => { isDeleting = true; }, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to next word
        currentIndex = (currentIndex + 1) % texts.length;
        // Wait before typing new word
        setTimeout(typeWriter, 500);
        return;
      }
      
      // Speed based on whether typing or deleting
      const speed = isDeleting ? 100 : 150;
      setTimeout(typeWriter, speed);
    };
    
    const timerId = setTimeout(typeWriter, 1000);
    
    return () => clearTimeout(timerId);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden gradient-bg"
    >
      {/* Animated background elements */}
      <div className="absolute w-full h-full overflow-hidden z-0">
        <motion.div 
          className="absolute w-80 h-80 bg-purple-500/30 dark:bg-purple-600/20 rounded-full top-1/4 left-1/4 blur-xl" 
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-96 h-96 bg-indigo-400/30 dark:bg-indigo-500/20 rounded-full bottom-1/3 right-1/5 blur-lg" 
          animate={{ rotate: 360 }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute w-64 h-64 bg-blue-400/25 dark:bg-blue-500/15 rounded-full bottom-1/4 left-1/3 blur-lg" 
          animate={{ 
            y: [0, 25, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div 
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 pulse-glow"
            variants={itemVariants}
          >
            <span className="text-purple-800 dark:text-purple-300 font-medium">Welcome to my portfolio</span>
          </motion.div>
          
          <motion.p 
            className="text-purple-900 dark:text-purple-200 text-xl font-medium mb-4"
            variants={itemVariants}
          >
            Hello, I'm
          </motion.p>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 flex items-center justify-center md:justify-start"
            variants={itemVariants}
          >
            <div className="mr-4 bg-white/30 w-16 h-16 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg">
              <span className="text-4xl text-purple-500 font-bold">Z</span>
            </div>
            <span className="gradient-text">Zarqan</span>
          </motion.h1>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-semibold mb-8 text-gray-800 dark:text-gray-100"
            variants={itemVariants}
          >
            Passionate
            <span className="relative">
              <span className="text-typing ml-2 text-purple-700 dark:text-purple-300">{typingText}</span>
              <motion.span 
                className="absolute -right-2 top-0 h-full w-1 bg-purple-700 dark:bg-purple-300"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-lg"
            variants={itemVariants}
          >
            I create stunning digital experiences that combine artistic vision with technical excellence, transforming concepts into captivating interactive realities.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <motion.a 
              href="#contact"
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-medium py-3 px-8 rounded-xl flex items-center justify-center transition shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 25px -3px rgba(138, 58, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Let's Connect</span>
              <i className="fas fa-paper-plane ml-2"></i>
            </motion.a>
            
            <motion.a 
              href="#projects"
              className="bg-white/90 backdrop-blur-sm border border-purple-200 dark:bg-dark-900/80 dark:border-purple-800/30 text-purple-700 dark:text-purple-300 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white font-medium py-3 px-8 rounded-xl flex items-center justify-center transition shadow-md"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 25px -3px rgba(0, 0, 0, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>View My Work</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 animate-float">
            <motion.div 
              className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-purple-500/30 to-indigo-500/30 blur-md"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            
            <img 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
              alt="Zarqan" 
              className="absolute inset-0 w-full h-full object-cover rounded-2xl border-4 border-white/80 dark:border-purple-900/30 shadow-2xl"
            />
            
            <motion.div 
              className="absolute -right-6 -top-6 bg-white dark:bg-purple-900 rounded-2xl p-4 shadow-lg"
              initial={{ y: 10, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="text-purple-600 dark:text-purple-300">
                <i className="fab fa-react text-4xl"></i>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -left-6 top-1/3 bg-white dark:bg-purple-900 rounded-2xl p-4 shadow-lg"
              initial={{ x: -10, opacity: 0 }}
              animate={isVisible ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <div className="text-purple-600 dark:text-purple-300">
                <i className="fab fa-js text-4xl"></i>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -left-4 -bottom-4 bg-white dark:bg-purple-900 rounded-2xl p-4 shadow-lg"
              initial={{ y: -10, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <div className="text-purple-600 dark:text-purple-300">
                <i className="fab fa-node-js text-4xl"></i>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <motion.a 
          href="#about"
          className="text-white dark:text-white hover:text-purple-300 dark:hover:text-purple-300 transition-colors bg-white/10 backdrop-blur-sm p-3 rounded-full"
          whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll to About section"
        >
          <i className="fas fa-chevron-down text-2xl"></i>
        </motion.a>
      </motion.div>
    </section>
  );
}
