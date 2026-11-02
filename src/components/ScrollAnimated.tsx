import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

const ScrollAnimated = ({ children, className = '', delay = 0, direction = 'up' }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 50 : 0,
    x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimated;

