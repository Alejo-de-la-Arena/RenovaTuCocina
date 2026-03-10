/**
 * Variantes de Framer Motion reutilizables
 */

const easeSmooth = [0.25, 0.46, 0.45, 0.94];
const easeOutExpo = [0.19, 1, 0.22, 1];

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easeSmooth },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.35 },
};

export const fadeUpBlur = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.5, ease: easeSmooth },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easeSmooth },
};

export const staggerItemFast = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: easeOutExpo },
};

export const hoverLift = {
  rest: { y: 0, transition: { duration: 0.2 } },
  hover: { y: -4, transition: { duration: 0.2 } },
};

export const bounceIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: easeOutExpo },
};
