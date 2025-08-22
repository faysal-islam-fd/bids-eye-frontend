import { Variants } from 'framer-motion';

export const fadeIn = (
  direction: 'up' | 'down' | 'left' | 'right',
  delay: number = 0
): Variants => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.3, // Further reduced duration
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.02, // Further reduced stagger interval
      delayChildren: 0.02,   // Further reduced initial delay for children
    },
  },
};

export const slideIn = (
  direction: 'up' | 'down' | 'left' | 'right',
  delay: number = 0
): Variants => {
  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5, // Further reduced duration
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};
