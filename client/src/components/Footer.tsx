import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-purple-800/70 to-indigo-800/70 backdrop-blur-sm pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Top section with logo and animated wave decoration */}
        <div className="relative flex justify-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block p-6 bg-white/20 backdrop-blur-md rounded-full mb-4">
              <span className="text-4xl font-montserrat font-bold gradient-text">Zarqan</span>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              {[
                { icon: "github", href: "https://github.com" },
                { icon: "linkedin", href: "https://linkedin.com" },
                { icon: "twitter", href: "https://twitter.com" },
                { icon: "dribbble", href: "https://dribbble.com" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/30 hover:bg-white/40 text-white rounded-full transition-all"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`fab fa-${social.icon} text-xl`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Navigation sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* About section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h4 className="font-montserrat font-bold text-white text-xl mb-4">About Me</h4>
            <p className="text-white/80 leading-relaxed">
              Crafting exceptional digital experiences that blend creativity with functionality. Always exploring new technologies to create immersive web applications.
            </p>
          </motion.div>
          
          {/* Navigation links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h4 className="font-montserrat font-bold text-white text-xl mb-4">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Home", href: "#hero" },
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" }
              ].map((item, index) => (
                <motion.a 
                  key={index}
                  href={item.href}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h4 className="font-montserrat font-bold text-white text-xl mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <p className="text-white/80">
                <i className="fas fa-envelope mr-2"></i> hello@zarqan.dev
              </p>
              <p className="text-white/80">
                <i className="fas fa-map-marker-alt mr-2"></i> San Francisco, California
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Copyright section with animated border */}
        <motion.div 
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-white text-sm">
            &copy; {currentYear} Zarqan. All rights reserved.
          </p>
          
          <p className="text-white text-sm mt-4 md:mt-0 flex items-center">
            Designed with <i className="fas fa-heart text-red-400 mx-2"></i> by Zarqan
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
