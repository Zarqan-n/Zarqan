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
            <div className="flex justify-center mt-4 space-x-5">
              {[
                { icon: "github", href: "https://github.com", color: "bg-[#333333]/90" },
                { icon: "linkedin-in", href: "https://linkedin.com", color: "bg-[#0077b5]/90" },
                { icon: "twitter", href: "https://twitter.com", color: "bg-[#1da1f2]/90" },
                { icon: "instagram", href: "https://instagram.com", color: "bg-gradient-to-br from-[#405de6] via-[#e1306c] to-[#ffdc80]/90" },
                { icon: "behance", href: "https://behance.net", color: "bg-[#1769ff]/90" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 flex items-center justify-center ${social.color} hover:saturate-150 text-white rounded-full transition-all shadow-lg border border-white/20`}
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
            <h4 className="font-montserrat font-bold text-white text-xl mb-4 flex items-center md:justify-start justify-center">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-info text-white"></i>
              </span>
              About Me
            </h4>
            <p className="text-white/80 leading-relaxed">
              Crafting exceptional digital experiences that blend creativity with functionality. Always exploring new technologies to create immersive web applications.
            </p>
            <div className="mt-4 pt-2 md:text-left text-center">
              <motion.a 
                href="#about"
                className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
                whileHover={{ x: 5 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn more about me <i className="fas fa-arrow-right text-xs"></i>
              </motion.a>
            </div>
          </motion.div>
          
          {/* Navigation links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h4 className="font-montserrat font-bold text-white text-xl mb-4 flex items-center justify-center">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-link text-white"></i>
              </span>
              Quick Links
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Home", href: "#hero", icon: "fa-home" },
                { name: "About", href: "#about", icon: "fa-user" },
                { name: "Skills", href: "#skills", icon: "fa-code" },
                { name: "Projects", href: "#projects", icon: "fa-briefcase" },
                { name: "Contact", href: "#contact", icon: "fa-envelope" }
              ].map((item, index) => (
                <motion.a 
                  key={index}
                  href={item.href}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <i className={`fas ${item.icon} text-xs`}></i>
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
            <h4 className="font-montserrat font-bold text-white text-xl mb-4 flex items-center md:justify-end justify-center">
              <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-headset text-white"></i>
              </span>
              Get In Touch
            </h4>
            <div className="space-y-4">
              <p className="text-white/80 flex items-center justify-end">
                <span className="bg-purple-500/50 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-envelope text-white"></i>
                </span>
                <span>hello@zarqan.dev</span>
              </p>
              <p className="text-white/80 flex items-center justify-end">
                <span className="bg-indigo-500/50 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-map-marker-alt text-white"></i>
                </span>
                <span>San Francisco, California</span>
              </p>
              <p className="text-white/80 flex items-center justify-end">
                <span className="bg-violet-500/50 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-phone text-white"></i>
                </span>
                <span>+1 (555) 123-4567</span>
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
          <div className="flex items-center">
            <span className="bg-white/10 h-8 w-8 rounded-full flex items-center justify-center mr-3">
              <i className="far fa-copyright text-white text-xs"></i>
            </span>
            <p className="text-white text-sm">
              {currentYear} Zarqan. All rights reserved.
            </p>
          </div>
          
          <p className="text-white text-sm mt-4 md:mt-0 flex items-center">
            <i className="fas fa-code text-purple-300 mr-2"></i>
            Designed with <i className="fas fa-heart text-red-400 mx-2 animate-pulse"></i> by Zarqan
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
