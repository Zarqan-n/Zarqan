import { motion } from "framer-motion";

interface NavigationDotsProps {
  activeSection: string | null;
}

export default function NavigationDots({ activeSection }: NavigationDotsProps) {
  const sections = ["hero", "about", "skills", "projects", "recent-projects", "contact"];

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden md:block">
      <div className="flex flex-col space-y-4">
        {sections.map((section) => (
          <motion.a
            key={section}
            href={`#${section}`}
            className={`nav-dot w-3 h-3 rounded-full ${
              activeSection === section 
                ? "opacity-100" 
                : "opacity-50 hover:opacity-100"
            } bg-purple-300`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              scale: activeSection === section ? 1.5 : 1,
              opacity: activeSection === section ? 1 : 0.5
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label={`Scroll to ${section} section`}
          />
        ))}
      </div>
    </div>
  );
}
