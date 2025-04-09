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
        className="text-white focus:outline-none"
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-bars text-2xl"></i>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="mobile-menu" 
            className="fixed inset-0 bg-purple-900 bg-gradient-to-br from-purple-900 to-indigo-900 z-50 flex flex-col items-center justify-center space-y-8"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.button 
              id="close-menu" 
              className="absolute top-6 right-6 text-white focus:outline-none"
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
                    ? "text-purple-300 hover:text-white" 
                    : "text-white hover:text-purple-300"
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
            <motion.div
              variants={itemVariants}
              className="absolute bottom-10 left-0 right-0 mx-auto text-center text-white opacity-70"
            >
              <span className="gradient-text text-lg font-bold">Zarqan</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
