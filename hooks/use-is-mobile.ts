import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client flag to true after hydration
    setIsClient(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  // Return false during SSR to prevent hydration mismatch
  return isClient ? isMobile : false;
};

export default useIsMobile;
