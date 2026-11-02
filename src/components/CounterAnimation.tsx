import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

const CounterAnimation = ({ end, suffix = '', label, duration = 2 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center group">
      <div className="font-display text-5xl lg:text-6xl font-bold text-gradient tracking-tighter">
        {count}{suffix}
      </div>
      <div className="mt-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
        {label}
      </div>
      <div className="mt-3 mx-auto w-8 h-px bg-primary/30 group-hover:w-16 transition-all duration-500" />
    </div>
  );
};

export default CounterAnimation;

