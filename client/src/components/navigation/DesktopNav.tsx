import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLocation } from "wouter";

export default function DesktopNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [, setLocation] = useLocation();

  // Update nav appearance based on scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full bg-white/80 dark:bg-dark-900/80 backdrop-blur-md z-40 transition-all duration-300 hidden md:block"
      animate={{
        height: isScrolled ? 70 : 80,
        boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none"
      }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.a 
          href="#"
          className="text-2xl font-montserrat font-bold"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="gradient-text">Alex Parker</span>
        </motion.a>
        
        <div className="flex space-x-8">
          {['hero', 'about', 'skills', 'projects', 'contact'].map((section) => (
            <motion.a
              key={section}
              href={`#${section}`}
              className="nav-link relative font-medium text-gray-800 dark:text-white hover:text-primary-600 dark:hover:text-secondary-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-600 dark:after:bg-secondary-400 after:transition-all hover:after:w-full"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1) === 'Hero' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
