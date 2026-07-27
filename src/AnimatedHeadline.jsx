import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const words = ["remembered", "organized", "connected", "understood", "expanded"];

const wordVariants = {
  enter: { rotateX: 75, opacity: 0, y: 30 },
  center: { rotateX: 0, opacity: 1, y: 0 },
  exit: { rotateX: -75, opacity: 0, y: -30 }
};

const spring = { type: "spring", stiffness: 90, damping: 16, mass: 1 };

export default function AnimatedHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.h1 className="hero-headline" layout="position" transition={spring}>
      <motion.span layout="position" transition={spring}>Your ideas, </motion.span>
      <span className="word-wrapper" style={{ display: 'inline-block', perspective: '600px' }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={words[index]}
            className="dynamic-word"
            variants={wordVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            style={{ display: 'inline-block', backfaceVisibility: 'hidden' }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <motion.span layout="position" transition={spring}>, forever.</motion.span>
    </motion.h1>
  );
}
