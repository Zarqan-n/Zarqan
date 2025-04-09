import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center space-x-2">
      <button 
        onClick={toggleTheme}
        className="w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center transition duration-300 focus:outline-none shadow"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <motion.div 
          className="w-5 h-5 bg-white rounded-full shadow-md flex justify-center items-center"
          animate={{ 
            x: theme === 'dark' ? 24 : 0 
          }}
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        >
          {theme === 'light' ? (
            <i className="fas fa-sun text-yellow-500 text-xs"></i>
          ) : (
            <i className="fas fa-moon text-primary-500 text-xs"></i>
          )}
        </motion.div>
      </button>
    </div>
  );
}
