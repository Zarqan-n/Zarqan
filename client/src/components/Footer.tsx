import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-dark-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a href="#" className="text-3xl font-montserrat font-bold gradient-text">AP</a>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xs">
              Crafting exceptional digital experiences that blend creativity with functionality.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-montserrat font-bold text-gray-800 dark:text-white mb-3">Navigation</h4>
              <ul className="space-y-2">
                {[
                  { name: "Home", href: "#hero" },
                  { name: "About", href: "#about" },
                  { name: "Skills", href: "#skills" },
                  { name: "Projects", href: "#projects" },
                  { name: "Contact", href: "#contact" }
                ].map((item, index) => (
                  <li key={index}>
                    <motion.a 
                      href={item.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-400 transition-colors"
                      whileHover={{ x: 3 }}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {item.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-montserrat font-bold text-gray-800 dark:text-white mb-3">Connect</h4>
              <ul className="space-y-2">
                {[
                  { name: "GitHub", href: "https://github.com" },
                  { name: "LinkedIn", href: "https://linkedin.com" },
                  { name: "Twitter", href: "https://twitter.com" },
                  { name: "Dribbble", href: "https://dribbble.com" }
                ].map((item, index) => (
                  <li key={index}>
                    <motion.a 
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-400 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      {item.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-dark-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {currentYear} Alex Parker. All rights reserved.
          </p>
          
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-4 md:mt-0">
            Designed and developed with <i className="fas fa-heart text-red-500"></i> by Alex Parker
          </p>
        </div>
      </div>
    </footer>
  );
}
