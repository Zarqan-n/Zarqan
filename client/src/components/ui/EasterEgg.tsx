import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EasterEgg() {
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <AnimatePresence>
      <motion.div 
        id="easter-egg"
        className={`hidden-easter-egg fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 ${isVisible ? 'active' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      >
        <motion.div 
          className="bg-white dark:bg-dark-900 rounded-xl p-8 max-w-md text-center relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isVisible ? 1 : 0.8, 
            opacity: isVisible ? 1 : 0
          }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <button 
            id="close-easter-egg" 
            onClick={toggleVisibility}
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-400 focus:outline-none"
          >
            <i className="fas fa-times"></i>
          </button>
          
          <div className="text-4xl mb-4 text-primary-600 dark:text-secondary-400">
            <i className="fas fa-trophy"></i>
          </div>
          
          <h3 className="text-2xl font-montserrat font-bold mb-4 text-gray-800 dark:text-white">You Found the Easter Egg!</h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Congratulations on discovering this hidden feature! I like to add little surprises to show attention to detail.
          </p>
          
          <div className="space-y-4">
            <p className="text-primary-600 dark:text-secondary-400 font-medium">Try using the Konami Code:</p>
            <div className="flex justify-center space-x-2 flex-wrap">
              {['↑', '↑', '↓', '↓', '←', '→', 'B', 'A'].map((key, index) => (
                <motion.span 
                  key={index}
                  className="w-8 h-8 bg-gray-200 dark:bg-dark-800 rounded flex items-center justify-center text-gray-800 dark:text-gray-200 m-1"
                  whileHover={{ y: -3, backgroundColor: "#6C63FF" }}
                >
                  {key}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
