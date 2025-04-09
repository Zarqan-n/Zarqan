import { useState, useEffect, useRef, RefObject } from "react";

interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: IntersectionObserverOptions = { threshold: 0.1, freezeOnceVisible: true }
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const { freezeOnceVisible = true, ...observerOptions } = options;
  const frozen = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    
    // If no element or (frozen and should freeze), skip observer
    if (!element || (frozen.current && freezeOnceVisible)) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
      
      // If element is visible and we should freeze, set frozen to true
      if (entry.isIntersecting && freezeOnceVisible) {
        frozen.current = true;
      }
    }, observerOptions);
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [elementRef, JSON.stringify(observerOptions), freezeOnceVisible]);

  return entry;
}
