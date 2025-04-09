import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AnimatedCursor from "./components/AnimatedCursor";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatedCursor />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

// Apply the light theme to the document root
document.documentElement.classList.add('light');

export default App;
