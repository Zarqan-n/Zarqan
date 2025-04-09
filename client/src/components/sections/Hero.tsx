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
    const texts = ["Developer", "Designer", "Animator"];
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
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute w-full h-full overflow-hidden z-0">
        <motion.div 
          className="absolute w-64 h-64 bg-primary-500/20 dark:bg-primary-600/10 rounded-full top-1/3 left-1/4" 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-72 h-72 bg-secondary-400/20 dark:bg-secondary-500/10 rounded-full bottom-1/4 right-1/4" 
          animate={{ rotate: 360 }}
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute w-48 h-48 bg-yellow-400/20 dark:bg-yellow-500/10 rounded-full bottom-1/3 left-1/3" 
          animate={{ 
            y: [0, 15, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
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
          <motion.p 
            className="text-primary-600 dark:text-secondary-400 text-xl font-medium mb-4"
            variants={itemVariants}
          >
            Hello, I'm
          </motion.p>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold mb-6"
            variants={itemVariants}
          >
            <span className="gradient-text">Alex Parker</span>
          </motion.h1>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-montserrat font-semibold mb-8 text-gray-700 dark:text-gray-300"
            variants={itemVariants}
          >
            Creative
            <span className="relative">
              <span className="text-typing ml-2">{typingText}</span>
              <motion.span 
                className="absolute -right-2 top-0 h-full w-0.5 bg-primary-600 dark:bg-secondary-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-lg"
            variants={itemVariants}
          >
            I craft exceptional digital experiences that blend creativity with functionality, bringing ideas to life through code and design.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <motion.a 
              href="#contact"
              className="btn-primary bg-primary-600 hover:bg-primary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600 text-white font-medium py-3 px-8 rounded-full flex items-center justify-center transition"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Let's Talk</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </motion.a>
            
            <motion.a 
              href="#projects"
              className="btn-secondary border-2 border-primary-600 dark:border-secondary-500 text-primary-600 dark:text-secondary-500 hover:bg-primary-600 hover:text-white dark:hover:bg-secondary-500 dark:hover:text-dark-900 font-medium py-3 px-8 rounded-full flex items-center justify-center transition"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>View Work</span>
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <motion.div 
              className="absolute w-full h-full rounded-full bg-primary-500/20 dark:bg-primary-600/10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
              alt="Alex Parker" 
              className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-white dark:border-dark-800 shadow-lg"
            />
            
            <motion.div 
              className="absolute -right-4 -top-4 bg-white dark:bg-dark-800 rounded-full p-3 shadow-lg"
              initial={{ y: 10, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-primary-600 dark:text-secondary-400">
                <i className="fab fa-react text-4xl"></i>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -left-4 -bottom-4 bg-white dark:bg-dark-800 rounded-full p-3 shadow-lg"
              initial={{ y: -10, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="text-primary-600 dark:text-secondary-400">
                <i className="fab fa-js text-4xl"></i>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <motion.a 
          href="#about"
          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-400 transition-colors"
          whileHover={{ scale: 1.2 }}
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
