import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // Delay hiding the loader a bit
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
        ease: "easeInOut",
        duration: 0.8
      }
    }
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    exit: { 
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${progress}%`,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Split text into individual letters for animation
  const text = "ZARQAN";
  const letters = Array.from(text);

  if (!loading) return null;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-center mb-8">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-4xl md:text-6xl font-bold text-white inline-block mx-1"
                variants={letterVariants}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          <motion.div
            className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-full bg-purple-300 rounded-full"
              variants={progressVariants}
              initial="initial"
              animate="animate"
            />
          </motion.div>

          <motion.div 
            className="text-white/80 text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {progress < 100 ? 'Loading...' : 'Ready!'}
          </motion.div>

          <motion.div 
            className="absolute bottom-10 left-0 right-0 text-center text-white/50 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ✨ Creating amazing experiences
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}