import { useState, useEffect, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AnimatedCursor from "./components/AnimatedCursor";
import LoadingScreen from "./components/LoadingScreen";
import AnimatedBackground3D from "./components/3d/AnimatedBackground3D";

const LazyBackground = () => {
  return (
    <Suspense fallback={null}>
      <AnimatedBackground3D />
    </Suspense>
  );
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [appReady, setAppReady] = useState(false);
  const [is3DEnabled, setIs3DEnabled] = useState(false); // Start with 3D disabled for now

  useEffect(() => {
    // Simulate loading assets for a minimum of 2.5 seconds
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2500);

    // Check if the device might have performance issues with 3D
    const checkDevicePerformance = () => {
      // Disable 3D on mobile devices for better performance
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Check for low-end devices or older browsers
      const isLowPerformance = !window.WebGLRenderingContext || isMobile;
      
      // Start with 3D disabled for now until we fix compatibility issues
      // setIs3DEnabled(!isLowPerformance);
    };

    checkDevicePerformance();
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingScreen />
      {/* 3D background temporarily disabled */}
      {/* {is3DEnabled && <LazyBackground />} */}
      <AnimatedCursor />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

// Apply the light theme to the document root
document.documentElement.classList.add('light');

export default App;
