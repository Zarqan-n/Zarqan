import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AnimatedCursor from "./components/AnimatedCursor";
import LoadingScreen from "./components/LoadingScreen";

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

  useEffect(() => {
    // Simulate loading assets for a minimum of 2.5 seconds
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingScreen />
      <AnimatedCursor />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

// Apply the light theme to the document root
document.documentElement.classList.add('light');

export default App;
