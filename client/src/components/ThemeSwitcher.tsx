import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center space-x-2">
      <motion.button 
        onClick={toggleTheme}
        className="w-16 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center transition-colors duration-300 focus:outline-none shadow-lg backdrop-blur-sm border border-purple-100 dark:border-purple-900/30 p-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <motion.div 
          className="w-6 h-6 rounded-full flex justify-center items-center shadow-md"
          animate={{ 
            x: theme === 'dark' ? 32 : 0,
            backgroundColor: theme === 'dark' ? '#312e81' : '#ffffff',
            rotate: theme === 'dark' ? 360 : 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 700, 
            damping: 30,
            rotate: { duration: 0.5 }
          }}
        >
          {theme === 'light' ? (
            <i className="fas fa-sun text-yellow-500 text-sm"></i>
          ) : (
            <i className="fas fa-moon text-indigo-300 text-sm"></i>
          )}
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </motion.button>
    </div>
  );
}
