import { useEffect } from "react";
import DesktopNav from "@/components/navigation/DesktopNav";
import MobileNav from "@/components/navigation/MobileNav";
import NavigationDots from "@/components/navigation/NavigationDots";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import EasterEgg from "@/components/ui/EasterEgg";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

export default function Home() {
  // Setup scroll spy for navigation highlighting
  const activeSection = useScrollSpy({
    sectionIds: ["hero", "about", "skills", "projects", "contact"],
    offset: 100
  });

  // Enable smooth scrolling
  useEffect(() => {
    // Set smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Setup Konami code detection for Easter Egg
    let konamiSequence: string[] = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      konamiSequence.push(e.key);
      
      // Keep only the most recent entries matching the code length
      if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
      }
      
      // Check if the sequence matches the code
      const isKonamiCode = konamiSequence.join(',') === konamiCode.join(',');
      
      if (isKonamiCode) {
        // Show Easter egg
        const easterEgg = document.getElementById('easter-egg');
        if (easterEgg) {
          easterEgg.classList.add('active');
        }
        konamiSequence = [];
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative min-h-screen font-inter bg-white dark:bg-dark-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <ParticleBackground />
      
      <ThemeSwitcher />
      <NavigationDots activeSection={activeSection} />
      <DesktopNav />
      <MobileNav />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
      <EasterEgg />
    </div>
  );
}
