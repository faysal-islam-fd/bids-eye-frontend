"use client"; // This is a Client Component

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Router } from "next/router";

// Define a simple component that doesn't directly import nprogress
// but instead loads and uses it via script tag and global object
const NProgressHandler: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressSpinnerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize progress bar once on mount
  useEffect(() => {
    // Add the CSS to the head
    const style = document.createElement('style');
    style.textContent = `
      #nprogress-custom {
        pointer-events: none;
      }
      
      #nprogress-custom .bar {
        background: linear-gradient(to right, #0077ff, #0058a3);
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        border-radius: 0 2px 2px 0;
      }
      
      #nprogress-custom .spinner {
        display: block;
        position: fixed;
        z-index: 9999;
        top: 15px;
        right: 15px;
      }
      
      #nprogress-custom .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: solid 2px transparent;
        border-top-color: #0058a3;
        border-left-color: #0058a3;
        border-radius: 50%;
        animation: nprogress-spinner 500ms linear infinite;
      }
      
      @keyframes nprogress-spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle start/complete functions
  const start = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Show the progress bar and spinner
    if (progressBarRef.current && progressSpinnerRef.current) {
      progressBarRef.current.style.width = '0%';
      progressBarRef.current.style.opacity = '1';
      progressBarRef.current.style.transition = 'width 100ms ease';
      progressSpinnerRef.current.style.display = 'block';
      
      // Animate to 30% immediately
      setTimeout(() => {
        if (progressBarRef.current) {
          progressBarRef.current.style.width = '30%';
        }
      }, 10);
      
      // Then slowly progress to 80%
      setTimeout(() => {
        if (progressBarRef.current) {
          progressBarRef.current.style.width = '80%';
          progressBarRef.current.style.transition = 'width 4s ease-in';
        }
      }, 100);
    }
  };

  const complete = () => {
    if (!isAnimatingRef.current) return;
    
    // Complete the progress bar animation
    if (progressBarRef.current && progressSpinnerRef.current) {
      progressBarRef.current.style.width = '100%';
      progressBarRef.current.style.transition = 'width 100ms ease-out';
      
      // Fade out
      setTimeout(() => {
        if (progressBarRef.current && progressSpinnerRef.current) {
          progressBarRef.current.style.opacity = '0';
          progressSpinnerRef.current.style.display = 'none';
          
          // Reset after animation
          timeoutRef.current = setTimeout(() => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = '0%';
              isAnimatingRef.current = false;
            }
          }, 300);
        }
      }, 150);
    }
  };

  // Track URL changes
  useEffect(() => {
    // Start progress when route changes
    start();
    
    // Complete progress after a small delay
    const timeoutId = setTimeout(() => {
      complete();
    }, 300);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams]);

  return (
    <div id="nprogress-custom" ref={progressRef}>
      <div className="bar" ref={progressBarRef}></div>
      <div className="spinner" ref={progressSpinnerRef}>
        <div className="spinner-icon"></div>
      </div>
    </div>
  );
};

export default NProgressHandler;