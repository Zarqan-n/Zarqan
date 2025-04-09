import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, {});
  const isVisible = !!entry?.isIntersecting;
  const [activeTab, setActiveTab] = useState('journey');
  
  const stats = [
    { label: "Years Experience", value: 6, suffix: "+", prefix: "" },
    { label: "Projects Completed", value: 85, suffix: "", prefix: "" },
    { label: "Happy Clients", value: 32, suffix: "", prefix: "" },
    { label: "Cups of Coffee", value: 1342, suffix: "", prefix: "" },
  ];
  
  const experiences = [
    { year: "2023", role: "Senior Frontend Developer", company: "Innovatech Solutions", description: "Lead developer on multiple high-profile web applications utilizing React, Next.js and modern frontend technologies." },
    { year: "2021", role: "UI/UX Developer", company: "Digital Craftsmen", description: "Developed interactive web experiences with a focus on animation and user engagement." },
    { year: "2019", role: "Web Developer", company: "CodeArt Studios", description: "Built responsive websites and applications for various clients across multiple industries." },
  ];
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl"
          animate={isVisible ? {
            y: [0, 50, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1],
          } : {}}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"
          animate={isVisible ? {
            y: [0, -70, 0],
            x: [0, 50, 0],
            scale: [1, 1.3, 1],
          } : {}}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="inline-block mb-6">
            <span className="text-sm font-medium text-white py-1 px-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">ABOUT ME</span>
          </div>
          
          <h2 className="text-5xl font-montserrat font-bold mb-4 text-white">
            My <span className="gradient-text">Story</span>
          </h2>
          
          <p className="text-white/80 max-w-2xl mx-auto">
            Passionate developer with a love for creating engaging digital experiences that combine innovative functionality with striking visual design.
          </p>
        </motion.div>
        
        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="card bg-white/10 backdrop-blur-sm p-5 rounded-xl text-center"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <h3 className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter 
                  prefix={stat.prefix}
                  end={stat.value} 
                  suffix={stat.suffix} 
                  delay={0.1 + index * 0.1}
                  duration={1.5}
                />
              </h3>
              <p className="text-white/70 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left content - Photo */}
          <motion.div 
            className="lg:col-span-2 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background decorative elements */}
              <motion.div 
                className="absolute inset-0 -m-6 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-2xl blur-md"
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Profile image with border */}
              <div className="relative h-full rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Zarqan" 
                  className="w-full h-full object-cover"
                />
                
                {/* Skill badges */}
                <motion.div 
                  className="absolute -left-5 top-10 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <span className="text-white font-medium flex items-center">
                    <i className="fab fa-react text-purple-300 mr-2 text-xl"></i> React Expert
                  </span>
                </motion.div>
                
                <motion.div 
                  className="absolute -right-5 top-1/3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-white font-medium flex items-center">
                    <i className="fas fa-laptop-code text-purple-300 mr-2 text-lg"></i> Full Stack
                  </span>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-5 left-1/4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <span className="text-white font-medium flex items-center">
                    <i className="fas fa-paint-brush text-purple-300 mr-2"></i> UI/UX Designer
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Right content - Details */}
          <motion.div 
            className="lg:col-span-3 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
          >
            {/* Tab buttons */}
            <div className="flex space-x-2 mb-8">
              {[
                { id: 'journey', label: 'My Journey' },
                { id: 'skills', label: 'Core Skills' },
                { id: 'philosophy', label: 'Philosophy' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white/20 backdrop-blur-sm text-white shadow-md border border-white/20' 
                      : 'text-white/70 hover:text-white'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
            
            {/* Tab content */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              {/* Journey Tab */}
              {activeTab === 'journey' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Professional Experience</h3>
                  
                  <div className="space-y-8">
                    {experiences.map((exp, index) => (
                      <motion.div 
                        key={index}
                        className="relative pl-8 pb-8 border-l-2 border-white/20 last:border-l-0 last:pb-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Year badge */}
                        <div className="absolute -left-4 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white text-sm font-bold">
                          {exp.year.substring(2)}
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                          <p className="text-purple-300 font-medium mb-2">{exp.company}</p>
                          <p className="text-white/70">{exp.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">My Core Strengths</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "Frontend Development", description: "Expert in React ecosystem with a focus on creating fast, responsive, and accessible user interfaces.", icon: "fas fa-code" },
                      { title: "UI/UX Design", description: "Designing intuitive and engaging user experiences with a keen eye for detail and aesthetics.", icon: "fas fa-pencil-ruler" },
                      { title: "Animations & Interactions", description: "Creating fluid animations and micro-interactions that enhance the user experience.", icon: "fas fa-magic" },
                      { title: "Performance Optimization", description: "Ensuring applications are fast and efficient across all devices and network conditions.", icon: "fas fa-tachometer-alt" }
                    ].map((skill, index) => (
                      <motion.div 
                        key={index}
                        className="flex p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="mr-4 text-purple-300 text-2xl">
                          <i className={skill.icon}></i>
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg mb-2">{skill.title}</h4>
                          <p className="text-white/70">{skill.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Philosophy Tab */}
              {activeTab === 'philosophy' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">My Approach</h3>
                  
                  <p className="text-white/80 mb-4">I believe that great digital products are born at the intersection of technology, design, and human emotion. My approach is focused on creating experiences that not only function flawlessly but also connect with users on a deeper level.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 mt-8">
                    {[
                      { title: "User-Centered", description: "Everything I create begins with understanding the user's needs, motivations, and pain points.", icon: "fas fa-users" },
                      { title: "Detail-Oriented", description: "The small details often make the biggest difference in how users perceive and interact with a product.", icon: "fas fa-search" },
                      { title: "Performance-Driven", description: "Fast, responsive experiences are crucial for user satisfaction and engagement.", icon: "fas fa-bolt" },
                      { title: "Continuous Learning", description: "The tech landscape evolves rapidly, and I'm committed to growing with it.", icon: "fas fa-graduation-cap" }
                    ].map((value, index) => (
                      <motion.div 
                        key={index}
                        className="flex"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="bg-purple-500/30 p-3 rounded-xl mr-4">
                          <i className={`${value.icon} text-purple-300`}></i>
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">{value.title}</h4>
                          <p className="text-white/70 text-sm">{value.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Download CV Button */}
              <motion.div
                className="mt-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.a 
                  href="#" 
                  className="btn-primary inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-download mr-2"></i>
                  Download Resume
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}