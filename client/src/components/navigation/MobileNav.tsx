import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const menuVariants = {
    closed: { 
      x: "100%",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 40 
      } 
    },
    open: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 }
  };

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <div className="fixed top-6 left-6 z-50 md:hidden">
      <motion.button 
        id="menu-toggle" 
        className="text-gray-800 dark:text-white focus:outline-none"
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-bars text-2xl"></i>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="mobile-menu" 
            className="fixed inset-0 bg-white dark:bg-dark-900 z-50 flex flex-col items-center justify-center space-y-8"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.button 
              id="close-menu" 
              className="absolute top-6 right-6 text-gray-800 dark:text-white focus:outline-none"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-times text-2xl"></i>
            </motion.button>
            
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className={`text-2xl font-montserrat font-bold ${
                  index === 0 
                    ? "text-primary-600 dark:text-secondary-400 hover:underline" 
                    : "text-gray-800 dark:text-white hover:text-primary-600 dark:hover:text-secondary-400"
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
                }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
