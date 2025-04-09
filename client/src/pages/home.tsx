import { useEffect, useState, Suspense } from "react";
import DesktopNav from "@/components/navigation/DesktopNav";
import MobileNav from "@/components/navigation/MobileNav";
import NavigationDots from "@/components/navigation/NavigationDots";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedBackground3D from "@/components/3d/AnimatedBackground3D";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import EasterEgg from "@/components/ui/EasterEgg";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useIsMobile } from "@/hooks/use-mobile";
import { FloatingLogo } from "@/components/3d/InteractiveScene";

// Lazy load the 3D components for better performance
const Lazy3DBackground = () => (
  <Suspense fallback={<ParticleBackground />}>
    <AnimatedBackground3D />
  </Suspense>
);

export default function Home() {
  const isMobile = useIsMobile();
  const [use3DBackground, setUse3DBackground] = useState(true);
  
  // Setup scroll spy for navigation highlighting
  const activeSection = useScrollSpy({
    sectionIds: ["hero", "about", "skills", "projects", "contact"],
    offset: 100
  });

  // Enable smooth scrolling and check device performance
  useEffect(() => {
    // Set smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    // 3D features are currently disabled due to compatibility issues
    const checkDevicePerformance = () => {
      // Keep 3D disabled for now until compatibility issues are fixed
      setUse3DBackground(false);
    };
    
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
    
    checkDevicePerformance();
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative min-h-screen font-inter gradient-bg text-gray-800 transition-colors duration-300">
      {use3DBackground ? <Lazy3DBackground /> : <ParticleBackground />}
      
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
